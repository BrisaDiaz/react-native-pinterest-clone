import { StyleSheet, TextInput, Platform, ViewStyle } from "react-native";
import React from "react";
import { Text, View } from "./Themed";

import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
type Props = TextInput["props"] & {
  label?: string;
  description?: string;
  focusColor?: string;
  borderBottomColor?: string;
  wrapperStyle?: ViewStyle;
  error?: boolean;
};
export default function FloatingInput({
  label,
  focusColor,
  borderBottomColor,
  style,
  wrapperStyle,
  description,
  error,
  ...props
}: Props) {
  const [isInputFocus, setIsInputFocus] = React.useState(false);

  const theme = useColorScheme();

  return (
    <View style={wrapperStyle}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        style={[
          styles.floatingInput,

          style,
          {
            borderBottomColor: error
              ? Colors.error
              : isInputFocus
              ? focusColor || Colors[theme].tint
              : borderBottomColor || Colors.lightGray,
          },
        ]}
        onFocus={() => setIsInputFocus(true)}
        onBlur={() => setIsInputFocus(false)}
        {...props}
      />
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    alignSelf: "flex-start",
    marginBottom: -6,
    position: "relative",
    zIndex: 10,
  },
  floatingInput: {
    shadowColor: "#fafafa00",

    borderColor: "#fafafa00",

    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray,

    paddingVertical: 8,
    fontSize: 18,
    fontWeight: "600",
    shadowOffset: {
      height: 0,
      width: 0,
    },

    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  description: {
    opacity: 0.8,

    paddingTop: 4,
  },
});
