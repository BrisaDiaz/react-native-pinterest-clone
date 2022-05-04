import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Input from "./Input";
import { Text, View } from "./Themed";
import Button from "./Button";
import Link from "./Link";
import { GoogleButton, FacebookButton } from "./SocialButtons";
export default function EditScreenInfo() {
  return (
    <View style={styles.container}>
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
      <View style={styles.form}>
        <Input placeholder="Email or phone number" fullWidth={true} />
        <Input placeholder="Password" fullWidth={true} />

        <Button text="Login" fullWidth={true} />
        <Text style={styles.dividerText}>OR</Text>
        <FacebookButton />
        <GoogleButton />
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
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", width: 250 },
  icon: {
    marginBottom: 8,
    marginTop: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 25,
  },
  form: {
    width: "100%",
    marginTop: 20,

    display: "flex",
    flexDirection: "column",
    gap: 6,
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
