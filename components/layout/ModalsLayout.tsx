import React from "react";
import StoreInBoardModal from "../StoreInBoardModal";
import PinOptionsModal, { Action } from "../PinOptionsModal";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { closeModal, openModal } from "../../store/slices/modals";
import { useLinkProps } from "@react-navigation/native";
export default function ModalsLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const modalState = useAppSelector((store) => store.modals);
  const dispatch = useAppDispatch();

  const handlePinOptionActions = (actionType: Action) => {
    if (actionType === "store") {
      dispatch(closeModal("pinOptions"));
      dispatch(openModal("pinStorage"));
    }
  };
  const { onPress } = useLinkProps({
    to: { screen: "CreateBoard" },
  });
  const handleCreateModal = () => {
    dispatch(closeModal("pinStorage"));
    onPress();
  };
  return (
    <>
      <StoreInBoardModal
        visible={modalState.modals.pinStorage.isVisible}
        onCreateBoard={() => handleCreateModal()}
        closeButtonProps={{
          onPress: () => dispatch(closeModal("pinStorage")),
        }}
      />
      <PinOptionsModal
        visible={modalState.modals.pinOptions.isVisible}
        onSelectedAction={handlePinOptionActions}
        closeButtonProps={{
          onPress: () => dispatch(closeModal("pinOptions")),
        }}
      />
      <>{children}</>
    </>
  );
}
