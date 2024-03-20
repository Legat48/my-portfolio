<template>
  <div v-if="!preload && !$store.getters.getLoading" style="width: 100%;" class="content">
    <div class="content__wrap">
      <div class="content__header">
        <div class="content__title">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7.85023 6.05008V4.10004C7.85023 3.51683 8.05424 3.02082 8.46226 2.61201C8.87028 2.204 9.36629 2 9.95032 2H14.0497C14.6337 2 15.1297 2.204 15.5377 2.61201C15.9458 3.02082 16.1498 3.51683 16.1498 4.10004V6.05008H19.8999C20.4831 6.05008 20.9792 6.25409 21.388 6.6621C21.796 7.07011 22 7.56612 22 8.15013V18.9C22 19.4832 21.796 19.9792 21.388 20.388C20.9792 20.796 20.4831 21 19.8999 21H4.10008C3.51686 21 3.02084 20.796 2.61202 20.388C2.20401 19.9792 2 19.4832 2 18.9V8.15013C2 7.56612 2.20401 7.07011 2.61202 6.6621C3.02084 6.25409 3.51686 6.05008 4.10008 6.05008H7.85023ZM9.95032 6.05008H14.0497V4.10004H9.95032V6.05008ZM19.8999 15.0743H15.0997V17.1251H8.90028V15.0743H4.10008V18.9H19.8999V15.0743ZM11.0004 15.0251H12.9996V13.0246H11.0004V15.0251ZM4.10008 12.9742H8.90028V10.9246H15.0997V12.9742H19.8999V8.15013H4.10008V12.9742Z" fill="#394D5E" />
          </svg>
          Покупка для клиента
        </div>
        <BtnBack class="content__btn" :to-router="`/ru`" />
      </div>
      <div class="content__content">
        <template v-if="!sucsesfullPay">
          <div class="content__wrap-email">
            <label v-if="!emailValid" for="email" class="content__label">
              Ввод почты клиента:
              <input
                ref="email"
                v-model="email"
                class="content__input"
                :placeholder="$t('auth.email')"
                required
              >
              <p class="content__label-info">
                Введите имеил клиента
              </p>
            </label>
            <div v-if="error" class="content__error">
              {{ error }}
            </div>
            <div v-if="email && emailValid" class="content__title content__title_email">
              Покупка на почту: {{ email }}
            </div>
            <div class="content__wrap-email-btn">
              <button v-ripple class="content__btn content__btn_email content__btn_reset btn" @click.prevent="resetEmail()">
                Сбросить
              </button>
              <button v-ripple class="content__btn content__btn_email btn" @click.prevent="checkEmail()">
                Подтвердить
              </button>
            </div>
          </div>
          <PayTableCountry v-if="!!$store.getters['countries/getSelectedCountries']" :no-price="true" />
          <button
            v-if="emailValid"
            v-ripple
            class="content__btn content__btn_submit btn"
            @click="purchase()"
          >
            Купить на почту: {{ email }}
          </button>
        </template>
        <template v-if="sucsesfullPay">
          <div class="content__sucsesfull">
            Успешная покупка
          </div>
        </template>
      </div>
    </div>
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>

<script>
import numberFormatFunc from '@/helpers/numberFormat'
import { apiService, portfolioURL } from '@/api/'
const apiUrl = portfolioURL

