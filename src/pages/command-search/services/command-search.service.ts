import { config } from '@/config/config'
import axios from 'axios'

export const commandSearchService = async (query: string) =>
  (
    await axios.post(config.commandSearchURL, {
      query
    })
  ).data
