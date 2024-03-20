import axios from 'axios'
import qs from 'qs'

export const baseURL = 'https://research.ranks.pro/api'
export const portfolioURL = 'https://port.ranks.pro'
export const mobailURL = 'https://mobile.ranks.pro/api'
// export const baseURL = 'https://test.research.ranks.pro/api'
// export const portfolioURL = 'https://test.port.ranks.pro'
// export const mobailURL = 'https://test.mobile.ranks.pro/api'

export function paramsSerializer (params) {
  function filterNonNull (obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([, v]) => {
        if (typeof v === 'undefined' || v === null) {
          return false
        }
        if (typeof v === 'string' && v.length === 0) {
          return false
        }
        return true
      })
    )
  }
  return qs.stringify(filterNonNull(params), { arrayFormat: 'comma' })
}

export const apiService = axios.create({
  baseURL,
  transformRequest: [
    (data, headers) => {
      const accessToken =
        window.$nuxt.$store.state.user.user.access || localStorage.getItem('user.access')
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
      }
      return data
    },
    ...axios.defaults.transformRequest
  ],
  paramsSerializer
})

export const baseApiService = axios.create({
  baseURL,
  paramsSerializer
})

const REFRESH_ENDPOINT = '/api/token/refresh/'

apiService.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    const responseStatus = error?.response?.status

    if (responseStatus === 401 && !originalRequest._retry && originalRequest.url !== REFRESH_ENDPOINT) {
      originalRequest._retry = true
      const accessToken = await window.$nuxt.$store.dispatch('user/tokenRefresh')
      if (accessToken) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken
      } else {
        await window.$nuxt.$store.dispatch('user/logout')
      }
      return apiService(originalRequest)
    }

    if (originalRequest._retry && localStorage.getItem('user')) {
      localStorage.removeItem('user')
      delete axios.defaults.headers.common.Authorization
      return apiService(originalRequest)
    }

    // Логируем ошибки
    if (responseStatus !== 401) {
      const errorData = error.response.data
      let text = 'Неизвестная ошибка'
      if (errorData instanceof Object) {
        text = Object.values(errorData).join(', ')
      } else if (responseStatus) {
        text = 'Сервер недоступен'
      }
      console.error(`Ошибка: ${text}`)
    }
    return Promise.reject(error)
  }
)
