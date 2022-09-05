import React from 'react'
import { CircularProgress } from '@mui/material'
import styles from './styles.module.scss'

const Button = ({ label, isFetching, ...rest }) => {
  return (
    <button {...rest} className={styles.primary_btn}>
      {isFetching ? (
        <CircularProgress size={50} style= { { color: "purple"} }/>
      )
        :
        (`${label}`)
    }
    </button>
  )
}

export default Button