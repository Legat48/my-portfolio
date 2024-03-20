<template>
  <div
    v-if="$vuetify.breakpoint.lgAndUp"
    class="log-btns__wrap"
  >
    <nuxt-link
      v-ripple
      :to="`${$i18n.locale === 'ru' ? '/ru/' : '/'}user/login`"
      class="log-btns__btn btn"
    >
      <v-icon class="log-btns__icon" danse>
        mdi-login
      </v-icon>
      <div class="log-btns__btn-text">
        {{ $t('auth.toLogin') }}
      </div>
    </nuxt-link>
    <div class="vertical-divider" />
    <nuxt-link
      v-ripple
      :to="`${$i18n.locale === 'ru' ? '/ru/' : '/'}registr`"
      class="log-btns__btn btn"
    >
      <v-icon class="log-btns__icon" danse>
        mdi-playlist-edit
      </v-icon>
      <div class="log-btns__btn-text">
        {{ $t('auth.toReg') }}
      </div>
    </nuxt-link>
  </div>
  <nuxt-link
    v-else
    v-ripple
    class="log-btns__btn btn"
    :to="`${$i18n.locale === 'ru' ? '/ru/' : '/'}user/login`"
  >
    <v-icon class="log-btns__icon" color="primary" size="24">
      mdi-login
    </v-icon>
  </nuxt-link>
</template>

<script>
export default {
  name: 'AuthBtns'
}
</script>

<style lang="scss" scoped>
.log-btns {
  &__wrap {
    display: flex;
    align-items: center;
  }
  &__btn {
    display: flex;
    align-items: center;
    font-weight: 500;
    color: var(--color-text-1);
    @include transition;
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-text-3) !important;
        .log-btns__icon {
          color: var(--color-text-3) !important;
        }
      }
    }
  }
  &__icon {
    color: var(--color-text-1) !important;
    @include transition;
    @media (min-width: 768px) {
      margin-right: 7px;
    }
  }
}
</style>
