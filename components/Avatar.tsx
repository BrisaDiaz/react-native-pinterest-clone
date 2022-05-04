import { Image } from "react-native";
export default function Avatar({
  source,
  size,
}: {
  source: string;
  size?: "small" | "medium" | "large";
}) {
  return (
    <Image
      style={{
        borderRadius: size === "small" ? 30 : size === "large" ? 70 : 50,
        width: size === "small" ? 30 : size === "large" ? 70 : 50,
        height: size === "small" ? 30 : size === "large" ? 70 : 50,
      }}
      source={{ uri: source }}
    />
  );
}
