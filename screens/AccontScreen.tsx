import { StyleSheet } from "react-native";

import Login from "../components/Login";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function AccontScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
});
