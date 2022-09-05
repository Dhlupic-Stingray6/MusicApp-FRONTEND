import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SongTable from "../../../Components/Tables/SongTable";
import Button from "../../../Components/Button";
import AddIcon from "@mui/icons-material/Add";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import styles from "./styles.module.scss";

const SongsAdmin = () => {
	const { songs } = useSelector((state) => state.songs);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					songs <MusicNoteIcon />
				</h1>
				
			</div>
			<SongTable/>
            <div className={styles.btn}>
            <Link to="/songs/new">
					<Button startIcon={<AddIcon />} label="Add New Song" />
				</Link>
            </div>
            
		</div>
	);
};

export default SongsAdmin;
