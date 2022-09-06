import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import UserTable from "../../Components/Tables/UserTable";
//import SongTable from "../../Components/Tables/SongTable";
import { Paper } from "@mui/material";
import Button from "../../Components/Button";
import PersonIcon from "@mui/icons-material/Person";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import styles from "./styles.module.scss";

const Admin = () => {

	const { songs } = useSelector((state) => state.songs);
	const { users } = useSelector((state) => state.users);
	const { playlists } = useSelector((state) => state.playlistsAll)
	
	
	console.log(songs);
	
	
	return (
		<div className={styles.container}>
		<div className={styles.head}>

		<Link to={"/admin/users"}>
		<Paper className={styles.card}>
          <PersonIcon />
          <span>Users</span>
          <p>{users && users.length}</p>
        	</Paper>
		</Link>	
		<Link to={"/admin/songs"} >
			<Paper className={styles.card}>
          		<MusicNoteIcon />
         	 	<span>Songs</span>
          			<p>{songs && songs.length}</p>
       	 	</Paper>
		</Link>
		
			<Paper className={styles.card}>
          		<LibraryMusicIcon />
          		<span>Playlists</span>
          		<p>{playlists && playlists.length}</p>
        	</Paper>
		
			

		</div>
			

		</div>
	)
};

export default Admin;
