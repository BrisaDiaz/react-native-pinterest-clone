import React from "react";
import PinComponent from "./Pin";
import { FlatList } from "./Themed";
import { StyleSheet } from "react-native";
import { Pin } from "../types";
import Layout from "../constants/Layout";
import PinMenu, { Action } from "./PinMenu";
export default function PinsMasonry({
  data,
  columns,
}: {
  data: Pin[];
  columns?: number;
}) {
  const [selectedPin, setSelectedPin] = React.useState<Pin | null>(null);
  const [isPinMenuOpen, setIsPinMenuOpen] = React.useState(false);
  const defaultPinsMaxWidth = 200;
  const defaultColumnsNum = Math.ceil(
    Layout.window.width / defaultPinsMaxWidth,
  );

  const handleOpenPinMenu = (pin: Pin) => {
    togglePinMenu();
    setSelectedPin(pin);
  };
  const handlePinActions = (selectedAction: Action) => {
    togglePinMenu();
  };
  const togglePinMenu = () => {
    setIsPinMenuOpen(!isPinMenuOpen);
  };
  const renderItem = ({ item }: { item: Pin }) => (
    <PinComponent
      style={{
        width: "100%",
        maxWidth: columns ? `${100 / columns}%` : `${100 / defaultColumnsNum}%`,
      }}
      data={item}
      onMenuClick={handleOpenPinMenu}
    ></PinComponent>
  );
  const keyExtractor = (item: Pin) => item.id.toString();
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        columnWrapperStyle={styles.masonryColumnWrapper}
        contentContainerStyle={styles.masonry}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={columns || defaultColumnsNum}
      />
      <PinMenu
        visible={isPinMenuOpen}
        closeButtonVisible={true}
        closeButtonProps={{ onPress: togglePinMenu }}
        title="options"
        onOptionSelected={handlePinActions}
      />
    </>
  );
}
const styles = StyleSheet.create({
  masonry: {
    width: "100%",
    marginBottom: "1.5rem",
  },

  masonryColumnWrapper: {
    width: "100%",

    display: "flex",
    gap: 6,
    justifyContent: "flex-start",
    marginBottom: 4,
  },
});
