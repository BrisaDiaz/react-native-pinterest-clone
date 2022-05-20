import { ReactNode } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Text } from "./Themed";
type Props = TouchableOpacity["props"] & {
  data: { id: number; name: string; thumbnail: string };
  children?: ReactNode;
};
export default function PinTopic({ data, style, children, ...others }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...others}
      style={[styles.container, style]}
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={{
          uri: data.thumbnail,
        }}
      />
      <View style={styles.textContainer}>
        {children ? children : <Text style={styles.title}>{data.name}</Text>}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    aspectRatio: 1.85,
    width: "100%",

    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000040",
  },
  title: {
    fontWeight: "700",
    textTransform: "capitalize",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});
