import { object, string, InferType } from 'yup'

export const opponentNameSchema = object({
  opponentName: string().trim().max(16),
}).required()

export type OpponentNameFormData = InferType<typeof opponentNameSchema>
