<template>
  <div class="confirm">
    <h2 class="confirm__title">
      {{ $t('confirm.title') }}
      <v-btn class="confirm__btn confirm__btn_back" color="transparent" dark @click.prevent="reset()">
        <v-icon class="confirm__btn-icon" color="#0666EB">
          mdi-arrow-left
        </v-icon>
        <span class="confirm__text-back">
          {{ $t('confirm.btnBack') }}
        </span>
      </v-btn>
    </h2>
    <label v-if="inputEmail" for="email" class="confirm__label" :class="{'confirm__label_act': send}">
      <div class="confirm__label-title">
        {{ $t('confirm.email') }}
      </div>
      <input
        id="email"
        ref="email"
        v-model="email"
        class="confirm__input"
        :disabled="send"
        required
      >
      <p class="confirm__label-info" :class="{'confirm__label-info_error' : mailError}">
        {{ $t('confirm.emailValid') }}
      </p>
    </label>
    <label v-if="!inputEmail" for="phone" class="confirm__label" :class="{'confirm__label_act': send}">
      <div class="confirm__label-title">
        {{ $t('confirm.phone') }}
      </div>
      <div class="confirm__wrap-input">
        <input
          id="phone"
          v-model="phone"
          class="confirm__input"
          required
          :disabled="send"
          @input="validatePhone"
        >
      </div>
      <p class="confirm__label-info" :class="{'confirm__label-info_error' : phoneError}">
        {{ $t('confirm.phoneValid') }}
      </p>
    </label>
    <button
      v-if="!send"
      v-ripple
      class="confirm__btn confirm__btn_transparent btn"
      text
      @click="inputEmail = !inputEmail"
    >
      {{ inputEmail ? `${$t('confirm.btnSwapToPhone')}` : `${$t('confirm.btnSwapToMail')}` }}
    </button>
    <div class="confirm__wrap-btn">
      <button
        v-if="!send"
        v-ripple
        class="confirm__btn confirm__btn_white btn"
        :class="{'confirm__btn_disabled' :!valid}"
        @click="submitUser"
      >
        <v-icon class="confirm__btn-icon" dense color="#0666EB">
          mdi-check
        </v-icon>
        {{ $t('confirm.btnNext') }}
      </button>
    </div>
    <template v-if="send">
      <label for="password" class="confirm__label">
        <div class="confirm__label-title">
          {{ $t('confirm.newPass') }}
        </div>
        <div class="confirm__wrap-input">
          <input
            id="password"
            v-model="password"
            class="confirm__input"
            :type="show ? 'text' : 'password'"
            required
          >
          <button class="confirm__input-btn" @click.prevent="show = !show">
            <v-icon v-show="show">
              mdi-eye
            </v-icon>
            <v-icon v-show="!show">
              mdi-eye-off
            </v-icon>
          </button>
        </div>
        <p class="confirm__label-info" :class="{'confirm__label-info_error' : passError}">
          {{ $t('confirm.passwordRules') }}
        </p>
      </label>
      <label for="verify" class="confirm__label">
        <div class="confirm__label-title">
          {{ $t('confirm.verify') }}
        </div>
        <div class="confirm__wrap-input">
          <input
            id="verify"
            v-model="verify"
            class="confirm__input"
            :type="show ? 'text' : 'password'"
            required
            :readonly="passError"
          >
          <button class="confirm__input-btn" @click.prevent="show = !show">
            <v-icon v-show="show">
              mdi-eye
            </v-icon>
            <v-icon v-show="!show">
              mdi-eye-off
            </v-icon>
          </button>
        </div>
        <p class="confirm__label-info" :class="{'confirm__label-info_error' : verifyError || passError}">
          <template v-if="passError">
            {{ $t('registr.passwordRules') }}
          </template>
          <template v-else>
            {{ $t('registr.passwordsMustMatch') }}
          </template>
        </p>
      </label>
      <div class="confirm__text">
        {{ $t('confirm.codeSubTitle') }}
        <span>
          {{ $store.getters['confirm/getConfirmUser'] }}
        </span>
      </div>
      <label class="confirm__label-code" :class="{'confirm__label_act': codeAct}">
        <v-otp-input
          v-model="code"
          :readonly="codeAct"
          :length="inputEmail? 4 : 4"
        />
      </label>
      <button
        v-ripple
        class="confirm__btn confirm__btn_transparent btn"
        :class="{'confirm__btn_disabled' : timer !== 60,
                 'confirm__btn_act': codeAct}"
        text
        @click.prevent="newCode"
      >
        <template v-if="!codeAct">
          <span class="confirm__btn-text-base">
            {{ $t('confirm.verificationCodeQuest') }}
          </span>
          <span>
            {{ $t('confirm.verificationCodeNewSend') }}
            <span v-if="timer < 60">
              ({{ timer }})
            </span>
          </span>
        </template>
        <template v-else>
          <svg
            class="confirm__text-icon"
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
      <button
        ref="submitButton"
        v-ripple
        class="confirm__btn btn"
        :class="{'confirm__btn_disabled' :!validSubmit}"
        @click="submit"
      >
        <v-icon class="confirm__btn-icon" dense color="#FFF">
          mdi-account-edit-outline
        </v-icon>
        {{ $t('confirm.submit') }}
      </button>
    </template>
    <div v-if="error" class="confirm__error">
      <svg
        class="confirm__error-icon"
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
      {{ error }}
    </div>
  </div>
