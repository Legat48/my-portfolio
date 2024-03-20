import axios from 'axios'
import { mobailURL } from '@/api'

export const state = () => ({
  confirmUser: ''
})

export const getters = {
  getConfirmUser (state) {
    return state.confirmUser
  }
}
export const mutations = {
  setConfirmUser (state, value) {
    state.confirmUser = value
  }
}
export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resetPassword ({ commit }, data) {
    const config = {
      method: 'post',
      url: `${mobailURL}/auth/reset_password/`,
      headers: {
        Accept: 'application/json',
        'Accept-Language': data.lang
      },
      data
    }
    // точно случайно не отправить токен
    delete axios.defaults.headers.common.Authorization

    const ans = await axios(config).then((response) => {
      return response
    }).catch((error) => {
      return error.response
    })
    return ans
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async newPass ({ commit, dispatch, getters }, data) {
    const config = {
      method: 'post',
      url: `${mobailURL}/auth/confirm_reset_password_universal/`,
      headers: {
        Accept: 'application/json',
        'Accept-Language': data.lang
      },
      data: {
        user: getters.getConfirmUser.toLowerCase(),
        password: data.password,
        confirmation: data.code
      }
    }
    if (getters.getConfirmUser && getters.getConfirmUser.includes('@')) {
      config.data.isEmail = true
    } else {
      config.data.isEmail = false
    }
    const result = await axios(config).then((response) => {
      return response
    }).catch((error) => {
      console.error('ошибка', error.response)
      return error.response
    })
    return result
  },
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
        email: getters.getConfirmUser.toLowerCase()
      })
    }
    try {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const response = await fetch(`${mobailURL}/auth/send_code_email/`, head)
    } catch (e) {
      console.error(e)
    }
  },
  // запрос на привязку телефона по новой к почте
  async sendNewPhone ({ getters }, data) {
    const config = {
      method: 'post',
      url: `${mobailURL}/auth/set_phone_for_old_user/`,
      headers: {
        Accept: 'application/json',
        'Accept-Language': data.lang
      },
      data: {
        phone: getters.getConfirmUser
      }
    }
    const ans = await axios(config).then(function (response) {
      return response
    }).catch((error) => {
      console.error('ошибка', error.response)
      return error.response
    })
    return ans
  }
}
