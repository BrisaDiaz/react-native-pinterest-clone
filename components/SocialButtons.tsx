import Button, { ButtonProps } from "./Button";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
export function GoogleButton(props: ButtonProps) {
  return (
    <Button
      text="Continue with Google"
      fullWidth={true}
      backgroundColor="#5383EC"
      iconPosition="left"
      Icon={<AntDesign name="google" size={22} color={Colors.dark.tint} />}
      {...props}
    />
  );
}

export function FacebookButton(props: ButtonProps) {
  return (
    <Button
      text="Continue with Facebook"
      fullWidth={true}
      backgroundColor="#4A66AD"
      iconPosition="left"
      Icon={
        <AntDesign name="facebook-square" size={22} color={Colors.dark.tint} />
      }
      {...props}
    />
  );
}
