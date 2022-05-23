import React from "react";
import PinComponent from "./Pin";
import { FlatList } from "./Themed";
import { StyleSheet } from "react-native";
import { Pin } from "../types";
import Layout from "../constants/Layout";

import { useAppDispatch } from "../hooks/useStore";
import { setStashedPin, openModal } from "../store/slices/modals";
export default function PinsMasonry({ data }: { data: Pin[] }) {
  const PIN_MAX_WITH = 200;
  const COLUMN_NUM = Math.ceil(Layout.window.width / PIN_MAX_WITH);
  const dispatch = useAppDispatch();

  const handleOpenPinOptionsModal = (pin: Pin) => {
    dispatch(setStashedPin(pin));
    dispatch(openModal("pinOptions"));
  };

  const renderItem = ({ item }: { item: Pin }) => (
    <PinComponent
      style={{
        width: "100%",
        maxWidth: `${100 / COLUMN_NUM}%`,
      }}
      data={item}
      onMenuClick={handleOpenPinOptionsModal}
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
        numColumns={COLUMN_NUM}
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
