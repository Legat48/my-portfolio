<template>
  <div class="discount">
    <div class="discount__wrap">
      <div class="discount__item">
        <div class="discount__row discount__row_title">
          <div class="discount__col discount__col_first discount__col_title">
            {{ $t('payment.quantity') }}
          </div>
          <div class="discount__col discount__col_title">
            {{ $t('payment.priceForOne') }}
          </div>
          <div class="discount__col discount__col_title discount__col_last">
            {{ $t('payment.total') }}
          </div>
        </div>
        <div
          v-for="(str,id) in ($store.state.user.currency==='USD'? $store.state.user.phUsdPromoSystem
            : $store.state.user.phRubPromoSystem)"
          :key="id"
          class="discount__row "
        >
          <div class="discount__col discount__col_first">
            {{ id }}
          </div>
          <div class="discount__col">
            {{ getPriceForOne(str)+' '+currency }}
          </div>
          <div class="discount__col discount__col_last">
            {{ getPriceForAll(id,str)+' '+currency }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromoSystemDialog',
  data () {
    return {
      tabs: [this.$t('auth.physical'), this.$t('auth.entity')],
      type: 0
    }
  },
  computed: {
    currency () {
      return this.getCurrency({
        sortBy: 'code',
        value: this.$store.state.user.currency
      }).symbol
    }
  },
  methods: {
    setType (val) {
      this.type = val - 1
    },
    getCurrency (data) {
      return this.$store.getters['user/allCurrencies'].find((x) => {
        return x[data.sortBy] === data.value
      })
    },
    getPriceForOne (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    getPriceForAll (x, price) {
      return (Math.round(x * price * 10) / 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.discount {
  display: flex;
  flex-direction: column;
  padding: sizeIncr(16, 40);
  &__tabs {
    margin-bottom: 15px;
    @media (min-width: 768px) {
      display: none;
    }
  }
  &__wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  &__item {
    display: flex;
    flex-direction: column;
    width: 100%;

  }
  &__title {
    display: none;
    margin-bottom: sizeIncr(14, 28);
    font-weight: 600;
    font-size: sizeIncr(16, 18);
    line-height: 120%;
    color: var(--color-text-1);
    @media (min-width: 768px) {
      display: flex;
    }
  }
  &__row {
    padding: sizeIncr(9, 18) 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    &:not(:first-child):not(.discount__row_title) {
      border-bottom: 1px solid  var(--color-border-1);
    }
  }
  &__col {
    font-weight: 400;
    font-size: sizeIncr(12, 14);
    line-height: 120%;
    justify-self: center;
    color: var(--color-text-1);
    &_title {
      font-weight: 600;
      font-size: sizeIncr(14, 16);
    }
    &_first {
      justify-self: start;
    }
    &_last {
      justify-self: end;
    }
  }
}
</style>
