<template>
  <div style="width: 100%" class="result">
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
    <div class="result__title">
      {{ $t('confirm.successful') }}
    </div>
    <div class="result__wrap-btn">
      <nuxt-link v-ripple class="result__btn result__btn_white" :to="`${$i18n.locale === 'ru' ? '/ru/' : '/'}`">
        <v-icon class="result__btn-icon" color="#0666EB">
          mdi-store
        </v-icon>
        {{ $t('buttons.backRates') }}
      </nuxt-link>
      <nuxt-link
        :to="`${$i18n.locale === 'ru' ? '/ru/' : '/'}user`"
        class="result__btn "
      >
        <svg
          class="result__btn-icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.85 15.1C4.7 14.45 5.65 13.9373 6.7 13.562C7.75 13.1873 8.85 13 10 13C11.15 13 12.25 13.1873 13.3 13.562C14.35 13.9373 15.3 14.45 16.15 15.1C16.7333 14.4167 17.1877 13.6417 17.513 12.775C17.8377 11.9083 18 10.9833 18 10C18 7.78333 17.221 5.89567 15.663 4.337C14.1043 2.779 12.2167 2 10 2C7.78333 2 5.896 2.779 4.338 4.337C2.77933 5.89567 2 7.78333 2 10C2 10.9833 2.16267 11.9083 2.488 12.775C2.81267 13.6417 3.26667 14.4167 3.85 15.1ZM10 11C9.01667 11 8.18733 10.6627 7.512 9.988C6.83733 9.31267 6.5 8.48333 6.5 7.5C6.5 6.51667 6.83733 5.68733 7.512 5.012C8.18733 4.33733 9.01667 4 10 4C10.9833 4 11.8127 4.33733 12.488 5.012C13.1627 5.68733 13.5 6.51667 13.5 7.5C13.5 8.48333 13.1627 9.31267 12.488 9.988C11.8127 10.6627 10.9833 11 10 11ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20ZM10 18C10.8833 18 11.7167 17.871 12.5 17.613C13.2833 17.3543 14 16.9833 14.65 16.5C14 16.0167 13.2833 15.6457 12.5 15.387C11.7167 15.129 10.8833 15 10 15C9.11667 15 8.28333 15.129 7.5 15.387C6.71667 15.6457 6 16.0167 5.35 16.5C6 16.9833 6.71667 17.3543 7.5 17.613C8.28333 17.871 9.11667 18 10 18ZM10 9C10.4333 9 10.7917 8.85833 11.075 8.575C11.3583 8.29167 11.5 7.93333 11.5 7.5C11.5 7.06667 11.3583 6.70833 11.075 6.425C10.7917 6.14167 10.4333 6 10 6C9.56667 6 9.20833 6.14167 8.925 6.425C8.64167 6.70833 8.5 7.06667 8.5 7.5C8.5 7.93333 8.64167 8.29167 8.925 8.575C9.20833 8.85833 9.56667 9 10 9Z" fill="#fff" />
        </svg>
        {{ $t('buttons.goToProfile') }}
      </nuxt-link>
    </div>
    <AppLink />
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
    overflow: hidden;
    background-color: #fff;
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
