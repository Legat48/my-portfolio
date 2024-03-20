<template>
  <div
    v-if="!country.childrenInCustom"
    v-ripple
    class="card"
    :class="selected?'card_active':''"
    @click="!$event.target.classList.contains('card__tooltip') && toggleToCountry(country, $event)"
  >
    <div class="card__content">
      <div class="card__top-wrap">
        <div class="card__title">
          <BaseCountryIcon v-if="country.children && country.children.length > 0" :country-code="country.name" class="card__icon" />
          <BaseCountryIcon v-if="!!country.childrenInCustom && !country.children" :country-code="replaceOthers(country.name)" class="card__icon" />
          <BaseCountryIcon v-if="'short' in country && !country.children" :country-code="country.short" class="card__icon" />
          {{ localizedCountryName }}
        </div>
        <v-menu
          v-model="menu"
          class="card__menu"
          :close-on-content-click="true"
          close-delay="100"
          offset-x
          offset-y
        >
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="card__cart-btn"
              :class="selected?'card__cart-btn_active':''"
              tile
              icon
              v-on="on"
            >
              <v-icon :color="selected?'white':'primary'">
                mdi-cart-plus
              </v-icon>
            </v-btn>
          </template>
          <v-btn
            color="colorBtn"
            class="card__btn-go-cart"
            width="100%"
            @click="openCart()"
          >
            <v-icon size="20" class="" color="white">
              mdi-cart
            </v-icon>
            {{ $t('companyCard.goToCart') }}
          </v-btn>
        </v-menu>
      </div>
      <div class="card__wrap-info">
        <div v-if="country.children && country.children.length" class="card__subwrap-info">
          <div class="card__info-title">
            {{ getLocalizedPluralCountry(country) }}
          </div>
          <div class="card__info-text">
            {{ countryGatherer }}
          </div>
          <CountryTooltip class="card__tooltip" :country="country" :count="countryGatherer" />
        </div>
        <div v-else-if="country.childrenInCustom && country.childrenInCustom.length" class="card__subwrap-info">
          <div class="card__info-title">
            {{ getLocalizedPluralCountry(country) }}
          </div>
          <div class="card__info-text">
            {{ countryGatherer }}
          </div>
          <CountryTooltip class="card__tooltip" :country="country" :count="countryGatherer" />
        </div>
      </div>
    </div>

    <div v-if="country.count && country.company_in_portfolio || country.count && country.count_in_portfolio" class="card__footer">
      <div class="card__footer-item">
        <div class="card__footer-title">
          {{ $t('companiesDrop.allCompanies') }}
        </div>
        <div class="card__info-text card__info-text_footer">
          {{ country.count }}
        </div>
      </div>
      <div class="card__footer-item card__footer-item_right">
        <div class="card__footer-title">
          {{ $t('companiesDrop.companyInPort') }}
        </div>
        <div v-if="country.company_in_portfolio && country.company_in_portfolio.count_companies" class="card__info-text card__info-text_footer">
          {{ country.company_in_portfolio.count_companies }}
        </div>
        <div v-if="country.count && country.count_in_portfolio" class="card__info-text card__info-text_footer">
          {{ country.count_in_portfolio }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '~/helpers/event-bus.js'

export default {
  name: 'CompanyCard',
  props: {
    country: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      menu: false
    }
  },
  computed: {
    countryGatherer () {
      const gather = (countries) => {
        let result = []
        for (const country of countries) {
          if (
            (!country.children || country.children.length === 0) &&
            (!country.childrenInCustom || country.childrenInCustom.length === 0)
          ) {
            result.push(country)
          } else {
            if (country.children && country.children.length > 0) {
              result = result.concat(gather(country.children))
            }
            if (country.childrenInCustom && country.childrenInCustom.length > 0) {
              result = result.concat(gather(country.childrenInCustom))
            }
          }
        }
        return result
      }

      return gather(this.country.children || this.country.childrenInCustom).length
    },
    selected: {
      get () {
        const selectedCountries = this.$store.getters['countries/getSelectedCountries']
        return selectedCountries.some(selectedCountry => selectedCountry.name === this.country.name)
      },
      set () {
        this.$store.commit('countries/selectCountries', this.country)
        if (this.$store.getters['countries/getSelectedCountries'].length > 0) {
          this.createOrder()
        }
      }
    },
    localizedCountryName () {
      const locale = this.$nuxt.$i18n.locale
      if (locale === 'en') {
        if (this.country.name === 'Americas') {
          return 'North and South America'
        }
        return this.country.name
      } else if (locale === 'ru') {
        if (this.country.name === 'Americas') {
          return 'Северная и Южная Америка'
        }
        return this.country.nameRus
      } else {
        return this.country.name
      }
    },
    currentLocale () {
      return this.$nuxt.$i18n.locale
    }
  },
  mounted () {
    EventBus.$on('scrollTracking', this.handleScroll)
  },
  beforeDestroy () {
    // Отписываемся от события перед уничтожением компонента
    EventBus.$off('scrollTracking')
  },
  // mounted () {
  //   // Добавляем обработчик события scroll на window
  //   window.addEventListener('scroll', this.handleScroll)
  // },
  // beforeDestroy () {
  //   // Убираем обработчик события scroll перед уничтожением компонента
  //   window.removeEventListener('scroll', this.handleScroll)
  // },
  methods: {
    getLocalizedPluralCountry (country) {
      if ((country.children && country.children.length) || (country.childrenInCustom && country.childrenInCustom.length)) {
        if (this.countryGatherer < 2) {
          return this.$t('companiesDrop.countriesUpOne')
        } else if (this.countryGatherer < 5) {
          return this.$t('companiesDrop.countriesUpTwo')
        } else {
          return this.$t('companiesDrop.countriesUp')
        }
      } else { return '' }
    },
    getLocalizedPluralCompany (country) {
      if (country.count < 2) {
        return this.$t('companiesDrop.companiesOne')
      } else if (country.count < 5) {
        return this.$t('companiesDrop.companiesTwo')
      } else {
        return this.$t('companiesDrop.companies')
      }
    },
    async toggleToCountry (country) {
      this.$store.commit('countries/selectCountries', country)
      if (this.$store.getters['countries/getSelectedCountries'].length > 0 && this.selected) {
        this.menu = true
        await this.createOrder()
      }
    },
    async openCart () {
      if (this.$store.getters['countries/getSelectedCountries'].length > 0) {
        await this.createOrder()
        this.$store.commit('dialog/setDialogComponent', 'ShoppingBasket')
      }
    },
    async createOrder () {
      const selectedCountries = this.$store.getters['countries/getSelectedCountries']
      await this.$store.dispatch('order/createOrder', {
        length: selectedCountries.length,
        currency: this.$store.state.user.currency,
        lang: this.$nuxt.$i18n.locale
      })
    },
    replaceOthers (name) {
      return name.replace(/\sOthers$/, '')
    },
    handleScroll () {
      this.menu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  border: 1px solid var(--color-border-1);
  background-color: var(--color-bg-white-2);
  overflow: hidden;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.04);
  @include transition;
  &:hover,
  &_active {
    border: 1px solid var(--color-border-3);
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: sizeIncr(16, 30) sizeIncr(16, 30) sizeIncr(8, 10) sizeIncr(16, 30);

  }
  &__top-wrap {
    display: flex;
    justify-content: space-between;
  }
  &__title {
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: var(--color-text-1);
  }

  &__icon {
    margin-right: 13px;
    width: 24px;
    height: 24px;
  }
  &__cart-btn {
    border-radius: 7px;
    background-color: var(--color-btn-4);
    pointer-events: none;
    &_active {
      background-color: var(--color-btn);
    }
  }
  &__btn-go-cart {
    border-radius: 7px;
    color: var(--color-text-white-1);
  }
  &__wrap-info {
    display: flex;
    justify-content: space-between;
  }
  &__subwrap-info {
    display: flex;
    align-items: center;
    width: 55%;
    height: 100%;
    &_right {
      width: 43%;
      align-items: flex-end;
    }
  }
  &__info-title {
    margin-right: 4px;
    font-size: 12px;
    line-height: 17px;
    font-weight: 500;
    color: var(--color-text-2);
  }
  &__info-text {
    font-weight: 500;
    font-size: sizeIncr(14, 16);
    line-height: 17px;
    color: var(--color-text-1);
    &_footer {
      color: var(--color-text-white-1);
    }
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 sizeIncr(10, 20);
    height: sizeIncr(36, 44);
    background-color: var(--color-bg-6);
  }
  &__footer-item {
    display: flex;
    flex-direction: column;
    padding: sizeIncr(5, 10) 0;
    &_right {
      align-items: flex-end;
    }
  }
  &__footer-title {
    white-space: nowrap;
    font-size: 12px;
    line-height: 17px;
    font-weight: 500;
    color: var(--color-text-white-2);
  }
  &__footer-icon {
    margin-right: sizeIncr(8, 13);
    width: sizeIncr(20, 24);
    height: sizeIncr(20, 24);
  }
}
</style>
