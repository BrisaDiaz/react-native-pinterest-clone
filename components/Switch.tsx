import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import React from "react";

import { StyleSheet, Pressable, ViewStyle } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
export default function Switch({
  borderColor,
  thrumBackground,
  switchBackground,
  checkedSwitchBackground,
  onChange,
  defaultValue,
  disabled,
  style,
}: {
  borderColor?: string;
  thrumBackground?: string;
  switchBackground?: string;
  checkedSwitchBackground?: string;
  onChange?: (value: boolean) => void;
  defaultValue?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  const [isChecked, setIsChecked] = React.useState(defaultValue || false);
  const theme = useColorScheme();
  const selectedBorderColor = borderColor || Colors[theme].tint;
  const selectedThrumBackground = thrumBackground || Colors[theme].background;
  const selectedSwitchBackground = switchBackground || Colors[theme].background;
  const selectedCheckedSwitchBackground =
    checkedSwitchBackground || thrumBackground || Colors[theme].tint;
  const thrumStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(isChecked ? 20 : 0) }],
    };
  }, [isChecked]);
  const switchStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isChecked ? selectedCheckedSwitchBackground : selectedSwitchBackground,
      ),
    };
  }, [isChecked]);
  const toggleSwitch = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };

  return (
    <Animated.View
      style={[
        styles.switch,
        { borderColor: selectedBorderColor, opacity: disabled ? 0.8 : 1 },
        switchStyle,
        style,
      ]}
    >
      <Pressable onPress={() => toggleSwitch()}>
        <Animated.View
          style={[
            styles.thrum,
            {
              borderColor: selectedBorderColor,
              backgroundColor: selectedThrumBackground,
            },
            thrumStyle,
          ]}
        />
      </Pressable>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  thrum: {
    borderRadius: 100,
    borderWidth: 1,
    width: 20,
    aspectRatio: 1,
  },
  switch: {
    width: 40,
    borderRadius: 100,
    borderWidth: 1,
  },
});
