import axios from 'axios'
import { apiService, portfolioURL } from '@/api'
const apiUrl = portfolioURL

export const state = () => ({
  discountInfo: {},
  promocode: null,
  orderArr: {},
  orderInfo: {}
})

export const getters = {
  getOrderInfo: state => state.orderInfo,
  getDiscountInfo: (state) => {
    // const obg = state.discountInfo
    // Создаем новый объект с измененным массивом
    // const newObg = { priceArr: obg.priceArr?.length === 3 ? [...obg.priceArr, obg.priceArr[2]] : obg.priceArr, oldPriceArr: obg.oldPriceArr?.length === 3 ? [...obg.oldPriceArr, obg.oldPriceArr[2]] : obg.oldPriceArr }

    return state.discountInfo
  },
  getOrderArr: state => state.orderArr,
  getPromocode: state => state.promocode
}

export const mutations = {
  setDiscountInfo: (state, data) => { state.discountInfo = data },
  setOrderInfo: (state, value) => { state.orderInfo = value },
  setPromocode: (state, data) => { state.promocode = data },
  setOrderArr: (state, data) => {
    const prices = data.prices

    const orderArr = data.country.map((country, index) => {
      const newItem = { ...country } // Поверхностное копирование объекта
      newItem.discount = prices[index]
      newItem.choice = 0
      return newItem
    })
    state.orderArr = orderArr
  },
  setOrderArrChoice: (state, data) => {
    state.orderArr[data.index].choice = data.choice
  },
  clearAll (state) {
    state.discountInfo = {}
    state.promocode = null
    state.orderInfo = {}
    localStorage.removeItem('cart')
  }
}
export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createOrder ({ state, commit, rootGetters }, data) {
    let promo
    if (data.promocode) {
      promo = data.promocode
    } else if (state.promocode) {
      promo = state.promocode
    } else {
      promo = ''
    }
    const subscriptions = []
    rootGetters['countries/getSelectedCountries'].forEach((e) => {
      subscriptions.push({ init_field: e.name })
    })
    const dataObg = {
      subscriptions,
      currency: data.currency,
      email: data.email,
      promocode: promo
    }
    const config = {
      method: 'post',
      url: `${apiUrl}/get-prices-months_post/`,
      data: dataObg
    }

    return await apiService(config).then((response) => {
      commit('setOrderArr', { country: rootGetters['countries/getSelectedCountries'], prices: response.data.subscriptionsPriceArr })
      commit('setDiscountInfo', response.data.basePrice)
    })
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async checkPromo ({ state, commit }, data) {
    // console.log('checkPromo', data)
    const config = {
      method: 'get',
      url: `${apiUrl}/verify-promocode/`,
      params: {
        promocode: data.promocode,
        email: data.email
      }
    }
    await apiService(config)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((response) => {
        // console.log(response.data)
      })
  },
  async checkOrder ({ state }) {
    const config = {
      method: 'get',
      url: `${apiUrl}/order-status/`,
      params: {
        id: state.orderInfo.id
      }
    }
    return await axios(config)
      .then((response) => {
        if (response.data.status === 'success') {
          return true
        }
        return false
      })
      .catch(function (error) {
        console.error(error)
        return false
      })
  }

}
