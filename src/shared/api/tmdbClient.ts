import Axios, { type AxiosRequestConfig, AxiosError } from 'axios'
interface CancelablePromise<T> extends Promise<T> {
  cancel: () => void
}

const DEFAULT_LANGUAGE = 'ru-Ru'
export const AXIOS_INSTANCE = Axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})
// Request interceptor for auth
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VITE_TMDB_API_KEY
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.params = {
      language: DEFAULT_LANGUAGE,
      ...config.params,
    }
    return config
  },
  (error) => Promise.reject(error),
)

export const tmdbClient = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): CancelablePromise<T> => {
  const controller = new AbortController()

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then(({ data }) => data) as CancelablePromise<T>

  promise.cancel = () => {
    controller.abort('Query was cancelled')
  }

  return promise
}

export type ErrorType<Error> = AxiosError<Error>
export type BodyType<BodyData> = BodyData
