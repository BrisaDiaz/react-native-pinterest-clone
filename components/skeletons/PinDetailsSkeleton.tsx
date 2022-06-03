import Animated from "react-native-reanimated";
import { StyleSheet } from "react-native";
import useLoadingStyle from "../../hooks/useLoadingStyle";
import { View } from "../Themed";
export default function PinDetailsSkeleton() {
  const { loadingStyle } = useLoadingStyle();
  return (
    <View style={[styles.container]}>
      <Animated.View style={[styles.image, loadingStyle]} />
      <View style={[styles.authorInfo]}>
        <Animated.View style={[styles.avatar, loadingStyle]} />
        <Animated.View style={[styles.userName, loadingStyle]} />
        <Animated.View style={[styles.button, loadingStyle]} />
      </View>
      <Animated.View style={[styles.title, loadingStyle]} />
      <Animated.View style={[styles.paragraph, loadingStyle]} />
      <Animated.View style={[styles.paragraph, loadingStyle]} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
  },

  image: {
    width: "100%",

    aspectRatio: 0.8,

    borderRadius: 8,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  avatar: { width: 30, aspectRatio: 1, borderRadius: 100, marginRight: 6 },
  userName: {
    height: 14,
    width: 100,
    borderRadius: 4,
    marginLeft: 6,
  },
  button: { width: 100, height: 30, borderRadius: 30, marginLeft: "auto" },
  title: {
    height: 20,
    width: 150,
    marginVertical: 4,
    marginHorizontal: "auto",
    borderRadius: 4,
  },
  paragraph: {
    height: 12,
    width: "100%",
    marginBottom: 4,
    borderRadius: 4,
  },

  followButton: {
    marginLeft: "auto",
  },
});
