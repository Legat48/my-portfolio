<template>
  <div
    class="thank"
  >
    <div class="thank__text">
      {{ $t('payment.thanksForPaymentOne') }}
    </div>
    <div class="thank__subtext">
      {{ $t('payment.thanksForPaymentTwo') }}
    </div>
    <v-btn
      class="thank__btn"
      width="100%"
      @click="openPurchases()"
    >
      <v-icon size="18" class="mr-1" color="primary">
        mdi-shopping
      </v-icon>
      <span class="thank__btn-text">
        {{ $t("purchases.myPurchases") }}
      </span>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'ThanksDialog',
  data: () => ({
  }),

  methods: {
    async openPurchases () {
      await this.$store.dispatch('purchases/fetchOrders')
      this.$store.commit('dialog/closeDialog')
      this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}pay`)
    }
  }
}
</script>

<style lang="scss" scoped>
.thank {
  display: flex;
  flex-direction: column;
  padding: sizeIncr(16, 40);

  &__text {
    margin-bottom: sizeIncr(10, 15);
    font-weight: 600;
    font-size: 24px;
    line-height: 19px;
    color: var(--color-text-1);
    text-align: center;
  }
  &__subtext {
    margin-bottom: sizeIncr(30, 45);
    font-size: 16px;
    line-height: 19px;
    color: var(--color-text-1);
    text-align: center;
  }
  &__btn {
    margin-left: auto;
    width: 200px !important;
  }
  &__btn-text {
    color: var(--color-text-1);
  }
}
</style>
