import React from "react";
import { StyleSheet } from "react-native";
import { Text, ScrollView } from "../components/Themed";
import Button from "../components/Button";
import { View } from "../components/Themed";

import Colors from "../constants/Colors";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenParamList } from "../types";
import PinBoardsMasonry from "../components/PinBoardsMasonry";
import Tabs from "../components/Tabs";
import IconButton from "../components/IconButton";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { boards } from "../mocks";
import SearchBar from "../components/SearchBar";
import HeaderLayout from "../components/layout/HeaderLayout";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import { setSearchQuery } from "../store/slices/search";
import { useGetUserProfileQuery } from "../store/services";
import PinsMasonry from "../components/PinsMasonry";
import UserProfileSkeleton from "../components/skeletons/UserProfileSkeleton";
import PinBoardMasonrySkeleton from "../components/skeletons/PinBoardMasonrySkeleton";
import AddToProfileModal, { Action } from "../components/AddToProfileModal";
export default function AccountScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ScreenParamList, "Account">;
}) {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((store) => store.search);

  const handleSearchChange = (search: string) => {
    dispatch(setSearchQuery(search));
  };
  const handleSearchSubmit = () => {
    navigation.navigate("Search", {
      query: searchState.searchQuery,
    });
  };
  const handleAddToProfileActions = (actionType: Action) => {
toggleAddModal()
    if (actionType === "add board") return navigation.navigate("CreateBoard");
  };

  const { data, isLoading } = useGetUserProfileQuery();

  return (
    <HeaderLayout
      headerContent={
        <>
          <SearchBar
            onSearch={() => handleSearchSubmit()}
            onSubmitEditing={() => handleSearchSubmit()}
            onClear={() => handleSearchChange("")}
            value={searchState.searchQuery}
            onChangeText={(currentValue) => handleSearchChange(currentValue)}
            outlined={true}
            rounded={true}
            style={{ width: "100%", maxWidth: "70%" }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              icon={<Entypo size={24} name="plus" />}
              onPress={() => toggleAddModal()}
            />

            <IconButton
              icon={<Ionicons size={19} name="settings-sharp" />}
              style={{ paddingBottom: 0 }}
            />
          </View>
        </>
      }
    >
      <AddToProfileModal
        visible={isAddModalOpen}
        closeButtonProps={{ onPress: () => toggleAddModal() }}
        onSelectedAction={handleAddToProfileActions}
      />
      <View style={styles.container}>
        {isLoading && (
          <>
            <UserProfileSkeleton />
            <View style={{ marginTop: 42 }} />
            <PinBoardMasonrySkeleton />
          </>
        )}
        {!isLoading && data && (
          <>
            <View style={styles.userData}>
              <View style={styles.userAvatar}>
                <Text style={styles.nameInitial}>{data.full_name[0]}</Text>
              </View>
              <Text style={styles.user_name}>{data.full_name}</Text>
              <Text>{data.email}</Text>

              <Text style={styles.followers}>
                {data.followersCount} Followers • Following to{" "}
                {data.followingCount}
              </Text>

              <Button
                text="Share"
                type="secondary"
                rounded={true}
                style={{
                  marginBottom: 14,
                  marginHorizontal: "auto",
                  alignSelf: "center",
                }}
              />
            </View>
            <Tabs
              containerStyle={{
                marginVertical: 28,
              }}
              defaultKey="stored"
              tabButtonsContainerStyle={{
                justifyContent: "center",
              }}
              tabs={[
                {
                  label: "Created",
                  key: "created",
                  content: data.created_pins.length ? (
                    <PinsMasonry data={data.created_pins} />
                  ) : (
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 16,
                        textAlign: "center",
                        marginVertical: 42,
                      }}
                    >
                      No pin created yet
                    </Text>
                  ),
                },
                {
                  label: "Stored",
                  key: "stored",
                  content: data.pin_boards.length ? (
                    <PinBoardsMasonry data={boards} />
                  ) : (
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 16,
                        textAlign: "center",
                        marginVertical: 42,
                      }}
                    >
                      No pin stored yet
                    </Text>
                  ),
                },
              ]}
            />
          </>
        )}
      </View>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 6,
    paddingBottom: 20,
  },
  userData: { alignItems: "center" },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  nameInitial: {
    textTransform: "uppercase",
    fontSize: 40,
    fontWeight: "700",
  },
  user_name: {
    fontWeight: "700",
    fontSize: 25,
    textTransform: "capitalize",
    marginVertical: 6,
  },
  followers: {
    fontWeight: "600",
    marginVertical: 12,
  },
});
