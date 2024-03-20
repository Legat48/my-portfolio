<template>
  <div style="width: 100%" class="result">
    <div class="result__header">
      <svg
        class="result__icon"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.05 29.1L31.2 14.95L28.9 12.7L17.05 24.55L11.05 18.55L8.8 20.8L17.05 29.1ZM20 40C17.2667 40 14.6833 39.475 12.25 38.425C9.81667 37.375 7.69167 35.9417 5.875 34.125C4.05833 32.3083 2.625 30.1833 1.575 27.75C0.525 25.3167 0 22.7333 0 20C0 17.2333 0.525 14.6333 1.575 12.2C2.625 9.76667 4.05833 7.65 5.875 5.85C7.69167 4.05 9.81667 2.625 12.25 1.575C14.6833 0.525 17.2667 0 20 0C22.7667 0 25.3667 0.525 27.8 1.575C30.2333 2.625 32.35 4.05 34.15 5.85C35.95 7.65 37.375 9.76667 38.425 12.2C39.475 14.6333 40 17.2333 40 20C40 22.7333 39.475 25.3167 38.425 27.75C37.375 30.1833 35.95 32.3083 34.15 34.125C32.35 35.9417 30.2333 37.375 27.8 38.425C25.3667 39.475 22.7667 40 20 40ZM20 37C24.7333 37 28.75 35.3417 32.05 32.025C35.35 28.7083 37 24.7 37 20C37 15.2667 35.35 11.25 32.05 7.95C28.75 4.65 24.7333 3 20 3C15.3 3 11.2917 4.65 7.975 7.95C4.65833 11.25 3 15.2667 3 20C3 24.7 4.65833 28.7083 7.975 32.025C11.2917 35.3417 15.3 37 20 37Z" fill="#07B021" />
      </svg>
      <BtnBack :to-router="`${$i18n.locale === 'ru' ? '/ru/' : '/'}`" />
    </div>
    <div class="result__title">
      {{ $t('headers.successfully') }}
    </div>
    <div class="result__text">
      {{ $t('texts.successText') }}
    </div>
    <div class="result__wrap-btn">
      <nuxt-link
        v-ripple
        class="result__btn result__btn_white"
        :to="`${$i18n.locale === 'ru' ? '/ru/' : '/'}`"
      >
        <v-icon class="result__btn-icon" color="#0666EB">
          mdi-store
        </v-icon>
        {{ $t('buttons.returnToPay') }}
      </nuxt-link>
      <nuxt-link
        v-ripple
        :to="`${$i18n.locale === 'ru' ? '/ru/' : '/'}pay`"
        class="result__btn"
      >
        <v-icon size="18" class="result__btn-icon" color="#fff">
          mdi-shopping
        </v-icon>
        {{ $t('buttons.goToPortfolios') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentLocale () {
      return this.$i18n.locale
    }
  }
}
</script>

<style lang='scss' scoped>
.result {
  position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding: sizeIncr(10, 20);
    border-radius: 10px;
    min-width: 30%;
    max-width: 550px;
    overflow: hidden;
    background-color: #fff;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: sizeIncr(41, 82);
    }
    &__title {
      display: flex;
      flex-direction: column;
      margin-bottom: sizeIncr(10, 15);
      font-weight: 600;
      font-size: sizeIncr(20, 28);
      line-height: 160%;
      color: #121B2F;
    }
    &__icon {
      margin-bottom: sizeIncr(10, 15);
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
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 7px;
      border: 1px solid #0666EB;
      height: 42px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #fff;
      background-color: #0666EB;
      box-shadow: 3px 0px 28px rgba(0, 0, 0, 0.01);
      &:not(:last-child) {
        margin-bottom: sizeIncr(10, 20);
      }
      &_back {
        position: absolute;
        inset: 0 0 auto auto;
        padding: sizeIncr(10, 20) !important;
        border-radius: 10px;
        overflow: hidden;
        height: auto !important;
        font-weight: 500;
        font-size: sizeIncr(16, 20) !important;
        line-height: 120%;
        box-shadow: none;
        border: none !important;
        color: #0666EB;
      }
      &_white {
        color: #0666EB;
        background-color: #fff;
      }
    }
    &__btn-icon {
      margin-right: sizeIncr(12, 12);
      width: sizeIncr(16, 20);
      height: sizeIncr(16, 20);
    }
}
</style>
