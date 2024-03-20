<template>
  <div>
    <div
      v-if="(!country.children || (country.children && country.children[0].children) || country.name === 'Africa') && !country.childrenInCustom"
      v-ripple
      class="country country_list"
      :class="{
        'country_active' : selected,
        'country_others' : noCheck
      }"
      @click.prevent="!(
        $event.target.matches('input') ||
        $event.target.classList.contains('v-icon') ||
        $event.target.classList.contains('country__to-cart') ||
        $event.target.classList.contains('country__drop') ||
        noCheck
      ) && toggleToCountry(country, $event)"
    >
      <BaseCheckbox
        v-if="!noCheck"
        class="country__checkbox"
        :status="inCart(country.name)"
      />

      <BaseCountryIcon v-if="country.children && country.children.length > 0" :country-code="country.name" class="country__icon" />
      <BaseCountryIcon v-if="!!country.childrenInCustom && !country.children" :country-code="replaceOthers(country.name)" class="country__icon" />
      <BaseCountryIcon v-if="'short' in country && !country.children" :country-code="country.short" class="country__icon" />
      <div class="country__wrap-text">
        <div class="country__text country__text_center" :class="{'country__text_small': !!country.childrenInCustom}">
          {{ localizedCountryName }}
        </div>
        <CountryTooltip v-if="!!country.childrenInCustom && !country.children && !inCart(country.name)" class="country__tooltip" :country="country" />
        <div v-if="!inCart(country.name) && !country.children && country.company_in_portfolio && country.company_in_portfolio.count_companies" class="country__sub-text">
          {{ country.company_in_portfolio.count_companies }} {{ $t('companiesDrop.count') }} {{ country.count }} {{ getLocalizedPlural(country) }}
        </div>
        <div v-if="!inCart(country.name) && country.count && country.count_in_portfolio" class="country__sub-text">
          {{ country.count_in_portfolio }} {{ $t('companiesDrop.count') }} {{ country.count }} {{ getLocalizedPlural(country) }}
        </div>
      </div>
      <button v-if="inCart(country.name)" v-ripple class="country__to-cart btn" @click.prevent="openCart(country.name)">
        {{ $t('companiesDrop.btnCart') }}
      </button>
    </div>
    <div
      v-if="country.children && country.children.length > 0"
      class="country__wrap-children"
      :class="{
        'country__wrap-children_no-gap': country.children && country.children.length > 0 && !country.children[0].children,
      }"
    >
      <CountryCheckbox v-for="child in country.children" :key="child.name" :country="child" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountryCheckbox',
  props: {
    country: {
      type: Object,
      required: true
    },
    noCheck: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      childrenOpen: false
    }
  },
  computed: {
    selected: {
      get () {
        const selectedCountries = this.$store.getters['countries/getSelectedCountries']
        return selectedCountries && selectedCountries.includes(this.country)
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
    }
  },
  methods: {
    openDrop (name) {
      return this.$store.state.countries.showCountriesGroup && this.$store.state.countries.showCountriesGroup.includes(name)
    },
    inCart (name) {
      const selectedCountries = this.$store.getters['countries/getSelectedCountries']
      return selectedCountries && selectedCountries.some(country => country.name === name)
    },
    async openCart () {
      if (this.$store.getters['countries/getSelectedCountries'].length > 0) {
        await this.createOrder()
        this.$store.commit('dialog/setDialogComponent', 'ShoppingBasket')
      }
    },
    async toggleToCountry (country) {
      this.$store.commit('countries/selectCountries', country)
      if (this.$store.getters['countries/getSelectedCountries'].length > 0) {
        await this.createOrder()
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
    getLocalizedPlural (country) {
      if (country.children) {
        if (country.count < 2) {
          return this.$t('companiesDrop.countriesOne')
        } else if (country.count < 5) {
          return this.$t('companiesDrop.countriesTwo')
        } else {
          return this.$t('companiesDrop.countries')
        }
      } else if (!country.children) {
        if (country.count < 2) {
          return this.$t('companiesDrop.companiesOne')
        } else if (country.count < 5) {
          return this.$t('companiesDrop.companiesTwo')
        } else {
          return this.$t('companiesDrop.companies')
        }
      }
    },
    replaceOthers (name) {
      return name.replace(/\sOthers$/, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.country {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 19px 0;
  width: sizeIncr(328, 345);
  min-height: 40px;
  color: var(--color-text-1);
  background-color: var(--color-bg-white-2);
  @include transition;
  &_list-children {
    margin: 0;
  }
  &_list {
    margin: 0 0 8px 0 ;
    border-radius: 7px;
    border-bottom: none;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 7px;
    border: 1px solid var(--color-border-1);
    @include transition;
  }
  &_active {
    &::before {
      border: 1px solid var(--color-border-3);
    }
  }

  &_others {
    padding-left: 45px;
  }

  &__tooltip {
    margin-left: auto;
  }

  &__wrap-children {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 7px;
    overflow: hidden;
  }

  &_no-mb {
    margin-bottom: 0;
  }

  &__checkbox {
    position: relative;
    z-index: 1;
    margin: 0 9px 0 0 !important;
    &_deactive {
      opacity: 0;
    }
  }
  &__drop {
    margin: 0 !important;
    padding: 0;
    color: var(--color-border-4);
    @include transition;
    &_open {
      transform: rotate(180deg);
    }
    &_color {
      margin-left: 5px !important;
      color: var(--color-text-1) !important;
    }
  }
  &__icon {
    position: relative;
    z-index: 1;
    margin-right: 8px !important;
    &_no-border {
      border: none !important;
    }
  }

  &__wrap-text {
    display: flex;
    align-items: center;
    margin-right: auto;
    width: 100%;
  }

  &__text {
    position: relative;
    margin-right: 16px;
    max-height: 39px;
    font-weight: 500;
    font-size: sizeIncr(14, 14);
    line-height: sizeIncr(19, 19);
    color: var(--color-text-1);
    overflow: hidden;
    &_small {
      font-size: sizeIncr(12, 12);
    line-height: sizeIncr(13, 13);

    }
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
.transition-enter-active,
.transition-leave-active {
  @include transition
}

.transition-enter,
.transition-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
.country {
  .country__checkbox .theme--light.v-icon {
      color: var(--color-text-white-1) !important;
  }

  &_list-children {
    .country__checkbox .theme--light.v-icon {
      color: var(--color-border-1) !important;
    }
    .country__checkbox_active .theme--light.v-icon {
      color: var(--color-border-3) !important;
    }
  }
}
</style>