</template>

<script>
import mailRules from '~/helpers/mailRules'

export default {
  data () {
    return {
      valid: false,
      inputEmail: true,
      mailError: false,
      phoneError: false,
      send: false,
      disabled: false,
      password: '',
      verify: '',
      code: '',
      show: false,
      passError: false,
      verifyError: false,
      validSubmit: false,
      codeError: false,
      codeAct: false,
      timer: 59,
      disabledSend: false,
      error: ''
    }
  },
  computed: {
    email: {
      get () {
        return this.$store.getters['confirm/getConfirmUser']
      },
      set (val) {
        this.$store.commit('confirm/setConfirmUser', val)
      }
    },
    phone: {
      get () {
        return this.$store.getters['confirm/getConfirmUser']
      },
      set (val) {
        this.$store.commit('confirm/setConfirmUser', val)
      }
    }
  },
  watch: {
    email (value) {
      this.validateEmail(value)
      this.updateValid()
    },
    phone (value) {
      this.validatePhone(value)
      this.updateValid()
    },
    password (value) {
      this.validatePassword(value)
      this.updateValidSubmit()
    },
    verify (value) {
      this.validateVerify(value)
      this.updateValidSubmit()
    },
    code (value) {
      this.validateCode(value)
      this.updateValidSubmit()
    }
  },
  methods: {
    reset () {
      this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}user/login`)
    },
    validatePassword (password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@!?]{8,}$/
      this.passError = !passwordRegex.test(password)
    },
    validateVerify (value) {
      const verifyRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@!?]{8,}$/
      const verifyMatch = this.password === value
      this.verifyError = !verifyMatch || !verifyRegex.test(this.verify)
    },
    validateCode () {
      this.codeError = false
    },
    updateValidSubmit () {
      this.validSubmit = !this.passError && !this.verifyError && !this.codeError && this.password && this.verify && this.code
    },
    validateEmail (email) {
      this.mailError = !mailRules.test(email)
    },
    validatePhone (phone) {
      const phoneRegex = /^\+(?:[0-9]){11,15}$/
      this.phoneError = !phoneRegex.test(phone)
    },
    updateValid () {
      if (this.inputEmail) {
        this.valid = !this.mailError && this.email && this.email.length > 0
      } else {
        this.valid = !this.phoneError && this.phone && this.phone.length > 0
      }
    },
    async submitUser () {
      this.valid = true
      const data = {
        lang: this.$i18n.locale,
        fromInfo: 'web interface portfolio'
      }
      if (this.inputEmail) {
        data.isEmail = true
        data.username = this.email.toLowerCase()
      } else {
        data.isEmail = false
        data.username = this.phone
        data.phone = this.phone
      }
      const ans = await this.$store.dispatch('confirm/resetPassword', data)
      if (ans.status === 200) {
        this.send = true
        setTimeout(this.goTimer, 1000)
        this.error = ''
      } else if (ans.data.errorText) {
        this.error = ans.data.errorText
        this.send = false
      } else {
        this.error = this.$t('confirm.error')
      }
    },
    goTimer () {
      if (this.timer > 0) {
        this.timer--
        setTimeout(this.goTimer, 1000)
      } else {
        this.timer = 60
      }
    },
    async newCode () {
      this.disabledSend = true
      // Запускаем таймер
      setTimeout(this.goTimer, 1000)
      const data = {
        lang: this.$i18n.locale,
        fromInfo: 'web interface portfolio'
      }
      if (this.inputEmail) {
        data.isEmail = true
        data.username = this.email.toLowerCase()
      } else {
        data.isEmail = false
        data.username = this.phone
        data.phone = this.phone
      }
      const ans = await this.$store.dispatch('confirm/resetPassword', data)
      if (ans.status === 200) {
        this.send = true
      } else if (ans.data.errorText) {
        this.error = ans.data.errorText
        this.send = false
      } else {
        this.error = this.$t('registr.error')
      }
    },
    async submit () {
      this.valid = false
      setTimeout(() => {
        this.valid = true
      }, 1000)
      this.error = ''
      const ans = await this.$store.dispatch('confirm/newPass', {
        password: this.password,
        lang: this.$i18n.locale,
        code: this.code
      })
      if (ans.status === 200) {
        this.$router.push({ path: `${this.$i18n.locale === 'ru' ? '/ru/' : '/'}confirm/successful` })
        this.$store.commit('confirm/setConfirmUser', '')
      } else if (ans.data.errorText) {
        this.error = ans.data.errorText
      } else {
        this.error = this.$t('registr.error')
      }
      this.code = ''
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
  padding: sizeIncr(10, 20) sizeIncr(10, 20) 46px sizeIncr(10, 20);
  border-radius: 10px;
  width: 328px !important;
  overflow: hidden;
  background-color: #fff;
  &__title {
    display: flex;
    justify-content: space-between;
    margin-bottom: sizeIncr(10, 15);
    font-weight: 600;
    font-size: 20px;
    font-style: normal;
    line-height: 120%;
    color: #121B2F;
  }
  &__wrap-btn {
    display: flex;
    flex-direction: column;
  }
  &__label {
    position: relative;
    padding: 8px 18px 12px;
    margin-bottom: 12px;
    border: 1px solid #D7D7E7;
    border-radius: 10px;
    @include transition;
    &:focus-within {
      border-color: #0666EB;
      .confirm__label-title {
        color: #0666EB;
      }
      .confirm__label-info {
        opacity: 1;
      }
    }
    &_act {
      border: 1px solid #00BF1D;
      background-color: #F2FFF4;
      .confirm__input,
      .confirm__label-title {
        color: #00BF1D;
      }
    }
  }
  &__label-code {
    &_act {
      color: #00BF1D;
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
    font-size: 9px;
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
    span {
      white-space: nowrap;
    }
    &_transparent {
        margin-left: auto;
        margin-bottom: 20px;
        width: auto;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        height: auto;
        color: #0666EB;
        background-color: transparent;

      }
    &_disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    &_back {
      display: flex;
      align-items: center;
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
    &_mb {
      margin-bottom: 40px;
    }
    &_white {
      border: 1px solid #0666EB;
      color: #0666EB;
      background-color: #fff;
    }
  }
  &__btn-text-base {
    margin-right: 3px;
    color: #121B2F;
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
  &__text-back {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &__btn-icon {
    margin-right: 2px;
    font-size: 20px !important;

  }
  &__error {
    position: absolute;
    margin-bottom: 0;
    inset: auto 0 3px 0;
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
.confirm .v-input__slot {
  border-radius: 10px !important;
  width: 42px !important;
  height: 48px !important;
}
.confirm .v-otp-input {
  flex-wrap: nowrap !important;
}
.confirm__label_act .v-input__slot {
  background-color:  #F2FFF4 !important;
}
.confirm__label_act .v-text-field fieldset {
  color: #00BF1D !important;
}
</style>
