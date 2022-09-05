import React from 'react'
import { Link } from "react-router-dom";
import { UserTable } from '../../../Components'

import Button from '../../../Components/Button';
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styles from "./styles.module.scss";


const UsersAdmin = () => {
  return (
    <div className={styles.container}>
			<div className={styles.head}>
				<h1>
					users <PeopleAltIcon />
				</h1>
				
			</div>
			<UserTable/>
            <div className={styles.btn}>
            <Link to="/users/new" >
					<Button startIcon={<AddIcon />} label="Add New User" />
				</Link>
            </div>
            
		</div>
  )
}

export default UsersAdmin