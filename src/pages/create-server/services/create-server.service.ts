import axios from 'axios'
import { CreateServerInput } from '../schemas'

export const createServer = async ({
  data,
  accessToken
}: {
  data: CreateServerInput
  accessToken: string
}) => {
  const newServer = { ...data, port: Number(data.port) }
  return (
    await axios.post(`servers/create`, newServer, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  ).data
}
