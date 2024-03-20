<template>
  <div class="hot" :class="{'hot_switch-hide': $store.getters['countries/getHotOpen']}">
    <button
      v-ripple
      class="hot__wrap-title btn"
      @click.prevent="$store.commit('countries/setHotOpen', !$store.getters['countries/getHotOpen'])"
    >
      <v-icon class="hot__title-icon">
        mdi mdi-fire
      </v-icon>
      <div class="hot__title">
        {{ $t('headers.hotPortfolioTitle') }}
      </div>
      <svg
        v-if="!$store.getters['countries/getHotOpen']"
        class="hot__title-subicon"
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
      >
        <path d="M7.0502 6.00039L1.3752 11.6504L0.325195 10.6004L4.9252 6.00039L0.325195 1.40039L1.3752 0.350391L7.0502 6.00039Z" fill="#7F9DC6" />
      </svg>
      <svg
        v-if="$store.getters['countries/getHotOpen']"
        class="hot__title-subicon hot__title-subicon_close"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path d="M1.39961 13.6501L0.349609 12.6001L5.94961 7.0001L0.349609 1.4001L1.39961 0.350098L6.99961 5.9501L12.5996 0.350098L13.6496 1.4001L8.04961 7.0001L13.6496 12.6001L12.5996 13.6501L6.99961 8.0501L1.39961 13.6501Z" fill="#7F9DC6" />
      </svg>
    </button>
    <div class="hot__list">
      <button
        v-for="country in $nuxt.$i18n.locale === 'en' ? countries.en : countries.ru"
        :key="country.initValue"
        v-ripple
        class="hot__btn btn"
        :class="{'hot__btn_active': inCart(country.initValue)}"
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
        <div class="hot__wrap-text">
          <div class="hot__text">
            {{ ($nuxt.$i18n.locale === 'en' ? country.initValue : $nuxt.$i18n.locale === 'ru' ? country.initValueRus : country.initValue) }}
          </div>
          <div v-if="country.count" class="hot__sub-text">
            {{ country.count }} {{ $t('companiesDrop.companies') }}
          </div>
        </div>
      </button>
    </div>
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
  display: flex;
  align-items: center;
  border-right: 1px solid var(--color-border-1);
  width: calc(100% - 74px);
  height: 100%;
  font-family: Inter, sans-serif !important;
  &_switch-hide {
    width: 100%;
    border-right: 1px solid transparent;
    @media (min-width: 768px) {
      width: calc(100% - 74px);
      border-right: 1px solid var(--color-border-1);
    }
  }
  &__wrap-title {
    display: flex;
    align-items: center;
    margin-right: sizeIncr(7, 40);
    padding:0 16px;
    min-height: 48px;
    width: 100%;
    @media (min-width: 768px) {
      width: auto;
      pointer-events: none;
    }
  }
  &__title-subicon {
    width: 8px;
    height: 12px;
    &_close {
      width: 14px;
      height: 14px;
    }
    @media (min-width: 768px) {
      display: none;
    }
  }

  &__title {
    display: flex;
    margin-right: auto;
    white-space: nowrap;
    font-family: 'Inter' !important;
    color: var(--color-text-1);
  }
  &__list {
    display: flex;
    flex-wrap: nowrap;
    overflow-y: scroll;
  }
  &__btn {
    display: none;
    @media (min-width: 768px) {
      display: flex;
    }
    align-items: center;
    margin-right: 12px;
    margin-bottom: 1px;
    border: 1px solid var(--color-border-1);
    padding: 2px 20px;
    border-radius: 7px;
    height: 40px;
    font-weight: 500;
    color: var(--color-text-1);
    @include transition;
    &_active {
      border: 1px solid var(--color-border-3);
    }
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
  &__wrap-text {
    display: flex;
    align-items: baseline;
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
