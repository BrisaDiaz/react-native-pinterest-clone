import { View } from "../Themed";
import Animated from "react-native-reanimated";
import { StyleSheet } from "react-native";

import useLoadingStyle from "../../hooks/useLoadingStyle";
export default function UserProfileSkeleton() {
  const { loadingStyle } = useLoadingStyle();
  return (
    <View style={styles.userData}>
      <Animated.View style={[styles.userAvatar, loadingStyle]} />
      <Animated.View style={[styles.user_name, loadingStyle]} />
      <Animated.View style={[styles.email, loadingStyle]} />
      <Animated.View style={[styles.followers, loadingStyle]} />
    </View>
  );
}
const styles = StyleSheet.create({
  userData: { alignItems: "center" },

  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100,

    alignItems: "center",
 
  },

  user_name: {
    height: 25,
    width: 170,
    marginVertical: 6,
    borderRadius: 4,
  },
  email: {
    height: 12,
    width: 170,
  },
  followers: {
    marginVertical: 12,
    height: 12,
    width: 210,
  },
});
