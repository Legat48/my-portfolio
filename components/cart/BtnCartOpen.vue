<template>
  <div>
    <v-btn
      class="cart-btn"
      tile
      icon
      elevation="0"
      :aria-label="$t('seo.cart')"
      @click="openCart()"
    >
      <div
        v-if="!!cartItems.length"
        class="cart-btn__icon-info"
      >
        <div>
          {{ cartItems.length }}
        </div>
      </div>
      <v-icon color="primary" size="24">
        mdi-cart-outline
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'BtnCartOpen',
  data: () => ({
    menu: false
  }),
  computed: {
    cartItems () {
      return this.$store.getters['countries/getSelectedCountries']
    }
  },
  methods: {
    // eslint-disable-next-line require-await
    async openCart () {
      if (this.$store.getters['countries/getSelectedCountries'].length > 0) {
        await this.$store.dispatch('order/createOrder', {
          length: this.$store.getters['countries/getSelectedCountries'].length,
          currency: this.$store.state.user.currency,
          lang: this.$nuxt.$i18n.locale
        })
        this.$store.commit('dialog/setDialogComponent', 'ShoppingBasket')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-btn {
  border-radius: 7px;
  background-color: var(--color-bg-white-1);
  position: relative;
  &__icon-info {
    position: absolute;
    top: -11px;
    right: -6px;
    bottom: auto;
    left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-border-white-1);
    border-radius: 100px;
    height: 16px;
    width: 16px;
    font-size: 8px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn);
    div {
      position: relative;
      transform: translateX(-0.5px);
    }
  }
}
</style>
