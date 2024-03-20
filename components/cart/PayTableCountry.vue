<template>
  <table class="table-country">
    <thead>
      <tr class="table-country__row table-country__row_header">
        <td />
        <td>
          <div class="table-country__header-wrap">
            <div class="table-country__header-title">
              {{ $t('cart.tableTitleColumn1') }}
            </div>
            <div v-if="!noPrice" class="table-country__price">
              {{ numberFormat(Number(basePrice.priceArr[0])) }} {{ currency }}
              <span class="table-country__header-subtext">
                {{ $t('cart.month') }}
              </span>
            </div>
          </div>
        </td>
        <td>
          <div class="table-country__header-wrap">
            <div class="table-country__header-title">
              {{ $t('cart.tableTitleColumn2') }}
            </div>
            <div v-if="!noPrice" class="table-country__price table-country__price_header">
              <span class="table-country__price_old">{{ numberFormat(Number(basePrice.oldPriceArr[1])) }} {{ `${currency} ` }}</span>
              {{ numberFormat(Number(basePrice.priceArr[1])) }} {{ `${currency}` }}
              <span class="table-country__header-subtext">
                {{ $t('cart.month') }}
              </span>
            </div>
          </div>
        </td>
        <!-- <td>
          <div class="table-country__header-wrap">
            <div class="table-country__header-title">
              {{ $t('cart.tableTitleColumn3') }}
            </div>
            <div v-if="!noPrice" class="table-country__price">
              <span class="table-country__price_old">{{ numberFormat(Number(basePrice.oldPriceArr[2])) }} {{ currency }}</span>
              {{ numberFormat(Number(basePrice.priceArr[2])) }} {{ currency }}
              <span class="table-country__header-subtext">
                {{ $t('cart.month') }}
              </span>
            </div>
          </div>
        </td> -->
        <td>
          <div class="table-country__header-wrap">
            <div class="table-country__header-title">
              {{ $t('cart.tableTitleColumn4') }}
            </div>
            <div v-if="!noPrice" class="table-country__price">
              <span class="table-country__price_old">{{ numberFormat(Number(basePrice.oldPriceArr[2])) }} {{ currency }}</span>
              {{ numberFormat(Number(basePrice.priceArr[2])) }} {{ currency }}
              <span class="table-country__header-subtext">
                {{ $t('cart.month') }}
              </span>
            </div>
          </div>
        </td>
        <td />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(country, indexRow) in cartItems" :key="country.id" class="table-country__row">
        <td>
          <div class="table-country__wrap-company">
            <div class="table-country__country">
              <BaseCountryIcon v-if="'short' in country && !country.children" :country-code="country.short" class="mr-2" />
              {{ ($nuxt.$i18n.locale === 'en' ? country.name : $nuxt.$i18n.locale === 'ru' ? country.nameRus : '') }}
            </div>
          </div>
        </td>
        <td v-for="(item,index) of country.discount.price" :key="index+'price'" v-ripple class="btn" @click="updateChoice(indexRow, index)">
          <div class="table-country__wrap-radio">
            <div class="table-country__radio-btn" :class="{'table-country__radio-btn_active' : index === country.choice}">
              <div />
            </div>
            <span v-if="country.discount.discounts[index] && Number(country.discount.discounts[index]) > 0" class="table-country__discount">
              -{{ country.discount.discounts[index] }}%
            </span>
            <!-- <div class="table-country__price">
              {{ item }} {{ currency }}
            </div>
            <div v-if="country.discount.oldPrice[index]" class="table-country__price table-country__price_old">
              {{ country.discount.oldPrice[index] }} {{ currency }}
            </div> -->
          </div>
        </td>
        <td v-if="!noPrice">
          <div class="table-country__wrap-price">
            <div v-if="country.discount.oldPrice[country.choice] && Number(country.discount.oldPrice[country.choice]) !== Number(country.discount.price[country.choice])" class="table-country__price table-country__price_old">
              {{ numberFormat(Number(country.discount.oldPrice[country.choice])) }} {{ currency }}
            </div>
            <div class="table-country__price">
              {{ numberFormat(Number(country.discount.price[country.choice])) }} {{ currency }}
            </div>
          </div>
        </td>
        <td class="table-country__last-tr">
          <v-btn class="table-country__btn-icon" icon text @click="removeCountry(country)">
            <v-icon class="table-country__icon">
              mdi mdi-trash-can-outline
            </v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import numberFormatFunc from '@/helpers/numberFormat'

export default {
  name: 'PayTableCountry',
  props: {
    noPrice: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currency () {
      const currency = this.getCurrency(this.$store.state.user.currency).symbol
      return currency
    },
    cartItems () {
      return this.$store.getters['order/getOrderArr']
    },
    basePrice () {
      return this.$store.getters['order/getDiscountInfo']
    },
    selected: {
      get () {
        const selectedCountries = this.$store.getters['countries/getSelectedCountries']
        return selectedCountries.includes(this.country.name)
      },
      async set () {
        await this.$store.commit('countries/selectCountries', this.country)
      }
    }
  },
  methods: {
    numberFormat (value) {
      return numberFormatFunc(value)
    },
    async removeCountry (country) {
      this.$store.commit('countries/removeSelectedCountries', country)
      if (this.$store.getters['countries/getSelectedCountries'].length > 0) {
        await this.$store.dispatch('order/createOrder', {
          length: this.$store.getters['countries/getSelectedCountries'].length,
          currency: this.$store.state.user.currency,
          lang: this.$nuxt.$i18n.locale
        })
      }
      if (this.$store.getters['countries/getSelectedCountries'].length === 0) {
        this.$store.commit('dialog/closeDialog')
      }
    },
    getCurrency (value) {
      const currencies = this.$store.getters['user/allCurrencies']
      const currency = currencies.find(x => x.code === value)
      return currency
    },
    updateChoice (index, choice) {
      this.$store.commit('order/setOrderArrChoice', { index, choice })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-country {
  width: 100%;
  color: var(--color-text-1);
  border-collapse: collapse;
  &__row {
    td {
      padding: sizeIncr(10, 15);
      white-space: nowrap;
    }
    &_header {
      position: sticky;
    }
  }
  &__header-wrap {
    display: flex;
    flex-direction: column;
  }
  &__header-title {
    font-weight: 600;
  }
  &__last-tr {
    padding: 0 !important;
    align-items: end;
    width: 24px;
  }

  &__wrap-company {
    display: flex;
    flex-direction: column;
  }

  &__country {
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__wrap-price {
    display: flex;
    flex-direction: column;
  }
  &__wrap-radio {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  &__price {
    white-space: nowrap;
    &_header {
      font-size: 14px;
    }
    &_old {
      color: var(--color-text-2);
      text-decoration-line: line-through;
    }
  }
  &__header-subtext {
    // margin-left: 3px;
    font-size: 12px;
  }
  &__radio-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    width: 18px;
    height: 18px;
    border: 2px solid var(--color-border-1);
    div {
      width: 10px;
      height: 10px;
      background-color: var(--color-btn);
      border-radius: 100px;
      opacity: 0;
      @include transition;
    }
    &_active {
      border: 2px solid var(--color-btn);
      div {
        opacity: 1;
      }
    }
  }

  &__btn-icon {
    margin-left: auto !important;
  }
  &__icon {
    color: var(--color-text-4) !important;
  }
  &__discount {
    margin-left: 5px;
    border-radius: 100px;
    padding: 2px 4px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn);
  }
}
</style>
