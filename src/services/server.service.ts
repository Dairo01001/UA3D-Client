import axios from 'axios'

export interface ServerEntity {
  id: string
  pvtoPort: string
  port: number
  urlHost: string
  gridName: string
  dataSource: string
  dataBaseName: string
  dataBaseUser: string
  dataBasePassword: string
  statusId: number
  status: {
    id: number
    name: string
    status: boolean
  }
}

export const getAllServers = async (): Promise<ServerEntity[]> =>
  (await axios.get('/servers')).data

export const getServerById = async ({
  id,
  accessToken
}: {
  id: string
  accessToken: string
}): Promise<ServerEntity> =>
  (
    await axios.get(`/servers/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  ).data
