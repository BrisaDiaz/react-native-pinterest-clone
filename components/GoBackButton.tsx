import { MaterialIcons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";
import { TouchableHighlight } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
export default function GoBackButton(props: TouchableHighlight["props"]) {
  const theme = useColorScheme();

  return (
    <IconButton
      style={{ paddingHorizontal: 2, paddingVertical: 2, borderRadius: 100 }}
      {...props}
      activeOpacity={0.8}
      underlayColor="transparent"
      icon={
        <MaterialIcons
          name="keyboard-arrow-left"
          size={24}
          color={Colors[theme].tint}
        />
      }
    />
  );
}
