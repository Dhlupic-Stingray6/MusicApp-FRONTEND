import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
    name: "playlist",

    initialState: {
        playlist: [],
        isFetching: false,
        createPlaylistProgress: false,
        getPlaylistProgress: false,
        addSongProgress: false,
        removeSongProgress: false,
        deletePlaylistProgress: false,
        error: false,
    },

    reducers: {
        createPlaylistStart: (state) => {
            state.createPlaylistProgress = true;
        },
        createPlaylistSuccess: (state, action) => {
            state.playlist.push(action.payload);
            state.createPlaylistProgress = false;
        },

        createPlaylistFailure: (state) => {
            state.error = true
            state.createPlaylistProgress = false;
        },

        getPlaylistStart: (state) => {
            state.getPlaylistProgress = true;
        },

        getPlaylistSuccess: (state, action) => {
            state.playlist = action.payload;
            state.getPlaylistProgress = false; 
        },

        getPlaylistFailure: (state) => {
            state.error = true; 
            state.getPlaylistProgress = false;
        },

        addSongStart: (state) => {
            state.addSongProgress = true;
        },

        addSongSuccess: (state, action) => {
            const index = state.playlists.indexOf(action.payload_id);
            state.playlists[index] = action.payload;
            state.addSongProgress = false;
        },

        addSongFailure: (state) => {
            state.error = true;
            state.addSongProgress = false;
        },

        removeSongStart: (state) => {
            state.removeSongProgress = true;
            
        },

        removeSongSuccess: (state, action) => {
            const index = state.playlist.indexOf(action.payload._id);
            state.playlist[index] = action.payload;
            state.removeSongProgress = false;
        },

        removeSongFailure: ( state) => {
            state.error = true;
            state.removeSongProgress = false;
        },

        deletePlaylistStart: (state) => {
            state.deletePlaylistProgress = true;
        },

        deletePlaylistSuccess: ( state, action) => {
            state.playlist = state.playlist.filter(
                (playlist) => playlist._id !== action.payload
            );
            state.error = true;
            state.deletePlaylistProgress = false;
        },
        

    },
});


export const {
    createPlaylistStart,
    createPlaylistSuccess,
	createPlaylistFailure,
	getPlaylistStart,
	getPlaylistSuccess,
	getPlaylistFailure,
	addSongStart,
	addSongSuccess,
	addSongFailure,
	removeSongStart,
	removeSongSuccess,
	removeSongFailure,
	deletePlaylistStart,
	deletePlaylistSuccess,
	deletePlaylistFailure,
   

} = playlistSlice.actions;


export default playlistSlice.reducer;