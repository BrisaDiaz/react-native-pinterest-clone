import {
  MaterialCommunityIcons,
  Feather,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

import { StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import { View, Text, ScrollView } from "../components/Themed";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import Link from "../components/Link";
import useColorScheme from "../hooks/useColorScheme";
import PinsMasonry from "../components/PinsMasonry";
import CheckButton from "../components/CheckButton";
import { NavigationProp } from "@react-navigation/native";

export default function PinDetails({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const theme = useColorScheme();
  const data = {
    title:
      "Los ‘scrunchies’ gigantes son la tendencia que arrasa esta primavera",
    description:
      "El accesorio de tu infancia está de vuelta pero ahora en tamaño XL, ¡ajá! Nos referimos a los scrunchies, coleteros o donas, que fueron los protagonistas de los peinados en los 90, y nos alegramos que hayan regresado para llenar de estilo esta primavera 2020. Con un accesorio así no necesitas p ",
    pin: "",
    author: {
      avatar:
        "https://i.pinimg.com/280x280_RS/5e/99/a1/5e99a11e4b338cb8a5bc4fd0f163f79e.jpg",
      userName: "OkChicas",
    },
  };
  const relatedPins = [
    {
      id: 1,
      pin: "https://i.pinimg.com/564x/d4/84/1c/d4841cde566d555cdb80628877ff1647.jpg",
      title: "19 Hairstyles for you to wear your buns",
      tags: [""],
      collection: "",
      author: {
        userName: "",
        accountName: "",
        avatar: "",
      },
    },
    {
      id: 2,
      pin: "https://i.pinimg.com/236x/d9/3d/c6/d93dc615a57d9ece0664c7e9ab6599d4.jpg",
      title:
        "Pearls in the hair, the trend that will make you look more elegant",
      tags: [""],
      collection: "",
      author: {
        userName: "",
        accountName: "",
        avatar: "",
      },
    },
    {
      id: 3,
      pin: "https://i.pinimg.com/236x/c9/30/6b/c9306be2ff456e2e1a2e8ed78e8fb435.jpg",
      title: "16 Cutest Back-to-School Hairstyle Ideas for Girls",
      tags: [""],
      collection: "",
      author: {
        userName: "",
        accountName: "",
        avatar: "",
      },
    },
    {
      id: 4,
      pin: "https://i.pinimg.com/236x/8b/42/4e/8b424eff71af2785f02fa9815e7df0e9.jpg",
      title: "Mother Of The Bride Hairstyles: Elegant Ideas [2022 Guide]",
      tags: [""],
      collection: "",
      author: {
        userName: "",
        accountName: "",
        avatar: "",
      },
    },
  ];
  navigation.setOptions({
    headerLeft: () => (
      <>
        <Button
          style={{ paddingHorizontal: 0, paddingVertical: 0 }}
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
          style={{ paddingHorizontal: 0, paddingVertical: 0 }}
          iconPosition="left"
          type="secondary"
          backgroundColor="transparent"
          Icon={
            <Entypo name="paper-plane" size={20} color={Colors[theme].tint} />
          }
        />
        <Button
          style={{ paddingHorizontal: 0, paddingVertical: 0 }}
          iconPosition="left"
          type="secondary"
          backgroundColor="transparent"
          Icon={
            <Feather
              name="more-horizontal"
              size={20}
              color={Colors[theme].tint}
            />
          }
        />
      </>
    ),
    headerRightContainerStyle: {
      paddingVertical: 0,
      paddingHorizontal: 16,
    },

    headerLeftContainerStyle: {
      flexDirection: "row",
      gap: 16,
      alignItems: "center",
      paddingVertical: 0,
      paddingHorizontal: 16,
      marginLeft: -6,
    },

    headerRight: () => (
      <Button
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
    ),
  });
  return (
    <ScrollView style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.pin}
        source={{
          uri: "https://i.pinimg.com/564x/6d/02/ff/6d02fffca6b7ce15fcaed132a3728e79.jpg",
        }}
      />
      <View style={styles.authorInfo}>
        <Avatar source={data.author.avatar} size="small" />

        <Link text={data.author.userName} />
        <CheckButton
          checkedText="Unfollow"
          uncheckedText="Follow"
          style={styles.followButton}
        />
      </View>
      {data.title && (
        <Text style={styles.title} numberOfLines={2}>
          {data.title}
        </Text>
      )}
      {data.description && (
        <Text style={styles.description}>{data.description}</Text>
      )}
      <Button text="Visit" type="secondary" fullWidth={true} />
      <Text style={styles.dividerText}>more like this</Text>

      <PinsMasonry pins={relatedPins} columns={2} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },

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
