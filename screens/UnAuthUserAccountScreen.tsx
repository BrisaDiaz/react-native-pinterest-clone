import { StyleSheet } from "react-native";
import { Text } from "../components/Themed";
import Button from "../components/Button";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
export default function AccontScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  const theme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "700" }}>
        Your profile awaits you
      </Text>
      <Text style={{ textAlign: "center", width: 250, marginVertical: 12 }}>
        Save, organize and revisit your favorite ideas by creating a free
        account
      </Text>
      <View style={{ marginVertical: 6 }}>
        <View
          style={{
            width: 180,
            height: 110,
            borderRadius: 12,
            backgroundColor: "#efefef",
            justifyContent: "center",
            flexDirection: "row",
            position: "relative",
          }}
        >
          <View
            style={{
              height: 110,
              width: 2,
              backgroundColor: Colors[theme].background,
            }}
          />
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            backgroundColor: "#efefef",
            borderWidth: 2,
            borderColor: Colors[theme].background,
            marginHorizontal: "auto",
            alignContent: "center",
            justifyContent: "center",
            marginTop: -25,
          }}
        >
          <FontAwesome
            color={Colors.darkGray}
            size={25}
            name="user"
            style={{ marginHorizontal: "auto" }}
          />
        </View>
        <Text
          style={{ fontWeight: "700", textAlign: "center", marginVertical: 6 }}
        >
          Your Profile
        </Text>
      </View>
      <Button
        text="Start"
        rounded={true}
        style={{ marginHorizontal: "auto", marginVertical: 16 }}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});
