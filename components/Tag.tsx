import { Text } from "./Themed";
import { StyleSheet, Pressable } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { useState } from "react";
type Props = {
  text: string;
  onChange?: (isChecked: boolean) => void;
  defaultChecked?: boolean;
};
export default function Tag({ text, onChange, defaultChecked }: Props) {
  const theme = useColorScheme();
  const [isChecked, setIsChecked] = useState(defaultChecked || false);
  const toggleChecked = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };
  return (
    <Pressable onPress={() => toggleChecked()}>
      <Text
        style={[
          styles.tag,
          theme === "light" ? styles.light : styles.dark,
          isChecked ? styles.checked : undefined,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontWeight: "700",
    borderRadius: 30,
    margin: 3,
    width: "fit-content",
    maxHeight: "fit-content",
    textTransform: "capitalize",
  },
  light: {
    opacity: 0.7,
    color: Colors.light.tint,
  },
  dark: {
    opacity: 0.7,
    color: Colors.dark.tint,
  },
  checked: {
    opacity: 1,
    backgroundColor: Colors.lightGray,
  },
});
