import { config } from '@/config/config'
import axios from 'axios'

interface Archive {
  path: string
  content: string
}

interface Archives {
  myWorldFile: Archive
  regionFile: Archive
}

export const getArchives = async (
  gridName: string | undefined
): Promise<Archives> =>
  (await axios.get(config.openManagerUrl + '/server/files/' + gridName)).data
