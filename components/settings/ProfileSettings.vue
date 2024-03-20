<template>
  <div ref="personalData" class="profile">
    <div class="profile__title">
      {{ $t('settings.profileSettings') }}
    </div>
    <label for="firstName" class="profile__label" :class="{'profile__label_active' : firstNameChange}">
      <div class="profile__label-title">
        {{ $t('settings.firstName') }}
      </div>
      <input
        ref="firstName"
        v-model="firstName"
        class="profile__input"
        :class="{'profile__input_active' : firstNameChange}"
        required
      >
      <button v-ripple class="profile__label-btn" @click.prevent="toggleFirstName()">
        <svg
          v-if="!firstNameChange"
          class="profile__btn-svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.25 15.7505H5.479L12.479 8.75048L11.25 7.52148L4.25 14.5215V15.7505ZM16.188 7.54248L12.458 3.81248L13.479 2.79248C13.8263 2.44515 14.2397 2.27148 14.719 2.27148C15.1983 2.27148 15.6113 2.44515 15.958 2.79248L17.208 4.04248C17.5413 4.37582 17.708 4.78882 17.708 5.28148C17.708 5.77482 17.5413 6.18815 17.208 6.52148L16.188 7.54248ZM14.958 8.77148L6.229 17.5005H2.5V13.7715L11.229 5.04248L14.958 8.77148ZM11.875 8.14648L11.25 7.52148L12.479 8.75048L11.875 8.14648Z" fill="#3FA6FA" />
        </svg>
        <svg
          v-if="firstNameChange"
          class="profile__btn-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M6.06103 15.167L4.83203 13.938L8.77003 10L4.83203 6.06201L6.06103 4.83301L9.99903 8.77101L13.937 4.83301L15.166 6.06201L11.228 10L15.166 13.938L13.937 15.167L9.99903 11.229L6.06103 15.167Z" fill="#3FA6FA" />
        </svg>
      </button>
    </label>
    <label for="lastName" class="profile__label" :class="{'profile__label_active' : lastNameChange}">
      <div class="profile__label-title">
        {{ $t('settings.lastName') }}
      </div>
      <input
        ref="lastName"
        v-model="lastName"
        :class="{'profile__input_active' : lastNameChange}"
        class="profile__input"
        required
      >
      <button v-ripple class="profile__label-btn" @click.prevent="toggleLastName()">
        <svg
          v-if="!lastNameChange"
          class="profile__btn-svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.25 15.7505H5.479L12.479 8.75048L11.25 7.52148L4.25 14.5215V15.7505ZM16.188 7.54248L12.458 3.81248L13.479 2.79248C13.8263 2.44515 14.2397 2.27148 14.719 2.27148C15.1983 2.27148 15.6113 2.44515 15.958 2.79248L17.208 4.04248C17.5413 4.37582 17.708 4.78882 17.708 5.28148C17.708 5.77482 17.5413 6.18815 17.208 6.52148L16.188 7.54248ZM14.958 8.77148L6.229 17.5005H2.5V13.7715L11.229 5.04248L14.958 8.77148ZM11.875 8.14648L11.25 7.52148L12.479 8.75048L11.875 8.14648Z" fill="#3FA6FA" />
        </svg>
        <svg
          v-if="lastNameChange"
          class="profile__btn-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M6.06103 15.167L4.83203 13.938L8.77003 10L4.83203 6.06201L6.06103 4.83301L9.99903 8.77101L13.937 4.83301L15.166 6.06201L11.228 10L15.166 13.938L13.937 15.167L9.99903 11.229L6.06103 15.167Z" fill="#3FA6FA" />
        </svg>
      </button>
    </label>
    <label for="phone" class="profile__label" :class="{'profile__label_active' : phoneChange}">
      <div class="profile__label-title">
        {{ $t('auth.phone') }}
      </div>
      <input
        id="phone"
        ref="phone"
        v-model="phone"
        class="profile__input"
        readonly
      >
    </label>
    <label for="email" class="profile__label">
      <div class="profile__label-title">
        {{ $t('auth.email') }}
      </div>
      <input
        ref="email"
        v-model="email"
        readonly
        class="profile__input"
      >
    </label>
    <button
      ref="submitButton"
      v-ripple
      class="btn profile__btn"
      :class="{' profile__btn_disabled' :!valid}"
      outlined
      width="100%"
      @click="submitPersonalData"
    >
      {{ $t('buttons.change') }}
    </button>
    <p v-if="error" class="profile__error">
      {{ error }}
    </p>
    <p v-if="message" class="profile__message">
      {{ message }}
    </p>
  </div>
