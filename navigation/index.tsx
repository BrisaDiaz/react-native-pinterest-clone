/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Platform } from "react-native";

import Colors from "../constants/Colors";

import useColorScheme from "../hooks/useColorScheme";
import CreateBoardScreen from "../screens/CreateBoardScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import UnAuthUserAccountScreen from "../screens/UnAuthUserAccountScreen";
import AuthUserAccountScreen from "../screens/AuthUserAccountScreen";
import LoginScreen from "../screens/LoginScreen";
import SearchScreen from "../screens/SearchScreen";
import PinScreen from "../screens/PinScreen";
import CreatePinScreen from "../screens/CreatePinScreen";

import Home from "../screens/Home";
import ModalsLayout from "../components/layout/ModalsLayout";
import { useAppSelector } from "../hooks/useStore";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const theme = useColorScheme();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: Colors[theme].background,
          borderBottomColor: "transparent ",
          borderWith: "0px ",
        },
      })}
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pin"
        component={PinScreen}
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="CreateBoard"
        component={CreateBoardScreen}
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="CreatePin"
        component={CreatePinScreen}
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const authSession = useAppSelector((store) => store.auth);

  return (
    <>
      <ModalsLayout />
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={() => {
          return {
            tabBarActiveTintColor: Colors.primary,
            tabBarStyle: {
              flexDirection: "row",
              zIndex: 200,
              borderColor: "transparent",

              width: "100%",

              ...Platform.select({
                android: {
                  position: "relative",
                  margin: 0,
                },
                default: {
                  position: "absolute",
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  borderWidth: 0,
                  borderRadius: 30,
                  alignSelf: "center",
                  maxWidth: 180,

                  marginVertical: 14,
                  marginHorizontal: "auto",
                },
              }),
            },
          };
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={({ navigation }: RootTabScreenProps<"Home">) => ({
            headerTitleStyle: { display: "none" },
            tabBarIconStyle: { width: 40, marginHorizontal: 5 },
            tabBarShowLabel: false,
            headerShown: false,

            tabBarIcon: ({ color }) => (
              <TabBarIcon name="pinterest" color={color} />
            ),
          })}
        />

        <BottomTab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: "Search",
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIconStyle: { width: 40, marginHorizontal: 5 },
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="search" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Account"
          component={
            authSession.user ? AuthUserAccountScreen : UnAuthUserAccountScreen
          }
          options={{
            headerShown: false,
            title: "Account",
            headerTitleStyle: { display: "none" },
            tabBarShowLabel: false,
            tabBarIconStyle: { width: 40, marginHorizontal: 5 },
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={22} style={{}} {...props} />;
}
