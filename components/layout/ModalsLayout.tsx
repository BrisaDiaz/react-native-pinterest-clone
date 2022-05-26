import React from "react";
import StoreInBoardModal from "../StoreInBoardModal";
import PinOptionsModal, { Action } from "../PinOptionsModal";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { closeModal, openModal } from "../../store/slices/modals";
import { useLinkProps } from "@react-navigation/native";
import useFileManager from "../../hooks/useFileManager";
export default function ModalsLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { onPress: redirectToLogin } = useLinkProps({
    to: { screen: "Login" },
  });
  const modalState = useAppSelector((store) => store.modals);
  const authState = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch();
  const { share, save } = useFileManager();

  const handlePinOptionActions = async (actionType: Action) => {
    const stashedPin = modalState.pin;
    if (!stashedPin) return;
    try {
      if (!authState.user) {
        dispatch(closeModal("pinOptions"));
        redirectToLogin();
        return;
      }
      if (actionType === "store") {
        dispatch(closeModal("pinOptions"));
        dispatch(openModal("pinStorage"));
        return;
      }
      if (actionType === "download") {
        await save(stashedPin.pin);
        return;
      }
      if (actionType === "send") {
        await share(stashedPin.pin);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { onPress: redirectToCreateBoardScreen } = useLinkProps({
    to: { screen: "CreateBoard" },
  });
  const handleCreateModal = () => {
    dispatch(closeModal("pinStorage"));
    redirectToCreateBoardScreen();
  };
  return (
    <>
      {authState.user && (
        <StoreInBoardModal
          visible={modalState.modals.pinStorage.isVisible}
          onCreateBoard={() => handleCreateModal()}
          onDismiss={() => dispatch(closeModal("pinStorage"))}
        />
      )}
      <PinOptionsModal
        visible={modalState.modals.pinOptions.isVisible}
        onSelectedAction={handlePinOptionActions}
        onDismiss={() => dispatch(closeModal("pinOptions"))}
      />
      <>{children}</>
    </>
  );
}
