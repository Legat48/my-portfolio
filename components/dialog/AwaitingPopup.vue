<template>
  <div style="width: 100%" class="awaiting">
    <div class="awaiting__title">
      <svg
        class="awaiting__icon"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M27.35 29.65L29.6 27.4L21.65 19.4V9.35H18.65V20.6L27.35 29.65ZM20 40C17.2667 40 14.6833 39.475 12.25 38.425C9.81667 37.375 7.69167 35.9417 5.875 34.125C4.05833 32.3083 2.625 30.1833 1.575 27.75C0.525 25.3167 0 22.7333 0 20C0 17.2667 0.525 14.6833 1.575 12.25C2.625 9.81667 4.05833 7.69167 5.875 5.875C7.69167 4.05833 9.81667 2.625 12.25 1.575C14.6833 0.525 17.2667 0 20 0C22.7333 0 25.3167 0.525 27.75 1.575C30.1833 2.625 32.3083 4.05833 34.125 5.875C35.9417 7.69167 37.375 9.81667 38.425 12.25C39.475 14.6833 40 17.2667 40 20C40 22.7333 39.475 25.3167 38.425 27.75C37.375 30.1833 35.9417 32.3083 34.125 34.125C32.3083 35.9417 30.1833 37.375 27.75 38.425C25.3167 39.475 22.7333 40 20 40ZM20 37C24.6667 37 28.6667 35.3333 32 32C35.3333 28.6667 37 24.6667 37 20C37 15.3333 35.3333 11.3333 32 8C28.6667 4.66667 24.6667 3 20 3C15.3333 3 11.3333 4.66667 8 8C4.66667 11.3333 3 15.3333 3 20C3 24.6667 4.66667 28.6667 8 32C11.3333 35.3333 15.3333 37 20 37Z" fill="#0666EB" />
      </svg>
      <div class="">
        {{ $t('awaiting.awaiting') }}
      </div>
    </div>
    <div class="awaiting__text">
      <div>
        {{ $t('awaiting.awaitingTextOne') }}
      </div>
      <div>
        {{ $t('awaiting.awaitingTextTwo') }}
      </div>
    </div>
    <div class="awaiting__wrap-btn">
      <v-btn ref="refreshButton" class="awaiting__btn" color="#FFF" @click="refresh()">
        <v-icon class="awaiting__btn-icon" :class="{'awaiting__btn-icon_anim' : awaiting}" color="#0666EB">
          mdi-sync
        </v-icon>
        {{ $t('awaiting.update') }}
      </v-btn>
      <v-btn
        v-if="orderInfo?.url"
        class="awaiting__btn awaiting__btn_white"
        color="#0666EB"
        dark
        link
        :href="orderInfo.url"
        target="_blank"
      >
        <v-icon class="awaiting__btn-icon" color="white">
          mdi-store
        </v-icon>
        <span class="awaiting__btn-text">
          {{ $t('awaiting.linkPay') }}
        </span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      awaiting: false
    }
  },
  computed: {
    orderInfo () {
      return this.$store.getters['order/getOrderInfo']
    }
  },
  methods: {
    async refresh () {
      this.awaiting = true
      const result = await this.$store.dispatch('order/checkOrder')
      if (result) {
        this.$store.commit('order/clearAll')
        this.$store.commit('dialog/closeDialog')
        this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}pay`)
      } else {
        this.$refs.refreshButton.$el.classList.add('error')
        setTimeout(() => {
          this.$refs.refreshButton.$el.classList.remove('error')
        }, 1000)
      }
      this.awaiting = false
    },
    reset () {
      this.$store.commit('setStatusApp', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.awaiting {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: sizeIncr(10, 20);
  border-radius: 10px;
  min-width: 30%;
  overflow: hidden;
  background-color: #fff;
  &__title {
    display: flex;
    margin-bottom: sizeIncr(10, 15);
    font-weight: 600;
    font-size: sizeIncr(20, 28);
    line-height: 160%;
    color: #121B2F;
  }
  &__icon {
    margin-right: sizeIncr(10, 15);
    width:sizeIncr(40, 60);
    height:sizeIncr(40, 60);
  }
  &__text {
    display: flex;
    flex-direction: column;
    margin-bottom: sizeIncr(32, 40);
    font-size: sizeIncr(14, 18);
    line-height: 120%;
    color: #121B2F;
  }
  &__wrap-btn {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  &__btn {
    padding: sizeIncr(12, 15) !important;
    border: 1px solid #0666EB !important;
    border-radius: 10px;
    overflow: hidden;
    height: auto !important;
    font-weight: 500;
    font-size: sizeIncr(16, 20) !important;
    line-height: 120%;
    color: #0666EB;
    box-shadow: none;
    &:not(:last-child) {
      margin-bottom: sizeIncr(10, 20);
    }
    &_back {
      position: absolute;
      inset: 5px 5px auto auto;
      border: none !important;
    }
    &_white {
      color: #fff;
    }
  }
  &__btn-text {
    @include transition;
  }
  &__btn-icon {
    margin-right: sizeIncr(12, 12);
    @include transition;
    &_anim {
      animation: spin 1s infinite linear;
    }
  }
  &__btn.error {
    border-color: #ff0000!important;
    color: #ff0000 !important;
    background-color: transparent !important;
    animation: shake 0.5s infinite;
    .awaiting__btn-icon {
      color: #ff0000 !important;
    }
  }
}

@keyframes shake {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-5px, 0); }
  50% { transform: translate(5px, 0); }
  75% { transform: translate(-5px, 0); }
  100% { transform: translate(5px, 0); }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
