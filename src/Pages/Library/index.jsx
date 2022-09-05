import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Playlist from "../../Components/Playlist";


import styles from './styles.module.scss';

const Library = () => {

  const { playlist }  = useSelector((state) => state.playlists);
  const { user } = useSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <h1>Playlists!</h1>
      <div className={styles.playlists_container}>
        <Link to="/collection/tracks"
          className={styles.liked_songs}
        >
          <h1>Liked songs</h1>
          <p>
            {user.likedSongs.length ? 0 + "  " : user.likedSongs.length + " "}
             Liked Songs
          </p>
        </Link>
        <Playlist playlists={playlist}/>
      </div>

    </div>
  )

}

export default Library;