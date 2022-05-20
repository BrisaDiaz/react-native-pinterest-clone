import { createSlice } from "@reduxjs/toolkit";

export interface State {
  searchQuery: string;
  searchTags: string[];
  searchHistory: string[];
}
const initialState: State = {
  searchQuery: "",
  searchTags: [],
  searchHistory: [],
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
    addSearchHistory: (state: State, action: { payload: string }) => {
     action.payload.trim().length && !state.searchHistory.includes(action.payload) &&  state.searchHistory.push(action.payload);
    },
    removeSearchTag: (state: State, action: { payload: string }) => {
      const filteredTags = [...state.searchTags].filter(
        (tag) => tag !== action.payload,
      );

      return {
        ...state,
        searchTags: filteredTags,
      };
    },
    clearSearch: (state: State) => {
      state.searchQuery = "";
      state.searchTags = [];
    },
  },
});
export const {
  setSearchQuery,
  addSearchTag,
  removeSearchTag,
  clearSearch,
  addSearchHistory,
} = searchSlice.actions;