export default {
  layout: 'block',
  data () {
    return {
      preload: true,
      menu: false,
      promo: null,
      email: '',
      emailValid: false,
      sucsesfullPay: false,
      error: '',
      selectedAll: false
    }
  },
  computed: {
    currency () {
      return this.$store.getters['user/getCurrency']
    },

    totalPrice () {
      let price = 0
      this.$store.getters['order/getOrderArr'].forEach((e) => {
        price += Number(e.discount.price[e.choice])
      })
      return price
    },
    oldTotalPrice () {
      let price = 0
      this.$store.getters['order/getOrderArr'].forEach((e) => {
        price += Number(e.discount.oldPrice[e.choice])
      })
      return `${this.numberFormat(price)} ${this.currency === 'USD' ? '$' : '₽'}`
    },
    oldTotalPriceValue () {
      let price = 0
      this.$store.getters['order/getOrderArr'].forEach((e) => {
        price += Number(e.discount.oldPrice[e.choice])
      })
      return price
    }
  },
  mounted () {
    this.$store.commit('setLoading', false)
    this.preload = false
  },

  methods: {
    numberFormat (value) {
      return numberFormatFunc(value)
    },
    resetEmail () {
      this.email = ''
      this.emailValid = false
    },
    async checkEmail () {
      this.error = ''
      try {
        const result = await apiService.post(`${apiUrl}/is_exist_email/`, {
          email: this.email
        })
        if (result.data.is_exist) {
          this.emailValid = true
        }
      } catch (e) {
        if (e.response.data && e.response.data.is_exist === false) {
          this.error = 'Пользователь не найден/не зарегистрирован'
        } else {
          this.error = e.message
        }
      }
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
                monthSub = 12
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
            for_other_email: this.email,
            data: locationList,
            currency: this.$store.state.user.currency,
            lang: this.$nuxt.$i18n.locale,
            email: this.$store.getters['user/getEmail']
          }
          if (this.$store.getters['order/getPromocode']) {
            data.promocode = this.$store.getters['order/getPromocode']
          }
          // const order = await this.$store.dispatch('purchases/purchase', data)
          const order = await this.$store.dispatch('purchases/purchase', data)
          if (order.status && order.status === 200 && order.data && order.data.paid) {
            this.$store.commit('order/clearAll')
            this.sucsesfullPay = true
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
.content {
  display: flex;
  // flex-direction: column;
  justify-content: center;
  // align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  background: url("~/assets/images/bg.svg") #F8F9FD no-repeat center center fixed;
  overflow: auto;
  &_pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - var(--height-header));

  }
  &__wrap {
    border-radius: 7px;
    background-color: var(--color-bg-white-2);
    min-width: 40vw;
    min-height: 60vh;
    overflow: hidden;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: sizeIncr(18, 36);
    border-bottom: 1px solid var(--color-border-1);
  }
  &__count {
    margin-bottom: 10px;
    padding-left: 10px;
    font-weight: 500;
    color: var(--color-text-1);
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
    height: 100%;
    max-height: calc(100vh - 90px - 105px - 20px - 70px);
    overflow: auto;
  }
  &__title {
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-weight: 600;
    font-size: sizeIncr(18, 24);
    line-height: 110%;
    color: var(--color-text-1);
    svg {
      margin-right: 4px;
      width: 24px;
      height: 24px;
    }
    &_email {
      margin-bottom: 20px;
    }
  }
  &__btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 7px sizeIncr(5, 10);
    max-height: 45px;
    border: 1px solid #3FA6FA;
    border-radius: 7px;
    font-weight: 500;
    color: var(--color-text-1);
    background-color: transparent;
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;
    &:hover {
      border-color: var(--color-btn-3);
      box-shadow: 0 0 0 4px var(--color-btn);
    }
    &:active {
      border-color: var(--color-btn-3);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }
    &_reset {
      margin-right: 10px;
      border-color:  #EA0C0E;;
      color: #EA0C0E;
    }
    &_submit {
      margin-left: auto;
    }
  }
  &__icon-add {
    @include transition;
    pointer-events: none;
    width: 24px;
    height: 24px;
  }
  &__search {
    margin-bottom: 10px;
    margin-left: 10px;
  }

  &__label {
    position: relative;
    padding: 12px 15px 12px;
    margin-bottom: 20px;
    border-radius: 10px;
    width: 100%;
    min-width: 330px;
    background-color: var(--color-bg-4);
    opacity: 0.8;
    @include transition;
    &:focus-within {
      opacity: 1;
      .login__label-info {
        opacity: 1;
      }
    }
  }
  &__label-info {
    position: absolute;
    margin: 0;
    inset: auto auto 0 18px;
    font-size: 10px;
    color: #A6A9B6;
    opacity: 0;
    @include transition;
    &_error {
      opacity: 1;
      color: #EA0C0E;
    }
  }
  &__wrap-input {
    position: relative;
    width: 100%;
  }
  &__input {
    width: 100%;
    color: var(--color-text-1);
  }
  &__input-btn {
    position: absolute;
    inset: 0 0 auto auto;
  }
  &__wrap-email {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__wrap-email-btn {
    display: flex;
    justify-content: space-between;
  }
  &__sucsesfull {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    font-weight: 500;
    font-size: 40px;
    width: 100%;
  }
  &__error {
    color: #EA0C0E;
  }
}
.wrap-preloader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