</template>

<script>

export default {
  name: 'ProfileSettings',
  data () {
    return {
      valid: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      verify: '',
      phone: '',
      show: false,
      error: '',
      message: '',
      mailError: false,
      phoneError: false,
      firstNameChange: false,
      lastNameChange: false,
      phoneChange: false
    }
  },
  computed: {
    formData () {
      const data = {}
      data.firstName = this.firstName
      data.lastName = this.lastName
      data.phoneNumber = this.phone
      data.portfolio = '1'
      data.language = this.$i18n.locale
      data.type = 'physical'
      return data
    }
  },
  watch: {
    phone (value) {
      this.validatePhone(value)
      this.updateValid()
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    firstName (value) {
      this.updateValid()
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lastName (value) {
      this.updateValid()
    }
  },
  async mounted () {
    await this.$store.dispatch('user/fetchProfileData')
    if (this.$store.getters['user/getProfile']) {
      if (this.$store.getters['user/getProfile'].firstName) {
        this.firstName = this.$store.getters['user/getProfile'].firstName
      }
      if (this.$store.getters['user/getProfile'].lastName) {
        this.lastName = this.$store.getters['user/getProfile'].lastName
      }
      if (this.$store.getters['user/getProfile'].phoneNumber) {
        this.phone = this.$store.getters['user/getProfile'].phoneNumber
      }
      if (this.$store.getters['user/getProfile'].email) {
        this.email = this.$store.getters['user/getProfile'].email
      }
    }
  },
  methods: {
    validatePhone (phone) {
      const phoneRegex = /^\d{10,14}$/
      this.phoneError = !phoneRegex.test(phone)
    },
    toggleFirstName () {
      this.firstNameChange = !this.firstNameChange
      if (this.firstNameChange) { this.$refs.firstName.focus() }
    },
    toggleLastName () {
      this.lastNameChange = !this.lastNameChange
      if (this.lastNameChange) { this.$refs.lastName.focus() }
    },
    togglePhone () {
      this.phoneChange = !this.phoneChange
      if (this.phoneChange) { this.$refs.phone.focus() }
    },
    updateValid () {
      this.valid = this.firstName && this.firstName.length > 2
    },
    resetData () {
      this.firstName = ''
      this.lastName = ''
      this.phone = ''
    },
    async submitPersonalData () {
      this.message = ''
      this.error = ''
      if (this.valid) {
        try {
          await this.$store.dispatch('user/personalDataChange', this.formData)
          this.message = this.$t('settings.personalDataUpdate')
          this.$store.dispatch('user/fetchProfileData')
        } catch (e) {
          console.error(e)
          this.error = this.$t('settings.error')
        }
      }
    }
  }
}
</script>

<style lang="scss"  scoped>
.profile {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Inter', sans-serif !important;
  &__title {
    margin-bottom: 20px;
    color: var(--color-text-1);
    font-size: 16px;
    font-weight: 600;
  }
  &__label {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 13px 18px 13px;
    margin-bottom: 20px;
    border-radius: 10px;
    width: 100%;
    opacity: 0.8;
    @include transition;
    &_active {
      .profile__label-title {
        opacity: 0;
      }
      background-color: var(--color-bg-4);
    }

    &:focus-within {
      opacity: 1;
      .profile__label-info {
        opacity: 1;
      }
    }
  }
  &__label-title {
    position: absolute;
    inset: 0px auto auto 18px;
    font-size: 12px;
    color: var(--color-text-4);
    pointer-events: none;
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
    color: var(--color-text-1);
    pointer-events: none;
    &_active {
      pointer-events: all;
    }
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
  &__label-btn {
    position: absolute;
    inset: 0 0 0 auto;
    border-radius: 7px;
    width: 30px;
    z-index: 11;
  }
  &__btn-svg {
    pointer-events: none;
    width: 20px;
    height: 20px;
  }
  &__error {
    position: absolute;
    margin-bottom: 0;
    inset: auto 0 10px 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #EA0C0E;
  }
  &__message {
    position: absolute;
    margin-bottom: 0;
    inset: auto 0 10px 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: var(--color-text-1);
  }
}
</style>
