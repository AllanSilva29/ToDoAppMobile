import { Link } from "expo-router";
import { ListRestart } from "@tamagui/lucide-icons";
import { Button, XStack } from "tamagui";

export function RefreshButton({ href, onPress }) {
  return (
    <XStack ai="center" jc="center" fw="wrap" b="$14">
      <Link href={href} asChild>
        <Button
          bg="$blue8"
          alignSelf="center"
          icon={ListRestart}
          size="$5"
          circular
          onPress={onPress}
        ></Button>
      </Link>
    </XStack>
  );
}
