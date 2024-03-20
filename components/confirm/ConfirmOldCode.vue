<template>
  <div class="confirm" lazy-validation>
    <h2 class="confirm__title">
      {{ $t('oldUserPhone.verificationCodeTitle') }}
      <v-btn class="confirm__btn confirm__btn_back" color="transparent" dark @click.prevent="reset()">
        <v-icon class="confirm__btn-icon" color="#0666EB">
          mdi-arrow-left
        </v-icon>
        <span class="confirm__text-back">
          {{ $t('buttons.back') }}
        </span>
      </v-btn>
    </h2>
    <div class="confirm__text">
      {{ $t('oldUserPhone.verificationCodeTextPhone') }}
      <span>
        {{ addressPhone }}
      </span>
    </div>
    <label class="confirm__label" :class="{'confirm__label_act': codePhoneAct}">
      <v-otp-input
        v-model="codePhone"
        :readonly="codePhoneAct"
        length="4"
      />
    </label>
    <div v-if="errorPhone" class="confirm__error">
      {{ errorPhone }}
    </div>
    <button
      v-ripple
      class="confirm__btn confirm__btn_transparent confirm__btn_mb btn"
      :class="{'confirm__btn_disabled' : phoneTimer !== 60,
               'confirm__btn_act': codePhoneAct}"
      text
      @click.prevent="newCodePhone"
    >
      <template v-if="!codePhoneAct">
        {{ $t('oldUserPhone.verificationCodeQuest') }}
        <span>
          {{ $t('oldUserPhone.verificationCodeNewSend') }}
          <span>
            ({{ phoneTimer }})
          </span>
        </span>
      </template>
      <template v-else>
        <svg
          class="confirm__error-icon "
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M8.00065 14.6663C11.6825 14.6663 14.6673 11.6816 14.6673 7.99967C14.6673 4.31778 11.6825 1.33301 8.00065 1.33301C4.31875 1.33301 1.33398 4.31778 1.33398 7.99967C1.33398 11.6816 4.31875 14.6663 8.00065 14.6663Z" stroke="#00BF1D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M11.25 6L7.25 10" stroke="#00BF1D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4.75 7.5L7.25 10" stroke="#00BF1D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ $t('oldUserPhone.verificationPhoneAct') }}
      </template>
    </button>
  </div>
</template>

<script>

export default {
  name: 'ConfirmOldCode',
  data () {
    return {
      codePhone: '',
      codePhoneAct: false,
      errorPhone: '',
      disabledPhone: false,
      phoneTimer: 59
    }
  },
  computed: {
    addressPhone () {
      return this.$store.getters['oldUserPhone/getRegistrPhone']
    }
  },
  watch: {
    codePhone () {
      if (this.codePhone.length) {
        this.error = ''
      }
      if (this.codePhone.length === 4) {
        this.submitPhone()
      }
    }
  },
  mounted () {
    setTimeout(this.goTimer, 1000)
  },
  methods: {
    reset () {
      this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}confirm/old-phone`)
    },
    async submitPhone () {
      this.errorPhone = ''
      const result = await this.$store.dispatch('oldUserPhone/checkRegistrationCodePhone', {
        code: this.codePhone,
        email: this.$store.getters['oldUserPhone/getRegistrEmail'],
        lang: this.$i18n.locale
      })
      if (result.status === 200) {
        this.codePhoneAct = true
        this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}`)
      } else {
        this.codePhone = ''
        this.errorPhone = result.data?.errorText
      }
    },
    goTimer () {
      if (this.phoneTimer > 0) {
        this.phoneTimer--
        setTimeout(this.goTimer, 1000)
      } else {
        this.phoneTimer = 60
      }
    },
    async newCodePhone () {
      this.disabledPhone = true
      setTimeout(this.goTimer, 1000)
      await this.$store.dispatch('oldUserPhone/sendCodePhone')
    }
  }
}
</script>

<style lang="scss" scoped>
  .confirm {
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
    }
    &__text-icon {
      margin-right: 6px;
      width: 16px;
      height: 16px;
    }
    &__btn {
      display: flex;
      align-items: center;
      margin-right: auto;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #121B2F;
      @include transition;
      &_transparent {
        // padding-left: 10px;
        width: auto;
        font-size: sizeIncr(14, 18);
        line-height: 120%;
      }
      span {
        margin-left: 4px;
        color: #0666EB;
        span {
          display: none;
        }
      }
      &_mb {
        margin-bottom: 40px;
      }
      &_back {
        margin-left: auto;
        margin-right: 0px !important;
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
      &_disabled {
        pointer-events: none;
        color: #6b6b6b;
        span {
          color: #6b6b6b;
          span {
            display: inline;
          }
        }
      }
      &_act {
        color: #00BF1D;
      }
    }
    &__text-back {
      @media (max-width: 768px) {
        display: none;
      }
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
    &__error-icon {
      position: relative;
      top: 4px;
      width: 16px;
      height: 16px;
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
.confirm__label_act .v-input__slot {
  background-color:  #F2FFF4 !important;
}
.confirm__label_act .v-text-field fieldset {
  color: #00BF1D !important;
}
</style>
