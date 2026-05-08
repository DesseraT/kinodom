import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export const AXIOS_INSTANCE = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.VITE_TMDB_API_KEY}`,
  },
})

export const tmdbClient = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(({ data }) => data)

  promise.cancel = () => {
    source.cancel('Query was cancelled by Orval')
  }

  return promise
}
