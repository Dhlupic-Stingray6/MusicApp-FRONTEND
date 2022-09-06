import React, {useState} from 'react'
import Joi from 'joi'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";

import Checkbox from "../../Components/Checkbox"
import TextField from "../../Components/TextField";
import Select from "../../Components/Select";
import Button from "../../Components/Button";
import logo from "../favicon.jpg"


import styles from './styles.module.scss'


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
];

const Signup = () => {

  const [data, setData ] = useState({
    email: "",
    password: "",
    name: "",
    monthOfBirth: "",
    yearOfBirth:"",
    dayOfBirth: "",
  });

  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const handleInputState = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleErrorState = (name, value) => {
    value === ""
    ? delete errors[name]
    : setErrors(() => ({...errors, [name]: value}));
  };


  const schema =  {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    name: Joi.string().min(5).max(10).required().label("Name"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(Object.keys(errors).length === 0) {
      try {
        setIsFetching(true);
        const url = "/users";
        await axios.post(url, data);
        setIsFetching(false);
        toast.success("Account created successfully");
        navigate('/login');
      } catch (error) {
        setIsFetching(false);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          toast.error(error.response.data)
          console.log(error.response.data);
        }
        else {
          console.log(error);
          toast.error("Something went wrong please try again later")
        }
      }
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <h1 className={styles.heading}>Sign up for awesome music</h1>
      <Button 
        label= "Sign up with Facebook"
        style={{ background: "#1877f2", color: "white"}}
      />
      <p className={styles.or_container}>or</p>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <h2 className={styles.form_heading}> Sign up with email</h2>
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
        <div className={styles.checkbox_container}>
          <Checkbox
            required={true}
            label="Share my registration data with Spotify's content providers for marketing purposes."
          />
        </div>
        <p className={styles.terms_condition}>
          By clicking on sign-up, you agree to Spotify's{" "}
          <a href="/#">Terms and Conditions of Use.</a>
        </p>
        <p className={styles.terms_condition}>
          To learn more about how Spotify collects, uses, shares and protects
          your personal data, please see{" "}
          <a href="/#">Spotify's Privacy Policy.</a>
        </p>
        <div className={styles.submit_btn_wrapper}>
          <Button label="Sign Up" type="submit" isFetching={isFetching} />
        </div>
        <p className={styles.terms_condition} style={{ fontSize: "1.6rem" }}>
          Have an account? <Link to="/login"> Log in.</Link>
        </p>
      </form>

    </div>
  )
}

export default Signup