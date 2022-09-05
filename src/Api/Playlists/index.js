import { createSlice } from "@reduxjs/toolkit";

export const playlistsAllSlice = createSlice({
  name: "playlistAll",
  initialState: {
    playlists: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getAllPlaylistsStart: (state) => {
      state.isFetching = true;
    },
    getAllPlaylistsSuccess: (state, action) => {
      state.playlists = action.payload;
      state.isFetching = false;
    },
    getAllPlaylistsFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const {
  getAllPlaylistsStart,
  getAllPlaylistsSuccess,
  getAllPlaylistsFailure,
} = playlistsAllSlice.actions;

export default playlistsAllSlice.reducer;
