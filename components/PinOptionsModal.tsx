import MenuModal, { Props } from "./MenuModal";
import { View, Text } from "./Themed";
import { TouchableHighlight } from "react-native";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import { ReactNode } from "react";
export type Action =
  | "share by whatsapp"
  | "store"
  | "send"
  | "download"
  | "hide"
  | "report";
export default function PinOptionsModal(
  props: Props & { onSelectedAction?: (action: Action) => void },
) {
  const theme = useColorScheme();
  const PIN_MENU_BUTTONS: {
    label: string;
    description?: string;
    type: Action;
    icon: ReactNode;
  }[] = [
    {
      label: `Share by Whatsapp`,

      icon: (
        <Ionicons size={16} color={Colors[theme].tint} name="logo-whatsapp" />
      ),
      type: "share by whatsapp",
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
      type: "store",
    },
    {
      label: `Send`,

      icon: <Feather size={16} color={Colors[theme].tint} name="upload" />,
      type: "send",
    },
    {
      label: "Download image",

      icon: <Feather size={16} color={Colors[theme].tint} name="download" />,
      type: "download",
    },

    {
      label: "Hide",
      description: "Show less pins like this",

      icon: <Ionicons size={16} color={Colors[theme].tint} name="close" />,
      type: "hide",
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
      type: "report",
    },
  ];
  return (
    <MenuModal closeButtonVisible={true} title="options" {...props}>
      <View
        style={{
          paddingHorizontal: 7,
          marginBottom: 14,
          marginTop: 6,
        }}
      >
        {PIN_MENU_BUTTONS.map((action) => (
          <TouchableHighlight
            key={action.label}
            underlayColor={Colors.lightGray}
            activeOpacity={1}
            style={{
              padding: 6,
              borderRadius: 3,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
            onPress={() =>
              props.onSelectedAction && props.onSelectedAction(action.type)
            }
          >
            <>
              {action.icon}
              <View
                style={{
                  marginLeft: 6,
                  marginTop: action.description ? -2 : 0,
                  backgroundColor: "transparent",
                }}
              >
                <Text style={{ fontWeight: "700" }}>{action.label}</Text>
                {action.description && (
                  <Text style={{ fontSize: 12, opacity: 0.85 }}>
                    {action.description}
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
