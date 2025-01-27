import { Seminar } from '@/types'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL
if (!baseURL) {
  throw new Error('VITE_API_URL is not defined')
}

const fetcher = axios.create({ baseURL })

export const getAllSeminars = async () => {
  const response = await fetcher.get('/seminars?limit=1000')
  const { data } = response.data
  return data.seminars as Seminar[]
}

export const getLastUpdatedInfo = async () => {
  const response = await fetcher.get('/seminars/info')
  const { data } = response.data
  return data.lastUpdated as string
}
