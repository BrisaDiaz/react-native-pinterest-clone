import { View, Text } from "./Themed";
import { Image, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import Button from "./Button";
import Colors from "../constants/Colors";
import { Pin } from "../types";
import getRndInter from "../utils/getRndInteger";
type Props = TouchableOpacity["props"] & {
  data: Pin;
  style?: ViewStyle;
  onMenuClick?: (data: Pin) => void;
  dynamicHeight?: boolean;
};
import { useLinkProps } from "@react-navigation/native";

export default function PinComponent({
  data,
  style,
  onMenuClick,
  dynamicHeight,
  ...other
}: Props) {
  const { onPress } = useLinkProps({
    to: { screen: "Pin", params: { id: data.id } },
  });
  return (
    <>
      <TouchableOpacity
        style={[styles.container, style]}
        activeOpacity={0.7}
        {...other}
        onPress={(event) => {
          onPress();
          other.onPress && other.onPress(event);
        }}
      >
        <Image
          resizeMode="cover"
          style={[
            styles.pin,
            { aspectRatio: dynamicHeight? getRndInter(7, 10) / 10 : 1},
          ]}
          source={{
            uri: data.pin,
          }}
        />
        <View style={styles.footer}>
          <Text style={styles.title} numberOfLines={3}>
            {data.title}
          </Text>
          <Button
            style={styles.iconButton}
            iconPosition="left"
            type="secondary"
            backgroundColor="transparent"
            onPress={() => onMenuClick && onMenuClick(data)}
            Icon={
              <Feather
                name="more-horizontal"
                size={18}
                color={Colors.light.tabIconSelected}
              />
            }
          />
        </View>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  container: { width: "100%", flex: 1 },
  pin: {
    width: "100%",
    resizeMode: "contain",
    backgroundColor: Colors.gray,
    aspectRatio: 1,
    borderRadius: 8,
    alignSelf: "stretch",
  },
  title: { fontSize: 10, fontWeight: "700", marginVertical: 4, marginRight: 2 },
  iconButton: { padding: 0, marginLeft: "auto" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
