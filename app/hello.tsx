import { Anchor, Paragraph, XStack, YStack } from "tamagui";

export default function Hello() {
  return (
    <YStack f={1} y={200} ai="center" gap="$8" px="$10" pt="$5">
      <XStack
        ai="center"
        jc="center"
        fw="wrap"
        gap="$1.5"
        pos="relative"
        b="$8"
      >
        <Paragraph fos="$5">Olá,</Paragraph>

        <Paragraph fos="$5" px="$2" py="$1" col="$blue10" bg="$blue5" br="$3">
          querido usuário
        </Paragraph>

        <Paragraph fos="$5">!</Paragraph>

        <Paragraph textAlign="center" fos="$5">Este app foi feito na disciplina de</Paragraph>

        <XStack
          ai="center"
          gap="$1.5"
          px="$2"
          py="$1"
          br="$3"
          bg="$purple5"
          hoverStyle={{ bg: "$purple6" }}
          pressStyle={{ bg: "$purple4" }}
        >
          <Anchor
            href="https://tamagui.dev/docs/core/configuration"
            textDecorationLine="none"
            col="$purple10"
            fos="$5"
            textAlign="center"
            width={180}
          >
            Desenvolvimento Mobile - UFPR
          </Anchor>
        </XStack>
      </XStack>
    </YStack>
  );
}
