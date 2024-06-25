import { useEffect, useState } from "react";
import { Check, X } from "@tamagui/lucide-icons";
import { RefreshButton } from "./RefreshButton";
import { refreshButtonTasks } from "redux/todo/todoActions.js";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Paragraph,
  XStack,
  YStack,
  Separator,
  Text,
  ScrollView,
  Checkbox,
} from "tamagui";
import { CreateTaskButton } from "./CreateTaskButton";
import { fetchData } from "utils/apiCalls";

interface Task {
  id: string;
  description: string;
  status: string;
  checked: boolean;
}

export function TaskList({
  tasks,
  isDone,
  parentSetters,
  apiMethods,
  ...props
}) {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const dispatch = useDispatch();

  const refreshButton = useSelector(
    (state: any) => state.todoStore.refreshButton
  );

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const refreshTasks = () => {
    fetchData({ type: "tasks" });
    dispatch(refreshButtonTasks({ refreshButton: false }));
  };

  const removeAndRedirectDoneTasks = () => {
    const doneTasks = taskList.filter((task: Task) => task.status === "done");

    dispatch(refreshButtonTasks({ refreshButton: true }));
    parentSetters.setIsDone(false);
    apiMethods.postDoneTasks(doneTasks);
  };

  const checkIfAnyTaskIsDone = (taskList: Task[]) => {
    const doneTask = taskList.find((task) => task.status === "done");

    if (doneTask) {
      parentSetters.setIsDone(true);
    } else {
      parentSetters.setIsDone(false);
    }
  };

  const toggleTaskStatus = (id: string) => {
    const newTasks: Task[] = taskList.map((task: Task) => {
      if (task.id === id) {
        return {
          ...task,
          checked: !task.checked,
          status: task.status === "doing" ? "done" : "doing",
        };
      } else {
        return task;
      }
    });

    setTaskList(newTasks);
    checkIfAnyTaskIsDone(newTasks);
  };

  const uncheckAllTasks = () => {
    const newTasks = taskList.map((task: Task) => {
      return {
        ...task,
        checked: false,
        status: "doing",
      };
    });

    setTaskList(newTasks);
    checkIfAnyTaskIsDone(newTasks);
  };

  const renderTasks = taskList.map((task: Task) => (
    <XStack key={task.id} ai="center" jc="flex-end" mt="$2">
      <XStack ai="center" jc="flex-end" gap="$2">
        <Checkbox
          checked={task.checked}
          size="$5"
          onCheckedChange={() => toggleTaskStatus(task.id)}
        >
          <Checkbox.Indicator>
            <Check/>
          </Checkbox.Indicator>
        </Checkbox>
        <Text
          width={160}
          mr="$3"
          style={
            task.status === "done"
              ? { textDecorationLine: "line-through", opacity: 0.5 }
              : {}
          }
        >
          {task.description}
        </Text>
      </XStack>
      <XStack key={task.id} ai="center">
        <Separator alignSelf="stretch" vertical marginHorizontal={15} />
        <Paragraph
          mr="$3"
          color={task.status === "done" ? "$green10" : "$yellow10"}
        >
          {task.status}
        </Paragraph>
      </XStack>
    </XStack>
  ));
  return (
    <YStack
      f={1}
      gap="$8"
      px="$10"
      pt="$5"
      alignSelf="center"
      enterStyle={{
        opacity: 0,
        scale: 1.5,
        x: -50,
      }}
      animation="quick"
    >
      <ScrollView
        width={340}
        maxHeight={"80%"}
        style={{ backgroundColor: props.color }}
        padding="$4"
        mb="$4"
        borderRadius="$4"
      >
        {renderTasks}
      </ScrollView>
      {isDone ? (
        <XStack ai="center" jc="center" fw="wrap" b="$12" gap="$4">
          <Button
            icon={Check}
            backgroundColor={"$green10"}
            onPress={() => removeAndRedirectDoneTasks()}
          ></Button>
          <Button
            icon={X}
            backgroundColor={"$red10"}
            onPress={() => uncheckAllTasks()}
          ></Button>
        </XStack>
      ) : refreshButton ? (
        <RefreshButton href={"/"} onPress={() => refreshTasks()} />
      ) : (
        <CreateTaskButton />
      )}
    </YStack>
  );
}
