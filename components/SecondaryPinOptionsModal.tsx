import { TouchableHighlight } from "react-native";
import Colors from "../constants/Colors";

import MenuModal, { Props } from "./MenuModal";
import { View, Text } from "./Themed";
export type Action = "download" | "hide" | "report";
export default function SecondaryPinOptionsModal({
  onSelectedAction,
  ...props
}: Props & { onSelectedAction?: (actionType: Action) => void }) {
  const PIN_MENU_ACTIONS = [
    {
      label: "Download image",
      type: "download",
    },

    { label: "Hide pin", type: "hide" },
    {
      label: `Report pin`,
      type: "report",
    },
  ];
  return (
    <MenuModal title="options" {...props}>
      <View style={{ paddingHorizontal: 8.5, paddingBottom: 14 }}>
        {PIN_MENU_ACTIONS.map((action) => (
          <TouchableHighlight
            key={action.label}
            underlayColor={Colors.lightGray}
            activeOpacity={1}
            style={{
              padding: 6,
              borderRadius: 3,
            }}
            onPress={() =>
              onSelectedAction && onSelectedAction(action.type as Action)
            }
          >
            <Text style={{ fontWeight: "700" }}>{action.label}</Text>
          </TouchableHighlight>
        ))}
      </View>
    </MenuModal>
  );
}
