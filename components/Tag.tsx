import { Text } from "./Themed";
import { StyleSheet, Pressable, TextStyle } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import IconButton from "./IconButton";
type Props = {
  text: string;
  onChange?: (isChecked: boolean) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
  onDelete?: () => void;
  deletable?: boolean;
  textStyle?: TextStyle;
};
export default function Tag({
  text,
  onChange,
  defaultChecked,
  disabled,
  deletable,
  onDelete,
  textStyle,
}: Props) {
  const theme = useColorScheme();
  const [isChecked, setIsChecked] = useState(defaultChecked || false);
  const toggleChecked = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };
  return (
    <Pressable
      onPress={() => toggleChecked()}
      style={[
        styles.tag,
        theme === "light" ? styles.light : styles.dark,
        isChecked ? styles.checked : undefined,
      ]}
    >
      {deletable && (
        <IconButton
          onPress={() => onDelete && onDelete()}
          style={styles.clearIcon}
          icon={
            <AntDesign
              name="closecircle"
              size={14}
              color={Colors.light.tabIconSelected}
            />
          }
        />
      )}

      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 12,

    borderRadius: 30,
    margin: 3,
    alignSelf: "flex-start",
    maxHeight: "auto",
    alignItems: "center",
    flexDirection: "row",
  },
  text: { fontWeight: "700", textTransform: "capitalize" },

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
  clearIcon: {
    alignSelf: "flex-start",
    marginRight: 6,
    justifyContent: "center",
    height: "100%",
  },
});
