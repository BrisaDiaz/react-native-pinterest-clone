import React from "react";
import { StyleSheet } from "react-native";
import { Text, ScrollView } from "../components/Themed";
import Button from "../components/Button";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import PinBoardsMasonry from "../components/PinBoardsMasonry";
import Tabs from "../components/Tabs";
import IconButton from "../components/IconButton";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { boards } from "../mocks";
import SearchBar from "../components/SearchBar";
import HeaderLayout from "../components/HeaderLayout";
export default function AccountScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  const user = {
    name: "visitant user",
    avatar: undefined,
    email: "visitantUser@gmail.com",
    followersCount: 32,
    followingCount: 225,
  };

  return (
    <HeaderLayout
      headerContent={
        <>
          <SearchBar
            onSearch={(search) => console.log(search)}
            onSubmitEditing={(search) => console.log(search)}
            onClear={() => console.log("")}
            value=""
            onChangeText={(currentValue) => console.log(currentValue)}
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
            <IconButton icon={<Entypo size={24} name="plus" />} />
            <IconButton
              icon={<Ionicons size={19} name="settings-sharp" />}
              style={{ paddingBottom: 0 }}
            />
          </View>
        </>
      }
    >
      <View style={styles.container}>
        <View style={styles.userData}>
          <View style={styles.userAvatar}>
            <Text style={styles.nameInitial}>{user.name[0]}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text>{user.email}</Text>

          <Text style={styles.followers}>
            {user.followersCount} Followers • Following to {user.followingCount}
          </Text>

          <Button
            text="Share"
            type="secondary"
            rounded={true}
            style={{ marginBottom: "1rem" }}
          />
        </View>
        <Tabs
          containerStyle={{
            marginVertical: "2rem",
          }}
          defaultKey="stored"
          tabButtonsContainerStyle={{
            width: "fit-content",
            marginHorizontal: "auto",
          }}
          tabs={[
            {
              label: "Created",
              key: "created",
              content: (
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    textAlign: "center",
                    marginVertical: "3rem",
                  }}
                >
                  No pin created yet
                </Text>
              ),
            },
            {
              label: "Stored",
              key: "stored",
              content: <PinBoardsMasonry data={boards} />,
            },
          ]}
        />
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
  userName: {
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
