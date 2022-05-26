import { FlatList } from "../Themed";
import { ViewStyle } from "react-native";
import Board from "../PinBoard";
 import "react-native-get-random-values";
 import { v4 as uuid } from "uuid";
import Layout from "../../constants/Layout";
import PinBoardSkeleton from "./PinBoardSkeleton";
export default function PinsBoardMasonrySkeleton({
  columns,
}: {
  columns?: number;
}) {
  const BOAR_MAX_W = 200;
  const GAP = 6;
  const COLUMNS_NUM =
    Layout.window.width > 400
      ? Math.floor(Layout.window.width / BOAR_MAX_W)
      : 2;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        width: "100%",
        marginLeft: -GAP,
      }}
      columnWrapperStyle={
        {
          width: "100%",
          marginRight: -GAP,
         
        } as ViewStyle
      }
      numColumns={COLUMNS_NUM}
      data={new Array(6).fill(1)}
      keyExtractor={() => uuid()}
      renderItem={({ item }) => (
        <PinBoardSkeleton
          style={{
            maxWidth: `${100 / COLUMNS_NUM}%`,
            marginBottom: 4,
            marginLeft: GAP,
          }}
        />
      )}
    />
  );
}
