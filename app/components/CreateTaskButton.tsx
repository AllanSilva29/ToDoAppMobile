import { Link } from "expo-router";
import { Plus } from "@tamagui/lucide-icons";
import { Button, XStack } from "tamagui";

export function CreateTaskButton() {
  return (
    <XStack ai="center" jc="center" fw="wrap" b="$12">
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
  );
}
