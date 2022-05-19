import { FlatList } from "../Themed";
import { ViewStyle } from "react-native";
import Board from "../PinBoard";
import { v4 as uuid } from "uuid";
import Layout from "../../constants/Layout";
import PinBoardSkeleton from "./PinBoardSkeleton";
export default function PinsBoardMasonrySkeleton({
  columns,
}: {
  columns?: number;
}) {
  const defaultBoardsMaxWidth = 200;
  const defaultColumnsNum =
    Layout.window.width > 400
      ? Math.floor(Layout.window.width / defaultBoardsMaxWidth)
      : 2;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        width: "100%",
      }}
      columnWrapperStyle={
        {
          width: "100%",
          gap: 6,
          paddingRight: 6,
          justifyContent: "flex-start",
        } as ViewStyle
      }
      numColumns={columns || defaultColumnsNum}
      data={new Array(6).fill(1)}
      keyExtractor={() => uuid()}
      renderItem={({ item }) => (
        <PinBoardSkeleton
          style={{
            maxWidth: `${columns ? 100 / columns : 100 / defaultColumnsNum}%`,
            marginBottom: 4,
          }}
        />
      )}
    />
  );
}
