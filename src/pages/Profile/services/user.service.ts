import { User } from '@/models'
import axios from 'axios'
import { IProfile, UserProfile } from '../models'

export const getMe = async (user: User): Promise<UserProfile> => {
  return (
    await axios.get('/users/me', {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    })
  ).data
}

export const upsertMe = async (
  accessToken: string,
  profile: Omit<IProfile, 'id'>
): Promise<IProfile> => {
  return (
    await axios.patch('/profiles', profile, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  ).data
}
