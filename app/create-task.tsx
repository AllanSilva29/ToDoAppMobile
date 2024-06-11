import { View, YStack } from "tamagui";
import { CustomInput } from "app/components/CustomInput";
import { AnimatedGif } from "./components/AnimatedGif";

export default function CreateTaskScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <YStack
        margin="$3"
        padding="$2"
      >
        <AnimatedGif />
      </YStack>

      <YStack
        width={300}
        minHeight={250}
        overflow="hidden"
        margin="$3"
        padding="$2"
      >
        <CustomInput size="$4" placeholder="Vou fazer as compras e..." />
      </YStack>
    </View>
  );
}
