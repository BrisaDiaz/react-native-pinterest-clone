import {
  Modal,
  Pressable,
  ViewStyle,
  GestureResponderEvent,
  TouchableHighlight,
} from "react-native";
import { View, Text } from "./Themed";
import Colors from "../constants/Colors";
import { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import IconButton from "./IconButton";
export type Props = Modal["props"] & {
  background?: string;
  menuStyles?: ViewStyle;
  onOuterClick?: (event: GestureResponderEvent) => void;
  children?: ReactNode;
  closeButtonVisible?: boolean;
  closeButtonProps?: TouchableHighlight["props"];
  title?: string;
};
function CloseButton(props: TouchableHighlight["props"]) {
  const theme = useColorScheme();
  return (
    <IconButton
      {...props}
      icon={<Ionicons name="close" size={20} color={Colors[theme].tint} />}
    />
  );
}
export default function MenuModal({
  background,
  menuStyles,
  onOuterClick,
  children,
  title,
  closeButtonVisible,
  closeButtonProps,
  ...modalProps
}: Props) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      presentationStyle="formSheet"
      {...modalProps}
    >
      <Pressable
        onPress={(e) => onOuterClick && onOuterClick(e)}
        style={{
          backgroundColor: background || "transparent",
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={[
            {
              width: "100%",
              height: "max-content",
              position: "absolute",
              bottom: 0,
              borderTopColor: Colors.lightGray,
              borderTopWidth: 1,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              minHeight: "20%",
              overflow: "hidden",
              shadowColor: "#171717",
              shadowOffset: { width: -1, height: -1 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              borderWidth: 0,
            },
            menuStyles,
          ]}
        >
          {closeButtonVisible && (
            <View
              style={{ padding: 5, flexDirection: "row", alignItems: "center" }}
            >
              <CloseButton {...closeButtonProps} />
              {title && (
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                    textTransform: "capitalize",
                    fontWeight: "700",
                    marginLeft: -30,
                    letterSpacing: 0.5,
                    fontSize: 13,
                  }}
                >
                  {title}
                </Text>
              )}
            </View>
          )}
          {children}
        </View>
      </Pressable>
    </Modal>
  );
}
