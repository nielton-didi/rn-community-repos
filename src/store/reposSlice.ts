import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReposState, RepositoryResponse } from "../types";

const initialState: ReposState = {
  repositories: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
  searchQuery: "",
};

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    fetchRepositoriesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRepositoriesSuccess: (
      state,
      action: PayloadAction<RepositoryResponse>
    ) => {
      state.loading = false;
      if (state.currentPage === 1) {
        state.repositories = action.payload.items;
      } else {
        state.repositories = [...state.repositories, ...action.payload.items];
      }
      state.hasMore = action.payload.items.length === 10;
    },
    fetchRepositoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
  },
});

export const {
  fetchRepositoriesRequest,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
  setSearchQuery,
  incrementPage,
} = reposSlice.actions;

export default reposSlice.reducer;
