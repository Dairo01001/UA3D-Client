import { ServerEntity } from '@/services'
import axios from 'axios'

export const getServer = async (
  id: string,
  accessToken: string
): Promise<ServerEntity> => {
  return (
    await axios.get(`servers/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  ).data
}
