import { config } from '@/config/config'
import axios from 'axios'

interface IEditFile {
  filePath: string
  content: string
}

export const editFile = async (data: IEditFile) => {
  return (await axios.put(config.pvtoManagerUrl + '/server/file', data)).data
}
