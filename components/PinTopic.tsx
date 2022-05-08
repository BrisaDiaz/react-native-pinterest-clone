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
    height: 104,
    width: "100%",
    maxWidth: 240,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 104,
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
    fontSize: 20,
    color: "#fff",
  },
});
