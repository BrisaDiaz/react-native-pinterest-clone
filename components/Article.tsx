import { Image, StyleSheet, TouchableOpacity } from "react-native";
import useLoadingStyle from "../hooks/useLoadingStyle";
import Animated from "react-native-reanimated";
import { Text, View } from "./Themed";
type Props = TouchableOpacity["props"] & {
  data: { id: number; name: string; thumbnail: string };
};
export default function Article({ data, ...others }: Props) {
  const { loadingStyle } = useLoadingStyle();
  return (
    <TouchableOpacity activeOpacity={0.8} {...others}>
      <Animated.View style={[{ width: "100%", height: "100%" }, loadingStyle]}>
        <Image
          style={styles.image}
          resizeMethod="resize"
          source={{
            uri: data.thumbnail,
          }}
        />
        <Text style={styles.title}>{data.name}</Text>
      </Animated.View>
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
