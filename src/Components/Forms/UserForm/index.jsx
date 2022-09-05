import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

import { createUser, updateUser } from "../../../Api/Users/api";

import PersonIcon from "@mui/icons-material/Person"
import { Paper } from "@mui/material";
import Button from "../../Button";
import Select from "../../Select";
import TextField from "../../TextField";


import styles from './styles.module.scss'


const months = [
	{ name: "January", value: "01" },
	{ name: "February", value: "02" },
	{ name: "March", value: "03" },
	{ name: "Apirl", value: "04" },
	{ name: "May", value: "05" },
	{ name: "June", value: "06" },
	{ name: "July", value: "07" },
	{ name: "August", value: "08" },
	{ name: "September", value: "09" },
	{ name: "October", value: "10" },
	{ name: "November", value: "11" },
	{ name: "December", value: "12" },
];

const UserForm = () => {

    const [data, setData ] = useState({
        email: "",
        password: "",
        name: "",
        dayOfBirth: "",
        monthOfBirth: "",
        yearOfBirth: "",
    });

    const { users, createUserProgress, updateUserProgress } = useSelector(
        (state) => state.users
    );
    const[errors, setErrors] = useState({});
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const handleInputState =(name, value) => {
        setData((prev) => ({...prev, [name]: value}));
    };

    const handleErrorState =(name, value) => {
        value === ""
            ? delete errors[name]
            : setErrors((errors) => ({...errors, [name]: value}))
    };

    const schema = {
        email: Joi.string().email({ tlds: false}).required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        name: Joi.string().min(5).max(10).required().label("Name"),
    };

    useEffect(() => {
        if(id !== "new" && users){
            const user = users.filter((user) => user._id === id);
            
            setData({
                email: user[0].email,
                name: user[0].name,
                dayOfBirth: user[0].dayOfBirth,
                monthOfBirth: user[0].monthOfBirth,
                yearOfBirth: user[0].yearOfBirth,
            });
        }
    }, [id, users]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            if (id !== "new") {
                const res = await updateUser(id, data, dispatch);
                res && navigate("/admin/users");
            } else {
                const res = await createUser(data, dispatch);
                res && navigate("/admin/users")
            }
        } else  {
            console.log("error fill out properly")
        }
    };

    return (
        <div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Add New User" : "Edit User"} <PersonIcon />
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<TextField
							label="What's your email?"
							placeholder="Enter your email"
							name="email"
							handleInputState={handleInputState}
							schema={schema.email}
							handleErrorState={handleErrorState}
							value={data.email}
							error={errors.email}
							required={true}
						/>
					</div>
					{id === "new" && (
						<div className={styles.input_container}>
							<TextField
								label="Create a password"
								placeholder="Create a password"
								name="password"
								handleInputState={handleInputState}
								schema={schema.password}
								handleErrorState={handleErrorState}
								value={data.password}
								error={errors.password}
								type="password"
								required={true}
							/>
						</div>
					)}
					<div className={styles.input_container}>
						<TextField
							label="What should we call you?"
							placeholder="Enter a profile name"
							name="name"
							handleInputState={handleInputState}
							schema={schema.name}
							handleErrorState={handleErrorState}
							value={data.name}
							error={errors.name}
							required={true}
						/>
					</div>
					<div className={styles.date_of_birth_container}>
						<p>What's your date of birth?</p>
						<div className={styles.date_of_birth}>
							<div className={styles.month}>
								<Select
									name="monthOfBirth"
									handleInputState={handleInputState}
									label="Month"
									placeholder="Months"
									options={months}
									value={data.monthOfBirth}
									required={true}
								/>
							</div>
							<div className={styles.date}>
								<TextField
									label="Date"
									placeholder="DD"
									name="dayOfBirth"
									value={data.dayOfBirth}
									handleInputState={handleInputState}
									required={true}
								/>
							</div>
							<div className={styles.year}>
								<TextField
									label="Year"
									placeholder="YYYY"
									name="yearOfBirth"
									value={data.yearOfBirth}
									handleInputState={handleInputState}
									required={true}
								/>
							</div>
						</div>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Submit" : "Update"}
						isFetching={id === "new" ? createUserProgress : updateUserProgress}
						style={{ marginLeft: "auto" }}
					/>
				</form>
			</Paper>
		</div>
    )

}

export default UserForm