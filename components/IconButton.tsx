import { ReactNode } from "react";
import { TouchableHighlight } from "react-native";
import Colors from "../constants/Colors";
type Props = TouchableHighlight["props"] & {
  icon: ReactNode;
};
export default function IconButton({ icon, ...props }: Props) {
  return (
    <TouchableHighlight
      activeOpacity={1}
      style={[
        {
          borderRadius: 50,
          width: "min-content",
          paddingVertical: 5,
          paddingHorizontal: 7,
        },
        props.style,
      ]}
      underlayColor={Colors.lightGray}
      {...props}
    >
      {icon}
    </TouchableHighlight>
  );
}
