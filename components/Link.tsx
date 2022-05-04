import { StyleSheet, TouchableOpacity, TextStyle } from "react-native";
import Colors from "../constants/Colors";
import { Text } from "./Themed";
type Props = TouchableOpacity["props"] & {
  text: string;
  style?: TextStyle;
};
export default function Link({ text, style, ...others }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...others}>
      <Text style={[styles.link, style]}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  link: {
    fontWeight: "600",
  },
});
