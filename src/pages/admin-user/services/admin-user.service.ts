import axios from 'axios'

export interface User {
  id: string
  username: string
  role: {
    id: number
    name: string
    status: boolean
  }
  status: {
    id: number
    name: string
    status: boolean
  }
  person: {
    id: number
    firstName: string
    secondName: string
    firstSurname: string
    secondSurname: string
    email: string
  } | null
  profile: {
    id: number
    photo: string
    phone: string
    birthDate: string
  } | null
}

export const getAllUsers = async ({
  accessToken
}: {
  accessToken: string
}): Promise<User[]> =>
  (
    await axios.get('/users', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  ).data

export const deleteUser = async ({
  accessToken,
  userId
}: {
  accessToken: string
  userId: string
}) =>
  (
    await axios.delete(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  ).data
