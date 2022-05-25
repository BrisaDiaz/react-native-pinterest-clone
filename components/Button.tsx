import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextStyle,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";
type CustomButtonProps = {
  text?: string;
  type?: "primary" | "secondary";
  fullWidth?: boolean;
  rounded?: boolean;
  Icon?: React.ReactElement;
  iconPosition?: "left" | "center" | "right";
  color?: string;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  fontStyle?: TextStyle;
};
export type ButtonProps = TouchableOpacity["props"] & CustomButtonProps;
export default function Button({
  text,
  type,
  fullWidth,
  rounded,
  Icon,
  iconPosition,
  style,
  backgroundColor,
  color,
  size,
  fontStyle,
  ...others
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        type === "secondary" ? styles.secondary : styles.primary,
        size === "small"
          ? styles.small
          : size === "large"
          ? styles.large
          : undefined,
        fullWidth && styles.fullWidth,
        rounded && styles.rounded,
        { ...(backgroundColor && { backgroundColor: backgroundColor }) },
        style,
      ]}
      {...others}
    >
      {Icon &&
        (!iconPosition ||
          iconPosition === "left" ||
          iconPosition === "center") && (
          <View
            style={
              fullWidth && iconPosition === "left"
                ? styles.fullWidthIconLeft
                : text
                ? styles.iconLeft
                : undefined
            }
          >
            {Icon}
          </View>
        )}
      {text && (
        <Text
          style={[
            color
              ? { color: color }
              : type === "secondary"
              ? styles.textDark
              : text
              ? styles.textLight
              : undefined,
            fontStyle,
          ]}
        >
          {text}
        </Text>
      )}
      {Icon && iconPosition === "right" && (
        <View style={fullWidth ? styles.fullWidthIconRight : styles.iconRight}>
          {Icon}
        </View>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    paddingBottom: 8,
    paddingTop: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",

    position: "relative",
    height: "auto",
  },
  textLight: {
    color: Colors.dark.tint,
    fontWeight: "600",
  },
  textDark: { color: Colors.light.tint, fontWeight: "600" },
  fullWidth: {
    width: "100%",
  },
  small: {
    paddingTop: 3,
    paddingBottom: 5,
    paddingHorizontal: 8,
  },
  large: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  rounded: {
    borderRadius: 30,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.lightGray,
  },
  iconLeft: {
    marginLeft: -5,
  },
  iconRight: {
    marginRight: -5,
  },
  fullWidthIconLeft: {
    position: "absolute",
    left: 8,
  },
  fullWidthIconRight: {
    position: "absolute",
    right: 8,
  },
});
