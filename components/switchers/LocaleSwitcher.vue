<template>
  <div class="switcher">
    <button
      v-for="locale in supportedLocales"
      v-show="locale !== currentLocale"
      :key="locale"
      v-ripple
      elevation="0"
      style="background: transparent"
      height="24"
      class="rounded-lg switcher__btn"
      @click.prevent="switchLocale(locale)"
    >
      <div v-if="currentLocale === 'ru'" class="switcher__icon" />
      <div
        v-if="currentLocale !== 'ru'"
        class="switcher__icon switcher__icon_en"
      />
      <span v-if="$vuetify.breakpoint.lgAndUp" class="switcher__btn-text font-16">
        {{ currentLocale.toUpperCase() }}
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'LocaleSwitcher',
  computed: {
    supportedLocales () {
      return this.$i18n.availableLocales
    },
    currentLocale () {
      return this.$nuxt.$i18n.locale
    },
    currentCurrency () {
      return this.$store.state.user.currency
    },
    differentCurrency () {
      return this.$store.state.user.currency === 'USD' ? 'RUB' : 'USD'
    }
  },
  methods: {
    async switchLocale (locale) {
      this.$i18n.setLocale(locale)
      if (locale === 'ru') {
        localStorage.setItem('currency', 'RUB')
        this.$store.commit('user/setCurrency', 'RUB')
      } else {
        localStorage.setItem('currency', 'USD')
        this.$store.commit('user/setCurrency', 'USD')
      }
      if (this.$store.getters['dialog/getDialogComponent'] === 'ShoppingBasket' || this.$store.getters['dialog/getDialogComponent'] === 'BasePayment') {
        await this.$store.dispatch('order/createOrder', {
          length: this.$store.getters['countries/getSelectedCountries'].length,
          currency: this.$store.state.user.currency,
          lang: this.$nuxt.$i18n.locale,
          promocode: this.$store?.getters['order/getPromocode']
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  &__icon {
    border-radius: 100px;
    width: sizeIncr(26, 32);
    height: sizeIncr(26, 32);
    background-image: url("@/assets/images/ru.png");
    background-repeat: no-repeat;
    background-size: contain;
    &_en {
      background-image: url("@/assets/images/en.png");
    }
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }
  &__btn {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    color: var(--color-text-1);
    width: 100%;
  }
  &__btn-text {
    margin-left: 12px;
  }
}
.switcher__btn:not(.v-btn--round) {
  @media (max-width: 1264px) {
    min-width: 32px;
    padding: 0;
  }
}
</style>
