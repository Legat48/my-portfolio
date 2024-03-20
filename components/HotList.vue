<template>
  <div class="hot__list">
    <button
      v-for="country in $nuxt.$i18n.locale === 'en' ? countries.en : countries.ru"
      :key="country.initValue"
      class="hot__btn btn"
      color="white"
      @click.prevent="!(
        $event.target.matches('input') ||
        $event.target.classList.contains('v-icon') ||
        $event.target.classList.contains('hot__to-cart')
      ) && toggleToCountry(country)"
    >
      <BaseCheckbox
        class="hot__checkbox"
        :status="inCart(country.initValue)"
      />
      <BaseCountryIcon v-if="country.short" class="hot__icon" :country-code="country.short" />
      <BaseCountryIcon v-else :country-code="replaceOthers(country.initValue)" class="hot__icon" />

      <div class="hot__text">
        {{ ($nuxt.$i18n.locale === 'en' ? country.initValue : $nuxt.$i18n.locale === 'ru' ? country.initValueRus : country.initValue) }}
      </div>
      <div v-if="!inCart(country.name) && country.count" class="hot__sub-text">
        {{ country.count }} {{ $t('companiesDrop.companies') }}
      </div>
      <button v-if="inCart(country.name)" v-ripple class="hot__to-cart btn" @click.prevent="openCart(country.name)">
        {{ $t('companiesDrop.btnCart') }}
      </button>
    </button>
  </div>
</template>
<script>
export default {
  name: 'HotPortfolio',
  computed: {
    countries () {
      return this.$store.getters['countries/getHotCountries']
    },
    selectedCountries () {
      return this.$store.getters['countries/getSelectedCountries']
    },
    selected: {
      get () {
        if (this.$store.getters['countries/getSelectedCountries']) {
          return this.$store.getters['countries/getSelectedCountries'].includes(this.country)
        } else {
          return []
        }
      },
      async set () {
        await this.$store.commit('countries/selectCountries', this.country)
        if (this.$store.getters['countries/getSelectedCountries'].length > 0) {
          await this.$store.dispatch('order/createOrder', {
            length: this.$store.getters['countries/getSelectedCountries'].length,
            currency: this.$store.state.user.currency,
            lang: this.$nuxt.$i18n.locale
          })
        }
      }
    }
  },
  mounted () {
    document.addEventListener('click', (i) => {
      if (
        !i.target.closest('.header__search_mob') &&
        !i.target.closest('.header__btn-search-mob') &&
        !i.target.closest('.small-search-tools__btn_search')
      ) {
        this.search = false
      }
    })
  },
  methods: {
    inCart (name) {
      const selectedCountries = this.$store.getters['countries/getSelectedCountries']
      return selectedCountries && selectedCountries.some(country => country.name === name)
    },
    async createOrder () {
      const selectedCountries = this.$store.getters['countries/getSelectedCountries']
      await this.$store.dispatch('order/createOrder', {
        length: selectedCountries.length,
        currency: this.$store.state.user.currency,
        lang: this.$nuxt.$i18n.locale
      })
    },
    async openCart () {
      if (this.$store.getters['countries/getSelectedCountries'].length > 0) {
        await this.createOrder()
        this.$store.commit('countries/setHotOpen', false)
        this.$store.commit('dialog/setDialogComponent', 'ShoppingBasket')
      }
    },
    async toggleToCountry (country) {
      this.$store.commit('countries/selectCountries', country)
      if (this.$store.getters['countries/getSelectedCountries'].length > 0) {
        await this.$store.dispatch('order/createOrder', {
          length: this.$store.getters['countries/getSelectedCountries'].length,
          currency: this.$store.state.user.currency,
          lang: this.$nuxt.$i18n.locale
        })
      }
    },
    replaceOthers (name) {
      return name.replace(/\sOthers$/, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.hot {
  &__list {
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
    padding: 17px;
    background-color: var(--color-bg-white-2);
  }
  &__btn {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 2px 20px;
    border: 1px solid var(--color-border-3);
    border-radius: 7px;
    height: 40px;
    font-weight: 500;
    color: var(--color-text-1);
    border: 1px solid #3FA6FA;
    filter: drop-shadow(3px 0px 28px rgba(0, 0, 0, 0.01));
    border-radius: 7px;
  }
  &__checkbox {
    margin: 0 9px 0 0 !important;
    pointer-events: none;
  }
  &__icon {
    height: 25px;
    width: 25px;
    margin-right: 6px;
  }
  &__text {
    white-space: nowrap;
    position: relative;
    margin-right: 8px;
    max-height: 39px;
    font-weight: 500;
    font-size: sizeIncr(14, 14);
    line-height: sizeIncr(19, 19);
    color: var(--color-text-1);
    overflow: hidden;
  }
  &__sub-text {
    position: relative;
    margin-left: auto;
    white-space: nowrap;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: var(--color-text-1);
    opacity: 0.9;
  }
  &__to-cart {
    margin-left: auto;
    padding: 0 12px;
    border-radius: 7px;
    border: 1px solid var(--color-border-3);
    height: 32px;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    white-space: nowrap;
    color: var(--color-text-3);
    background-color: transparent;
    z-index: 2;
  }
}
</style>

<style lang="scss">
.hot__checkbox .theme--light.v-icon {
  color: var(--color-border-4) !important;
}
</style>

<style lang="scss">
.hot {
  .hot__checkbox .theme--light.v-icon {
    color: var(--color-border-4) !important;
  }
  .hot__checkbox .theme--light.v-icon {
    color: var(--color-border-1) !important;
  }
  .hot__checkbox_active .theme--light.v-icon {
    color: var(--color-border-3) !important;
  }
}
</style>
