import './App.css';
import React, { useState, useEffect } from 'react'
import User from './User'
import UserForm from './UserForm'
import formSchema from './FormSchema'
import axios from 'axios'
import * as yup from 'yup'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  submit: '',
  ///// CHECKBOXES /////
  service: {
    yes: false,
    no: false,
  },
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}
const initialUser = []
const initialDisabled = true


export default function App() {
  const [user, setUser] = useState(initialUser)          
  const [formValues, setFormValues] = useState(initialFormValues) 
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const [disabled, setDisabled] = useState(initialDisabled)     

  const post = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUser([...user, res.data])
        setFormValues(initialFormValues)
      })
      .catch(err => {
        debugger
      })
  }

  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const checkboxChange = (name, isChecked) => {
    // 🔥 STEP 7- IMPLEMENT!
    //  set a new state for the whole form
    setFormValues({
      ...formValues,
      service: {
        ...formValues.service,
        [name]: isChecked, // not an array
      }
    })
  }

  const submit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      service: Object.keys(formValues.service).filter(serv => formValues.service[serv]),
    }
    post(newUser)
  }
  useEffect(() => {
  
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>Andrew's App</h1></header>

      <UserForm
        values={formValues}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        user.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}
