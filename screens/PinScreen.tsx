import {
  MaterialCommunityIcons,
  Feather,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Image, TouchableHighlight, Share } from "react-native";
import Colors from "../constants/Colors";
import { View, Text, ScrollView } from "../components/Themed";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import Link from "../components/Link";
import useColorScheme from "../hooks/useColorScheme";
import PinsMasonry from "../components/PinsMasonry";
import CheckButton from "../components/CheckButton";
import { NavigationProp } from "@react-navigation/native";
import MenuModal from "../components/MenuModal";
import HeaderLayout from "../components/HeaderLayout";
import { relatedPins as otherPins, pin as data } from "../mocks";
export default function PinDetails({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [pin, setPin] = React.useState(data);
  const [relatedPins, setRelatedPins] = React.useState(otherPins);
  const [isPinMenuOpen, setIsPinMenuOpen] = React.useState(false);
  const togglePinMenu = () => {
    setIsPinMenuOpen(!isPinMenuOpen);
  };
  const theme = useColorScheme();

  const PIN_MENU_BUTTONS = [
    { label: "Download image", onPress: () => console.log("") },

    {
      label: `See more of ${pin.author.user_name}`,
      onPress: () => console.log(""),
    },
    { label: "Hide pin", onPress: () => console.log("") },
    {
      label: `Report pin`,
      onPress: () => console.log(""),
    },
  ];

  return (
    <HeaderLayout
      headerContent={
        <>
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",
              paddingVertical: 0,
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

            <Button
              style={{ paddingLeft: 0, paddingVertical: 0 }}
              iconPosition="left"
              type="secondary"
              backgroundColor="transparent"
              Icon={
                <Entypo
                  name="paper-plane"
                  size={20}
                  color={Colors[theme].tint}
                />
              }
            />
            <Button
              style={{ paddingLeft: 0, paddingVertical: 0 }}
              iconPosition="left"
              type="secondary"
              backgroundColor="transparent"
              onPress={togglePinMenu}
              Icon={
                <Feather
                  name="more-horizontal"
                  size={20}
                  color={Colors[theme].tint}
                />
              }
            />
          </View>
          <Button
            style={{ marginVertical: 0, marginRight: 6 }}
            text="Save"
            iconPosition="left"
            Icon={
              <MaterialCommunityIcons
                name="pin"
                size={16}
                color={Colors.dark.tint}
              />
            }
          />
        </>
      }
    >
      <View style={styles.container}>
        <View style={styles.pinInfo}>
          <Image
            resizeMode="contain"
            style={styles.pin}
            source={{
              uri: "https://i.pinimg.com/564x/6d/02/ff/6d02fffca6b7ce15fcaed132a3728e79.jpg",
            }}
          />
          <View style={styles.authorInfo}>
            <Avatar source={pin.author.avatar} size="small" />

            <Link text={pin.author.user_name} />

            <CheckButton
              checkedText="Unfollow"
              uncheckedText="Follow"
              style={styles.followButton}
            />
          </View>
          {pin.title && (
            <Text style={styles.title} numberOfLines={2}>
              {pin.title}
            </Text>
          )}
          {pin.description && (
            <Text style={styles.description}>{pin.description}</Text>
          )}
          {pin?.sourceLink && (
            <Button text="Visit" type="secondary" fullWidth={true} />
          )}
        </View>
        <Text style={styles.dividerText}>more like this</Text>

        <PinsMasonry data={relatedPins} />
        <MenuModal
          visible={isPinMenuOpen}
          closeButtonVisible={true}
          closeButtonProps={{ onPress: togglePinMenu }}
        >
          <View style={{ paddingHorizontal: "0.6rem", paddingBottom: "1rem" }}>
            {PIN_MENU_BUTTONS.map((button) => (
              <TouchableHighlight
                key={button.label}
                underlayColor={Colors.lightGray}
                activeOpacity={1}
                style={{
                  padding: 6,
                  borderRadius: 3,
                }}
                onPress={() => button.onPress()}
              >
                <Text style={{ fontWeight: "600" }}>{button.label}</Text>
              </TouchableHighlight>
            ))}
          </View>
        </MenuModal>
      </View>
    </HeaderLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    paddingBottom: 20,
    paddingTop: 55,
  },
  pinInfo: { paddingHorizontal: 10 },
  pin: {
    width: "100%",
    resizeMode: "contain",
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 4,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginVertical: 6,
  },
  followButton: {
    marginLeft: "auto",
  },
  description: {
    textAlign: "center",
    marginVertical: 8,
  },
  dividerText: {
    fontWeight: "700",
    margin: 6,
    marginTop: 16,
    textAlign: "center",
  },
});
