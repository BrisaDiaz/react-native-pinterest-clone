import React, { useMemo } from "react";
import PinComponent from "./Pin";
import { FlatList, View } from "./Themed";
import { StyleSheet } from "react-native";
import { Pin } from "../types";
import Layout from "../constants/Layout";
import PinOptionsModal, { Action } from "./PinOptionsModal";
import distributeItemsByNum from "../utils/distributeItemsByNum";

function PinsMasonry({ data }: { data: Pin[] }) {
  const [selectedPin, setSelectedPin] = React.useState<Pin | null>(null);
  const [isPinOptionsModalOpen, setIsPinOptionsModalOpen] =
    React.useState(false);
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

  const handleOpenPinOptionsModal = (pin: Pin) => {
    togglePinOptionsModal();
    setSelectedPin(pin);
  };
  const handlePinActions = (selectedAction: Action) => {
    togglePinOptionsModal();
  };
  const togglePinOptionsModal = () => {
    setIsPinOptionsModalOpen(!isPinOptionsModalOpen);
  };
  const renderItem = ({ item }: { item: Pin }) => (
    <PinComponent
      key={item.id}
      data={item}
      onMenuClick={handleOpenPinOptionsModal}
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
      <PinOptionsModal
        visible={isPinOptionsModalOpen}
        closeButtonVisible={true}
        closeButtonProps={{ onPress: togglePinOptionsModal }}
        title="options"
        onSelectedAction={handlePinActions}
      />
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
