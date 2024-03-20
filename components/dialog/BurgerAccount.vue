<template>
  <div>
    <div v-if="$store.getters['user/auth']" class="dialog-account" :style="$vuetify.breakpoint.smAndDown?'height: calc(100vh - 86px)':''">
      <div class="dialog-account__wrap">
        <div class="dialog-account__profileName">
          {{ profileName }}
        </div>
        <div class="dialog-account__content">
          <v-btn
            text
            class="justify-start px-0 font-16 primary--text"
            width="100%"
            @click="$store.commit('dialog/setDialogComponent','BasePurchases')"
          >
            <v-icon size="18" class="mr-1" color="primary">
              mdi-shopping-outline
            </v-icon>

            <div class="font-16 primary--text">
              {{ $t('purchases.myPurchases') }}
            </div>
          </v-btn>
          <v-btn
            text
            class="justify-start px-0 font-16 primary--text"
            width="100%"
            @click="$store.commit('dialog/setDialogComponent', 'UserSettings')"
          >
            <v-icon size="18" class="mr-1" color="primary">
              mdi-cog-outline
            </v-icon>
            <div class="font-16 primary--text">
              {{ $t('settings.settings') }}
            </div>
          </v-btn>
        </div>
      </div>
      <div class="d-flex flex-column">
        <v-divider />
        <div class="px-4 py-5 d-flex flex-column">
          <a class="mb-4 td-none primary--text" target="_blank" href="https://ranks.pro/oferta-research">{{ $t('docs.offer') }}</a>
          <a class="mb-4 td-none primary--text" target="_blank" href="https://ranks.pro/persondata">{{ $t('docs.privacyPolicy') }}</a>
          <a class="mb-4 td-none primary--text" target="_blank" href="https://ranks.pro/agreement">{{ $t('docs.personalData') }}</a>
          <a class="td-none primary--text" href="https://ranks.pro/resplimitation">{{ $t('docs.limitationOfLiability') }}</a>
        </div>
        <v-divider />
        <div class="px-4 py-5">
          <v-btn class="px-0" text @click="logOut()">
            <v-icon size="18" color="primary">
              mdi-door
            </v-icon>
            <div class="font-16 primary--text">
              {{ $t('buttons.logOut') }}
            </div>
          </v-btn>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="dialog-account__auth-wrap" style="width: 100%">
        <v-btn
          width="100"
          large
          style="background: rgb(244, 244, 247)!important;"
          class="px-2"
          color="primary"
          elevation="0"
          @click="openAuth()"
        >
          <v-icon size="18" color="primary">
            mdi-login
          </v-icon>
          <div class="font-16" :style="&quot;color:&quot;+$vuetify.theme.currentTheme.primary">
            {{ $t('auth.toLogin') }}
          </div>
        </v-btn>
        <div class="mx-4" />
        <v-btn
          large
          style="background: rgb(244, 244, 247)!important;"
          class="px-2"
          color="primary"
          elevation="0"
          @click="openRegistration"
        >
          <v-icon size="18" color="primary">
            mdi-playlist-edit
          </v-icon>
          <div class="font-16" :style="&quot;color:&quot;+$vuetify.theme.currentTheme.primary">
            {{ $t('auth.toReg') }}
          </div>
        </v-btn>
      </div>
      <div :style="$vuetify.breakpoint.smAndDown? 'position: fixed; bottom: 0; width: 100%':''">
        <v-divider />
        <div class="px-4 py-5 d-flex flex-column">
          <a class="mb-4 td-none primary--text" target="_blank" href="https://ranks.pro/oferta-research">{{ $t('docs.offer') }}</a>
          <a class="mb-4 td-none primary--text" target="_blank" href="https://ranks.pro/persondata">{{ $t('docs.privacyPolicy') }}</a>
          <a class="mb-4 td-none primary--text" target="_blank" href="https://ranks.pro/agreement">{{ $t('docs.personalData') }}</a>
          <a class="td-none primary--text" href="https://ranks.pro/resplimitation">{{ $t('docs.limitationOfLiability') }}</a>
        </div>
        <v-divider />
        <div class="dialog-account__switchers-wrap" style="width: 100%">
          <LocaleSwitcher class="mr-4" />
          <CurrencySwitcher :small="false" />
        </div>
        <v-divider />
        <v-divider />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BurgerAccount',
  computed: {
    profile () {
      return this.$store.state.user.profile
    },
    profileName () {
      return (this.profile.firstName.length + this.profile.lastName.length <= 20) ? ((!!this.profile.firstName && !!this.profile.lastName) ? (this.profile.firstName + ' ' + this.profile.lastName) : (this.profile.email.length > 20 ? this.profile.email?.split('@')[0] : this.profile.email)) : (this.profile.email.length > 20 ? this.profile.email?.split('@')[0] : this.profile.email)
    }
  },
  methods: {
    openRegistration () {
      this.$store.commit('dialog/setDialogComponent', 'BaseRegistration')
    },
    openAuth () {
      this.$store.commit('dialog/setDialogComponent', 'BaseLogin')
    },
    logOut () {
      this.$store.commit('user/logout')
      this.$store.commit('dialog/closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-account {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__auth-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 16px 16px 16px;
  }
  &__profileName {
    font-weight: 700;
    font-size: 18px;
  }
  &__content {
    display: flex;
    flex-direction: column;
  }
  &__switchers-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    min-height: 64px;
  }
}
</style>
