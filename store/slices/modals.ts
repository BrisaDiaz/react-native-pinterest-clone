import { createSlice } from "@reduxjs/toolkit";
import { Pin } from "../../types";

type ModalName = "pinStorageModal" | "pinOptionsModal";
export interface State {
  pin: null | Pin;
  modals: {
    pinStorageModal: {
      isVisible: boolean;
    };
    pinOptionsModal: {
      isVisible: boolean;
    };
  };
}
const initialState: State = {
  pin: null,
  modals: {
    pinStorageModal: {
      isVisible: false,
    },
    pinOptionsModal: {
      isVisible: false,
    },
  },
};

export const modalsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStashedPin: (state: State, action: { payload: Pin }) => {
      state.pin = action.payload;
    },
    removePin: (state: State) => {
      state.pin = null;
    },
    openModal: (state: State, action: { payload: ModalName }) => {
      state.modals[action.payload] = { isVisible: true };
    },
    closeModal: (state: State, action: { payload: ModalName }) => {
      state.modals[action.payload] = { isVisible: false };
    },
  },
});
export const { setStashedPin, removePin } = modalsSlice.actions;
