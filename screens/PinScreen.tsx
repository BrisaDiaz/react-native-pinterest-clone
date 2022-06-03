import { MaterialCommunityIcons, Feather, Entypo } from "@expo/vector-icons";
import React from "react";


import { StyleSheet, Image, Linking, Alert, Platform } from "react-native";
import Colors from "../constants/Colors";
import { View, Text } from "../components/Themed";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import Link from "../components/Link";
import useColorScheme from "../hooks/useColorScheme";
import PinsMasonry from "../components/PinsMasonry";
import CheckButton from "../components/CheckButton";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ScreenParamList } from "../types";
import HeaderLayout from "../components/layout/HeaderLayout";
import { useGetPinQuery, useLazyGetPinsByTagsQuery } from "../store/services";
import PinMasonrySkeleton from "../components/skeletons/PinMasonrySkeleton";
import PinDetailsSkeleton from "../components/skeletons/PinDetailsSkeleton";
import ModalsLayout from "../components/layout/ModalsLayout";
import GoBackButton from "../components/GoBackButton";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { openModal, setStashedPin } from "../store/slices/modals";

import useFileManager from "../hooks/useFileManager";
export default function PinDetails({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<ScreenParamList, "Pin">;
  route: RouteProp<ScreenParamList, "Pin">;
}) {
  const [isPinOptionsModalOpen, setIsPinOptionsModalOpen] =
    React.useState(false);
  const [imageAspectRatio, setImageAspectRatio] = React.useState(1);
  const [isPinImageLoaded, setIsPinImageLoaded] = React.useState(false);

  const { data: pin, isLoading: isLoadingPin } = useGetPinQuery(
    route.params?.id || 0,
  );
  const [
    triggerGetSimilar,
    { data: similarPins, isLoading: isLoadingSimilar },
  ] = useLazyGetPinsByTagsQuery();
  const openPinOptionsModal = () => {
    dispatch(openModal("partialPinOptions"));
  };

  const dispatch = useAppDispatch();
  const authState = useAppSelector((store) => store.auth);
  const handleStorePin = () => {
    if (!pin) return;
    if (!authState.user) return navigation.navigate("Login");
    dispatch(setStashedPin(pin));
    dispatch(openModal("pinStorage"));
  };
  const theme = useColorScheme();

  React.useEffect(() => {
    if (pin) {
      setIsPinImageLoaded(false);

      Image.getSize(pin.image, (width, height) => {
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
  const { share, save } = useFileManager();
  const onShare = async () => {
    if (!pin) return;

    try {
      await share(pin.image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalsLayout>
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
                onPress={() => onShare()}
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
                onPress={openPinOptionsModal}
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
              onPress={() => handleStorePin()}
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
                  style={[styles.image, { aspectRatio: imageAspectRatio }]}
                  source={{
                    uri: pin?.image,
                  }}
                />
                <View style={styles.authorInfo}>
                  {pin.author && (
                    <>
                      <Avatar source={pin?.author?.avatar} size="small" />

                      <Link
                        text={pin?.author?.user_name}
                        style={styles.userName}
                      />
                    </>
                  )}

                  <CheckButton
                    checkedText="Unfollow"
                    uncheckedText="Follow"
                    style={styles.followButton}
                    disabled={authState.user ? true : false}
                  />
                </View>
                {pin?.title && (
                  <Text style={styles.title} numberOfLines={2}>
                    {pin?.title}
                  </Text>
                )}
                {pin?.description && (
                  <Text style={styles?.description} numberOfLines={3}>
                    {pin?.description}
                  </Text>
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
        </View>
      </HeaderLayout>
    </ModalsLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    paddingBottom: 24,
    paddingTop: 55,
    ...Platform.select({
      android: {
        paddingTop: 85,
        paddingBottom: 24,
      },
    }),
  },
  pinInfo: { paddingHorizontal: 10 },
  image: {
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

    marginVertical: 6,
  },
  userName: { marginLeft: 6 },
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
