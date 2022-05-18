import React from "react";
import { View, Text } from "./Themed";
import {
  StyleSheet,
  ImageBackground,
  ViewStyle,
  TouchableHighlight,
} from "react-native";
import Colors from "../constants/Colors";
import { PinBoard } from "../types";
import { useLinkProps } from "@react-navigation/native";

export default function Board({
  style,
  data,
}: {
  style?: ViewStyle;
  data: PinBoard;
}) {
  const { onPress } = useLinkProps({
    to: { screen: "Pin", params: { id: data.id } },
  });
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.component, style]}
      activeOpacity={1}
      underlayColor={Colors.lightGray}
    >
      <>
        <View style={styles.thumbnailsContainer}>
          <ImageBackground
            source={{ uri: data.thumbnails[0] || "" }}
            resizeMode="cover"
            style={styles.bigThumbnail}
          />

          <View style={styles.smallThumbnailsContainer}>
            <ImageBackground
              source={{ uri: data.thumbnails[1] || "" }}
              style={[styles.smallThumbnail, styles.upperSmallThumbnail]}
              resizeMode="cover"
            />
            <ImageBackground
              source={{ uri: data.thumbnails[2] || "" }}
              resizeMode="cover"
              style={styles.smallThumbnail}
            />
          </View>
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {data.name}
        </Text>
        <Text style={styles.metaData}>{data.pinsCount} Pins</Text>
        <Text style={styles.metaData}>{data.updatedAt} </Text>
      </>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  component: {
    width: "100%",
    borderRadius: 6,
  },
  name: {
    fontWeight: "700",
    fontSize: 15,

    paddingHorizontal: 2,
  },
  metaData: {
    fontSize: 11,
    opacity: 0.9,
    paddingHorizontal: 2,
  },
  thumbnailsContainer: {
    width: "100%",
    aspectRatio: 1.6,
    borderRadius: 12,
    backgroundColor: Colors.lightGray,
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
