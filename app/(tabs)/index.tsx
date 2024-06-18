import axios from "axios";
import { api } from "backend/api";
import { Plus } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { Button, H3, Paragraph, XStack, YStack, Image } from "tamagui";
import { TaskList } from "app/components/TaskList";
import { CreateTaskButton } from "app/components/CreateTaskButton";

interface Task {
  id: string;
  description: string;
  status: string;
  checked: boolean;
}

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDone, setIsDone] = useState(false);
  const params = useLocalSearchParams();

  async function fetchTasks() {
    const response = await axios.get(`${api.baseUrl}/tasks`);

    setTasks(
      response.data.map((task: Task) => {
        return {
          ...task,
          checked: false,
        };
      })
    );
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      {tasks.length === 0 && (
        <>
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
          <YStack f={1} y={150} gap="$8" px="$10" pt="$5" alignSelf="center">
            <CreateTaskButton />
          </YStack>
        </>
      )}
      <TaskList
        tasks={tasks}
        isDone={isDone}
        setters={{ setTasks, setIsDone }}
        fetchTasks={fetchTasks}
        params={params}
      />
    </>
  );
}
