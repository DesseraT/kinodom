import Axios, { type AxiosRequestConfig, AxiosError } from 'axios'
import * as Sentry from '@sentry/vue'
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
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (Axios.isCancel(error) || error.message === 'Query was cancelled') {
      return Promise.reject(error)
    }

    const status = error.response?.status

    if (status === 401) {
      Sentry.withScope((scope) => {
        scope.setLevel('fatal')
        scope.setTag('api_client', 'tmdb')
        Sentry.captureMessage('TMDB API Key is invalid or expired!')
      })
    }

    if (!status || status >= 500) {
      Sentry.withScope((scope) => {
        scope.setTag('api_client', 'tmdb')
        scope.setContext('tmdb_request_details', {
          url: error.config?.url,
          method: error.config?.method,
          params: error.config?.params,
          status: status || 'Network Error',
        })

        Sentry.captureException(error)
      })
    }

    // Обязательно пробрасываем ошибку дальше, чтобы её перехватил catch во Vue-компоненте
    return Promise.reject(error)
  },
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
