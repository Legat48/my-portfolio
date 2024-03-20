/* eslint-disable no-console */
import axios from 'axios'
import { apiService, portfolioURL } from '@/api'
const apiUrl = portfolioURL

export const state = () => ({
  purchases: [],
  count: null,
  next: null,
  previous: null,
  mobFilter: false,
  dateFrom: '',
  dateTo: '',
  filterName: '',
  isLoading: 0
})

export const getters = {
  getPurchases: state => state.purchases,
  getFilterPurchases: (state) => {
    let purchases = JSON.parse(JSON.stringify(state.purchases))
    if (state.filterName.length) {
      const filter = state.filterName.toLowerCase()
      purchases = purchases.filter((e) => {
        const initValueLowerCase = e.initValue ? e.initValue.toLowerCase() : ''
        const initValueRusLowerCase = e.initValueRus ? e.initValueRus.toLowerCase() : ''

        return initValueLowerCase.includes(filter) || initValueRusLowerCase.includes(filter)
      })
    }
    if (state.dateFrom) {
      const date = new Date(state.dateFrom).getTime()
      purchases = purchases.filter(e => date < new Date(e.datePaid).getTime())
    }
    if (state.dateTo) {
      const date = new Date(state.dateTo).getTime()
      purchases = purchases.filter(e => date > new Date(e.datePaid).getTime())
    }
    return purchases
  },
  getFilterExists: state => state.filterName.length || state.dateFrom || state.dateTo,
  getCount: state => state.count,
  getMobFilter: state => state.mobFilter,
  getDateFrom: state => state.dateFrom,
  getDateTo: state => state.dateTo,
  getFilterName: state => state.filterName,
  getCompanies (state) {
    const companies = []
    for (let i = 0; i < state.purchases.length; i++) {
      for (let j = 0; j < state.purchases[i].companies.length; j++) {
        companies.push(state.purchases[i].companies[j])
      }
    }
    return companies
  },
  allPdfsLoaded (state) {
    if (state.purchases.length) {
      for (let i = 0; i < state.purchases.length; i++) {
        if (state.purchases[i].companies) {
          for (let j = 0; j < state.purchases[i].companies.length; j++) {
            if (!('get pdfInfo' in state.purchases[i].companies[j])) {
              return false
            }
          }
        }
      }
      return true
    }
  },
  getIsLoading (state) {
    return state.isLoading
  }
}

