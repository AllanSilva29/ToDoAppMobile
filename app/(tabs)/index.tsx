import axios from "axios";
import { api } from "backend/api";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { H3, Paragraph, XStack, YStack, Image } from "tamagui";
import { TaskList } from "app/components/TaskList";
import { CreateTaskButton } from "app/components/CreateTaskButton";
import { useToastController } from "@tamagui/toast";
import { useSelector, useDispatch } from "react-redux";
import { RefreshButton } from "app/components/RefreshButton";
import { refreshButtonTasks } from "redux/todo/todoActions.js";
import { fetchData } from "utils/apiCalls";
import { getGradient } from "utils/getGradient.js";

interface Task {
  id: string;
  description: string;
  status: string;
  checked: boolean;
}

export default function TabHomeScreen() {
  const [isDone, setIsDone] = useState(false);
  const toast = useToastController();
  const router = useRouter();
  const dispatch = useDispatch();

  const appTheme = useSelector((state: any) => state.todoStore.appTheme);
  const tasks: Task[] = useSelector((state: any) => state.todoStore.todos);
  const refreshButton = useSelector(
    (state: any) => state.todoStore.refreshButton
  );

  const refreshTasks = () => {
    fetchData({ type: "tasks" });
    dispatch(refreshButtonTasks({ refreshButton: false }));
  };

  function postDoneTasks(doneTasks: Task[]) {
    let promises: any[] = [];
    doneTasks.forEach((task) => {
      const taskDone = {
        description: task.description,
        status: task.status,
      };

      const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

      sleep(500).then(async () => {
        promises.push(
          await axios
            .post(`${api.baseUrl}/done-tasks`, taskDone)
            .then(async () => {
              await deleteDoneTask(task.id);
            })
            .catch((error) => {
              console.log(error);
            })
        );
      });
    });
    Promise.all(promises).then(() => {
      toast.show("Deletado", {
        message: "Tarefas finalizadas com sucesso.",
      });
      fetchData({ type: "all" });
      router.push({ pathname: "tasksDone" });
    });
  }

  async function deleteDoneTask(id: string) {
    await axios.delete(`${api.baseUrl}/tasks/${id}`);
    fetchData({ type: "tasks" });
  }

  useEffect(() => {
    fetchData({ type: "tasks" });
  }, []);

  return (
    <YStack f={1} p="$4" style={{ backgroundColor: appTheme }}>
      {!tasks.length ? (
        <>
          <YStack f={1} y={150} gap="$8" px="$10" pt="$5" alignSelf="center">
            <XStack ai="center" jc="center" fw="wrap" b="$8">
              <Paragraph>Nenhuma tarefa encontrada.</Paragraph>
              <Image
                source={require("assets/images/checklist-rafiki.png")}
                style={{ width: 140, height: 180 }}
              />
              <H3 ta="center" mb="$4">
                O que você vai fazer hoje?
              </H3>
              <Paragraph ta="center">
                Toque em + para adicionar suas tarefas
              </Paragraph>
            </XStack>
          </YStack>
          <YStack
            f={1}
            y={340}
            gap="$8"
            px="$10"
            pt="$5"
            alignSelf="center"
            b="$12"
          >
            {refreshButton ? (
              <RefreshButton href={"/"} onPress={() => refreshTasks()} />
            ) : (
              <CreateTaskButton />
            )}
          </YStack>
        </>
      ) : (
        <TaskList
          tasks={tasks}
          color={getGradient(appTheme, "#ffffff")}
          checkColor={appTheme}
          isDone={isDone}
          parentSetters={{ setIsDone }}
          apiMethods={{ postDoneTasks }}
        />
      )}
    </YStack>
  );
}
