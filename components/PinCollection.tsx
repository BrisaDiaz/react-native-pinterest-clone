import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "./Themed";
export default function PinCollection({
  data,
}: {
  data: { id: number; name: string; thumbnail: string };
}) {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Image
        style={styles.image}
        resizeMethod="resize"
        source={{
          uri: data.thumbnail,
        }}
      />
      <Text style={styles.title}>{data.name}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    minHeight: 200,
    borderRadius: 6,
  },
  title: {
    fontWeight: "700",
    marginTop: 6,
    marginBottom: 16,
    textTransform: "capitalize",
  },
});
