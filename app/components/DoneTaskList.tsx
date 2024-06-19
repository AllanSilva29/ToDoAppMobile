import { useEffect } from "react";
import { Text, XStack, YStack, ScrollView, Button, Checkbox } from "tamagui";
import { X, ListEnd, Check, Trash } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

interface Task {
  id: string;
  description: string;
  status: string;
  checked: boolean;
}

interface DoneTaskListProps {
  doneTasks: Task[];
  checkedAny: boolean;
  setters: any;
  apiMethods: any;
  params: any;
}

export function DoneTaskList({
  doneTasks,
  checkedAny,
  setters,
  apiMethods,
  ...props
}: DoneTaskListProps) {
  useEffect(() => {
    if (props.params.refresh) {
      apiMethods.fetchDoneTasks();
      props.params.refresh = 0;
    }
  }, [props.params.refresh]);

  const toast = useToastController();

  const sendDoneTasks = () => {
    const newTasks = doneTasks.filter((task: Task) => task.status !== "doing");

    setters.setDoneTasks(newTasks);
    setters.setCheckedAny(false);
    apiMethods.revertDoneTasks();
    
  };

  const deleteCheckedTasks = () => {
    doneTasks.forEach((task) => {
      if (task.checked) {
        apiMethods.deleteDoneTasks(task.id);
      }
    });

    toast.show("Deletado", {
      message: "Tarefas deletadas com sucesso.",
    });
  };

  const checkIfAnyTaskToRevert = (doneTasks: Task[]) => {
    const willRevert = doneTasks.find((task) => task.status === "doing");

    if (willRevert) {
      setters.setCheckedAny(true);
    } else {
      setters.setCheckedAny(false);
    }
  };

  const toggleTaskCheck = (id: string) => {
    const newTasks: Task[] = doneTasks.map((task: Task) => {
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

    setters.setDoneTasks(newTasks);
    checkIfAnyTaskToRevert(newTasks);
  };

  const uncheckAllDoneTasks = () => {
    const newTasks = doneTasks.map((task) => {
      return {
        ...task,
        checked: false,
        status: "done",
      };
    });

    setters.setDoneTasks(newTasks);
    checkIfAnyTaskToRevert(newTasks);
  };

  const renderTasks = doneTasks.map((task: Task) => (
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
    <YStack f={1} gap="$8" px="$10" pt="$5" alignSelf="center">
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
        <XStack ai="center" jc="center" fw="wrap" b="$14" gap="$4">
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
      ) : (
        <></>
      )}
    </YStack>
  );
}
