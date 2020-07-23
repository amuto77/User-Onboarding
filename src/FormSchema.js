import * as yup from 'yup'

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  name: yup
    .string()
    .min(3, "name must be at least 3 characters")
    .required("name is Required"),
    password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is Required"),
})

export default formSchema