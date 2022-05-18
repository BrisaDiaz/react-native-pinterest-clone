import { View, Text } from "./Themed";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native";

export default function ShareButton() {
  return (
    <View>
      <TouchableOpacity
        style={{
          borderRadius: 100,
          backgroundColor: Colors.lightGray,
          width: 35,
          aspectRatio: 1,
        }}
      ></TouchableOpacity>
      <Text style={{ fontSize: 10 }}>Copy link</Text>
    </View>
  );
}
