import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import authReducer from './Auth';
import usersReducer from './Users'
import  playlistReducer   from './Playlist'
import playlistsAllReducer from './Playlists'
import audioPlayer from './AudioPlayer';
import  userReducer  from "./User";
import songsReducer from "./Songs"


const reducers = combineReducers({
    auth: authReducer,
    playlists: playlistReducer,
    playlistsAll: playlistsAllReducer,
    audioPlayer: audioPlayer,
    user: userReducer,
    users: usersReducer,
    songs: songsReducer,
});


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "audioPlayer"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ serializableCheck: false}),
    
});


export default store;