import {
  MaterialCommunityIcons,
  Feather,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Image,
  TouchableHighlight,
  Linking,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import { View, Text, ScrollView } from "../components/Themed";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import Link from "../components/Link";
import useColorScheme from "../hooks/useColorScheme";
import PinsMasonry from "../components/PinsMasonry";
import CheckButton from "../components/CheckButton";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ScreenParamList } from "../types";
import MenuModal from "../components/MenuModal";
import HeaderLayout from "../components/HeaderLayout";
import { useGetPinQuery, useLazyGetPinsByTagsQuery } from "../store/services";
import PinMasonrySkeleton from "../components/skeletons/PinMasonrySkeleton";
import PinDetailsSkeleton from "../components/skeletons/PinDetailsSkeleton";

import GoBackButton from "../components/GoBackButton";
export default function PinDetails({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<ScreenParamList, "Pin">;
  route: RouteProp<ScreenParamList, "Pin">;
}) {
  const [isPinMenuOpen, setIsPinMenuOpen] = React.useState(false);
  const [imageAspectRatio, setImageAspectRatio] = React.useState(1);
  const [isPinImageLoaded, setIsPinImageLoaded] = React.useState(false);

  const { data: pin, isLoading: isLoadingPin } = useGetPinQuery(
    route.params?.id || 0,
  );
  const [
    triggerGetSimilar,
    { data: similarPins, isLoading: isLoadingSimilar },
  ] = useLazyGetPinsByTagsQuery();
  const togglePinMenu = () => {
    setIsPinMenuOpen(!isPinMenuOpen);
  };
  const theme = useColorScheme();

  const PIN_MENU_BUTTONS = [
    { label: "Download image", onPress: () => console.log("") },

    {
      label: `See more of ${pin?.author?.user_name}`,
      onPress: () => console.log(""),
    },
    { label: "Hide pin", onPress: () => console.log("") },
    {
      label: `Report pin`,
      onPress: () => console.log(""),
    },
  ];
  React.useEffect(() => {
    if (pin) {
      setIsPinImageLoaded(false);

      Image.getSize(pin.pin, (width, height) => {
        setImageAspectRatio(width / height);
        setIsPinImageLoaded(true);
      });
      triggerGetSimilar({ tags: pin.tags, refererId: pin.id });
    }

    return () => {
      setImageAspectRatio(1);
    };
  }, [pin]);
  const handleGoToSource = React.useCallback(async () => {
    if (!pin?.source_link) return;

    const supported = await Linking.canOpenURL(pin?.source_link);

    if (supported) {
      await Linking.openURL(pin?.source_link);
    } else {
      Alert.alert(`The URL couldn't be open: ${pin?.source_link}`);
    }
  }, [pin?.source_link]);
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
            <GoBackButton
              onPress={() => navigation.goBack()}
              style={{ marginRight: 6 }}
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
        {(isLoadingPin || !isPinImageLoaded) && <PinDetailsSkeleton />}
        {pin && !isLoadingPin && isPinImageLoaded && (
          <>
            <View style={styles.pinInfo}>
              <Image
                resizeMode="cover"
                style={[styles.pin, { aspectRatio: imageAspectRatio }]}
                source={{
                  uri: pin?.pin,
                }}
              />
              <View style={styles.authorInfo}>
                {pin.author && (
                  <>
                    <Avatar source={pin?.author?.avatar} size="small" />

                    <Link text={pin?.author?.user_name} />
                  </>
                )}

                <CheckButton
                  checkedText="Unfollow"
                  uncheckedText="Follow"
                  style={styles.followButton}
                />
              </View>
              {pin?.title && (
                <Text style={styles.title} numberOfLines={2}>
                  {pin?.title}
                </Text>
              )}
              {pin?.description && (
                <Text style={styles?.description}>{pin?.description}</Text>
              )}
              {pin?.source_link && (
                <Button
                  text="Visit"
                  type="secondary"
                  fullWidth={true}
                  style={styles.visitButton}
                  onPress={() => handleGoToSource()}
                />
              )}
            </View>
          </>
        )}
        <Text style={styles.dividerText}>more like this</Text>
        {(isLoadingSimilar || !isPinImageLoaded) && (
          <PinMasonrySkeleton itemsNum={12} />
        )}
        {similarPins &&
          !isLoadingPin &&
          isPinImageLoaded &&
          !isLoadingSimilar && <PinsMasonry data={similarPins} />}
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
  visitButton: { marginTop: 4 },
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
