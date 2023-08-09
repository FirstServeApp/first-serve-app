import { object, string, InferType, ref } from 'yup'

export const registrationSchema = object({
  name: string().trim().max(24).required(),
  email: string().email().lowercase().trim().max(24).required(),
  password: string().min(6).max(16).trim().required(),
}).required()

export type RegistrationFormData = InferType<typeof registrationSchema>

export const loginSchema = object({
  email: string().email('must be an email').lowercase().trim().max(24).required('must be an email'),
  password: string().min(6).max(16).trim().required(),
}).required()

export type LoginFormData = InferType<typeof loginSchema>

export const emailSchema = object({
  email: string().email().lowercase().trim().max(24).required(),
}).required()

export type EmailFormData = InferType<typeof emailSchema>

export const passwordSchema = object({
  password: string().min(6).max(16).trim().required(),
}).required()

export type PasswordFormData = InferType<typeof passwordSchema>

export const otpSchema = object({
  otp: string().min(4).max(4).trim().required(),
}).required()

export type OTPFormData = InferType<typeof otpSchema>

export const confirmPasswordSchema = object({
  password: string().min(6).max(16).trim().required(),
  confirmPassword: string().min(6).max(16).trim().required().oneOf([ref('password')], 'Passwords does not match'),
}).required()

export type ConfirmPasswordFormData = InferType<typeof confirmPasswordSchema>
