import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextStyle,
} from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

type CustomProps = {
  onSearch: (value: string) => void;

  onClear?: () => void;
  loading?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  value: string;
  inputStyle?: TextStyle;
};
type Props = TextInput["props"] & CustomProps;
export default function SearchBar({
  onClear,
  loading,
  rounded,
  inputStyle,
  outlined,
  onSearch,
  value,
  defaultValue,
  style,
  ...other
}: Props) {
  const handleClear = () => {
    onClear && onClear();
  };
  const theme = useColorScheme();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => onSearch && onSearch(value)}>
        <FontAwesome
          name="search"
          size={18}
          style={styles.searchIcon}
          color={Colors[theme].tint}
        />
      </TouchableOpacity>

      <TextInput
        {...other}
        style={[
          styles.input,
          inputStyle,
          rounded && styles.rounded,
          outlined && styles.outlined,
        ]}
        autoFocus={true}
        placeholder="Search"
        placeholderTextColor={Colors[theme].tint}
        value={value}
      />
      {loading && (
        <ActivityIndicator
          size="small"
          color={Colors.gray}
          style={styles.spinner}
        />
      )}

      {value.length > 0 && !loading && (
        <TouchableOpacity
          onPress={() => handleClear()}
          style={styles.clearIcons}
        >
          <AntDesign
            name="closecircle"
            size={18}
            color={Colors.light.tabIconSelected}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: "auto",
    position: "relative",
  },
  input: {
    backgroundColor: Colors.lightGray,
    margin: 2,
    padding: 8,

    paddingHorizontal: 30,
    borderRadius: 4,
    fontWeight: "600",
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  rounded: { borderRadius: 30 },
  searchIcon: {
    position: "absolute",
    transform: [{ translateX: 12 }, { translateY: 12 }],
  },
  clearIcons: {
    position: "absolute",
    right: 0,
    transform: [{ translateX: -12 }, { translateY: 10 }],
  },
  spinner: {
    position: "absolute",
    right: 0,
    transform: [{ translateX: -12 }, { translateY: 8 }],
  },
});
