import { Image } from "tamagui";

export function CustomImage({ src, width, height, ...props }) {
  return (
    <Image
      source={{
        uri: src,
        width: width,
        height: height,
      }}
    />
  );
}
