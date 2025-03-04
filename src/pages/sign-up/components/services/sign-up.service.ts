import { User } from '@/models'
import axios from 'axios'
import { NewPerson } from '../../services/sign-up.service'

interface NewUser {
  username: string
  password: string
}

interface ExistingUser {
  id: string
  username: string
}

export const createNewUser = async ({
  username,
  password
}: NewUser): Promise<User> => {
  return (
    await axios.post('/users', {
      username,
      password
    })
  ).data
}

export const findUserByUsername = async ({
  username
}: {
  username: string
}): Promise<ExistingUser> => (await axios.get(`/users/${username}`)).data

export const createFullPerson = async (data: {
  user: NewUser
  person: Omit<NewPerson, 'userId'>
}) => {
  return (await axios.post('/persons/full', data)).data
}
