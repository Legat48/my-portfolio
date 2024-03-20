import extend from '../utils/extend-vue-app'
import funcFilterCountries from '~/helpers/filterCountries'
import getCountries from '~/helpers/getCountries'
export default function ({ app }) {
  extend(app, {
    async mounted () {
      // авторизация через локалсторадж
      this.$store.commit('user/initializeStore')
      // если авторизован:
      if (window.$nuxt.$store.state.user.user.access) {
        await this.$store.dispatch('user/fetchProfileData')
        await this.$store.dispatch('purchases/fetchOrders')
        // загрузка покупок, сейчас во время открытия модалки будет работать
      }
      // проверка языка
      // if (navigator.language === 'ru-RU' && this.$i18n.locale !== 'ru' && !this.$store.getters['user/auth']) {
      //   this.$i18n.setLocale('ru')
      // } else if (navigator.language === 'en-US' && this.$i18n.locale !== 'en' && !this.$store.getters['user/auth']) {
      //   this.$i18n.setLocale('en')
      // }

      // Load selectedCountries and filter from localStorage
      // const selectedCountriesData = localStorage.getItem('selectedCountries')
      // if (selectedCountriesData) {
      //   const parsedSelectedCountries = JSON.parse(selectedCountriesData)
      //   this.$store.commit('countries/setSelectedCountries', parsedSelectedCountries)
      // }

      const filterCountries = localStorage.getItem('filterCountries')
      if (filterCountries) {
        this.$store.commit('countries/setFilter', filterCountries)
      }

      // загружено всё
      // обработка ссылки
      const urlSearchParams = new URLSearchParams(window.location.search)
      const params = Object.fromEntries(urlSearchParams.entries())
      if (params.country) {
        const countries = JSON.parse(JSON.stringify(window.$nuxt.$store.state.countries.countries))
        const item = funcFilterCountries(countries, params.country)
        if (item) {
          const country = getCountries(countries, params.country)
          if (country !== null) {
            this.$store.commit('countries/selectCountries', country)
            await this.$store.dispatch('order/createOrder', {
              length: this.$store.getters['countries/getSelectedCountries'].length,
              currency: this.$store.state.user.currency,
              lang: this.$nuxt.$i18n.locale
            })
            this.$store.commit('dialog/setDialogComponent', 'ShoppingBasket')
          }
        }
      }
      if (this.$i18n.locale === 'ru') {
        this.$store.commit('user/setCurrency', 'RUB')
      } else {
        this.$store.commit('user/setCurrency', 'USD')
      }

      document.addEventListener('click', (event) => {
        const clickedDialog = event.currentTarget.querySelector('.dialog')
        if (clickedDialog && event.target === clickedDialog) {
          this.$store.commit('dialog/closeDialog')
        }
        const clickedSubDialog = event.currentTarget.querySelector('.sub-dialog')
        if (clickedSubDialog && event.target === clickedSubDialog) {
          this.$store.commit('dialog/closeSubDialog')
        }
        const clickedAdminDialog = event.currentTarget.querySelector('.admin-dialog')
        if (clickedAdminDialog && event.target === clickedAdminDialog) {
          this.$store.commit('admin/closeDialog')
        }
      })
    }
  })
}
