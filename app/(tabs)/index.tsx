import axios from "axios";
import { api } from "backend/api";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { H3, Paragraph, XStack, YStack, Image } from "tamagui";
import { TaskList } from "app/components/TaskList";
import { CreateTaskButton } from "app/components/CreateTaskButton";
import { useToastController } from "@tamagui/toast";

interface Task {
  id: string;
  description: string;
  status: string;
  checked: boolean;
}

export default function TabHomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDone, setIsDone] = useState(false);
  const params = useLocalSearchParams();
  const toast = useToastController();
  const router = useRouter();

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

  function postDoneTasks() {
    tasks.forEach((task) => {
      if (task.status === "done") {
        const taskDone = {
          description: task.description,
          status: task.status,
        };

        axios.post(`${api.baseUrl}/done-tasks`, taskDone).then(() => {
          deleteDoneTask(task.id);
          toast.show("Deletado", {
            message: "Tarefas finalizadas com sucesso.",
          });
          router.push({ pathname: "/tasksDone", params: { refresh: 1 } });
        });
      }
    });
  }

  async function deleteDoneTask(id: string) {
    await axios.delete(`${api.baseUrl}/tasks/${id}`);

    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <YStack
      f={1}
      p="$4"
      enterStyle={{
        opacity: 0,
        scale: 1.5,
        x: -50,
      }}
      animation="quick"
    >
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
        apiMethods={{ fetchTasks, postDoneTasks }}
        params={params}
      />
    </YStack>
  );
}
