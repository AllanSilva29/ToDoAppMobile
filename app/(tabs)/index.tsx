import axios from "axios";
import { Check } from "@tamagui/lucide-icons";
import { api } from "backend/api";
import { useEffect, useState } from "react";
import { Plus } from "@tamagui/lucide-icons";
import { Link, useLocalSearchParams } from "expo-router";
import {
  Button,
  H3,
  Paragraph,
  XStack,
  YStack,
  Image,
  Separator,
  Text,
  ScrollView,
  Checkbox,
} from "tamagui";

interface Task {
  id: string;
  description: string;
  status: string;
}

interface TaskStatus {
  id: string;
  status: string;
}

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [taskStatus, setTaskStatus] = useState<TaskStatus[]>([]);
  const params = useLocalSearchParams();

  async function fetchTasks() {
    const response = await axios.get(`${api.baseUrl}/tasks`);
    setTasks(response.data);
    return response.data;
  }

  // const updateTaskStatus = (tasks: Task[]) => {
  //   setTaskStatus(
  //     tasks.map(({ id, status }) => {
  //       return {
  //         id,
  //         status,
  //       };
  //     })
  //   );
  // };

  const toggleTaskStatus = (id: string) => {
    const newTasks: Task[] = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === "doing" ? "done" : "doing",
        };
      } else {
        return task;
      }
    });

    setTasks(newTasks);
  };

  useEffect(() => {
    fetchTasks();
    // fetchTasks().then((tasks) => updateTaskStatus(tasks));
  }, []);

  function TaskList() {
    useEffect(() => {
      if (params.refresh) {
        fetchTasks();
        // fetchTasks().then((tasks) => updateTaskStatus(tasks));
      }
    }, []);

    if (tasks.length === 0) return <></>;
    const renderTasks = tasks.map((task: Task) => (
      <XStack key={task.id} ai="center" jc="flex-end" mt="$2">
        <XStack ai="center" jc="flex-end" gap="$2">
          <Checkbox size="$4" onCheckedChange={() => toggleTaskStatus(task.id)}>
            <Checkbox.Indicator>
              <Check />
            </Checkbox.Indicator>
          </Checkbox>
          <Text
            width={200}
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
          maxHeight={"80%"}
          backgroundColor="$background"
          padding="$4"
          mb="$4"
          borderRadius="$4"
        >
          {renderTasks}
        </ScrollView>
      </YStack>
    );
  }

  return (
    <>
      {tasks.length === 0 && (
        <YStack f={1} y={150} gap="$8" px="$10" pt="$5" alignSelf="center">
          <XStack ai="center" jc="center" fw="wrap" b="$8">
            <Paragraph>Nenhuma tarefa encontrada.</Paragraph>
            <Image
              source={{
                uri: "assets/images/checklist-rafiki.png",
                width: 140,
                height: 180,
              }}
            />
            <H3 ta="center" mb="$4">
              O que você vai fazer hoje?
            </H3>
            <Paragraph ta="center">
              Toque em + para adicionar suas tarefas
            </Paragraph>
          </XStack>
        </YStack>
      )}
      {TaskList()}
      <XStack ai="center" jc="center" fw="wrap" b="$14">
        <Link href="/create-task" asChild>
          <Button
            bg="$purple8"
            alignSelf="center"
            icon={Plus}
            size="$5"
            circular
          ></Button>
        </Link>
      </XStack>
    </>
  );
}
