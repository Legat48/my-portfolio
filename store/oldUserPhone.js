import axios from 'axios'
import { baseURL } from '@/api/'

export const state = () => ({
  registrEmail: '',
  registrPassword: '',
  registrPhone: '',
  registrCodeError: '',
  step: 'login'
})

export const getters = {
  getRegistrEmail (state) {
    return state.registrEmail
  },
  getRegistrPhone (state) {
    return state.registrPhone
  },
  getRegistrPassword (state) {
    return state.registrEmail
  }
}

export const mutations = {
  setRegistrEmail (state, email) {
    state.registrEmail = email
  },
  setRegistrPhone (state, phone) {
    state.registrPhone = phone
  },
  setRegistrPassword (state, pass) {
    state.pass = pass
  }
}
export const actions = {
  // запрос на привязку телефона по новой к почте
  async sendNewPhone ({ commit }, data) {
    const config = {
      method: 'post',
      url: `${baseURL}/phone_for_old_users/set_phone_for_old_user/`,
      headers: {
        Accept: 'application/json',
        'Accept-Language': data.lang
      },
      data: {
        phone: data.phone
      }
    }
    const ans = await axios(config).then(function (response) {
      if (response.status === 200) {
        commit('setRegistrPhone', data.phone)
      }
      return response
    }).catch((error) => {
      console.error('ошибка в registration', error.response)
      return error.response
    })
    return ans
  },
  // проверка кода при регистрации (телефон)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async checkRegistrationCodePhone ({ getters }, data) {
    const config = {
      method: 'post',
      url: `${baseURL}/phone_for_old_users/confirm_phone_for_old_user/`,
      headers: {
        Accept: 'application/json',
        'Accept-Language': data.lang
      },
      data: {
        username: data.email,
        confirmation: data.code
      }
    }
    const result = await axios(config).then(function (response) {
      return response
    }).catch((error) => {
      console.error('ошибка в checkRegistration', error.response)
      return error.response
    })
    // console.log('checkRegistration', result)
    return result
  }
}
