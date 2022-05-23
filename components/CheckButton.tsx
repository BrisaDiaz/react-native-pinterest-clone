import Button from "./Button";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { useState } from "react";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
type CheckButtonProps = {
  checkedText?: string;
  uncheckedText: string;
  defaultChecked?: boolean;
  onChangeState?: (checked: boolean) => void;
  onPress?: (event: GestureResponderEvent) => void;
} & TouchableOpacity["props"];

export default function CheckButton({
  style,
  checkedText,
  uncheckedText,
  defaultChecked,
  onChangeState,
  onPress,
  disabled,
  ...others
}: CheckButtonProps) {
  const [checked, setChecked] = useState(defaultChecked || false);

  const theme = useColorScheme();
  const FollowButtonStyle = {
    dark: {
      color: checked ? Colors.light.tint : Colors.dark.tint,
      backgroundColor: checked ? "#fff" : Colors.primary,
      text: checked ? checkedText || uncheckedText : uncheckedText,
    },
    light: {
      color: checked ? Colors.dark.tint : Colors.dark.tint,
      backgroundColor: checked ? "#000" : Colors.primary,
      text: checked ? checkedText || uncheckedText : uncheckedText,
    },
  };
  const toggleFollow = (event: GestureResponderEvent) => {
    if (disabled) return;
    setChecked(!checked);

    onChangeState && onChangeState(!checked);
    onPress && onPress(event);
  };
  return (
    <Button
      type="secondary"
      rounded={true}
      style={[style]}
      disabled={disabled}
      text={FollowButtonStyle[theme].text}
      color={FollowButtonStyle[theme].color}
      backgroundColor={FollowButtonStyle[theme].backgroundColor}
      onPress={toggleFollow}
      {...others}
    />
  );
}
