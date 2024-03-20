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
        {{ $t('helpModal.title1') }}
        <span class="help__title-span">
          {{ $t('helpModal.title2') }}
        </span>
        <br>
        {{ $t('helpModal.title3') }}
      </h2>
      <div class="help__wrap-input">
        <label for="phone" class="help__label">
          <div class="help__wrap-input">
            <input
              id="phone"
              v-model="phone"
              class="help__input"
              :placeholder="$t('helpModal.contactNumber')"
              @input="validatePhone"
            >
          </div>
          <p class="help__label-info" :class="{'help__label-info_error' : phoneError}">
            {{ $t('registr.phoneValid') }}
          </p>
        </label>
        <label for="tw" class="help__label">
          <div class="help__wrap-input">
            <input
              id="tw"
              v-model="tw"
              :placeholder="$t('helpModal.TW')"
              class="help__input"
            >
          </div>
        </label>
      </div>
      <button v-ripple class="help__btn btn" :class="{'help__btn_disabled' :!valid}" @click="submit()">
        {{ $t('helpModal.submit') }}
        <svg
          class="help__btn-icon"
          width="31"
          height="9"
          viewBox="0 0 31 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path id="Arrow 1 (Stroke)" d="M26.792 0.179199L30.8145 4.06787C31.0615 4.30664 31.0615 4.69336 30.8145 4.93213L26.792 8.8208C26.5449 9.05957 26.1445 9.05957 25.8975 8.8208C25.6504 8.58252 25.6504 8.19531 25.8975 7.95703L28.8418 5.11133L0 5.11133L0 3.88867L28.8418 3.88867L25.8975 1.04297C25.6504 0.804688 25.6504 0.41748 25.8975 0.179199C26.1445 -0.0595703 26.5449 -0.0595703 26.792 0.179199Z" fill="#FFFFFF" fill-opacity="1.000000" fill-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      phone: '',
      tw: '',
      valid: false,
      phoneError: false
    }
  },
  computed: {
    pngUrl () {
      try {
        return require('@/assets/images/help-modal.png')
      } catch (e) {
        return ''
      }
    },
    webpUrl () {
      try {
        return require('@/assets/images/help-modal.webp')
      } catch (e) {
        return ''
      }
    }
  },
  watch: {
    phone (value) {
      this.validatePhone(value)
      this.updateValid()
    },
    tw () {
      this.updateValid()
    }
  },
  methods: {
    validatePhone (phone) {
      const phoneRegex = /^\+(?:[0-9]){11,15}$/
      this.phoneError = !phoneRegex.test(phone)
    },
    updateValid () {
      this.valid = !this.phoneError && this.phone
    },
    async submit () {
      this.valid = false
      const bodyFormData = new FormData()
      bodyFormData.append('contact_optional', this.tw)
      bodyFormData.append('contact_phone', this.phone)
      const config = {
        method: 'post',
        // тут нужно разместить адрес куда отправить данные клиента
        url: 'https://port.ranks.pro/free-consultation/',
        data: bodyFormData
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await axios(config).then((response) => {
        this.$store.commit('dialog/setDialogComponent', 'HelpSend')
        return true
      })
        .catch(function (error) {
          console.error(error)
          this.valid = true
          return false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.help {
  display: flex;
  gap: sizeIncr(26, 60);
  padding: sizeIncr(18, 75);
  @media (max-width: 569px) {
    flex-direction: column;
    align-items: center;
  }
  &__wrap {
    display: flex;
    flex-direction: column;
    gap: sizeIncr(16, 23);
  }
  &__title {
    font-size: sizeIncr(26, 48);
    font-weight: 700;
    line-height: 105%;
    color: var(--color-text-1);
    @media (max-width: 569px) {
      text-align: center;
    }
  }
  &__title-span {
    color: var(--color-text-3);
  }
  &__wrap-img {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__img {
    width: sizeIncr(102, 224);
    height: sizeIncr(96, 211);
  }
  &__wrap-input {
    display: flex;
    gap: 16px;
    @media (max-width: 569px) {
      flex-direction: column;
    }
  }
  &__label {
    position: relative;
    padding: 8px 18px 12px;
    border: 1px solid #D7D7E7;
    border-radius: 10px;
    width: 100%;
    background-color: var(--color-bg-4);
    @include transition;
    &:focus-within {
      border-color: #0666EB;
      .help__label-title {
        color: #0666EB;
      }
      .help__label-info {
        opacity: 1;
      }
    }
  }
  &__label-info {
    position: absolute;
    margin: 0;
    inset: auto auto 0 18px;
    font-size: 10px;
    color: #A6A9B6;
    opacity: 0;
    @include transition;
    &_error {
      opacity: 1;
      color: #EA0C0E;
    }
  }
  &__wrap-input {
    position: relative;
    width: 100%;
  }
  &__input {
    width: 100%;
    color: #121B2F;
  }

  &__text {
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text-1);
    &_center {
      margin: 0 auto;
    }
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 0px 30px;
    border-radius: 10px;
    height: 50px;
    min-height: 50px;
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text-white-1);
    background: linear-gradient(-62.98deg, rgb(98, 184, 255) 0%,rgb(8, 141, 249) 96.659%);
    &_disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
  &__btn-icon {
    width: 31px;
    height: 9px;
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
