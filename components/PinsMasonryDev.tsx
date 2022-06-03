import React, { useMemo } from "react";
import PinComponent from "./Pin";
import { FlatList, View } from "./Themed";
import { StyleSheet } from "react-native";
import { Pin } from "../types";
import Layout from "../constants/Layout";

import distributeItemsByNum from "../utils/distributeItemsByNum";
import { useAppDispatch } from "../hooks/useStore";
import { openModal, setStashedPin } from "../store/slices/modals";
function PinsMasonry({ data }: { data: Pin[] }) {
  const dispatch = useAppDispatch();

  const MAX_WIDTH = 200;
  const calcWith = Math.ceil(Layout.window.width / MAX_WIDTH);
  const DEFAULT_COL_NUM = calcWith > 1 ? calcWith : 2;
  const SPACING = 6;
  const PINS_WITH =
    (Layout.window.width - 12) /
    (data.length < DEFAULT_COL_NUM ? data.length : DEFAULT_COL_NUM);

  const masonryColumns = useMemo(() => {
    return distributeItemsByNum(data, DEFAULT_COL_NUM);
  }, [data]);

  const handleOpenPinOptionsModal = (pin: Pin) => {
    dispatch(openModal("pinOptions"));
    dispatch(setStashedPin(pin));
  };

  const renderItem = ({ item }: { item: Pin }) => (
    <PinComponent
      key={item.id}
      data={item}
      onMenuClick={() => handleOpenPinOptionsModal(item)}
      style={{ width: PINS_WITH - SPACING }}
      dynamicHeight={true}
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
            keyExtractor={(pin) => pin.id.toString()}
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
    marginBottom: 21,
    width: "100%",
    flexDirection: "row",
    minHeight: 100,
  },

  masonryColumn: {
    width: "100%",
    flex: 1,
  },
});
