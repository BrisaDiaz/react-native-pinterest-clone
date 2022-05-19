import React from "react";
import { View } from "../Themed";
import { StyleSheet, ViewStyle } from "react-native";

import useLoadingStyle from "../../hooks/useLoadingStyle";
import Animated from "react-native-reanimated";
export default function Board({ style }: { style?: ViewStyle }) {
  const { loadingStyle } = useLoadingStyle();
  return (
    <View style={[styles.component, style]}>
      <>
        <Animated.View style={[styles.thumbnailsContainer, loadingStyle]}>
          <View style={styles.bigThumbnail} />

          <View style={styles.smallThumbnailsContainer}>
            <View style={[styles.smallThumbnail, styles.upperSmallThumbnail]} />
            <View style={styles.smallThumbnail} />
          </View>
        </Animated.View>
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  component: {
    width: "100%",
    borderRadius: 6,
  },

  thumbnailsContainer: {
    width: "100%",
    aspectRatio: 1.6,
    borderRadius: 12,

    flexDirection: "row",
    overflow: "hidden",
  },
  bigThumbnail: {
    width: "100%",
    height: "100%",
    maxWidth: "70%",
    borderRightWidth: 1,
    borderColor: "#fff",
    backgroundColor: "transparent",
  },
  smallThumbnailsContainer: {
    width: "30%",
    height: "100%",
    backgroundColor: "transparent",
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  smallThumbnail: {
    width: "100%",
    height: "100%",
    maxHeight: "50%",
    backgroundColor: "transparent",
  },
  upperSmallThumbnail: {
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
});
