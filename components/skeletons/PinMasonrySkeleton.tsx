import React, { useMemo } from "react";
import PinComponent from "./PinSkeleton";
import { FlatList, View } from "../Themed";
import { StyleSheet } from "react-native";
import { v4 as uuid } from "uuid";
import Layout from "../../constants/Layout";

import distributeItemsByNum from "../../utils/distributeItemsByNum";

function PinsMasonry({
  itemsNum,
  dynamicHeight,
}: {
  itemsNum: number;
  dynamicHeight?: boolean;
}) {
  const data = new Array(itemsNum).fill(1);
  const defaultPinsMaxWidth = 200;
  const calcWith = Math.ceil(Layout.window.width / defaultPinsMaxWidth);
  const DEFAULT_COL_NUM = calcWith > 1 ? calcWith : 2;
  const SPACING = 6;

  const PINS_WITH =
    (Layout.window.width - 12) /
    (data.length < DEFAULT_COL_NUM ? data.length : DEFAULT_COL_NUM);

  const masonryColumns = useMemo(() => {
    return distributeItemsByNum(data, DEFAULT_COL_NUM);
  }, [data]);

  const renderItem = ({ item }: { item: any }) => (
    <PinComponent
      key={uuid()}
      style={{ width: PINS_WITH - SPACING, marginBottom: 6 }}
      dynamicHeight={dynamicHeight || false}
    />
  );

  return (
    <>
      <View style={[styles.masonry, { marginRight: -SPACING }]}>
        {masonryColumns.map((column, index) => (
          <FlatList
            key={index}
            contentContainerStyle={[
              styles.masonryColumn,
              {
                marginLeft: SPACING,
              },
            ]}
            data={column}
            numColumns={1}
            renderItem={renderItem}
            keyExtractor={() => uuid()}
            scrollToOverflowEnabled={false}
          />
        ))}
      </View>
    </>
  );
}
export default PinsMasonry;
const styles = StyleSheet.create({
  masonry: {
    marginTop: 6,
    marginBottom: "1.5rem",
    width: "100%",
    flexDirection: "row",
    minHeight: 100,
  },

  masonryColumn: {
    width: "100%",
    flex: 1,
  },
});
