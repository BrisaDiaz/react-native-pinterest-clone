import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "../components/Themed";
import HeaderLayout from "../components/layout/HeaderLayout";
import GoBackButton from "../components/GoBackButton";
import Switch from "../components/Switch";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenParamList } from "../types";
import Button from "../components/Button";

import FloatingInput from "../components/FloatingInput";
export default function AccountScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ScreenParamList, "CreateBoard">;
}) {
  const [isPrivetBoard, setIsPrivetBoard] = React.useState(false);
  const [boardName, setBoardName] = React.useState("");
  const setPrivacy = (value: boolean) => {
    setIsPrivetBoard(value);
  };
  const handleBoardNameChange = (value: string) => {
    setBoardName(value.trim());
  };

  return (
    <HeaderLayout
      headerContent={
        <>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <GoBackButton onPress={() => navigation.goBack()} />
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              Create Board
            </Text>
            <Button
              rounded={true}
              text="Create"
              type={boardName.length > 0 ? "primary" : "secondary"}
            />
          </View>
        </>
      }
    >
      <View style={styles.container}>
        <FloatingInput
          label=" Name of the board"
          placeholder="Add"
          onChangeText={handleBoardNameChange}
        />

        <View style={styles.markPrivacySection}>
          <Text style={styles.privacyText}>Mark board as private</Text>
          <Switch
            onChange={(value) => setPrivacy(value)}
            style={{ marginLeft: "auto" }}
          />
        </View>
      </View>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingHorizontal: 14,
  },
  markPrivacySection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",

    paddingVertical: 14,
  },
  privacyText: { fontSize: 15 },
});
