import { useState, useEffect } from "react";
import TextField from "../TextField";

import Button from "../Button";
import axiosInstance from "../../Api/axios";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.scss"



const PlaylistModel = ({ closeModel, playlist }) => {
	const [data, setData] = useState({
		name: "",
		desc: "",
		
	});
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		setData({ name: playlist.name, desc: playlist.desc});
	}, [playlist]);

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsFetching(true);
			const url =
				 `http:localhost:8080/api/playlists/edit/${playlist._id}`;
			const { data: res } = await axiosInstance.put(url, data);
			toast.success(res.message);
			setIsFetching(false);
			window.location.reload();
		} catch (error) {
			setIsFetching(false);
			console.log(error);
		}
	};

	return (
		<div className={styles.model_container}>
			<IconButton className={styles.close_btn} onClick={closeModel}>
				<CloseIcon />
			</IconButton>
			<div className={styles.form_container}>
				<h1>Edit Details</h1>
				<div className={styles.input_container}>
					<TextField
						label="Name"
						name="name"
						value={data.name}
						handleInputState={handleInputState}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="Description"
						name="desc"
						value={data.desc}
						handleInputState={handleInputState}
					/>
				</div>
				<div className={styles.input_container}>
					
				</div>
				<Button
					label="Submit"
					onClick={handleSubmit}
					isFetching={isFetching}
					style={{
						position: "absolute",
						bottom: "0",
						right: "0",
						margin: "1rem",
					}}
				/>
			</div>
		</div>
	);
};


export default PlaylistModel;