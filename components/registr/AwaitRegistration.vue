<template>
  <div class="registr" lazy-validation>
    <h2 class="registr__title">
      {{ $t('registr.verificationCodeTitle') }}
      <v-btn class="registr__btn registr__btn_back" color="transparent" dark @click.prevent="reset()">
        <v-icon class="registr__btn-icon" color="#0666EB">
          mdi-arrow-left
        </v-icon>
        <span class="registr__text-back">
          {{ $t('buttons.back') }}
        </span>
      </v-btn>
    </h2>
    <div class="registr__text">
      {{ $t('registr.verificationCodeTextPhone') }}
      <span>
        {{ addressPhone }}
      </span>
    </div>
    <label class="registr__label" :class="{'registr__label_act': codePhoneAct}">
      <v-otp-input
        v-model="codePhone"
        :readonly="codePhoneAct"
        length="4"
      />
    </label>
    <div v-if="errorPhone" class="registr__error">
      <svg
        class="registr__error-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <g clip-path="url(#clip0_747_1852)">
          <path d="M7.99967 14.6663C11.6816 14.6663 14.6663 11.6816 14.6663 7.99967C14.6663 4.31778 11.6816 1.33301 7.99967 1.33301C4.31778 1.33301 1.33301 4.31778 1.33301 7.99967C1.33301 11.6816 4.31778 14.6663 7.99967 14.6663Z" stroke="#FF3C53" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M10 6L6 10" stroke="#FF3C53" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6 6L10 10" stroke="#FF3C53" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_747_1852">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {{ errorPhone }}
    </div>
    <button
      v-ripple
      class="registr__btn registr__btn_transparent registr__btn_mb btn"
      :class="{'registr__btn_disabled' :phoneTimer !== 70,
               'registr__btn_act': codePhoneAct}"
      text
      @click.prevent="newCodePhone"
    >
      <template v-if="!codePhoneAct">
        {{ $t('registr.verificationCodeQuest') }}
        <span>
          {{ $t('registr.verificationCodeNewSend') }}
          <span>
            ({{ phoneTimer }})
          </span>
        </span>
      </template>
      <template v-else>
        <svg
          class="registr__text-icon"
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
        {{ $t('registr.verificationPhoneAct') }}
      </template>
    </button>
    <div class="registr__text">
      {{ $t('registr.verificationCodeTextEmail') }}
      <span>
        {{ addressEmail }}
      </span>
    </div>
    <label class="registr__label" :class="{'registr__label_act': codeEmailAct}">
      <v-otp-input
        v-model="codeEmail"
        :readonly="codeEmailAct"
        length="4"
      />
    </label>
    <div v-if="errorEmail" class="registr__error">
      <svg
        class="registr__error-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <g clip-path="url(#clip0_747_1852)">
          <path d="M7.99967 14.6663C11.6816 14.6663 14.6663 11.6816 14.6663 7.99967C14.6663 4.31778 11.6816 1.33301 7.99967 1.33301C4.31778 1.33301 1.33301 4.31778 1.33301 7.99967C1.33301 11.6816 4.31778 14.6663 7.99967 14.6663Z" stroke="#FF3C53" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M10 6L6 10" stroke="#FF3C53" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6 6L10 10" stroke="#FF3C53" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_747_1852">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {{ errorEmail }}
    </div>
    <button
      v-ripple
      class="registr__btn registr__btn_transparent btn"
      :class="{'registr__btn_disabled' :emailTimer !== 70,
               'registr__btn_act': codeEmailAct}"
      text
      @click.prevent="newCodeEmail"
    >
      <template v-if="!codeEmailAct">
        {{ $t('registr.verificationCodeQuest') }}
        <span>
          {{ $t('registr.verificationCodeNewSend') }}
          <span>
            ({{ emailTimer }})
          </span>
        </span>
      </template>
      <template v-else>
        <svg
          class="registr__text-icon"
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
        {{ $t('registr.verificationEmailAct') }}
      </template>
    </button>
  </div>
</template>

<script>

export default {
  name: 'AwaitRegistration',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      codeEmail: '',
      codePhone: '',
      codePhoneAct: false,
      codeEmailAct: false,
      errorPhone: '',
      errorEmail: '',
      disabledPhone: false,
      phoneTimer: 69,
      disabledEmail: false,
      emailTimer: 69
    }
  },
  computed: {
    addressEmail () {
      return this.$store.getters['registr/getRegistrEmail']
    },
    addressPhone () {
      return this.$store.getters['registr/getRegistrPhone']
    },
    passwordMatch () {
      return () => this.password === this.verify || this.$t('registr.matchPass')
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
    },
    codeEmail () {
      if (this.codeEmail.length) {
        this.error = ''
      }
      if (this.codeEmail.length === 4) {
        this.submitEmail()
      }
    }
  },
  mounted () {
    setTimeout(this.goTimerEmail, 1000)
    setTimeout(this.goTimerPhone, 1000)
  },
  methods: {
    reset () {
      this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}registr`)
    },
    goTimerEmail () {
      if (this.emailTimer > 0) {
        this.emailTimer--
        setTimeout(this.goTimerEmail, 1000)
      } else {
        this.emailTimer = 70
      }
    },
    goTimerPhone () {
      if (this.phoneTimer > 0) {
        this.phoneTimer--
        setTimeout(this.goTimerPhone, 1000)
      } else {
        this.phoneTimer = 70
      }
    },
    async submitEmail () {
      this.errorEmail = ''
      const result = await this.$store.dispatch('registr/checkRegistrationCodeEmail', {
        code: this.codeEmail,
        lang: this.$i18n.locale
      })
      if (result.status === 200) {
        this.codeEmailAct = true
        if (this.codePhoneAct && this.codeEmailAct) {
          this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}user/successful`)
        }
      } else {
        this.codeEmail = ''
        this.errorEmail = result.data?.errorText
      }
    },
    async submitPhone () {
      this.errorPhone = ''
      const result = await this.$store.dispatch('registr/checkRegistrationCodePhone', {
        code: this.codePhone,
        lang: this.$i18n.locale
      })
      if (result.status === 200) {
        this.codePhoneAct = true
        if (this.codePhoneAct && this.codeEmailAct) {
          this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}user/successful`)
        }
      } else {
        this.codePhone = ''
        this.errorPhone = result.data?.errorText
      }
    },
    async newCodeEmail () {
      // Запускаем таймер
      setTimeout(this.goTimerEmail, 1000)
      await this.$store.dispatch('registr/sendCodeEmail')
    },
    async newCodePhone () {
      // Запускаем таймер
      setTimeout(this.goTimerPhone, 1000)
      await this.$store.dispatch('registr/sendCodePhone')
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
    padding: sizeIncr(10, 20);
    border-radius: 10px;
    min-width: 30%;
    overflow: hidden;
    background-color: #fff;
    &__title {
      display: flex;
      justify-content: space-between;
      margin-bottom: sizeIncr(10, 15);
      font-weight: 700;
      font-size: sizeIncr(20, 28);
      line-height: 170%;
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
      font-size: 12px;
      color:#EA0C0E;
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
.registr__label_act .v-input__slot {
  background-color:  #F2FFF4 !important;
}
.registr__label_act .v-text-field fieldset {
  color: #00BF1D !important;
}
</style>
