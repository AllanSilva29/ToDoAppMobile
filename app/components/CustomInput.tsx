import { Button, Input, SizeTokens, XStack } from "tamagui";

export function CustomInput(props: { size: SizeTokens, placeholder: string }) {
  return (
    <XStack alignItems="center">
      <Input flex={1} size={props.size} placeholder={props.placeholder} mr="$3" />
      <Button size={props.size} color={"$green10"} bg="$white025">Criar</Button>
    </XStack>
  );
}
