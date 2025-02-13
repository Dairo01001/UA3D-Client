import { object, string, z } from 'zod'

export const CreateServerSchema = object({
  port: string({
    required_error: 'Port is required'
  }),
  gridName: string({
    required_error: 'Server name is required'
  }).min(1, { message: 'El nombre del servidor no puede estar vacío' })
})

export type CreateServerInput = z.infer<typeof CreateServerSchema>
