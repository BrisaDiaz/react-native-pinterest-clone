import {
  Modal,
  Pressable,
  ViewStyle,
  GestureResponderEvent,
  TouchableHighlight,
} from "react-native";
import { View } from "./Themed";
import Colors from "../constants/Colors";
import { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import IconButton from "./IconButton";
type Props = Modal["props"] & {
  background?: string;
  menuStyles?: ViewStyle;
  onOuterClick?: (event: GestureResponderEvent) => void;
  children?: ReactNode;
  closeButtonVisible?: boolean;
  closeButtonProps?: TouchableHighlight["props"];
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
  closeButtonVisible,
  closeButtonProps,
  ...modalProps
}: Props) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      presentationStyle="formSheet"
      {...modalProps}
    >
      <Pressable
        onPress={(e) => onOuterClick && onOuterClick(e)}
        style={{
          backgroundColor: background || "#00000066",
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
            },
            menuStyles,
          ]}
        >
          {closeButtonVisible && (
            <View style={{ padding: 5 }}>
              <CloseButton {...closeButtonProps} />
            </View>
          )}
          {children}
        </View>
      </Pressable>
    </Modal>
  );
}
