import { View } from "../Themed";
import { StyleSheet, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import useLoadingStyle from "../../hooks/useLoadingStyle";
import getRndInter from "../../utils/getRndInteger";
type Props = {
  dynamicHeight?: boolean;
  style?: ViewStyle;
};

export default function PinComponent({ dynamicHeight, style }: Props) {
  const { loadingStyle } = useLoadingStyle();
  return (
    <>
      <View style={[styles.container]}>
        <Animated.View
          style={[
            styles.image,
            { aspectRatio: dynamicHeight ? getRndInter(7, 10) / 10 : 1 },
            loadingStyle,
            style,
          ]}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: { width: "100%", flex: 1 },
  image: {
    width: "100%",
    resizeMode: "contain",

    aspectRatio: 1,
    borderRadius: 8,
  },
});
