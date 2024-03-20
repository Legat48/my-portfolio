<template>
  <v-btn
    class="switcher"
    color="tranparent"
    @click.prevent="changeCurrency()"
  >
    <span class="switcher__icon">
      {{ $store.state.user.currency === 'USD' ? '$' : '₽' }}
    </span>
  </v-btn>
</template>

<script>
export default {
  name: 'CurrencySwitcher',
  computed: {
    currentCurrency () {
      return this.$store.state.user.currency
    },
    differentCurrency () {
      return this.$store.state.user.currency === 'USD' ? 'RUB' : 'USD'
    }
  },
  methods: {
    async changeCurrency () {
      localStorage.setItem('currency', this.differentCurrency)
      this.$store.commit('user/setCurrency', this.differentCurrency)
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border: 1px solid var(--color-border-1);
  border-radius: 100px;
  min-width: 0 !important;
  width: sizeIncr(26, 32) !important;
  height: sizeIncr(26, 32) !important;
  font-weight: 600 !important;
  font-size: sizeIncr(20, 26);
  color: var(--color-text-1);
  background-color: transparent !important;
  &__icon {
    position: relative;
    // transform: translate(-1px, -1px);
  }
}
</style>
