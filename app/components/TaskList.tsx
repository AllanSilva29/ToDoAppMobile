import { useEffect } from "react";
import { Check, X } from "@tamagui/lucide-icons";

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

interface Task {
  id: string;
  description: string;
  status: string;
  checked: boolean;
}

export function TaskList({ tasks, isDone, setters, apiMethods, ...props }) {
  useEffect(() => {
    if (props.params.refresh) {
      apiMethods.fetchTasks();
      props.params.refresh = 0;
    }
  }, [props.params.refresh]);

  const checkIfAnyTaskIsDone = (tasks: Task[]) => {
    const doneTask = tasks.find((task) => task.status === "done");

    if (doneTask) {
      setters.setIsDone(true);
    } else {
      setters.setIsDone(false);
    }
  };

  const toggleTaskStatus = (id: string) => {
    const newTasks: Task[] = tasks.map((task: Task) => {
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

    setters.setTasks(newTasks);
    checkIfAnyTaskIsDone(newTasks);
  };

  const uncheckAllTasks = () => {
    const newTasks = tasks.map((task) => {
      return {
        ...task,
        checked: false,
        status: "doing",
      };
    });

    setters.setTasks(newTasks);
    checkIfAnyTaskIsDone(newTasks);
  };

  const removeAndRedirectDoneTasks = () => {
    const notDoneTasks = tasks.filter((task: Task) => task.status !== "done");

    setters.setTasks(notDoneTasks);
    setters.setIsDone(false);
    apiMethods.postDoneTasks();
  };

  if (tasks.length === 0) return <></>;
  const renderTasks = tasks.map((task: Task) => (
    <XStack key={task.id} ai="center" jc="flex-end" mt="$2">
      <XStack ai="center" jc="flex-end" gap="$2">
        <Checkbox
          checked={task.checked}
          size="$5"
          onCheckedChange={() => toggleTaskStatus(task.id)}
        >
          <Checkbox.Indicator>
            <Check />
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
    <YStack f={1} gap="$8" px="$10" pt="$5" alignSelf="center">
      <ScrollView
        width={340}
        maxHeight={"80%"}
        backgroundColor="$background"
        padding="$4"
        mb="$4"
        borderRadius="$4"
      >
        {renderTasks}
      </ScrollView>
      {isDone ? (
        <XStack ai="center" jc="center" fw="wrap" b="$14" gap="$4">
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
      ) : (
        <CreateTaskButton />
      )}
    </YStack>
  );
}
