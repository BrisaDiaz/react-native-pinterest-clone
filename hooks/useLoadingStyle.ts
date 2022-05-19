import Colors from "../constants/Colors";
import Animated, {
  withTiming,
  withRepeat,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated";

export default function useLoadingStyle() {
  const loadingStyle = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0.7, { duration: 400 }),
        withTiming(1, { duration: 400 }),
      ),

      -1,
    ),
    backgroundColor: Colors.lightGray,
  }));
  return { loadingStyle };
}
