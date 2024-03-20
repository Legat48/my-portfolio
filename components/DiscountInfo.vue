<template>
  <div class="disc-info">
    <div
      class="disc-info__wrap"
    >
      <div
        v-if="'discount' in $store.state.order.discountInfo"
        class="disc-info__wrap-title"
      >
        <div class="disc-info__title">
          {{ $t('payment.discount') }}:
        </div>
        <div class="disc-info__text">
          {{ Math.floor(discount[0] * 100) + '%' }} {{ $vuetify.breakpoint.smAndUp ? (' / ' +(round(discount[1])) + currency ) : ''}}
        </div>
      </div>

      <v-btn
        class="disc-info__btn"
        height="16"
        text
        @click.prevent="$store.commit('dialog/setSubDialogComponent','DiscountSystem')"
      >
        <v-icon v-if="$vuetify.breakpoint.smAndUp" class="disc-info__icon" size="16" color="#CFD9E6">
          mdi-information
        </v-icon>
        <span class="disc-info__btn-text">
          {{ $t('payment.aboutDiscountSystem') }}
        </span>
      </v-btn>
    </div>
    <div
      v-if="totalPrice"
      class="d-flex align-center font-weight-medium flex-column align-center primary--text"
    >
      <div class="d-flex font-16 mb-1" style="line-height: 16px">
        <v-icon class="disc-info__icon" size="16" color="primary">
          mdi-cash-register
        </v-icon>
        {{ round(totalPrice) + currency }}
      </div>
      <div
        v-if="('discount' in $store.state.order.discountInfo)&&oldTotalPrice!==totalPrice"
        class="font-14"
        style="color:#A4A5B9; text-decoration-line: line-through; line-height: 14px"
      >
        {{ round(oldTotalPrice) + currency }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DiscountInfo',
  computed: {
    discount () {
      return this.$store.getters['order/getDiscountInfo'].discount
    },
    totalPrice () {
      return this.$store.state.order?.discountInfo.totalPrice
    },
    oldTotalPrice () {
      return this.$store.state.order?.discountInfo.oldTotalPrice
    },
    currency () {
      const currency = this.getCurrency({
        sortBy: 'code',
        value: this.$store.getters['user/getCurrency']
      }).symbol
      return currency
    }

  },
  methods: {
    getCurrency (data) {
      return this.$store.getters['user/allCurrencies'].find((x) => {
        return x[data.sortBy] === data.value
      })
    },
    round (digit) {
      return Math.round(digit * 100) / 100
    }
  }
}
</script>

<style lang="scss">
.disc-info {
  display: flex;
  align-items: center;
  margin: 0 4px;
  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__wrap-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: sizeIncr(4, 8);
    margin-left: sizeIncr(4, 8);
  }
  &__title {
    margin-right: sizeIncr(4, 8);
    font-size: sizeIncr(14, 16);
    line-height: 114%;
    color: var(--color-text-2);
  }
  &__text {
    font-weight: 500;
    font-size: sizeIncr(14, 16);
    line-height: 114%;
    color: var(--color-text-1);
  }
  &__btn {
    padding: 0 sizeIncr(5, 10) !important;
  }
  &__btn-text {
    font-weight: 500;
    font-size: sizeIncr(12, 16);
    color: var(--color-btn) !important;
  }
  &__icon {
    margin-right: 5px;
  }
}
</style>
