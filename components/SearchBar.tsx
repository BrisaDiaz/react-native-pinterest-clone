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
import { FontAwesome, AntDesign } from "@expo/vector-icons";

type CustomProps = {
  onSearch: (value: string) => void;
  onChangeText?: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  rounded?: boolean;
  defaultValue?: string;
  inputStyle?: TextStyle;
};
type Props = TextInput["props"] & CustomProps;
export default function SearchBar({
  onSearch,
  onChangeText,
  onClear,
  loading,
  rounded,
  inputStyle,
  defaultValue,
  ...other
}: Props) {
  const [value, setValue] = React.useState(defaultValue || "");
  const handleChange = (text: string) => {
    onChangeText && onChangeText(text);
    setValue(text);
  };
  const handleClear = () => {
    setValue("");
    onClear && onClear();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSearch(value)}>
        <FontAwesome
          name="search"
          size={15}
          style={styles.searchIcon}
          color={value.length > 0 ? Colors.light.tabIconSelected : Colors.gray}
        />
      </TouchableOpacity>

      <TextInput
        {...other}
        style={[styles.input, inputStyle, rounded && styles.rounded]}
        autoFocus={true}
        onSubmitEditing={() => onSearch(value)}
        placeholder="Search"
        onChangeText={handleChange}
        placeholderTextColor={Colors.gray}
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
            size={15}
            color={Colors.light.tabIconSelected}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: "fit-content",
    position: "relative",
  },
  input: {
    backgroundColor: Colors.lightGray,
    margin: 2,
    padding: 8,
    outlineColor: Colors.focus,
    paddingLeft: 30,
    borderRadius: 4,
    fontWeight: "600",
  },
  rounded: { borderRadius: 30 },
  searchIcon: {
    position: "absolute",
    transform: [{ translateX: 12 }, { translateY: 10 }],
  },
  clearIcons: {
    position: "absolute",
    right: 0,
    transform: [{ translateX: -12 }, { translateY: 12 }],
  },
  spinner: {
    position: "absolute",
    right: 0,
    transform: [{ translateX: -12 }, { translateY: 8 }],
  },
});
