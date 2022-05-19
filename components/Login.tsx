import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Input from "./Input";
import { Text, View, ScrollView } from "./Themed";
import Button from "./Button";
import Link from "./Link";
import { GoogleButton, FacebookButton } from "./SocialButtons";
export default function EditScreenInfo({
  onGuestLogin,
}: {
  onGuestLogin: () => void;
}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <FontAwesome
          name="pinterest"
          color={Colors.primary}
          size={30}
          style={styles.icon}
        />
        <Text
          style={styles.title}
          lightColor={Colors.light.tint}
          darkColor={Colors.dark.tint}
        >
          Login to see more
        </Text>
        <View style={styles.form as ViewStyle}>
          <Input
            placeholder="Email or phone number"
            fullWidth={true}
            style={styles.mb6}
          />
          <Input placeholder="Password" fullWidth={true} style={styles.mb6} />

          <Button text="Login" fullWidth={true} style={styles.mb6} />

          <Text style={[styles.dividerText, styles.mb6]}>OR</Text>
          <Button
            text="Login as guest"
            fullWidth={true}
            backgroundColor={Colors.darkGray}
            style={styles.mb6}
            onPress={() => onGuestLogin()}
            Icon={
              <MaterialCommunityIcons
                name="incognito"
                size={22}
                color={Colors.dark.tint}
              />
            }
            iconPosition="left"
          />
          <FacebookButton style={styles.mb6} />
          <GoogleButton style={styles.mb6} />
        </View>
        <View style={styles.linksSection}>
          <TouchableOpacity>
            <Link text="Forgot your password?" />
          </TouchableOpacity>
          <Text>
            Are you a business? <Link text="Get started here" />
          </Text>
          <View style={styles.dividerLine} />
          <Text>
            Not on Pinterest yet? <Link text="Sing up" />
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  formContainer: {
    alignItems: "center",
    width: 250,
    marginBottom: 16,
    marginHorizontal: "auto",
  },
  mb6: {
    marginBottom: 6,
  },
  icon: {
    marginBottom: 8,
    marginTop: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
  },
  form: {
    width: "100%",
    marginTop: 20,

    display: "flex",
    flexDirection: "column",
  },
  dividerText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 11,
    margin: 4,
  },
  linksSection: {
    marginTop: 12,
    width: "100%",
    textAlign: "center",
  },
  dividerLine: {
    margin: 16,
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    width: 150,
    marginHorizontal: "auto",
  },
});
