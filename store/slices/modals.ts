import { createSlice } from "@reduxjs/toolkit";
import { Pin } from "../../types";


export interface State {
  pin: null | Pin;
  modals: {
    pinStorage: {
      isVisible: boolean;
    };
    pinOptions: {
      isVisible: boolean;
    };
    partialPinOptions: {
      isVisible: boolean;
    };
    addToProfile: {
      isVisible: boolean;
    };
  };
}

const initialState: State = {
  pin: null,
  modals: {
    pinStorage: {
      isVisible: false,
    },
    pinOptions: {
      isVisible: false,
    },
    partialPinOptions: {
      isVisible: false,
    },
    addToProfile: {
      isVisible: false,
    },
  },
};

type ModalName = keyof typeof initialState.modals;

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
    closeAllModals: (state: State, action: { payload: null }) => {
      state.modals = initialState.modals;
    },
  },
});
export const { setStashedPin, removePin, closeModal, openModal, closeAllModals } =
  modalsSlice.actions;
