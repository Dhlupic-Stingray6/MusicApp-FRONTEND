import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {login} from '../../Api/Auth/api'
import Joi from 'joi'
import  TextField  from '../../Components/TextField'
import  Button  from '../../Components/Button'



import logo from '../favicon.jpg'
import styles from './styles.module.scss'




const Login = () => {

  const [data, setData] = useState({ email: "", password: ""});
  const [errors, setErrors] = useState({})
  const { isFetching } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  

  const handleInputState = (name, value) => {
    setData({...data, [name]: value});
  };

  const handleErrorState = (name, value) => {
    value === ""
      ? delete errors[name]
      : setErrors({...errors, [name]: value});
  };

  const schema = {

    email: Joi.string().email({ tlds: false}).required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      login(data, dispatch);
    }
    else {
      console.log("please enter properly !");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <img src={logo} alt="logo"/>

      </div>
      <main className={styles.main}>
        <h1 className={styles.heading}>Log in page</h1>

        <form onSubmit={handleSubmit} className={styles.form_container}>
          <div className={styles.input_container}>
          <TextField
							label="Enter your email"
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
              label="Password"
              placeholder="Password"
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

          <div className={styles.form_button}>
            <Button 
              type="submit"
              label="LOG IN"
              isFetching={isFetching}
              
            />
          </div>

        </form>
      </main>


    </div>
  )
}

export default Login