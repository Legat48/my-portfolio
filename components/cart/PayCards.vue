<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="cards">
    <div v-for="(country, indexRow) in cardItems" :key="country.id" class="cards__row">
      <div class="cards__wrap-company">
        <div class="cards__country">
          <BaseCountryIcon v-if="'short' in country && !country.children" :country-code="country.short" class="mr-2" />
          {{ ($nuxt.$i18n.locale === 'en' ? country.name : $nuxt.$i18n.locale === 'ru' ? country.nameRus : '') }}
        </div>
        <div class="cards__wrap-price">
          <div v-if="country.discount.oldPrice[getIndex(country.choice)] && Number(country.discount.oldPrice[getIndex(country.choice)]) !== Number(country.discount.price[getIndex(country.choice)])" class="cards__price cards__price_old">
            {{ country.discount.oldPrice[getIndex(country.choice)] ? numberFormat(Number(country.discount.oldPrice[getIndex(country.choice)])) : '' }} {{ currency }}
          </div>
          <div class="cards__price">
            {{ country.discount.price[getIndex(country.choice)] ? numberFormat(Number(country.discount.price[getIndex(country.choice)])) : '' }} {{ currency }}
          </div>
        </div>
        <v-btn class="cards__btn-icon" icon text @click="removeCountry(country)">
          <v-icon class="cards__icon">
            mdi mdi-trash-can-outline
          </v-icon>
        </v-btn>
      </div>
      <div class="cards__wrap-price-select">
        <div class="cards__price-btn">
          <div class="cards__price-btn-wrap">
            <div class="cards__header-title">
              {{ $t(`cart.tableTitleColumn${Number(country.choice)+ 1}`) }}
            </div>
            <div v-if="country.discount.oldPriceMounth[getIndex(country.choice)] && Number(country.discount.oldPriceMounth[getIndex(country.choice)]) !== Number(country.discount.price[getIndex(country.choice)])" class="cards__price cards__price_old">
              {{ numberFormat(Number(country.discount.oldPriceMounth[getIndex(country.choice)])) }} {{ currency }}
            </div>
            <div class="cards__price">
              {{ numberFormat(Number(country.discount.priceMounth[getIndex(country.choice)])) }} {{ currency }}{{ $t('cart.month') }}
            </div>
            <div v-if="country.discount.discounts[getIndex(country.choice)] && Number(country.discount.discounts[getIndex(country.choice)]) > 0" class="cards__discount">
              -{{ country.discount.discounts[getIndex(country.choice)] }}%
            </div>
            <svg
              class="cards__price-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M9.6498 13.725L15.2998 8.05L14.2498 7L9.6498 11.6L5.0498 7L3.99981 8.05L9.6498 13.725Z" fill="#3FA6FA" />
            </svg>
          </div>

          <v-select
            class="cards__select"
            :items="getSelectOptions(country, indexRow)"
            solo
          >
            <!-- @change="updateChoice(indexRow, $event)" -->
            <template #item="{ item }">
              <div class="cards__select-item" @click="updateChoice(indexRow, item.choice)">
                <span class="cards__header-title">
                  {{ $t(`cart.tableTitleColumn${Number(item.choice)+ 1}`) }}
                </span>
                <span v-if="item.oldPrice && Number(item.oldPrice) !== Number(item.price)" class="cards__price cards__price_old">
                  {{ numberFormat(Number(item.oldPrice)) }} {{ currency }}
                </span>
                <span class="cards__price">
                  {{ numberFormat(Number(item.price)) }} {{ currency }}{{ $t('cart.month') }}
                </span>
                <span v-if="item.discounts && Number(item.discounts) > 0" class="cards__discount">
                  -{{ item.discounts }}%
                </span>
              </div>
            </template>
            <template #selection="{ item }">
              <!-- Используйте selection scope для выбранного элемента -->
              <div class="cards__select-item">
                <span v-if="item.oldPrice && Number(item.oldPrice) !== Number(item.text)" class="cards__price cards__price_old">
                  {{ item.oldPrice }}{{ currency }}
                </span>
                <span class="cards__price">
                  {{ item.text }} {{ currency }} {{ $t('cart.month') }}
                </span>
                <span v-if="item.discounts && Number(item.discounts) > 0" class="cards__discount">
                  -{{ item.discounts }}%
                </span>
              </div>
            </template>
          </v-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numberFormatFunc from '@/helpers/numberFormat'

export default {
  name: 'PayCards',
  computed: {
    currency () {
      const currency = this.getCurrency(this.$store.state.user.currency).symbol
      return currency
    },
    cardItems () {
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
    getIndex (index) {
      if (index === 3) {
        return 2
      } else {
        return index
      }
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
    getSelectOptions (country, indexRow) {
      const options = []
      for (let i = 0; i < country.discount.price.length; i++) {
        let choice = i
        if (i === 2) {
          choice = 3
        }
        options.push({
          price: country.discount.priceMounth[i],
          oldPrice: country.discount.oldPriceMounth[i],
          discounts: country.discount.discounts[i],
          choice,
          priceIndex: i,
          indexRow
        })
      }
      // return options.filter(e => e.choice !== 2)
      return options
    },
    updateChoice (index, choice) {
      this.$store.commit('order/setOrderArrChoice', { index, choice })
    }
  }
}
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-direction: column;
  width: 328px;
  color: var(--color-text-1);
  &__row {
    display: flex;
    flex-direction: column;
    padding: 17px 0;
    border-bottom: 1px solid var(--color-border-1);
    width: 328px;
  }
  &__header-wrap {
    display: flex;
    flex-direction: column;
  }
  &__header-title {
    font-weight: 600;
    font-size: 14px;
  }
  &__last-tr {
    padding: 0 !important;
    align-items: end;
    width: 24px;
  }

  &__wrap-company {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  &__country {
    display: flex;
    align-items: center;
    height: 100%;
  }
  &__wrap-price {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-left: auto;
    height: 54px;
  }
  &__wrap-price-select {
    display: flex;
    width: 328px;
    overflow: hidden;
  }
  &__price-btn-wrap {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 16px;
    border-radius: 7px;
    border: 1px solid #7F9DC6;
    width: 328px;
    height: 48px;
    background-color: var(--color-bg-white-2);
    pointer-events: none;
  }
  &__price-btn {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__price-icon {
    margin-left: auto;
    width: 20px;
    height: 20px;
  }
  &__select {
    position: absolute;
    inset: 0 auto auto 0;
  }
  &__select-item {
    width: 328px;
  }
  &__wrap-radio {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  &__price {
    white-space: nowrap;
    &_old {
      color: var(--color-text-2);
      text-decoration-line: line-through;
    }
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
    margin-left: 0 !important;
  }
  &__icon {
    color: var(--color-text-4) !important;
  }
  &__discount {
    margin-left: 5px;
    border-radius: 100px;
    padding: 2px 4px;
    white-space: nowrap;
    color: var(--color-text-white-1);
    background-color: var(--color-btn);
  }
}
</style>
<style>
.cards .v-input__slot {
  margin-bottom: 0;
  box-shadow:none !important;
}
.cards .v-list-item,
.cards .v-menu__content {
  width: 328px !important;
}
</style>
