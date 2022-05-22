import { StyleSheet, Switch } from "react-native";
import React from "react";
import { Text, View } from "../components/Themed";
import HeaderLayout from "../components/HeaderLayout";
import GoBackButton from "../components/GoBackButton";
import { NavigationProp } from "@react-navigation/native";
import Button from "../components/Button";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import FloatingInput from "../components/FloatingInput";
export default function AccountScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [isPrivetBoard, setIsPrivetBoard] = React.useState(false);

  const togglePrivacySwitch = () => {
    setIsPrivetBoard(!isPrivetBoard);
  };
  const theme = useColorScheme();
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
            <Button rounded={true} text="Create" disabled={true} />
          </View>
        </>
      }
    >
      <View style={styles.container}>
        <FloatingInput label=" Name of the board" placeholder="Add" />

        <View style={styles.markPrivacySection}>
          <Text style={styles.privacyText}>Mark board as private</Text>
          <Switch
            onTouchStart={() => togglePrivacySwitch()}
            value={isPrivetBoard}
          />
        </View>
      </View>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "4rem",
    paddingHorizontal: "1rem",
  },
  markPrivacySection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "400px",
    paddingVertical: "1rem",
  },
  privacyText: { fontSize: 15 },
});
