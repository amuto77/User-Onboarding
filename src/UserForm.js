import React from 'react'

export default function UserForm(props) {
  const {
    values,
    submit,
    inputChange,
    checkboxChange,
    disabled,
    errors,
  } = props

  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }

  const onCheckboxChange = evt => {
    const { name, checked } = evt.target
    checkboxChange(name, checked)
  }

  const onInputChange = evt => {
    const { name, value } = evt.target
    inputChange(name, value)
  }

  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='form-group submit'>
        <h2>Add a User</h2>

        {/* 🔥 DISABLE THE BUTTON */}
        <button disabled={disabled}>submit</button>

        <div className='errors'>
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
        </div>
      </div>

      <div className='form-group inputs'>
        <h4>General information</h4>
        <label>Name&nbsp;
          <input
            value={values.name}
            onChange={onInputChange}
            name='name'
            type='text'
          />
        </label>

        <label>Email
          <input
            value={values.email}
            onChange={onInputChange}
            name='email'
            type='text'
          />
        </label>

        <label>Password
          <input
            value={values.password}
            onChange={onInputChange}
            name='password'
            type='text'
          />
        </label>

      <div className='Terms of Service'>
        <h4>Terms of Service</h4>
        <label>Yes
          <input
            type="checkbox"
            name='yes'
            checked={values.service.yes === true}
            onChange={onCheckboxChange}
          />
        </label>

        <label>No
          <input
            type="checkbox"
            name='no'
            checked={values.service.no === true}
            onChange={onCheckboxChange}
          />
        </label>
      </div>
    </div>
    </form>
  )
}
