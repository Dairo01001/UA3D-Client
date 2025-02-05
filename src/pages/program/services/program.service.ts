import axios from 'axios'
import { ProgramEntity } from '../models'

export const getAllPrograms = async (): Promise<ProgramEntity[]> =>
  (await axios.get('/programs')).data

export const createProgram = async ({ name, facultyId, accessToken }: any) => {
  const response = await axios.post(
    '/programs',
    { name, facultyId },
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  )
  return response.data
}

export const updateProgram = async ({
  id,
  status,
  accessToken
}: {
  id: number
  status: boolean
  accessToken: string
}) => {
  const response = await axios.put(
    `/programs/${id}`,
    { status },
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  )
  return response.data
}
