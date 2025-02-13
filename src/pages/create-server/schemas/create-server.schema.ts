import { number, object, string, z } from 'zod'

export const CreateServerSchema = object({
  port: number({
    required_error: 'Port is required'
  }).min(9000, { message: 'El puerto no puede ser menor a 9000' }),
  gridName: string({
    required_error: 'Server name is required'
  }).min(1, { message: 'El nombre del servidor no puede estar vacío' })
})

export type CreateServerInput = z.infer<typeof CreateServerSchema>
