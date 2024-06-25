import { useEffect, useState } from "react";
import { Text, XStack, YStack, ScrollView, Button, Checkbox } from "tamagui";
import { X, ListEnd, Check, Trash } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "utils/apiCalls";

import { RefreshButton } from "./RefreshButton";
import { refreshButtonTasks } from "redux/todo/todoActions.js";

interface Task {
  id: string;
  description: string;
  status: string;
  checked: boolean;
}

interface DoneTaskListProps {
  doneTasks: Task[];
  checkedAny: boolean;
  parentSetters: any;
  apiMethods: any;
}

export function DoneTaskList({
  doneTasks,
  checkedAny,
  parentSetters,
  apiMethods,
  ...props
}: DoneTaskListProps) {
  const [doneTaskList, setDoneTaskList] = useState<Task[]>([]);
  const toast = useToastController();
  const dispatch = useDispatch();

  const refreshButton = useSelector(
    (state: any) => state.todoStore.refreshButton
  );

  useEffect(() => {
    setDoneTaskList(doneTasks);
  }, [doneTasks]);

  const refreshTasks = () => {
    fetchData({ type: "done-tasks" });
    dispatch(refreshButtonTasks({ refreshButton: false }));
  };

  const sendDoneTasks = () => {
    const newTasks = doneTaskList.filter(
      (task: Task) => task.status === "doing"
    );

    parentSetters.setCheckedAny(false);
    dispatch(refreshButtonTasks({ refreshButton: true }));
    apiMethods.revertDoneTasks(newTasks);
  };

  const deleteCheckedTasks = () => {
    doneTaskList.forEach((task) => {
      if (task.checked) {
        apiMethods.deleteDoneTasks(task.id);
      }
    });

    toast.show("Deletado", {
      message: "Tarefas deletadas com sucesso.",
    });
  };

  const checkIfAnyTaskToRevert = (doneTaskList: Task[]) => {
    const willRevert = doneTaskList.find((task) => task.status === "doing");

    if (willRevert) {
      parentSetters.setCheckedAny(true);
    } else {
      parentSetters.setCheckedAny(false);
    }
  };

  const toggleTaskCheck = (id: string) => {
    const newTasks: Task[] = doneTaskList.map((task: Task) => {
      if (task.id === id) {
        return {
          ...task,
          checked: !task.checked,
          status: task.status === "done" ? "doing" : "done",
        };
      } else {
        return task;
      }
    });

    setDoneTaskList(newTasks);
    checkIfAnyTaskToRevert(newTasks);
  };

  const uncheckAllDoneTasks = () => {
    const newTasks = doneTaskList.map((task) => {
      return {
        ...task,
        checked: false,
        status: "done",
      };
    });

    setDoneTaskList(newTasks);
    checkIfAnyTaskToRevert(newTasks);
  };

  const renderTasks = doneTaskList.map((task: Task) => (
    <XStack key={task.id} ai="center" jc="flex-end" mt="$2">
      <XStack ai="center" jc="flex-end" gap="$2">
        <Text
          width={180}
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
        <Checkbox
          checked={task.checked}
          size="$5"
          onCheckedChange={() => toggleTaskCheck(task.id)}
        >
          <Checkbox.Indicator>
            <Check />
          </Checkbox.Indicator>
        </Checkbox>
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
        maxHeight={"80%"}
        backgroundColor="$background"
        padding="$4"
        mb="$4"
        borderRadius="$4"
      >
        {renderTasks}
      </ScrollView>
      {checkedAny ? (
        <XStack ai="center" jc="center" fw="wrap" b="$12" gap="$4">
          <Button
            icon={ListEnd}
            backgroundColor={"$blue10"}
            onPress={() => sendDoneTasks()}
          ></Button>
          <Button
            icon={X}
            backgroundColor={"$red10"}
            onPress={() => uncheckAllDoneTasks()}
          ></Button>
          <Button
            icon={Trash}
            backgroundColor={"$white10"}
            onPress={() => deleteCheckedTasks()}
          ></Button>
        </XStack>
      ) : refreshButton ? (
        <RefreshButton href={"/tasksDone"} onPress={() => refreshTasks()} />
      ) : (
        <></>
      )}
    </YStack>
  );
}
