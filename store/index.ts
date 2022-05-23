import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authSlice, searchSlice, modalsSlice } from "./slices";
import { appAPI } from "./services";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    modals: modalsSlice.reducer,
    [appAPI.reducerPath]: appAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appAPI.middleware),
  devTools: true,
});
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
