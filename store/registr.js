import axios from 'axios'
import { mobailURL } from '@/api'

export const state = () => ({
  registrEmail: '',
  registrPassword: '',
  reToken: '',
  registrPhone: ''
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
  },
  getReToken (state) {
    return state.reToken
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
  },
  setReToken (state, token) {
    state.reToken = token
  }
}
export const actions = {
  // запрос на регистрацию
  async registration ({ commit }, data) {
    const config = {
      method: 'post',
      url: `${mobailURL}/auth/register/`,
      headers: {
        Accept: 'application/json; version=2',
        'Accept-Language': data.lang
      },
      data: {
        username: data.email.toLowerCase(),
        email: data.email.toLowerCase(),
        password: data.password,
        password2: data.password2,
        firstName: data.name,
        fromInfo: 'web interface portfolio',
        phone: data.phone
      }
    }
    axios.defaults.headers.common.Authorization = '' // точно не кидать токен в запросе
    const ans = await axios(config).then(function (response) {
      if (response.data.email_send === 1) {
        commit('setRegistrEmail', data.email)
        commit('setRegistrPhone', data.phone)
        commit('setRegistrPassword', data.password)
      }
      return response
    }).catch((error) => {
      console.error('ошибка в registration', error.response)
      return error.response
    })
    return ans
  },
  // проверка кода при регистрации (телефон)
  async checkRegistrationCodePhone ({ getters }, data) {
    const config = {
      method: 'post',
      url: `${mobailURL}/auth/confirm_phone/`,
      headers: {
        Accept: 'application/json',
        'Accept-Language': data.lang
      },
      data: {
        username: getters.getRegistrEmail.toLowerCase(),
        confirmation: data.code
      }
    }
    axios.defaults.headers.common.Authorization = '' // точно не кидать токен в запросе
    const result = await axios(config).then(function (response) {
      return response
    }).catch((error) => {
      console.error('ошибка в checkRegistration', error.response)
      return error.response
    })
    // console.log('checkRegistration', result)
    return result
  },
  // проверка кода при регистрации (почта)
  async checkRegistrationCodeEmail ({ getters }, data) {
    const config = {
      method: 'post',
      url: `${mobailURL}/auth/confirm_email/`,
      headers: {
        Accept: 'application/json;',
        'Accept-Language': data.lang
      },
      data: {
        username: getters.getRegistrEmail.toLowerCase(),
        confirmation: data.code
      }
    }
    const result = await axios(config).then(function (response) {
      if (response.data.token) {
        axios.defaults.headers.common.Authorization = 'Token ' + response.data.token
        return response
      } else {
        return response
      }
    }).catch((error) => {
      console.error('ошибка в checkRegistration', error.response)
      return error.response
    })
    // console.log('checkRegistration', result)
    return result
  },
  // отправка нового кода на почту
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendCodeEmail ({ commit, dispatch, getters }) {
    const head = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json;',
        'Accept-Language': this.$i18n.locale
      },
      body: JSON.stringify({
        email: getters.getRegistrEmail.toLowerCase()
      })
    }
    try {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const response = await fetch(`${mobailURL}/auth/send_code_email/`, head)
    } catch (e) {
      console.error(e)
    }
  },
  // отправка нового кода на телефон
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendCodePhone ({ commit, dispatch, getters }, data) {
    const head = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json;',
        'Accept-Language': this.$i18n.locale
      },
      body: JSON.stringify({
        username: getters.getRegistrEmail.toLowerCase()
      })
    }
    try {
      await fetch(`${mobailURL}/auth/send_code_phone/`, head)
    } catch (e) {
      console.error(e)
    }
  }
}
