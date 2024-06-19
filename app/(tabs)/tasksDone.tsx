import axios from "axios";
import { api } from "backend/api";
import { Text, YStack } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { DoneTaskList } from "app/components/DoneTaskList";
import { CustomImage } from "app/components/CustomImage";
import { useToastController } from "@tamagui/toast";

interface Task {
  id: string;
  description: string;
  status: string;
  checked: boolean;
}

export default function TabDoneTasksScreen() {
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [checkedAny, setCheckedAny] = useState(false);
  const params = useLocalSearchParams();
  const toast = useToastController();
  const router = useRouter();

  async function fetchDoneTasks() {
    const response = await axios.get(`${api.baseUrl}/done-tasks`);

    setDoneTasks(response.data);
  }

  function revertDoneTasks() {
    doneTasks.forEach((task) => {
      if (task.status === "doing") {
        const taskDone = {
          description: task.description,
          status: task.status,
        };

        axios.post(`${api.baseUrl}/tasks`, taskDone).then(async () => {
          await deleteDoneTasks(task.id);
          toast.show("Tarefas restauradas", {
            message: "Volte a trabalhar!",
          });
          router.push({ pathname: "/", params: { refresh: 1 } });
        });
      }
    });
  }

  async function deleteDoneTasks(id: string) {
    await axios.delete(`${api.baseUrl}/done-tasks/${id}`);

    fetchDoneTasks();
  }

  useEffect(() => {
    fetchDoneTasks();
  }, []);

  return (
    <YStack
      enterStyle={{
        opacity: 0,
        scale: 1.5,
        x: -50,
      }}
      animation="quick"
      flex={1}
      alignItems="center"
      rowGap={60}
      justifyContent="center"
    >
      {!doneTasks.length ? (
        <>
          <Text fontSize={20} color="$blue10">
            Nenhuma tarefa concluída
          </Text>
          <CustomImage src={"assets/images/tl.webp"} width={150} height={190} />
        </>
      ) : (
        <DoneTaskList
          doneTasks={doneTasks}
          checkedAny={checkedAny}
          setters={{ setDoneTasks, setCheckedAny }}
          apiMethods={{ fetchDoneTasks, deleteDoneTasks, revertDoneTasks }}
          params={params}
        />
      )}
    </YStack>
  );
}