export const mutations = {
  clear: (state) => {
    state.purchases = []
    state.count = null
    state.previous = null
  },
  setMobFilter: (state) => {
    state.mobFilter = !state.mobFilter
  },

  setPortfolios: (state, data) => {
    // Преобразование реактивных объектов в обычные объекты
    const plainResults = data.portfolios.map(obj => JSON.parse(JSON.stringify(obj)))
    // Сортировка массива по полю created
    const sortedResults = plainResults.sort((a, b) => new Date(b.dateUnloading) - new Date(a.dateUnloading))
    const newData = {}
    sortedResults.forEach((e) => {
      if (newData[`${e.order_id_init_subscription}${e.initValue}`]) {
        if (Array.isArray(newData[`${e.order_id_init_subscription}${e.initValue}`].fileUrl)) {
          newData[`${e.order_id_init_subscription}${e.initValue}`].fileUrl.push(e.fileUrl)
        } else {
          newData[`${e.order_id_init_subscription}${e.initValue}`].fileUrl = [newData[`${e.order_id_init_subscription}${e.initValue}`].fileUrl]
          newData[`${e.order_id_init_subscription}${e.initValue}`].fileUrl.push(e.fileUrl)
        }
        if (Array.isArray(newData[`${e.order_id_init_subscription}${e.initValue}`].fileXls)) {
          newData[`${e.order_id_init_subscription}${e.initValue}`].fileXls.push(e.fileXls)
        } else {
          newData[`${e.order_id_init_subscription}${e.initValue}`].fileXls = [newData[`${e.order_id_init_subscription}${e.initValue}`].fileXls]
          newData[`${e.order_id_init_subscription}${e.initValue}`].fileXls.push(e.fileXls)
        }
        if (Array.isArray(newData[`${e.order_id_init_subscription}${e.initValue}`].dateUnloading)) {
          newData[`${e.order_id_init_subscription}${e.initValue}`].dateUnloading.push(e.dateUnloading)
        } else {
          newData[`${e.order_id_init_subscription}${e.initValue}`].dateUnloading = [newData[`${e.order_id_init_subscription}${e.initValue}`].dateUnloading]
          newData[`${e.order_id_init_subscription}${e.initValue}`].dateUnloading.push(e.dateUnloading)
        }
      } else {
        newData[[`${e.order_id_init_subscription}${e.initValue}`]] = e
      }
    })
    const sortedPurchases = Object.values(newData).sort((a, b) => b.order_id - a.order_id)
    state.purchases = sortedPurchases
    state.count = data.count
    state.next = data.next
    state.previous = data.previous
  },
  setIsLoading (state, data) {
    state.isLoading = isNaN(data) ? 0 : state.isLoading = data
  },
  setFilterName (state, value) {
    state.filterName = value
  },
  setDateFrom (state, value) {
    state.dateFrom = value
  },
  setDateTo (state, value) {
    state.dateTo = value
  },
  resetState (state) {
    state.purchases = []
    state.count = null
    state.next = null
    state.previous = null
    state.dateTo = ''
    state.mobFilter = true
    state.dateFrom = ''
    state.filterName = ''
    state.isLoading = 0
  },
  setCompanyDataToOrder (state, data) {
    state.purchases = state.purchases.map((x) => {
      if ('companies' in x) {
        if (x.uuid === data.orderId) {
          x.companies.push(data.data)
          return x
        } else {
          return x
        }
      } else if (x.uuid === data.orderId) {
        return {
          ...x,
          companies: [data.data]
        }
      } else {
        return x
      }
    })
  }
}

export const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  async fetchOrders ({ commit }) {
    commit('clear')
    const config = {
      method: 'get',
      url: `${apiUrl}/orders/`,
      headers: {
        Accept: 'application/json;',
        'Accept-Language': this.$i18n.locale
      }
    }
    try {
      const res = await apiService(config)
      if (res.data.portfolios) {
        commit('setPortfolios', res.data)
      }
    } catch (error) {
      console.error(error)
    }
  },

  async fetchAllOrdersDetails ({ state, dispatch }) {
    const сompaniesArr = []
    const pdfListArr = []
    if (state.purchases) {
      for (let i = 0; i < state.purchases.length; i++) {
        // console.log(state.purchases[i])
        сompaniesArr.push(...state.purchases[i].svodList.map((x) => {
          return {
            item: x,
            uuid: state.purchases[i].uuid
          }
        }))
        pdfListArr.push(
          {
            id: state.purchases[i].id,
            uuid: state.purchases[i].uuid
          }
        )
      }
      await dispatch('fetchCompanies', сompaniesArr)
      // console.log('all companies fetched')
      await dispatch('fetchPdfs', pdfListArr)
      // console.log('all pdfs fetched')
    }
  },

  async fetchCompanies ({ commit }, order) {
    for (let i = 0; i < order.length; i++) {
      const config = {
        method: 'get',
        url: `${process.env.API_ENDPOINT}/svod_for_research/${order[i].item}/`
      }
      try {
        const res = await apiService(config)
        commit('setIsLoading', Math.min(i / (order.length - 1), 0.90))
        commit('setCompanyDataToOrder', {
          data: res.data,
          orderId: order[i].uuid
        })
      } catch (error) {
        console.error(error)
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async purchase ({ context }, data) {
    const config = {
      method: 'post',
      url: `${apiUrl}/orders/`,
      data,
      headers: {
        Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
      }
    }
    return await axios(config)
      .then((response) => {
        if (response.data.url) {
          return response
        } else {
          console.error(response)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

}
