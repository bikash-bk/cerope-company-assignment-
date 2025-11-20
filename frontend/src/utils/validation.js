import * as yup from 'yup';

// Only letters and spaces for name (no numbers)
const nameRegex = /^[A-Za-z\s]+$/;

const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain an upper case letter')
  .matches(/[a-z]/, 'Password must contain a lower case letter')
  .matches(/\d/, 'Password must contain a number')
  .matches(/[^A-Za-z0-9]/, 'Password must contain a special character');

export const signupSchema = yup.object({
  name: yup
    .string()
    .matches(nameRegex, 'Invalid Name! Please Do Not Enter Numerals.')
    .required('Name required'),

  email: yup
    .string()
    .email('Invalid Email Address !')
    .required('Email required'),

  password: passwordSchema,

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords Don't Match.")
    .required('Confirm password required'),

  agree: yup
    .bool()
    .oneOf([true], 'Please Tick The Checkbox To Agree To The Terms .'),
});
