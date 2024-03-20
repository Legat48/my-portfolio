<template>
  <div class="help">
    <div class="help__wrap-img">
      <picture class="help__img">
        <source :srcset="webpUrl" type="image/webp">
        <img height="24" width="24" alt="" :src="pngUrl">
      </picture>
    </div>
    <div class="help__wrap">
      <h2 class="help__title">
        {{ $t('helpModal.titleSend') }}
      </h2>
      <p class="help__text">
        {{ $t('helpModal.textSend') }}
      </p>
      <div class="help__wrap-gray">
        <p class="help__text help__text_ac">
          {{ $t('helpModal.infoSend1') }}
          <span class="help__text-span">
            {{ $t('helpModal.infoSend2') }}
          </span>
          {{ $t('helpModal.infoSend3') }}
        </p>
        <a v-ripple href="https://t.me/RanksInvest" target="_blank" class="help__btn btn">
          <svg
            class="help__btn-icon"
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              id="image 38 (Traced)"
              d="M22.3838 0.108643C20.7861 0.696533 1.09668 8.2644 0.807617 8.40186C-0.15625 8.85889 -0.269531 9.4624 0.533203 9.87085C0.610352 9.91016 1.94336 10.3364 3.49414 10.8184L6.31543 11.6941L12.7197 7.68555C16.2432 5.48071 19.1963 3.6521 19.2832 3.62183C19.5 3.5459 19.6875 3.55298 19.7744 3.64038C19.8359 3.70166 19.8389 3.73242 19.79 3.82227C19.7578 3.88184 17.4189 6.00732 14.5918 8.54565C11.7646 11.084 9.44434 13.1804 9.43457 13.2048C9.42578 13.229 9.33008 14.4963 9.22266 16.021L9.02637 18.793L9.23926 18.7642C9.35645 18.7485 9.54102 18.688 9.65039 18.6301C9.75977 18.572 10.4961 17.905 11.2861 17.1479C12.0762 16.3906 12.75 15.7605 12.7832 15.7476C12.8174 15.7349 14.0752 16.6267 15.5801 17.7295C17.085 18.8323 18.4336 19.7893 18.5771 19.856C18.9551 20.0305 19.3809 20.0479 19.6582 19.8999C19.9053 19.7676 20.1465 19.4392 20.248 19.0972C20.2871 18.9648 21.1475 14.9883 22.1592 10.2607C23.8447 2.3894 23.999 1.6272 24 1.21875C24.001 0.832764 23.9844 0.740967 23.8809 0.537598C23.8086 0.394531 23.6836 0.248291 23.5625 0.162842C23.2852 -0.0327148 22.8252 -0.0537109 22.3838 0.108643Z"
              fill="#FFFFFF"
              fill-opacity="1.000000"
              fill-rule="evenodd"
            />
          </svg>
          {{ $t('helpModal.ranksInvest') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  computed: {
    pngUrl () {
      try {
        return require('@/assets/images/help-send.png')
      } catch (e) {
        return ''
      }
    },
    webpUrl () {
      try {
        return require('@/assets/images/help-send.webp')
      } catch (e) {
        return ''
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.help {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: sizeIncr(26, 60);
  padding: sizeIncr(18, 75);

  &__wrap {
    display: flex;
    flex-direction: column;
    gap: sizeIncr(16, 23);
  }

  &__title {
    font-size: sizeIncr(26, 48);
    font-weight: 700;
    line-height: 105%;
    text-align: center;
    color: var(--color-text-1);
  }

  &__wrap-img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__img {
    width: 104px;
    height: 104px;
  }

  &__text {
    font-size: 20px;
    font-weight: 500;
    margin: 0 auto;
    color: var(--color-text-1);

    &_ac {
      text-align: center;
    }
  }

  &__text-span {
    color: var(--color-text-3);
  }

  &__wrap-gray {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: sizeIncr(24, 30) sizeIncr(18, 32);
    border-radius: 15px;
    background-color: var(--color-bg-5);

    @media (max-width: 869px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 0px 60px;
    border-radius: 10px;
    height: 50px;
    min-height: 50px;
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text-white-1);
    background: linear-gradient(-62.98deg, rgb(98, 184, 255) 0%, rgb(8, 141, 249) 96.659%);

    &_disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  &__btn-icon {
    width: 24px;
    height: 20px;
  }
}

.transition-dialog-enter-active,
.transition-dialog-leave-active {
  @include transition
}

.transition-dialog-enter,
.transition-dialog-leave-to {
  opacity: 0;
}
</style>
