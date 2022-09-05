import { Outlet, Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ component: Component, user, ...rest }) => {
	
	const { currentSong } = useSelector((state) => state.audioPlayer);
	
	console.log(user)
	
	const styles = {
		padding: currentSong ? "6rem 0 10rem 26rem" : "6rem 0 0 26rem",
		backgroundColor: "#181818",
		color: "#ffffff",
		minHeight: "calc(100vh - 6rem)",
	};

	return (
		<Outlet
		{...rest}
		render={(props) =>
			user?.isAdmin ? (
				<div style={styles}>
					<Component {...props}/>
				</div>
			) : (
				<Navigate 
					to={{ pathname: "/login", state: {from: props.location}}}
				/>
			)
		}

		/>

		
	);
};

export default PrivateRoutes;
