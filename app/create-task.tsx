import { View, YStack } from "tamagui";
import { CreateTaskInput } from "app/components/CreateTaskInput";
import { AnimatedGif } from "./components/AnimatedGif";
import { useSelector } from "react-redux";

export default function CreateTaskScreen() {
  const appTheme = useSelector((state: any) => state.todoStore.appTheme);


  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      enterStyle={{
        opacity: 0,
        x: -50,
      }}
      animation="quick"
      backgroundColor={appTheme}
    >
      <YStack margin="$3" padding="$2">
        <AnimatedGif />
      </YStack>

      <YStack
        width={300}
        minHeight={250}
        overflow="hidden"
        margin="$3"
        padding="$2"
      >
        <CreateTaskInput
          size="$4"
          placeholder="Vou fazer as compras e..."
          toast={{
            title: "Tarefa criada",
            message: "Tarefa criada com sucesso!",
          }}
        />
      </YStack>
    </View>
  );
}