import React from "react";
import StoreInBoardModal from "../StoreInBoardModal";
import PinOptionsModal, {
  Action as PinOptionsAction,
} from "../PinOptionsModal";
import AddToProfileModal, {
  Action as AddToProfileAction,
} from "../AddToProfileModal";
import SecondaryPinOptionsModal from "../SecondaryPinOptionsModal";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import {
  closeModal,

  closeAllModals,
} from "../../store/slices/modals";
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

  const handlePinOptionActions = async (actionType: PinOptionsAction) => {
    const stashedPin = modalState.pin;
    dispatch(closeAllModals(null));

    if (!stashedPin) return;
    try {
      if (!authState.user) {
        redirectToLogin();
        return;
      }
      if (actionType === "store") {
        return;
      }
      if (actionType === "download") {
        await save(stashedPin.image);
        return;
      }
      if (actionType === "send") {
        await share(stashedPin.image);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { onPress: redirectToCreateBoardScreen } = useLinkProps({
    to: { screen: "CreateBoard" },
  });
  const { onPress: redirectToCreatePinScreen } = useLinkProps({
    to: { screen: "CreatePin" },
  });
  const handleCreateModal = () => {
    dispatch(closeModal("pinStorage"));
    redirectToCreateBoardScreen();
  };
  const handleAddToProfileActions = async (actionType: AddToProfileAction) => {
    dispatch(closeModal("addToProfile"));
    if (actionType === "add board") {
      return redirectToCreateBoardScreen();
    }
    redirectToCreatePinScreen();
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
      <SecondaryPinOptionsModal
        visible={modalState.modals.partialPinOptions.isVisible}
        onSelectedAction={handlePinOptionActions}
        onDismiss={() => dispatch(closeModal("partialPinOptions"))}
      />
      <AddToProfileModal
        visible={modalState.modals.addToProfile.isVisible}
        onSelectedAction={handleAddToProfileActions}
        onDismiss={() => dispatch(closeModal("addToProfile"))}
      />
      <>{children}</>
    </>
  );
}
