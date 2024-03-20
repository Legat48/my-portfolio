<template>
  <v-menu
    v-if="$store.getters['user/auth']"
    v-model="menu"
    class="menu"
    :close-on-content-click="true"
    offset-y
    style="z-index: 203"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        :text="$vuetify.breakpoint.mdAndUp"
        v-bind="attrs"
        :icon="!$vuetify.breakpoint.mdAndUp"
        v-on="on"
      >
        <div class="menu__chevron-icon">
          <span v-if="profileName" :style="'color:' + $vuetify.theme.currentTheme.primary">
            {{ profileName }}
          </span>
          <span v-if="!profileName && profile.email" :style="'color:' + $vuetify.theme.currentTheme.primary">
            {{ profile.email }}
          </span>
          <v-btn
            class="menu__chevron-btn"
            tile
            icon
            height="24"
            width="24"
            color="colorBtn"
            elevation="0"
            :style="
              'background-color:' +
                (menu ? $vuetify.theme.currentTheme.colorBtn : '#F4F4F7')
            "
          >
            <v-icon :color="menu ? 'white' : 'primary'">
              mdi-chevron-{{ menu ? "up" : "down" }}
            </v-icon>
          </v-btn>
        </div>
        <v-icon class="menu__account-icon">
          {mdi-account}
        </v-icon>
      </v-btn>
    </template>

    <div class="menu__list user-menu">
      <div class="menu__subContainer">
        <nuxt-link
          v-ripple
          class="user-menu-btn menu__btn btn"

          width="100%"
          :to="`${$i18n.locale === 'ru' ? '/ru/' : '/'}pay`"
        >
          <v-icon size="18" class="mr-1" color="primary">
            mdi-shopping
          </v-icon>
          <span class="menu__btn-text">
            {{ $t("purchases.myPurchases") }}
          </span>
          <span v-if="$store.getters['purchases/getCount']" class="menu__btn-text">
            ({{ $store.getters['purchases/getCount'] }})
          </span>
        </nuxt-link>
        <nuxt-link
          v-ripple
          :to="`${$i18n.locale === 'ru' ? '/ru/' : '/'}user`"
          class="user-menu-btn menu__btn btn"
          width="100%"
        >
          <v-icon size="18" class="mr-1" color="primary">
            mdi-cog
          </v-icon>
          <span class="menu__btn-text">
            {{ $t("settings.settings") }}
          </span>
        </nuxt-link>
      </div>
      <v-divider />
      <div class="menu__subContainer">
        <v-btn
          text
          class="user-menu-btn my-1 justify-start font-16 primary--text"
          style="font-weight: 500"
          width="100%"
          @click="disAuth()"
        >
          <v-icon size="18" class="mr-1" color="primary">
            mdi-door
          </v-icon>
          <span class="menu__btn-text">
            {{ $t("buttons.logOut") }}
          </span>
        </v-btn>
      </div>
    </div>
  </v-menu>
  <AuthBtns v-else />
</template>

<script>
export default {
  name: 'UserMenu',
  data: () => ({
    menu: false
  }),
  computed: {
    darkTheme: {
      set (val) {
        this.$store.commit('theme/setTheme', val)
      },
      get () {
        return this.$store.state.theme.darkTheme
      }
    },
    profile () {
      return this.$store.state.user.profile
    },
    profileName () {
      const firstName = this.profile.firstName || ''
      const lastName = this.profile.lastName || ''
      const email = this.profile.email || ''

      const fullName = `${firstName} ${lastName}`.trim()
      const emailPrefix = email.length > 20 ? email.split('@')[0] : email

      return fullName.length <= 20 ? fullName : emailPrefix
    }
  },
  methods: {
    disAuth () {
      this.$store.dispatch('user/logout')
      this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}user/login`)
    },
    async openPurchases () {
      await this.$store.dispatch('purchases/fetchOrders')
      this.$store.commit('dialog/setDialogComponent', 'BasePurchases')
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  z-index: 1004;
  &__subContainer {
    padding: 8px;
    flex-direction: column;
    display: flex;
  }
  &__chevron-icon {
    @media (max-width: 1268px) {
      span {
        display: none;
      }
    }
  }
  &__account-icon {
    @media (min-width: 1269px) {
      display: none;
    }
  }
  &__chevron-btn {
    border-radius: 4px;
    padding: 0px;
    margin-right: 4px;
    margin-left: 4px;
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 4px;
    margin-bottom: 4px;
    padding: 0px 16px;
    height: 36px;
    color: var(--color-text-1);
    caret-color: var(--color-text-1);
    text-align: start;
  }
  &__btn-text {
    font-size: 15px;
    font-weight: 500;
  }
  &__icon {
    margin-right: 4px;
    width: 20px;
    height: 20px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--color-bg-white-1);
    overflow: hidden;
  }
  &__link {
    &:not(:last-child) {
      margin-bottom: 1px;
    }
    width: 100%;
  }
}
.user-menu {
  background-color: var(--color-bg-white-2) !important;
  width: 291px;
  border-radius: 15px;
}
</style>

<style lang="scss">

</style>
