import { Plus } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Button, H3, Paragraph, XStack, YStack } from "tamagui";
import { Image } from "tamagui";

export default function TabOneScreen() {
  return (
    <YStack f={1} y={200} gap="$8" px="$10" pt="$5" alignSelf="center">
      <XStack ai="center" jc="center" fw="wrap" b="$8">
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
      <XStack ai="center" jc="center" fw="wrap" b="$8">
        <Link href="/modal" asChild>
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
