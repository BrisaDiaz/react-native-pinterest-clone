import { createSlice } from "@reduxjs/toolkit";

export interface State {
  searchQuery: string;
  searchTags: string[];
}
const initialState: State = {
  searchQuery: "",
  searchTags: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state: State, action: { payload: string }) => {
      state.searchQuery = action.payload;
    },
    addSearchTag: (state: State, action: { payload: string }) => {
      state.searchTags.push(action.payload);
    },
    removeSearchTag: (state: State, action: { payload: string }) => {
      state.searchTags = state.searchTags.filter(
        (tag) => tag !== action.payload,
      );
    },
    clearSearch: (state: State) => {
      state.searchQuery = "";
      state.searchTags = [];
    },
  },
});
export const { setSearchQuery, addSearchTag, removeSearchTag, clearSearch } =
  searchSlice.actions;
