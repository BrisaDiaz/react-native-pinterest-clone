import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { Text } from "./Themed";

import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
type Props = TextInput["props"] & {
  label?: string;
  focusColor?: string;
};
export default function FloatingInput({
  label,
  focusColor,
  style,
  ...props
}: Props) {
  const [isInputFocus, setIsInputFocus] = React.useState(false);

  const theme = useColorScheme();
  return (
    <>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        style={[
          styles.floatingInput,
          {
            borderBottomColor: isInputFocus
              ? focusColor || Colors[theme].tint
              : Colors.lightGray,
          },
          style,
        ]}
        onFocus={() => setIsInputFocus(true)}
        onBlur={() => setIsInputFocus(false)}
        {...props}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    paddingHorizontal: 7.5,
    width: "fit-content",
    marginBottom: -6,
    position: "relative",
    zIndex: 10,
  },
  floatingInput: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 20,
    fontWeight: "700",
    outlineColor: "transparent",
  },
});