import MenuModal, { Props } from "./MenuModal";
import { View, Text } from "./Themed";
import { TouchableHighlight } from "react-native";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import { ReactNode } from "react";
export type Action =
  | "share"
  | "store"
  | "send"
  | "download"
  | "hide"
  | "report";
export default function PinMenu(
  props: Props & { onOptionSelected: (action: Action) => void },
) {
  const theme = useColorScheme();
  const PIN_MENU_BUTTONS: {
    label: string;
    description?: string;
    actionName: Action;
    icon: ReactNode;
  }[] = [
    {
      label: `Share by Whatsapp`,

      icon: (
        <Ionicons size={16} color={Colors[theme].tint} name="logo-whatsapp" />
      ),
      actionName: "share",
    },
    {
      label: `Store`,

      icon: (
        <MaterialCommunityIcons
          size={16}
          color={Colors[theme].tint}
          name="pin"
        />
      ),
      actionName: "store",
    },
    {
      label: `Send`,

      icon: <Feather size={16} color={Colors[theme].tint} name="upload" />,
      actionName: "send",
    },
    {
      label: "Download image",

      icon: <Feather size={16} color={Colors[theme].tint} name="download" />,
      actionName: "download",
    },

    {
      label: "Hide",
      description: "Show less pins like this",

      icon: <Ionicons size={16} color={Colors[theme].tint} name="close" />,
      actionName: "hide",
    },
    {
      label: `Report`,
      description: "This violates the community guidelines",

      icon: (
        <Ionicons
          size={16}
          color={Colors[theme].tint}
          name="ios-warning-outline"
        />
      ),
      actionName: "report",
    },
  ];
  return (
    <MenuModal {...props}>
      <View
        style={{
          paddingHorizontal: "0.5rem",
          marginBottom: "1rem",
          marginTop: 6,
        }}
      >
        {PIN_MENU_BUTTONS.map((button) => (
          <TouchableHighlight
            key={button.label}
            underlayColor={Colors.lightGray}
            activeOpacity={1}
            style={{
              padding: 6,
              borderRadius: 3,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
            onPress={() => props.onOptionSelected(button.actionName)}
          >
            <>
              {button.icon}
              <View
                style={{
                  marginLeft: 6,
                  marginTop: button.description ? -2 : 0,
                  backgroundColor: "transparent",
                }}
              >
                <Text style={{ fontWeight: "600" }}>{button.label}</Text>
                {button.description && (
                  <Text style={{ fontSize: 12, opacity: 0.85 }}>
                    {button.description}
                  </Text>
                )}
              </View>
            </>
          </TouchableHighlight>
        ))}
      </View>
    </MenuModal>
  );
}
