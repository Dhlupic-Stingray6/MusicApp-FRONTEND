import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Joi from 'joi';
import { toast } from 'react-toastify'

import { updateUser } from '../../Api/User/api';

import TextField from '../../Components/TextField';
import Select from "../../Components/Select";
import Button from '../../Components/Button';

import styles from "./styles.module.scss"


const months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "Apirl", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "Augest", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },

]


const Profile = () => {
    const [ data, setData ] = useState({
        name: "",
        dayOfBirth: "",
        monthOfBirth: "",
        yearOfBirth: "",
    });
    const [ errors, setErrors ] = useState({});
    const { user, updateUserProgress } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("User: " ,user);
    console.log("updateUserProgress: ",updateUserProgress)
    
    const handleInputState = (name, value) => {
        setData((data) => ({...data, [name]: value}));
    }

    const handleErrorState = (name, value) => {
        value === ""
            ? delete errors[name]
            : setErrors(() => ({...errors, [name]: value}))
    };

    const schema = {
        name: Joi.string().min(5).max(10).required().label("Name")
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { data, id: user._id };
        const res = await updateUser(payload, dispatch);
        
        res && navigate("/home")
        
        
    };

    useEffect(() => {
        if(user) {
            const a = {
                name: user.name,
                dayOfBirth: user.dayOfBirth,
                monthOfBirth: user.monthOfBirth,
                yearOfBirth: user.yearOfBirth
            };
            setData(a);
        }
    }, [user])

  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.input_container}>
          <TextField
            label="What's your email?"
            placeholder="Enter your email"
            value={user ? user.email : ""}
            required={true}
            disabled={true}
            style={{ color: "white" }}
          />
        </div>
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

        <div className={styles.submit_btn_wrapper}>
          <Button
            label="Update"
            type="submit"
            isFetching={updateUserProgress}
          />
        </div>
      </form>
    </div>
  );
  
}

export default Profile;