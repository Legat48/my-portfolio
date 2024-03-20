<template>
  <div class="promo">
    <v-spacer />
    <div v-if="!!$store.state.order.promocode" class="promo__text">
      <div class="promo__wrap-text">
        <div class="font-12 mr-1" style="color:#A4A5B9">
          {{ $t('payment.promo') }}:
        </div>
        <div class="font-14 primary--text">
          {{ $store.state.order.promocode }}
        </div>
      </div>
      <v-btn
        class="promo__close-btn"
        icon
        @click="removePromo()"
      >
        <v-icon color="#6D8DB9">
          mdi-close
        </v-icon>
      </v-btn>
    </div>
    <v-text-field
      v-if="!$store.state.order.promocode && $store.getters['user/auth']"
      v-model="promo"
      class="promo__input"
      hide-spin-buttons
      style="max-width: 171px"
      height="40"
      dense
      :error-messages="promoError"
      outlined
      :label="$t('payment.promo')"
    />
    <v-btn
      v-if="!$store.state.order.promocode"
      ref="refreshButton"
      outlined
      height="40"
      class="promo__btn"
      color="colorBtn"
      @click="submitPromo"
    >
      {{ $store.getters['user/auth'] ? $t('buttons.apply') : $t('payment.promoAuth') }}
    </v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      promo: null,
      promoError: null
    }
  },
  watch: {
    promo () {
      this.promoError = null
    }
  },
  methods: {
    async submitPromo () {
      if (this.$store.getters['user/auth']) {
        try {
          await this.$store.dispatch('order/checkPromo',
            {
              promocode: this.promo.toUpperCase(),
              email: this.$store.getters['user/getEmail']
            })
          await this.$store.commit('order/setPromocode', this.promo.toUpperCase())
          await this.$store.dispatch('order/createOrder', {
            length: this.$store.getters['countries/getSelectedCountries'].length,
            currency: this.$store.state.user.currency,
            promocode: this.promo.toUpperCase(),
            email: this.$store.getters['user/getEmail']
          })
          this.promo = null
        } catch (e) {
          this.promo = null
          this.$refs.refreshButton.$el.classList.add('error')
          setTimeout(() => {
            this.$refs.refreshButton.$el.classList.remove('error')
          }, 1000)
          this.promoError = e.response?.data?.promocode
        }
      } else {
        this.$store.commit('dialog/setSubDialogComponent', 'BaseLogin')
      }
    },
    async removePromo () {
      await this.$store.commit('order/setPromocode', '')
      await this.$store.dispatch('order/createOrder', {
        length: this.$store.getters['countries/getSelectedCountries'].length,
        currency: this.$store.state.user.currency,
        promocode: ''
      })
      this.promo = null
    }
  }
}
</script>

<style lang="scss" scoped>
.promo {
  display: flex;
  align-items: flex-start;
  &__text {
    padding: sizeIncr(10, 20);
    display: flex;
    align-items: center;
    margin-right: sizeIncr(10, 20);
  }
  &__wrap-text {
    display: flex;
  }
  &__input {
    margin-right: sizeIncr(10, 20);
  }
  &__input,
  &__btn {
    margin-top: 5px;
  }
  &__btn {
    margin-bottom: 10px;
    border: 1px solid var(--color-border-3) !important;
    font-size: sizeIncr(12, 16) !important;
    @include transition;
  }
  &__btn.error {
    border: 1px solid #ff0000  !important;
    color: #ff0000 !important;
    background-color: transparent !important;
    animation: shake 0.5s infinite;
  }
}
@keyframes shake {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-5px, 0); }
  50% { transform: translate(5px, 0); }
  75% { transform: translate(-5px, 0); }
  100% { transform: translate(5px, 0); }
}
</style>
