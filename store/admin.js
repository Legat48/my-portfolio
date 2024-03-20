// import { baseApiService } from '@/api'
import axios from 'axios'
import { portfolioURL } from '@/api'
const apiUrl = portfolioURL

export const state = () => ({
  dialogOpen: false,
  dialogOpenItem: '',
  countryArr: null,
  portfolioInfoArr: null,
  searchPortfolio: '',
  idAllUpdate: '',
  portfolioSelects: null
})

export const getters = {
  getDialogOpen: state => state.dialogOpen,
  getCountryArr: state => state.countryArr,
  getDialogOpenItem: state => state.dialogOpenItem,
  getPortfolioInfoArr: state => state.portfolioInfoArr,
  getPortfolioInfoArrFilter: (state) => {
    if (state.portfolioInfoArr && state.searchPortfolio) {
      return state.portfolioInfoArr.filter((e) => {
        return e.init_value.toLowerCase().includes(state.searchPortfolio.toLowerCase())
      })
    } else {
      return state.portfolioInfoArr
    }
  },
  getPortfolioSelects: state => state.portfolioSelects,
  getPortfolioSearch: state => state.searchPortfolio,
  getPortfolioInfo: state => (id) => {
    return state.portfolioInfoArr.find(e => e.id === id)
  }
}

export const mutations = {
  openDialog: (state) => {
    state.dialogOpen = true
  },
  closeDialog (state) {
    state.dialogOpenItem = null
    state.dialogOpen = false
  },
  setDialogOpenItem: (state, value) => {
    state.dialogOpenItem = value
  },
  setCountryArr: (state, value) => {
    state.countryArr = value
  },
  setIdAllUpdate: (state, taskId) => {
    state.idAllUpdate = taskId
  },
  setPortfolioInfoArr: (state, value) => {
    state.portfolioInfoArr = value
  },
  setPortfolioSelects: (state, value) => {
    state.portfolioSelects = value
  },
  setPortfolioSearch: (state, value) => {
    state.searchPortfolio = value
  }
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  appChangeRIC ({ state, commit }, value) {
    console.log('appChangeRIC', value)
    commit('closeDialog')
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async countryArr ({ state, commit }, data) {
    const config = {
      method: 'post',
      url: `${apiUrl}/portfolio/portfolio_admin/get_data_options_companies/`,
      headers: {
        Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
      }
    }
    return await axios(config)
      .then((response) => {
        if (response.data.options) {
          commit('setCountryArr', response.data.options)
        } else {
          console.error(response)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, require-await
  async portfolioInfoArr ({ state, commit, rootState }, data) {
    const head = {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
      }
    }

    try {
      const response = await fetch(`${apiUrl}/portfolio/portfolio_admin/panel_item/`, head)
      const responseData = await response.json()
      if (responseData) {
        commit('setPortfolioInfoArr', responseData)
      } else {
        console.error(responseData)
      }
    } catch (error) {
      console.error(error)
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async portfolioSelects ({ state, commit, rootState }, data) {
    const config = {
      method: 'post',
      url: `${apiUrl}/portfolio/admin_portfolio_selects/get/`,
      headers: {
        Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
      }
    }
    return await axios(config)
      .then((response) => {
        if (response.data.selects) {
          commit('setPortfolioSelects', response.data.selects)
        } else {
          console.error(response)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async portfoliosAllUpdate ({ state, commit, rootState }, data) {
    state.idAllUpdate = ''
    const config = {
      method: 'post',
      url: `${apiUrl}/portfolio/update_portfolios_all/update/`,
      headers: {
        Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
      }
    }
    return await axios(config)
      .then((response) => {
        if (response.data.taskId) {
          commit('setIdAllUpdate', response.data.taskId)
          return true
        } else {
          console.error(response)
          return false
        }
      })
      .catch((error) => {
        console.error(error)
        return false
      })
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async checkAllUpdate ({ state, commit, rootState }, data) {
    const config = {
      method: 'post',
      url: `${apiUrl}/portfolio/get_status_update_portfolios_all/get/`,
      headers: {
        Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
      },
      data: {
        taskId: state.idAllUpdate
      }
    }
    return await axios(config)
      .then((response) => {
        if (response.data.status === 200 && response.data.statusTask !== 'not completed') {
          return true
        } else {
          console.error(response)
          return false
        }
      })
      .catch((error) => {
        console.error(error)
        return false
      })
  }
}
