<template>
  <div class="basket">
    <div class="basket__wrap-purchase">
      <PayTableCountry v-if="isScreenWideEnough && !!$store.getters['countries/getSelectedCountries']" />
      <PayCards v-else-if="!!$store.getters['countries/getSelectedCountries']" />
      <div
        v-else
        class="basket__plug"
      >
        {{ $t('cart.emptyCart') }}
      </div>
    </div>
    <div class="basket__footer">
      <BasePromo class="basket__promo" />
      <NuxtLink v-if="$store.getters['user/getAdmin']" v-ripple class="basket__admin-btn btn" :to="'/ru/admin/pay'">
        В "покупки для клиента"
      </NuxtLink>
      <div class="basket__footer-wrap">
        <div class="basket__total-price">
          {{ $t('cart.total') }}
          <div v-if="oldTotalPriceValue > 0 && oldTotalPriceValue !== totalPrice" class="basket__price basket__price_old">
            {{ oldTotalPrice }}
          </div>
          <div class="basket__price">
            {{ numberFormat(Number(totalPrice)) }} {{ currency === 'USD' ? `$` : `₽` }}
          </div>
        </div>
        <button
          v-ripple
          class="basket__footer-btn btn"
          @click="purchase()"
        >
          {{ $t('buttons.goToPurchase') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import numberFormatFunc from '@/helpers/numberFormat'

export default {
  data: () => ({
    menu: false,
    promo: null,
    selectedAll: false,
    paymentSystem: 'PAYSELECTION',
    paymentSystemArr: ['PAYSELECTION', 'ROBOKASSA', 'STRIPE'],
    screenWidth: window.innerWidth // Инициализация ширины экрана при создании компонента
  }),
  computed: {
    currency () {
      return this.$store.getters['user/getCurrency']
    },
    isScreenWideEnough () {
      return this.screenWidth > 768
    },
    totalPrice () {
      let price = 0
      this.$store.getters['order/getOrderArr'].forEach((e) => {
        let index = e.choice
        // очень плохой хардкод
        if (index === 3) {
          index = 2
        }
        price += Number(e.discount.price[index])
      })
      return price
    },
    oldTotalPrice () {
      let price = 0
      this.$store.getters['order/getOrderArr'].forEach((e) => {
        let index = e.choice
        // очень плохой хардкод
        if (index === 3) {
          index = 2
        }
        price += Number(e.discount.oldPrice[index])
      })
      return `${this.numberFormat(price)} ${this.currency === 'USD' ? '$' : '₽'}`
    },
    oldTotalPriceValue () {
      let price = 0
      this.$store.getters['order/getOrderArr'].forEach((e) => {
        let index = e.choice
        // очень плохой хардкод
        if (index === 3) {
          index = 2
        }
        price += Number(e.discount.oldPrice[index])
      })
      return price
    }
  },
  created () {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('resize', this.updateScreenWidth) // Добавляем слушателя события изменения размера окна
  },
  destroyed () {
    window.removeEventListener('resize', this.updateScreenWidth) // Удаляем слушателя события при уничтожении компонента
  },

  methods: {
    numberFormat (value) {
      return numberFormatFunc(value)
    },
    async purchase () {
      if (this.$store.getters['user/auth']) {
        try {
          const locationList = []
          for (const i of this.$store.getters['order/getOrderArr']) {
            let monthSub
            switch (i.choice) {
              case 0:
                monthSub = 1
                break
              case 1:
                monthSub = 3
                break
              case 2:
                monthSub = 12 // временная заглушка на сколько месяцев выбирается
                break
              case 3:
                monthSub = 12
                break
              default:
                monthSub = 1 // Значение по умолчанию, если choice не соответствует ни одному из вариантов
                break
            }
            if (i.childrenInCustom && i.childrenInCustom.length > 0) {
              locationList.push({ location: i.customKey, month_sub: monthSub })
            } else if (i.name) {
              locationList.push({ location: i.name, month_sub: monthSub })
            }
          }
          const data = {
            data: locationList,
            currency: this.$store.state.user.currency,
            lang: this.$nuxt.$i18n.locale,
            payment_system: this.paymentSystem,
            email: this.$store.getters['user/getEmail']
          }
          if (this.$store.getters['order/getPromocode']) {
            data.promocode = this.$store.getters['order/getPromocode']
          }
          // const order = await this.$store.dispatch('purchases/purchase', data)
          const order = await this.$store.dispatch('purchases/purchase', data)
          if (order.status && order.status === 200 && order.data && order.data.paid) {
            this.$store.commit('dialog/closeDialog')
            this.$store.commit('order/clearAll')
            this.$store.commit('countries/setSelectedCountries', [])
            this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}pay`)
          } else if (order.status && order.status === 200 && order.data.id && order.data.url) {
            window.open(order.data.url, '_blank')
            this.$store.commit('order/setOrderInfo', order.data)
            this.$store.commit('dialog/setDialogComponent', 'AwaitingPopup')
            this.$store.commit('countries/setSelectedCountries', [])
          } else {
            this.error = this.$t('payment.error')
          }
        } catch (e) {
          console.error(e)
          this.errors = e.response.data
        }
      } else {
        this.$store.commit('dialog/setSubDialogComponent', 'BaseLogin')
      }
    },
    getCountry (company) {
      return (this.$nuxt.$i18n.locale === 'ru') ? this.$store.getters['filter/countryDict'][company.countryOfHeadquarters]?.nameRus : company.countryOfHeadquarters
    }
  }
}
</script>

<style lang="scss" scoped>
.basket {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 330px;
  max-height: 60vh;
  color: var(--color-text-1);
  &__wrap-purchase {
    position: relative;
    display: flex;
    justify-content: center;
    min-height: 100px;
    padding: 0 sizeIncr(16, 40);
    // max-width: 400px;
    overflow: auto;
  }
  &__purchase {
    td {
      padding: sizeIncr(10, 15);
    }
  }
  &__checkbox {
    margin: 0 !important;
    padding: 0 !important;
    width: 20px !important;
    height: 20px !important;
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
  &__icon {
    display: inline-block;
    margin-right: sizeIncr(8, 13);
    width: sizeIncr(20, 24);
    height: sizeIncr(20, 24);
  }
  &__footer {
    display: flex;
    flex-direction: column;
  }
  &__promo {
    padding: 0 sizeIncr(16, 40);
  }
  &__admin-btn {
    font-size: sizeIncr(12, 16) !important;
  }
  &__footer-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: sizeIncr(7, 40);
    padding: sizeIncr(10, 24);
    border-top: 1px solid var(--color-border-1);
  }
  &__total-price {
    display: flex;
    align-items: center;
    gap: sizeIncr(7, 16);
    font-size: sizeIncr(14, 16);
    height: 100%;
  }
  &__price {
    white-space: nowrap;
    &_old {
      color: var(--color-text-2);
      text-decoration-line: line-through;
    }
  }
  &__footer-btn {
    padding: 8px sizeIncr(8, 35);
    border-radius: 7px;
    height: 40px;
    font-size: sizeIncr(12, 16);
    font-weight: 500;
    color: var(--color-text-white-1);
    background-color: var(--color-btn);
    box-shadow: 3px 0px 28px 0px rgba(0, 0, 0, 0.01);
  }
  &__admin-btn {
    margin: 0 10px 10px;
    padding: 8px sizeIncr(13, 35);
    border-radius: 7px;
    height: 40px;
    font-size: sizeIncr(14, 16);
    color: var(--color-text-white-1);
    background-color: var(--color-btn);
    box-shadow: 3px 0px 28px 0px rgba(0, 0, 0, 0.01);
  }

  &__wrap-system {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 5px;
  }
  &__system {
    padding: 0 9px;
    border-radius: 100px;
    height: 30px;
    font-weight: 500;
    color: var(--color-text-1);
    background-color: var(--color-btn-4);
    &_active {
      color: var(--color-text-white-1);
      background-color: var(--color-btn);
    }
  }
}

</style>
