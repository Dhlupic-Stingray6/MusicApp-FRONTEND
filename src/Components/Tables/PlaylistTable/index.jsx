import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePlaylist } from '../../../Api/Playlist/api';
import DeleteIcon from "@mui/icons-material/Delete";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
	IconButton,
	CircularProgress,
} from "@mui/material";

import styles from './styles.module.scss'


const PlaylistTable = () => {

    const playlists = useSelector((state) => state.playlistsAll)

    const users = useSelector((state) => state.users)

    
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    setTimeout(() => setLoading(false), 1000);

    
    const handleDeletePlaylist = async () => {
        await deletePlaylist(playlists.playlists._id, dispatch);
    };
    
    
   

  return (
    <TableContainer
        className={styles.table_container}
        component={Paper}
    >
        <Table>
            <TableHead>
                <TableRow>
                        <TableCell align="center">Playlist</TableCell>
						<TableCell align="center">User</TableCell>
						
						<TableCell align="center">Number of songs</TableCell>
						<TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            {loading && (
					<TableBody>
						<TableRow>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center">
								<CircularProgress
									style={{ color: "#1ed760", margin: "2rem 0" }}
								/>
							</TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableBody>
            )}
            {!loading && (
					<TableBody>
						{playlists &&
							playlists.playlists.length !== 0 &&
							playlists.playlists.map((playlist) => (
								<TableRow key={playlist._id}>
									<TableCell align="center">{playlist.name}</TableCell>
									<TableCell align="center">{users.users.map((user) => (
                                       playlist.user=== user._id ? user.name : <p></p>
                                       
                                       ))}</TableCell>
									<TableCell align='center'>{playlist.songs.length}</TableCell>
									
									<TableCell align="center">
										
										<IconButton
											className={styles.delete_btn}
											onClick={() => handleDeletePlaylist(playlists._id)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{playlists && playlists.playlists.length === 0 && (
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center">
									<img
										className={styles.no_data_img}
										src="./noData.svg"
										alt=""
									/>
								</TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						)}
					</TableBody>
				)}
        </Table>
    </TableContainer>

  )
}

export default PlaylistTable;