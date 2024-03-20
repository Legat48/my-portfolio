<template>
  <div class="registr">
    <h1 class="registr__title">
      {{ $t('registr.registration') }}
    </h1>

    <label for="email" class="registr__label">
      <div class="registr__label-title">
        {{ $t('registr.email') }}
      </div>
      <input
        ref="email"
        v-model="email"
        class="registr__input"
        required
      >
      <p class="registr__label-info" :class="{'registr__label-info_error' : mailError}">
        {{ $t('registr.emailValid') }}
      </p>
    </label>

    <label for="password" class="registr__label">
      <div class="registr__label-title">
        {{ $t('registr.password') }}
      </div>
      <div class="registr__wrap-input">
        <input
          id="password"
          v-model="password"
          class="registr__input"
          :type="show ? 'text' : 'password'"
          required
        >
        <button class="registr__input-btn" @click.prevent="show = !show">
          <v-icon v-show="show">
            mdi-eye
          </v-icon>
          <v-icon v-show="!show">
            mdi-eye-off
          </v-icon>
        </button>
      </div>
      <p class="registr__label-info" :class="{'registr__label-info_error' : passError}">
        {{ $t('registr.passwordRules') }}
      </p>
    </label>
    <label for="verify" class="registr__label">
      <div class="registr__label-title">
        {{ $t('registr.confirmPass') }}
      </div>
      <div class="registr__wrap-input">
        <input
          id="verify"
          v-model="verify"
          class="registr__input"
          :type="show ? 'text' : 'password'"
          :readonly="passError"
          required
        >
        <button class="registr__input-btn" @click.prevent="show = !show">
          <v-icon v-show="show">
            mdi-eye
          </v-icon>
          <v-icon v-show="!show">
            mdi-eye-off
          </v-icon>
        </button>
      </div>
      <p class="registr__label-info" :class="{'registr__label-info_error' : verifyError || passError}">
        <template v-if="passError">
          {{ $t('registr.passwordRules') }}
        </template>
        <template v-else>
          {{ $t('registr.passwordsMustMatch') }}
        </template>
      </p>
    </label>
    <label for="phone" class="registr__label">
      <div class="registr__label-title">
        {{ $t('registr.phone') }}
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
      <p class="registr__label-info" :class="{'registr__label-info_error' : phoneError}">
        {{ $t('registr.phoneValid') }}
      </p>
    </label>
    <label for="phone" class="registr__label">
      <div class="registr__label-title">
        {{ $t('registr.firstName') }}
      </div>
      <div class="registr__wrap-input">
        <input
          id="name"
          v-model="name"
          class="registr__input"
          required
        >
      </div>
    </label>
    <div class="registr__info">
      <span>
        {{ $t('registr.registrationInfo') }}
      </span>
      <a
        class="registr__link"
        target="_blank"
        :href="($i18n.locale === 'ru') ? 'https://ranks.pro/terms_RU' : 'https://www.ranksworld.com/limitation-of-liability'"
      >
        {{ $t('registr.registrationInfoLink1') }}
      </a>
      <a
        class="registr__link"
        target="_blank"
        :href="($i18n.locale === 'ru') ? 'https://ranks.pro/persondata' : 'https://www.ranksworld.com/privacy-policy'"
      >
        {{ $t('registr.registrationInfoLink2') }}
      </a>
      <a
        class="registr__link"
        target="_blank"
        :href="($i18n.locale === 'ru') ? 'https://ranks.pro/terms_RU' : 'https://www.ranksworld.com/limitation-of-liability'"
      >
        {{ $t('registr.registrationInfoLink3') }}
      </a>
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
      {{ $t('registr.registration') }}
    </button>
    <v-btn v-ripple class="registr__btn registr__btn_back" color="transparent" dark @click.prevent="reset()">
      <v-icon class="registr__btn-icon" color="#0666EB">
        mdi-arrow-left
      </v-icon>
      {{ $t('buttons.back') }}
    </v-btn>
    <div v-if="error" class="registr__error">
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
      email: '',
      name: '',
      password: '',
      verify: '',
      phone: '',
      show: false,
      error: '',
      mailError: false,
      passError: false,
      verifyError: false,
      phoneError: false
    }
  },
  computed: {
  },
  watch: {
    email (value) {
      this.validateEmail(value)
      this.updateValid()
    },
    password (value) {
      this.validatePassword(value)
      this.validateVerify(value)
      this.updateValid()
    },
    verify (value) {
      this.validateVerify(value)
      this.updateValid()
    },
    phone (value) {
      this.validatePhone(value)
      this.updateValid()
    },
    name () {
      this.updateValid()
    }
  },
  methods: {
    onError (error) {
      console.log('Error happened:', error)
    },
    onSuccess (token) {
      this.$store.commit('registr/setReToken', token)
    },

    onExpired () {
      console.log('Expired')
    },
    reset () {
      this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}user/login`)
    },
    validatePhone (phone) {
      const phoneRegex = /^\+(?:[0-9]){11,15}$/
      this.phoneError = !phoneRegex.test(phone)
    },
    validateEmail (email) {
      this.mailError = !mailRules.test(email)
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
    updateValid () {
      this.valid = !this.mailError && !this.passError && !this.verifyError && !this.phoneError && this.email && this.password && this.verify && this.phone
    },
    async submit () {
      this.valid = false
      setTimeout(() => {
        this.valid = true
      }, 10000)
      this.error = ''
      const ans = await this.$store.dispatch('registr/registration', {
        email: this.email,
        password: this.password,
        password2: this.verify,
        name: this.name,
        lang: this.$i18n.locale,
        phone: this.phone
      })
      if (ans.status === 200) {
        this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}registr/confirm`)
      } else if (ans.data.errorText) {
        this.error = ans.data.errorText
      } else {
        this.error = this.$t('registr.error')
      }
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
  padding: sizeIncr(10, 20) sizeIncr(10, 20) 60px sizeIncr(10, 20);
  border-radius: 10px;
  font-family: 'Inter', sans-serif !important;
  overflow: hidden;
  background-color: #fff;
  &__title {
    margin-bottom: sizeIncr(10, 15);
    font-weight: 600;
    font-size: sizeIncr(20, 28);
    line-height: 160%;
    color: #121B2F;
  }
  &__text {
    font-family: 'Inter', sans-serif !important;
    font-size: sizeIncr(14, 17);
    line-height: 120%;
    color: #121B2F;
  }
  &__wrap-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
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
  &__error {
    position: absolute;
    margin-bottom: 0;
    padding: 0 sizeIncr(10, 20);
    inset: auto 0 8px 0;
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
  &__info {
    margin-bottom: 24px;
    width: 310px;
    font-weight: 400;
    font-size: 12px;
    line-height: 133%;
    color: #121B2F;
  }
  &__link {
    margin: 0 5px;
    color:#005BD9;
    text-decoration-line: underline;
  }
  &__recaptcha {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 80px;
  }
}
</style>
