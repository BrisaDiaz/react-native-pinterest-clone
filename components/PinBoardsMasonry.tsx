import { FlatList } from "./Themed";
import { ViewStyle } from "react-native";
import Board from "./PinBoard";
import { v4 as uuid } from "uuid";
import { PinBoard } from "../types";
import Layout from "../constants/Layout";
export default function BoardsMasonry({
  data,
  columns,
}: {
  data: PinBoard[];
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
      data={data}
      keyExtractor={() => uuid()}
      renderItem={({ item }) => (
        <Board
          style={{
            maxWidth: `${columns ? 100 / columns : 100 / defaultColumnsNum}%`,
            marginBottom: 4,
          }}
          data={item}
        />
      )}
    />
  );
}
