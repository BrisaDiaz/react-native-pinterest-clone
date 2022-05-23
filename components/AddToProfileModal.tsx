import MenuModal, { Props } from "./MenuModal";
import { StyleSheet, TouchableHighlight } from "react-native";
import { View, Text } from "./Themed";
import Colors from "../constants/Colors";
export type Action = "crete photo" | "add board";
export default function AddToProfileModal({
  onSelectedAction,
  ...props
}: Props & { onSelectedAction?: (actionType: Action) => void }) {
  const OPTIONS = [
    {
      title: "create",
      actions: [
        {
          label: "Photo",
          onPress: () => onSelectedAction && onSelectedAction("crete photo"),
        },
      ],
    },
    {
      title: "Add",
      actions: [
        {
          label: "Board",
          onPress: () => onSelectedAction && onSelectedAction("add board"),
        },
      ],
    },
  ];
  return (
    <MenuModal closeButtonVisible={true} title="Add to profile" {...props}>
      <View style={styles.container}>
        {OPTIONS.map((option) => (
          <View key={option.title}>
            <Text style={styles.sectionTitle}>{option.title}</Text>
            {option.actions.map((action) => (
              <TouchableHighlight
                key={action.label}
                underlayColor={Colors.lightGray}
                activeOpacity={1}
                style={{
                  padding: 6,
                  borderRadius: 3,
                }}
                onPress={() => action.onPress()}
              >
                <Text style={{ fontWeight: "700" }}>{action.label}</Text>
              </TouchableHighlight>
            ))}
          </View>
        ))}
      </View>
    </MenuModal>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "0.5rem",
    marginBottom: "1rem",
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 12,
  },
});
