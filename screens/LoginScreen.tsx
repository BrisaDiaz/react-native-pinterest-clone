import { StyleSheet } from "react-native";
import React from "react";
import Login from "../components/Login";
import { View } from "../components/Themed";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenParamList } from "../types";

import HeaderLayout from "../components/layout/HeaderLayout";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { setGuestUser } from "../store/slices/auth";
import GoBackButton from "../components/GoBackButton";

export default function AccountScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ScreenParamList, "Login">;
}) {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((store) => store.auth);
  const handleGuestLogin = () => {
    dispatch(setGuestUser());
  };
  React.useEffect(() => {
    if (authState.user) return navigation.navigate("Account");
  }, [authState]);

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
          <GoBackButton onPress={() => navigation.goBack()} />
        </View>
      }
    >
      <View style={styles.container}>
        <Login onGuestLogin={() => handleGuestLogin()} />
      </View>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
    flex: 1,

    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
