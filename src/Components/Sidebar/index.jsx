import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPlaylist } from "../../Api/Playlist/api";


import { CircularProgress } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {GoPlus, GoHeart} from 'react-icons/go'
import logo from '../../Pages/favicon.jpg';

import styles from './styles.module.scss'

const Sidebar = () => {

  const { playlist, getPlaylistProgress, createPlaylistProgress } =
    useSelector((state) => state.playlists);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(playlist)

  const handleCreatePlaylist = () => {
    const data = {
      name: "My Playlist #" + (playlist.length + 1),
      //user: user._id,
      desc: "By " + user.name,
      songs: [],
      img: "",
    };
    createPlaylist(data, dispatch);
  };

    return (
        <div className={styles.container}>
      <img className={styles.logo_img} src={logo} alt="logo" />
      <NavLink
        to="/home"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/search"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <SearchIcon />
        <span>Search</span>
      </NavLink>
      <NavLink
        to="/collection/playlists"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <LibraryMusicIcon />
        <span>Your Library</span>
      </NavLink>
      
      <NavLink
        to="/collection/tracks"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <GoHeart />
        <span>Liked Songs</span>
      </NavLink>
      <div className={styles.underline}></div>
      <div
        className={styles.create_playlist_btn}
        onClick={handleCreatePlaylist}
      >
        <GoPlus />
        <span>Create Playlist</span>
      </div>
      {getPlaylistProgress || createPlaylistProgress ? (
        <div className={styles.progress_container}>
          <CircularProgress style={{ color: "#1ed760" }} size="3rem" />
        </div>
      ) : (
        <Fragment>
          {playlist.map((playlist) => (
            <NavLink
              key={playlist._id}
              to={`/playlist/${playlist._id}`}
              activeClassName={styles.active_link}
              className={styles.playlist_link}
            >
              {playlist.name}
            </NavLink>
          ))}
        </Fragment>
      )}{user?.isAdmin && ( 
        
        <NavLink
        className={styles.admin_link}
        to="/admin"
      >
        <span>Admin Dashboard</span>
      </NavLink>
      )}
     
    </div>
    )

    
}


export default Sidebar;