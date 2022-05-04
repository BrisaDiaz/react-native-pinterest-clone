import { TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
export default function Input({
  placeholder,
  rounded,
  fullWidth,
}: {
  placeholder?: string;
  rounded?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <TextInput
      style={[
        styles.input,
        rounded && styles.rounded,
        fullWidth && styles.fullWidth,
      ]}
      placeholder={placeholder || ""}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.lightGray,
    margin: 2,
    padding: 8,
    outlineColor: Colors.focus,
    fontWeight: "600",
    borderRadius: 4,
  },
  rounded: { borderRadius: 30 },
  fullWidth: { width: "100%" },
});
