<template>
  <div style="width: 100%" class="result">
    <div class="result__header">
      <svg
        class="result__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path d="M24 44C21.2667 44 18.6833 43.475 16.25 42.425C13.8167 41.375 11.6917 39.9417 9.875 38.125C8.05833 36.3083 6.625 34.1833 5.575 31.75C4.525 29.3167 4 26.7333 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05833 11.65 9.875 9.85C11.6917 8.05 13.8167 6.625 16.25 5.575C18.6833 4.525 21.2667 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7333 43.475 29.3167 42.425 31.75C41.375 34.1833 39.95 36.3083 38.15 38.125C36.35 39.9417 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44ZM24 41C28.7333 41 32.75 39.3417 36.05 36.025C39.35 32.7083 41 28.7 41 24C41 19.2667 39.35 15.25 36.05 11.95C32.75 8.65 28.7333 7 24 7C19.3 7 15.2917 8.65 11.975 11.95C8.65833 15.25 7 19.2667 7 24C7 28.7 8.65833 32.7083 11.975 36.025C15.2917 39.3417 19.3 41 24 41Z" fill="#EA0C0E" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M33.0297 17.2537L30.776 15L24.0148 21.7611L17.2537 15L15 17.2537L21.7611 24.0148L15 30.776L17.2537 33.0297L24.0148 26.2685L30.776 33.0297L33.0297 30.776L26.2686 24.0148L33.0297 17.2537Z" fill="#EA0C0E" />
      </svg>
      <BtnBack :to-router="`${$i18n.locale === 'ru' ? '/ru/' : '/'}`" />
    </div>
    <div class="result__title">
      {{ $t('headers.noSuccessfully') }}
    </div>
    <div class="result__text">
      {{ $t('texts.noSuccessText') }}
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
    </div>
  </div>
</template>

<script>
export default {
  computed: {
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
