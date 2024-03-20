import { baseApiService, portfolioURL } from '@/api'
import filterCountries from '~/helpers/filterCountries'
import countPortfolio from '~/helpers/countPortfolio'
import oneTierPortfolioArr from '~/helpers/oneTierPortfolioArr'
const apiUrl = portfolioURL

export const state = () => ({
  countries: {},
  hotCountries: {},
  selectedCountries: [],
  showCountriesGroup: [],
  tableMode: true,
  hotOpen: false,
  filter: ''
})

export const getters = {
  getCountries: (state) => {
    const countries = JSON.parse(JSON.stringify(state.countries))
    if (state.filter.length) {
      return filterCountries(countries, state.filter)
    }
    return countries
  },
  getHotOpen: state => state.hotOpen,
  getSelectedCountries: state => state.selectedCountries,
  getTableMode: state => state.tableMode,
  getHotCountries (state) {
    return state.hotCountries
  },
  getFilter (state) {
    return state.filter
  },
  getOneTierPortfolioArr (state) {
    const countries = JSON.parse(JSON.stringify(state.countries))
    if (state.filter.length) {
      return oneTierPortfolioArr(countries, state.filter)
    }
    return oneTierPortfolioArr(countries)
  },
  getCountPortfolio (state) {
    const countries = JSON.parse(JSON.stringify(state.countries))
    if (state.filter.length) {
      return countPortfolio(filterCountries(countries, state.filter))
    }
    return countPortfolio(countries)
  }
}

export const mutations = {
  setCountries: (state, data) => {
    state.countries = data
  },
  setTableMode: (state, data) => {
    state.tableMode = data
  },
  setHotOpen: (state, data) => {
    state.hotOpen = data
  },
  setFilter (state, data) {
    if (data) {
      state.filter = data
    } else {
      state.filter = ''
    }
    localStorage.setItem('filterCountries', state.filter)
  },
  setHotCountries (state, data) {
    state.hotCountries = data.data
  },
  setSelectedCountries (state, data) {
    state.selectedCountries = data
    // localStorage.setItem('selectedCountries', JSON.stringify(data))
  },
  pushSelectedCountries (state, data) {
    state.selectedCountries.push(data)
    // localStorage.setItem('selectedCountries', JSON.stringify(state.selectedCountries))
  },
  removeSelectedCountries (state, data) {
    state.selectedCountries = state.selectedCountries.filter(x => x.name !== data.name)
    // localStorage.setItem('selectedCountries', JSON.stringify(state.selectedCountries))
  },
  setShowCountriesGroup (state, data) {
    state.showCountriesGroup = data
  },
  pushShowCountriesGroup (state, data) {
    state.showCountriesGroup.push(data)
  },
  removeShowCountriesGroup (state, data) {
    state.showCountriesGroup = state.showCountriesGroup.filter(x => x.name !== data.name)
  },
  selectCountries (state, country) {
    if (country.initValue) {
      country.name = country.initValue
      country.nameRus = country.initValueRus
    }

    const foundIndex = state.selectedCountries.findIndex(selectedCountry => selectedCountry.name === country.name)

    if (foundIndex === -1) {
      state.selectedCountries.push(country)
    } else {
      state.selectedCountries.splice(foundIndex, 1)
    }
    // localStorage.setItem('selectedCountries', JSON.stringify(state.selectedCountries))
  },
  showCountriesGroup (state, country) {
    const index = state.showCountriesGroup.indexOf(country.name)
    if (index === -1) {
      state.showCountriesGroup.push(country.name)
    } else {
      state.showCountriesGroup = state.showCountriesGroup.filter(name => name !== country.name)
    }
  }
}

export const actions = {
  async fetchCountries ({ commit, state }) {
    const config = {
      method: 'get',
      url: `${apiUrl}/countries/`
    }

    try {
      const response = await baseApiService(config)
      commit('setCountries', response.data)
      for (const country of state.countries) {
        if (country.children && country.children[0]) {
          for (const children of country.children) {
            commit('pushShowCountriesGroup', children.name)
          }
        }
        commit('pushShowCountriesGroup', country.name)
      }
    } catch (error) {
      console.error(error)
    }
  },
  async fetchHotCountries ({ commit }) {
    const config = {
      method: 'get',
      url: `${apiUrl}/portfolio/hot_portfolios/get/`
    }
    try {
      const response = await baseApiService(config)
      commit('setHotCountries', response.data)
    } catch (error) {
      console.error(error)
    }
  },
  showCountriesGroup ({ state, commit }, country) {
    const index = state.showCountriesGroup.indexOf(country.name)
    if (index === -1) {
      commit('pushShowCountriesGroup', country.name)
    } else {
      commit('removeShowCountriesGroup', country.name)
    }
  }
}
