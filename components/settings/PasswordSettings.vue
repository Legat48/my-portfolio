<template>
  <div
    class="registr"
  >
    <div class="registr__title">
      {{ $t('settings.changePassword') }}
    </div>
    <label for="oldPass" class="registr__label">
      <div class="registr__wrap-input">
        <input
          id="oldPass"
          v-model="oldPass"
          class="registr__input"
          :type="show ? 'text' : 'password'"
          :placeholder="$t('settings.currentPassword')"
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
      <p class="registr__label-info" :class="{'registr__label-info_error' : oldPassError}">
        {{ $t('auth.passwordRules') }}
      </p>
    </label>
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
      <p class="registr__label-info" :class="{'registr__label-info_error' :  verifyError || passError}">
        <template v-if="passError">
          {{ $t('auth.passwordRules') }}
        </template>
        <template v-else>
          {{ $t('auth.repeatNewPassword') }}
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
  name: 'PasswordSettings',
  data () {
    return {
      valid: false,
      oldPass: '',
      password: '',
      verify: '',
      show: false,
      error: '',
      message: '',
      passError: false,
      oldPassError: false,
      verifyError: false
    }
  },
  watch: {
    oldPass (value) {
      this.validateOldPass(value)
      this.updateValid()
    },
    password (value) {
      this.validatePassword(value)
      this.validateVerify(this.verify)
      this.updateValid()
    },
    verify (value) {
      this.validateVerify(value)
      this.validatePassword(this.password)
      this.updateValid()
    }
  },
  methods: {
    validateOldPass (password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@!?]{8,}$/
      this.oldPassError = !passwordRegex.test(password)
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
      this.valid = !this.passError && !this.oldPassError && !this.verifyError && this.oldPass && this.password && this.verify
    },
    async submitPassword () {
      if (this.valid) {
        this.message = ''
        this.error = ''
        this.valid = false
        const ans = await this.$store.dispatch('user/passwordChange', {
          currentPassword: this.oldPass,
          newPassword: this.password,
          newPasswordConfirm: this.verify,
          lang: this.$i18n.locale,
          portfolio: '1'
        })
        console.log('ans', ans, ans.data, ans.data.errorText)
        if (ans.status === 200) {
          this.message = this.$t('settings.passwordChange')
        } else if (!!ans.data && !!ans.data.errorText) {
          this.error = ans.data.errorText
        } else {
          this.error = this.$t('settings.error')
        }
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
  padding: sizeIncr(16, 40);
  font-family: 'Inter', sans-serif !important;
  &__title {
    margin-bottom: 20px;
    color: var(--color-text-1);
    font-size: 16px;
    font-weight: 600;
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
    inset: auto 0 2px 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #EA0C0E;
  }
  &__message {
    position: absolute;
    margin-bottom: 0;
    inset: auto 0 2px 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: var(--color-text-1);
  }
}
</style>
