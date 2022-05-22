import { FlatList } from "./Themed";
import { ViewStyle } from "react-native";
import Board from "./PinBoard";
import { v4 as uuid } from "uuid";
import { PinBoard } from "../types";
import Layout from "../constants/Layout";
export default function BoardsMasonry({ data }: { data: PinBoard[] }) {
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
      columnWrapperStyle={{
        width: "100%",
        marginRight: -GAP,

        justifyContent: "flex-start",
      }}
      numColumns={COLUMNS_NUM}
      data={data}
      keyExtractor={() => uuid()}
      renderItem={({ item }) => (
        <Board
          style={{
            maxWidth: `${100 / COLUMNS_NUM}%`,
            marginBottom: 4,
            marginLeft: GAP,
          }}
          data={item}
        />
      )}
    />
  );
}
