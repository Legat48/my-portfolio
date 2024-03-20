import axios from 'axios'
import AuthService from '@/api/auth'
import { apiService, baseApiService } from '@/api'

// нужен отдельны объект для сброса в resetState
const getDefaultState = () => {
  return {
    user: {
      access: '',
      refresh: ''
    },
    profile: {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      isStaff: false,
      isSuperuser: false
    },
    uuidPasswordReset: null,
    currency: 'RUB',
    requestErrors: null,
    phRubPromoSystem: {
      1: 6000,
      3: 5000,
      5: 4500,
      10: 4000,
      30: 3500,
      100: 3000
    },
    phUsdPromoSystem: {
      1: 70,
      3: 60,
      5: 50,
      10: 45,
      30: 40,
      100: 35
    }
  }
}
export const state = getDefaultState()

export const getters = {
  getCurrency (state) {
    return state.currency
  },
  getEmail (state) {
    return state.profile.email
  },
  getProfile (state) {
    return state.profile
  },
  getAdmin (state) {
    if (state.profile.isStaff || state.profile.isSuperuser) {
      return true
    } else {
      return false
    }
  },
  allCurrencies () {
    return [
      {
        code: 'RUB',
        lang: 'RU',
        symbol: '₽'
      },
      {
        code: 'USD',
        lang: 'EU',
        symbol: '$'
      }
    ]
  },
  auth (state) {
    return !!state.user.access
  },
  access (state) {
    return state.user.access
  }
}

export const mutations = {
  initializeStore (state) {
    if (localStorage.getItem('user')) {
      state.user.access = JSON.parse(localStorage.getItem('user')).access
      state.user.refresh = JSON.parse(localStorage.getItem('user')).refresh
      if (state.user.access) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + state.user.access
      }
    } else {
      state.user.access = ''
      delete axios.defaults.headers.common.Authorization
      state.user.refresh = ''
    }
  },
  setRequestError (state, data) {
    state.requestErrors = data
  },
  setFirstName (state, data) {
    state.profile.firstName = data
  },
  setLastName (state, data) {
    state.profile.lastName = data
  },
  setEmail (state, data) {
    state.profile.email = data
  },
  setCurrency (state, data) {
    state.currency = data
  },
  setAccessToken (state, access) {
    if (access) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + access
    } else {
      delete axios.defaults.headers.common.Authorization
    }
    state.user.access = access
  },
  setError (state, data) {
    state.error = data
  },
  setUuid (state, data) {
    state.uuidPasswordReset = data
  },
  setProfileData (state, data) {
    state.profile = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      isPhoneConfirmed: data.isPhoneConfirmed,
      isStaff: data.isStaff,
      isSuperuser: data.isSuperuser
    }
  },
  resetState (state) {
    Object.assign(state, getDefaultState())
  }
}
export const actions = {
  fetchCurrency ({ commit }) {
    if (localStorage.getItem('currency')) { commit('setCurrency', localStorage.getItem('currency')) } else {
      commit('setCurrency', 'USD')
      localStorage.setItem('currency', 'USD')
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async passwordChange ({ context }, data) {
    return await AuthService.passwordChange(data)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async personalDataChange ({ context }, data) {
    return await AuthService.personalDataChange(data)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setProfileLanguage ({ context }, lang) {
    await AuthService.setProfileLanguage(lang)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async passwordRecovery ({ context }, data) {
    const config = {
      method: 'post',
      url: '/reset-password/',
      data
    }
    await baseApiService(config)
      .then((response) => {
        return response.data
      })
  },
  async tokenRefresh ({ commit }) {
    // console.log('refreshing token')
    commit('setAccessToken', await AuthService.refresh())
  },
  async fetchProfileData ({ commit, dispatch }) {
    const config = {
      method: 'get',
      url: '/profile/'
    }
    try {
      await apiService(config)
        .then((response) => {
          // console.log(response)
          commit('setProfileData', response.data)
          dispatch('setProfileLanguage', this.$i18n.locale)
        })
    } catch (e) {
      // this.$router.back()
    }
  },
  async verify ({ commit }, data) {
    try {
      await AuthService.verify(data)
      commit('dialog/setDialogComponent', 'BaseLogin')
    } catch (e) {
      console.error(e)
      commit('setRequestError', e.response)
      commit('dialog/setDialogComponent', 'ErrorMessage')
    }
  },

  async resetPassword ({ commit }, data) {
    await AuthService.resetPassword(data)
    commit('dialog/setDialogComponent', 'BaseLogin')
    commit('dialog/setDialogComponent', 'PasswordReset')
  },

  resetState ({ commit }) {
    commit('resetState')
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login ({ commit, dispatch }, data) {
    try {
      const resp = await AuthService.login(data)
      await commit('initializeStore')
      await dispatch('fetchProfileData')
      return resp
    } catch (e) {
      return e.response
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async registration (context, user) {
    try {
      return await AuthService.registration(user)
    } catch (e) {
      return e
    }
  },

  async logout ({ commit, dispatch }) {
    await AuthService.logout()
    dispatch('purchases/resetState', '', { root: true })
    // commit('cart/clearAll', '', { root: true })
    dispatch('resetState')
    commit('initializeStore')
  }
}
