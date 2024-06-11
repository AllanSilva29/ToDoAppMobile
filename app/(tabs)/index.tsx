import axios from "axios";
import { api } from "backend/api";
import { useEffect, useState } from "react";
import { Plus } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import {
  Button,
  H3,
  Paragraph,
  XStack,
  YStack,
  Image,
  Separator,
  Text,
} from "tamagui";

interface Task {
  id: string;
  description: string;
  status: string;
}

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`${api.baseUrl}/tasks`);

      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  return (
    <YStack f={1} y={200} gap="$8" px="$10" pt="$5" alignSelf="center">
      {tasks.length === 0 && (
        <>
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
        </>
      )}
      {tasks.map((task: Task) => (
        <XStack key={task.id} ai="center" mb="$4" jc="flex-end">
          <Text width={200} mr="$3">
            {task.description}
          </Text>
          <XStack key={task.id} ai="center">
            <Separator alignSelf="stretch" vertical marginHorizontal={15} />
            <Paragraph mr="$3" color="$green10">
              {task.status}
            </Paragraph>
          </XStack>
        </XStack>
      ))}
      <XStack ai="center" jc="center" fw="wrap" b="$8" mt="$4">
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
    </YStack>
  );
}
