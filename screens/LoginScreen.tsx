import { StyleSheet } from "react-native";
import React from "react";
import Login from "../components/Login";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HeaderLayout from "../components/HeaderLayout";
export default function AccountScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  const theme = useColorScheme();

  return (
    <HeaderLayout
      headerContent={
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
            paddingVertical: 0,
            paddingHorizontal: 16,
            marginLeft: -6,
          }}
        >
          <Button
            style={{ paddingLeft: 0, paddingVertical: 0 }}
            iconPosition="left"
            type="secondary"
            backgroundColor="transparent"
            onPress={() => navigation.goBack()}
            Icon={
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color={Colors[theme].tint}
              />
            }
          />
        </View>
      }
    >
      <View style={styles.container}>
        <Login />
      </View>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    alignItems: "center",
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
});
