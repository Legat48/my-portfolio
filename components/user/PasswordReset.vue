<template>
  <div
    class="registr"
    :class="{'registr_modal' : !modal}"
  >
    <NoModalHeader v-if="!modal" class="registr__header" :title="$t('settings.changePassword')">
      <template #svg>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.90818 22L7.49707 18.5349C7.31495 18.4249 7.11443 18.3061 6.89552 18.1784C6.67662 18.05 6.4761 17.9307 6.29397 17.8207L3.09182 19.1685L0 13.8051L2.73588 11.7155V10.2845L0 8.19489L3.09182 2.83151L6.29397 4.17929C6.4761 4.06928 6.67662 3.95048 6.89552 3.82287C7.11443 3.69439 7.31495 3.57514 7.49707 3.46514L7.90818 0H14.0918L14.5029 3.46514C14.6851 3.57514 14.8856 3.69439 15.1045 3.82287C15.3234 3.95048 15.5239 4.06928 15.706 4.17929L18.9082 2.83151L22 8.19489L19.2904 10.2845V11.7155L22 13.8051L18.9082 19.1685L15.706 17.8207C15.5239 17.9307 15.3234 18.05 15.1045 18.1784C14.8856 18.3061 14.6851 18.4249 14.5029 18.5349L14.0918 22H7.90818ZM11 14.9324C12.0761 14.9324 12.9973 14.5474 13.7635 13.7774C14.5296 13.0074 14.9127 12.0816 14.9127 11C14.9127 9.91844 14.5296 8.99264 13.7635 8.22261C12.9973 7.45258 12.0761 7.06756 11 7.06756C9.92386 7.06756 9.00271 7.45258 8.23654 8.22261C7.47037 8.99264 7.08728 9.91844 7.08728 11C7.08728 12.0816 7.47037 13.0074 8.23654 13.7774C9.00271 14.5474 9.92386 14.9324 11 14.9324ZM11 12.6223C10.5622 12.6223 10.1835 12.4622 9.86388 12.1418C9.54515 11.8206 9.38579 11.44 9.38579 11C9.38579 10.56 9.54515 10.1794 9.86388 9.85815C10.1835 9.53782 10.5622 9.37766 11 9.37766C11.4378 9.37766 11.8165 9.53782 12.1361 9.85815C12.4548 10.1794 12.6142 10.56 12.6142 11C12.6142 11.44 12.4548 11.8206 12.1361 12.1418C11.8165 12.4622 11.4378 12.6223 11 12.6223ZM9.90591 19.6899H12.0941L12.4224 16.8307C12.9522 16.6837 13.4631 16.4637 13.9552 16.1706C14.4473 15.8767 14.8943 15.5282 15.2962 15.1252L17.9507 16.2525L19.0448 14.4374L16.7187 12.6501C16.8098 12.3931 16.8737 12.1273 16.9104 11.8528C16.9472 11.5773 16.9656 11.2931 16.9656 11C16.9656 10.743 16.9472 10.4817 16.9104 10.2159C16.8737 9.95012 16.8189 9.67071 16.7463 9.37766L19.0724 7.56258L17.977 5.74751L15.3238 6.90256C14.9035 6.48102 14.4517 6.12812 13.9684 5.84387C13.485 5.55962 12.9789 5.34401 12.45 5.19705L12.0941 2.31009H9.90591L9.54997 5.19705C9.02109 5.34401 8.51499 5.55962 8.03164 5.84387C7.5483 6.12812 7.10567 6.47178 6.70376 6.87484L4.04931 5.74751L2.95522 7.56258L5.25373 9.34993C5.18105 9.64299 5.12633 9.92724 5.08955 10.2027C5.05278 10.4773 5.03439 10.743 5.03439 11C5.03439 11.257 5.05278 11.5183 5.08955 11.7841C5.12633 12.0499 5.18105 12.3293 5.25373 12.6223L2.95522 14.4374L4.04931 16.2525L6.70376 15.1252C7.10567 15.5282 7.5483 15.8719 8.03164 16.1561C8.51499 16.4404 9.02109 16.656 9.54997 16.803L9.90591 19.6899Z" fill="#394D5E" />
        </svg>
      </template>
    </NoModalHeader>
    <label for="password" class="registr__label">
      <div class="registr__wrap-input">
        <input
          id="password"
          v-model="password"
          class="registr__input"
          :type="show ? 'text' : 'password'"
          :placeholder="$t('auth.newPassword')"
          required
        >
        <button v-ripple class="registr__input-btn" @click.prevent="show = !show">
          <v-icon v-show="show">
            mdi-eye
          </v-icon>
          <v-icon v-show="!show">
            mdi-eye-off
          </v-icon>
        </button>
      </div>
      <p class="registr__label-info" :class="{'registr__label-info_error' : passError}">
        {{ $t('auth.passwordRules') }}
      </p>
    </label>
    <label for="verify" class="registr__label">
      <div class="registr__wrap-input">
        <input
          id="verify"
          v-model="verify"
          class="registr__input"
          :type="show ? 'text' : 'password'"
          :placeholder="$t('auth.repeatNewPassword')"
          required
          :readonly="passError"
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

    <button
      ref="submitButton"
      v-ripple
      :class="{'registr__btn_disabled' :!valid}"
      class="registr__btn btn"
      @click="submitPassword"
    >
      <v-icon class="registr__btn-icon" dense color="#FFF">
        mdi-account-edit-outline
      </v-icon>
      {{ $t('buttons.change') }}
    </button>
    <p v-if="error" class="registr__error">
      {{ error }}
    </p>
    <p v-if="message" class="registr__message">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'PasswordReset',
  props: {
    idUrl: {
      type: String,
      required: true
    },
    modal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valid: false,
      password: '',
      verify: '',
      show: false,
      error: '',
      passError: false,
      verifyError: false,
      message: ''
    }
  },
  computed: {
  },
  watch: {
    password (value) {
      this.validatePassword(value)
      this.updateValid()
    },
    verify (value) {
      this.validateVerify(value)
      this.updateValid()
    }
  },
  methods: {
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
      this.valid = !this.passError && !this.verifyError && this.password && this.verify
    },
    async submitPassword () {
      this.error = ''
      this.message = ''
      this.valid = false
      try {
        await this.$store.dispatch('user/resetPassword', {
          newPassword: this.password,
          newPasswordConfirm: this.verify,
          portfolio: '1',
          fromInfo: 'web interface portfolio',
          url: this.idUrl,
          language: this.$i18n.locale
        })
        this.message = this.$t('settings.passwordChange')
        setTimeout(() => { this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}`) }, 5000)
      } catch (e) {
        this.valid = true
        this.error = this.$t('settings.error')
        console.error(e)
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
  padding: sizeIncr(16, 40) sizeIncr(16, 40) sizeIncr(30, 60);
  font-family: 'Inter', sans-serif !important;
  &_modal {
    padding-top: sizeIncr(67, 132);
  }
  &__header {
    position: absolute;
    inset: 0 0 auto 0;
  }
  &__label {
    position: relative;
    padding: 8px 18px 12px;
    margin-bottom: 20px;
    border-radius: 10px;
    width: 100%;
    min-width: 320px;
    background-color: var(--color-bg-4);
    opacity: 0.8;
    @include transition;

    &:focus-within {
      opacity: 1;
      .registr__label-info {
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
    color: var(--color-text-1);
  }
  &__input-btn {
    position: absolute;
    inset: 0 0 auto auto;
  }
  &__text {
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: var(--color-text-2);
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    border-radius: 7px;
    height: 42px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: sizeIncr(16, 16);
    line-height: 120%;
    color: var(--color-text-white-1);
    background-color:var(--color-btn);
    box-shadow: 3px 0px 28px rgba(0, 0, 0, 0.01);
    &_disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    &_submit {
      margin-left: auto;
    }
  }
  &__btn-icon {
    margin-right: sizeIncr(13, 13);
  }
  &__error {
    position: absolute;
    margin-bottom: 0;
    inset: auto 0 8px 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #EA0C0E;
  }
  &__message {
    position: absolute;
    margin-bottom: 0;
    inset: auto 0 8px 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: var(--color-text-1);
  }
}
</style>
