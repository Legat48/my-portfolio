<template>
  <div class="login" :class="{'login_modal' : !modal}">
    <NoModalHeader v-if="!modal" class="login__header" :title="$t('dialog.BaseLogin')">
      <template #svg>
        <v-icon class="login__btn-icon" dense color="#394D5E">
          mdi-login
        </v-icon>
      </template>
    </NoModalHeader>
    <label for="email" class="login__label">
      <input
        ref="email"
        v-model="user"
        class="login__input"
        :placeholder="$t('auth.loginPhoneEmail')"
        required
      >
      <p class="login__label-info" :class="{'login__label-info_error' : userError}">
        {{ $t('auth.loginPhoneEmailText') }}
      </p>
    </label>
    <label for="password" class="login__label">
      <div class="login__wrap-input">
        <input
          id="password"
          v-model="password"
          class="login__input"
          :type="show ? 'text' : 'password'"
          :placeholder="$t('auth.password')"
          required
        >
        <button v-ripple class="login__input-btn" @click.prevent="show = !show">
          <v-icon v-show="show">
            mdi-eye
          </v-icon>
          <v-icon v-show="!show">
            mdi-eye-off
          </v-icon>
        </button>
      </div>
      <p class="login__label-info" :class="{'login__label-info_error' : passError}">
        {{ $t('auth.passwordRules') }}
      </p>
    </label>
    <nuxt-link
      v-ripple
      :to="`${$i18n.locale === 'ru' ? '/ru/' : '/'}confirm`"
      class="login__btn login__btn_forgot-pass login__btn_transparent"
      text
      color="primary"
    >
      {{ $t('buttons.forgotPassword') }}
    </nuxt-link>
    <div class="login__wrap-btn">
      <div class="login__text">
        {{ $t('auth.accountQuestion') }}
      </div>
      <nuxt-link
        v-ripple
        :to="`${$i18n.locale === 'ru' ? '/ru/' : '/'}registr`"
        class="login__btn login__btn_transparent btn"
        text
      >
        {{ $t('auth.toReg') }}
      </nuxt-link>
    </div>
    <v-divider class="mbot-15" />

    <button
      ref="submitButton"
      v-ripple
      :class="{'login__btn_disabled' :!valid}"
      class="login__btn btn"
      @click="submit"
    >
      <v-icon class="login__btn-icon" dense color="#FFF">
        mdi-login
      </v-icon>
      {{ $t('auth.toLogin') }}
    </button>
    <div v-if="error" class="login__error">
      <svg
        class="login__error-icon"
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

export default {
  name: 'BaseLogin',
  props: {
    modal: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false,
      user: '',
      password: '',
      valid: false,
      error: '',
      userError: false,
      passError: false
    }
  },
  computed: {

  },
  watch: {
    user (value) {
      this.validateUser(value)
    },
    password (value) {
      this.validatePassword(value)
    }
  },
  methods: {
    async forgotPassword () {
      await this.$store.commit('dialog/setDialogComponent', 'PasswordRecovery')
    },
    validateUser () {
      this.userError = false
      this.updateValid()
    },
    validatePassword (password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@!?]{8,}$/
      this.passError = !passwordRegex.test(password)
      this.updateValid()
    },
    updateValid () {
      this.valid = !this.userError && !this.passError && this.user && this.password
    },
    async submit () {
      if (this.valid) {
        this.valid = false
        this.error = ''
        localStorage.removeItem('user')
        const ans = await this.$store.dispatch('user/login', {
          user: this.user.toLowerCase(),
          lang: this.$i18n.locale,
          password: this.password
        })
        if (ans.access) {
          this.error = ''
          if (this.$store.getters['user/getProfile'].email && !this.$store.getters['user/getProfile'].isPhoneConfirmed) {
            this.$store.commit('oldUserPhone/setRegistrEmail', this.$store.getters['user/getProfile'].email.toLowerCase())
            this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}confirm/old-phone`)
            this.$store.commit('dialog/closeSubDialog')
            this.$store.commit('dialog/closeDialog')
            this.$store.dispatch('purchases/fetchOrders')
            return
          }
          this.$store.dispatch('purchases/fetchOrders')
          if (!this.modal) {
            this.valid = false
            this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}`)
          } else if (this.$store.getters['dialog/getSubDialogOpen']) {
            this.$store.commit('dialog/closeSubDialog')
          } else {
            this.$store.commit('dialog/closeDialog')
          }
        } else if (ans.errorText) {
          this.error = ans.errorText
        } else {
          this.error = this.$t('auth.loginError')
        }
        this.valid = true
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: sizeIncr(16, 40) sizeIncr(16, 40) 55px sizeIncr(16, 40);
  &_modal {
    padding-top: sizeIncr(67, 132);
  }
  &__header {
    position: absolute;
    inset: 0 0 auto 0;
  }
  &__wrap-btn {
    margin-top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
  }
  &__text {
    font-size: sizeIncr(14, 18);
    line-height: 120%;
    color: var(--color-text-1);
  }

  &__label {
    position: relative;
    padding: 12px 15px 12px;
    margin-bottom: 20px;
    border-radius: 10px;
    width: 100%;
    min-width: 330px;
    background-color: var(--color-bg-4);
    opacity: 0.8;
    @include transition;
    &:focus-within {
      opacity: 1;
      .login__label-info {
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

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    height: 42px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn);
    box-shadow: 3px 0px 28px rgba(0, 0, 0, 0.01);
    &_disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    &_transparent {
      margin-left: 10px;
      width: auto;
      font-size: sizeIncr(14, 18);
      line-height: 120%;
      color: var(--color-text-3);
      background-color: transparent;
    }
    &_forgot-pass {
      margin-left: auto;
      color: var(--color-text-1);
    }
  }
  &__btn-icon {
    margin-right: 5px;
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
}
</style>
