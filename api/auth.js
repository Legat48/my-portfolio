import axios from 'axios'
import { apiService, baseURL } from '@/api/'

class AuthService {
  async login (user) {
    // const response = await apiService.post('token/', {
    //   email: user.email,
    //   password: user.password,
    //   lang: user.lang
    // })

    const config = {
      method: 'post',
      url: `${baseURL}/token_email_or_phone/`,
      headers: {
        Accept: 'application/json',
        'Accept-Language': user.lang
      },
      data: {
        password: user.password
      }
    }

    if (user.user.includes('@')) {
      config.data.email = user.user.toLowerCase()
    } else {
      config.data.phone = user.user
    }
    const response = await axios(config).then((response) => {
      if (response.data.access) {
        localStorage.setItem('token', response.data.access)
        axios.defaults.headers.common.Authorization = 'Token ' + response.data.access
        return response
      }
    }).catch((error) => {
      console.error(error)
      return error.response
    })

    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify(response.data))
      window.$nuxt.$store.commit('user/initializeStore')
    }

    return response.data
  }

  async refresh () {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.refresh) {
      try {
        const response = await axios.post('/token/refresh/', {
          refresh: user.refresh
        })
        if (response.data.access) {
          user.access = response.data.access
          localStorage.setItem('user', JSON.stringify(user))
          return response.data.access
        }
      } catch (e) {
        return null
      }
    }

    return null
  }

  async registration (user) {
    const response = await apiService.post('/register/', user)
    return response
  }

  async verify (data) {
    const response = await apiService.get(`/verify/${data}`)
    return response.data
  }

  async setProfileLanguage (lang) {
    const response = await apiService.post('/profile/', {
      language: lang
    })
    return response.data
  }

  async resetPassword (data) {
    const response = await apiService.post(`/reset/${data.url}/`, {
      new_password: data.newPassword,
      new_password_confirm: data.newPasswordConfirm,
      portfolio: '1',
      language: data.language
    })
    return response.data
  }

  async passwordChange (data) {
    const config = {
      method: 'post',
      url: `${baseURL}/profile/password/`,
      headers: {
        Accept: 'application/json',
        'Accept-Language': data.lang
      },
      data
    }
    const response = await axios(config).then((response) => {
      return response
    }).catch((error) => {
      console.error(error)
      return error.response
    })
    return response
  }

  async personalDataChange (data) {
    const response = await apiService.post('profile/', data)
    return response.data
  }

  logout () {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
