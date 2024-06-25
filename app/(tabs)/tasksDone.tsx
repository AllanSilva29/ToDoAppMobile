import axios from "axios";
import { api } from "backend/api";
import { Text, YStack } from "tamagui";
import { CustomImage } from "app/components/CustomImage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { DoneTaskList } from "app/components/DoneTaskList";
import { useToastController } from "@tamagui/toast";
import { fetchData } from "utils/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { RefreshButton } from "app/components/RefreshButton";
import { refreshButtonTasks } from "redux/todo/todoActions";

interface Task {
  id: string;
  description: string;
  status: string;
  checked: boolean;
}

export default function TabDoneTasksScreen() {
  const [checkedAny, setCheckedAny] = useState(false);
  const toast = useToastController();
  const router = useRouter();
  const dispatch = useDispatch();
  const doneTasks: Task[] = useSelector(
    (state: any) => state.todoStore.doneTodos
  );

  const refreshButton = useSelector(
    (state: any) => state.todoStore.refreshButton
  );

  const refreshTasks = () => {
    fetchData({ type: "done-tasks" });
    dispatch(refreshButtonTasks({ refreshButton: false }));
  };

  function revertDoneTasks(tasks: Task[]) {
    let promises: any[] = [];
    tasks.forEach(async (task) => {
      if (task.status === "doing") {
        const taskDone = {
          description: task.description,
          status: task.status,
        };

        const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

        await sleep(500).then(async () => {
          promises.push(
            await axios
              .post(`${api.baseUrl}/tasks`, taskDone)
              .then(async () => {
                await deleteDoneTasks(task.id);
              })
              .catch((error) => {
                console.log(error);
              })
          );
        });
      }
    });

    Promise.all(promises).then(() => {
      toast.show("Tarefas restauradas", {
        message: "Volte a trabalhar!",
      });
      fetchData({ type: "all" });
      router.push({ pathname: "/" });
    });
  }

  async function deleteDoneTasks(id: string) {
    await axios.delete(`${api.baseUrl}/done-tasks/${id}`);
    fetchData({ type: "done-tasks" });
  }

  useEffect(() => {
    fetchData({ type: "done-tasks" });
  }, []);

  return (
    <YStack f={1} alignItems="center" rowGap={60} justifyContent="center">
      {!doneTasks.length ? (
        <>
          <Text fontSize={20} color="$blue10">
            Nenhuma tarefa concluída
          </Text>
          <CustomImage src={"assets/images/tl.webp"} width={150} height={190} />
          {refreshButton ? (
            <YStack y={280} ai="center" jc="center" fw="wrap" b="$14" gap="$4">
              <RefreshButton
                href={"/tasksDone"}
                onPress={() => refreshTasks()}
              />
            </YStack>
          ) : (
            <></>
          )}
        </>
      ) : (
        <DoneTaskList
          doneTasks={doneTasks}
          checkedAny={checkedAny}
          parentSetters={{ setCheckedAny }}
          apiMethods={{ deleteDoneTasks, revertDoneTasks }}
        />
      )}
    </YStack>
  );
}
