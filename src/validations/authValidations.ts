import { object, string, InferType, ref } from 'yup'

export const registrationSchema = object({
  name: string().trim().max(24).required('Name is a required field'),
  email: string()
    .email('Email must include an \'@\' character')
    .lowercase().trim().max(128, 'Email must be at most 128 characters')
    .required('Email is a required field'),
  password: string().min(6).max(16).trim().required('Password is a required field'),
}).required()

export type RegistrationFormData = InferType<typeof registrationSchema>

export const loginSchema = object({
  email: string()
    .email('Email must include an \'@\' character')
    .lowercase().trim().max(128, 'Email must be at most 128 characters')
    .required('Email is a required field'),
  password: string().min(6).max(16).trim().required('Password is a required field'),
}).required()

export type LoginFormData = InferType<typeof loginSchema>

export const emailSchema = object({
  email: string()
    .email('Email must include an \'@\' character')
    .lowercase().trim().max(128, 'Email must be at most 128 characters')
    .required('Email is a required field'),
}).required()

export type EmailFormData = InferType<typeof emailSchema>

export const passwordSchema = object({
  password: string().min(6).max(16).trim().required('Password is a required field'),
}).required()

export type PasswordFormData = InferType<typeof passwordSchema>

export const otpSchema = object({
  otp: string().min(4).max(4).trim().required('OTP is a required field'),
}).required()

export type OTPFormData = InferType<typeof otpSchema>

export const confirmPasswordSchema = object({
  password: string().min(6).max(16).trim().required('Password is a required field'),
  confirmPassword: string().min(6).max(16).trim().required('Confirm password is a required field')
    .oneOf([ref('password')], 'Passwords does not match'),
}).required()

export type ConfirmPasswordFormData = InferType<typeof confirmPasswordSchema>

export const changeNameSchema = object({
  name: string().trim().max(64).required('Name is a required field'),
}).required()

export type ChangeNameFormData = InferType<typeof changeNameSchema>
