import { StyleSheet } from "react-native";
import React from "react";
import Login from "../components/Login";
import { View } from "../components/Themed";
import { NavigationProp } from "@react-navigation/native";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HeaderLayout from "../components/HeaderLayout";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { setGuestUser } from "../store/slices/auth";
export default function AccountScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const theme = useColorScheme();
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
        <Login onGuestLogin={() => handleGuestLogin()} />
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
