<template>
  <div class="registr" lazy-validation>
    <h2 class="registr__title">
      {{ $t('oldUserPhone.login') }}
      <v-btn class="registr__btn registr__btn_back" color="transparent" dark @click.prevent="reset()">
        <v-icon class="registr__btn-icon" color="#0666EB">
          mdi-arrow-left
        </v-icon>
        <span class="registr__text-back">
          {{ $t('buttons.back') }}
        </span>
      </v-btn>
    </h2>
    <div class="registr__text registr__text_bold">
      {{ $t('oldUserPhone.confirmOldDesc1') }}
    </div>
    <div class="registr__text registr__text_bold">
      {{ $t('oldUserPhone.confirmOldDesc2') }}
    </div>
    <div class="registr__text">
      {{ $t('oldUserPhone.confirmOldText1') }}
    </div>
    <div class="registr__text">
      {{ $t('oldUserPhone.confirmOldText2') }}
    </div>
    <label for="phone" class="registr__label">
      <div class="registr__label-title">
        {{ $t('oldUserPhone.phone') }}
      </div>
      <div class="registr__wrap-input">
        <input
          id="phone"
          v-model="phone"
          class="registr__input"
          required
          @input="validatePhone"
        >
      </div>
      <p class="registr__label-info" :class="{'registr__label-info_error' : errorPhone}">
        {{ $t('oldUserPhone.phoneValid') }}
      </p>
    </label>
    <div v-if="errorPhoneText" class="registr__error">
      {{ errorPhoneText }}
    </div>
    <button
      ref="submitButton"
      v-ripple
      class="registr__btn btn"
      :class="{'registr__btn_disabled' :!valid}"
      @click="submit"
    >
      <v-icon class="registr__btn-icon" dense color="#FFF">
        mdi-account-edit-outline
      </v-icon>
      {{ $t('oldUserPhone.phoneSubmitButton') }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'ConfirmOld',
  data () {
    return {
      phone: '',
      errorPhone: false,
      errorPhoneText: '',
      valid: false
    }
  },
  watch: {
    phone (value) {
      this.validatePhone(value)
      this.updateValid()
    }
  },
  async mounted () {
  },
  methods: {
    validatePhone (phone) {
      const phoneRegex = /^\+(?:[0-9]){11,15}$/
      this.errorPhone = !phoneRegex.test(phone)
    },

    updateValid () {
      this.valid = !this.errorPhone && this.phone
    },
    reset () {
      this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}user/login`)
    },
    async submit () {
      this.valid = false
      this.errorPhoneText = ''
      const result = await this.$store.dispatch('oldUserPhone/sendNewPhone', {
        phone: this.phone,
        fromInfo: 'web interface portfolio',
        email: this.$store.getters['oldUserPhone/getRegistrEmail'],
        lang: this.$i18n.locale
      })
      if (result.status === 200) {
        this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}confirm/old-code`)
      } else {
        this.phone = ''
        this.errorPhoneText = result.data?.errorText
      }
      this.valid = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .registr {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width: 340px;
    padding: sizeIncr(10, 20) sizeIncr(10, 20) sizeIncr(50, 50);
    border-radius: 10px;
    min-width: 30%;
    overflow: hidden;
    background-color: #fff;
    &__title {
      display: flex;
      justify-content: space-between;
      margin-bottom: sizeIncr(10, 15);
      font-weight: 600;
      font-size: sizeIncr(20, 28);
      line-height: 160%;
      color: #121B2F;
    }
    &__label {
      margin-right: auto;
      width: auto;
    }

    &__text {
      margin-bottom: 8px;
      font-family: Inter;
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      text-align: left;
      color: #121B2F;
      span {
        font-weight: 700;
      }
      &_bold {
        font-weight: 700;
      }
    }
    &__text-icon {
      margin-right: 6px;
      width: 16px;
      height: 16px;
    }
    &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    height: 42px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #fff;
    background-color: #0666EB;
    box-shadow: 3px 0px 28px rgba(0, 0, 0, 0.01);
    &_disabled {
      pointer-events: none;
      opacity: 0.5;
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
  }
  &__btn-icon {
    margin-right: sizeIncr(13, 13);
  }
    &__text-back {
      @media (max-width: 768px) {
        display: none;
      }
    }
    &__error {
      color:#EA0C0E;
    }

    &__label {
    position: relative;
    padding: 8px 18px 12px;
    margin-bottom: 20px;
    border: 1px solid #D7D7E7;
    border-radius: 10px;
    width: 310px;
    @include transition;
    &:focus-within {
      border-color: #0666EB;
      .registr__label-title {
        color: #0666EB;
      }
      .registr__label-info {
        opacity: 1;
      }
    }
  }
  &__label-title {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #A6A9B6;
    @include transition;
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
  &__input-btn {
    position: absolute;
    inset: 0 0 auto auto;
  }
  &__error {
    position: absolute;
    margin-bottom: 0;
    inset: auto 0 0 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #EA0C0E;
  }
}
</style>
<style lang="SCSS">
.registr .v-input__slot {
  border-radius: 10px !important;
  width: 48px !important;
  height: 56px !important;
}
.registr .v-otp-input {
  flex-wrap: nowrap !important;
}
.registr__label_act .v-input__slot {
  background-color:  #F2FFF4 !important;
}
.registr__label_act .v-text-field fieldset {
  color: #00BF1D !important;
}
</style>
