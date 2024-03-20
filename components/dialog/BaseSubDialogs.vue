<template>
  <transition name="transition-dialog">
    <div v-if="dialogOpen" class="sub-dialog">
      <div class="sub-dialog__wrap">
        <div class="sub-dialog__header">
          <h2 class="sub-dialog__title">
            {{ title }}
          </h2>
          <v-btn
            class="sub-dialog__close"
            icon
            @click.prevent="dialogOpen = false"
          >
            <v-icon color="#6D8DB9">
              mdi-close
            </v-icon>
          </v-btn>
        </div>
        <KeepAlive>
          <component
            :is="current"
            class="sub-dialog__keep-alive"
            :class="current === 'PasswordRecovery' ? 'sub-dialog__keep-alive_no-min-height' : ''"
          />
        </KeepAlive>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseSubDialogs',
  computed: {
    dialogOpen: {
      get () {
        return this.$store.getters['dialog/getSubDialogOpen']
      },
      set () {
        this.$store.commit('dialog/closeSubDialog')
      }
    },
    title () {
      if (this.current) {
        return this.$i18n.t(`dialog.${this.current}`)
      } else {
        return this.$i18n.t('dialog.error')
      }
    },
    current () {
      return this.$store.getters['dialog/getSubDialogComponent']
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-dialog {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: sizeIncr(65, 94);
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  z-index: 202;

  &__wrap {
    position: relative;
    z-index: 204;
    padding: 0 !important;
    overflow: hidden;
    min-width: #{$minvw}px;
    max-height: 100%;
    border: 2px solid var(--color-border-1);
    border-radius: 7px;
    background-color: var(--color-bg-white-2);
    box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: sizeIncr(18, 36);
    border-bottom: 1px solid var(--color-border-1);
  }
  &__title-wrap {
    display: flex;
    padding-right: 10px;
  }
  &__title-icon {
    margin-right: 6px;
  }
  &__title {
    font-weight: 600;
    font-size: sizeIncr(18, 24);
    line-height: 110%;
    color: var(--color-text-1);
  }
  &__close {
    width: 14px !important;
    height: 14px !important;
    min-width: none !important;
  }
  &__keep-alive {
    max-height: 78vh;
    min-width: 330px;
    max-width: 1230px;
    overflow-y: auto;
    &_no-min-height {
      min-height: auto;
    }
  }
}

.transition-dialog-enter-active,
.transition-dialog-leave-active {
  @include transition
}

.transition-dialog-enter,
.transition-dialog-leave-to {
  opacity: 0;
}
</style>
