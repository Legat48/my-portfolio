<template>
  <transition name="transition-dialog">
    <div v-if="dialogOpen" class="dialog">
      <div class="dialog__wrap">
        <div v-if="showHeader" class="dialog__header">
          <div class="dialog__title-wrap">
            <v-icon class="dialog__title-icon" color="primary" size="24">
              {{ icon }}
            </v-icon>
            <h2 class="dialog__title">
              {{ title }}
            </h2>
            <CurrencySwitcher v-if="current === 'ShoppingBasket'" class="dialog__curr" />
          </div>
          <v-btn
            class="dialog__close"
            icon
            @click.prevent="dialogOpen = false"
          >
            <v-icon color="#6D8DB9">
              mdi-close
            </v-icon>
          </v-btn>
        </div>
        <div class="dialog__keep-alive">
          <component
            :is="current"
            :class="current === 'PasswordRecovery' ? 'ialog__keep-alive_no-min-height' : ''"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseDialogs',
  data () {
    return {
      scrollPosition: 0 // Переменная для хранения текущей позиции прокрутки
    }
  },
  computed: {
    dialogOpen: {
      get () {
        return this.$store.getters['dialog/getDialogOpen']
        // return true
      },
      set () {
        this.$store.commit('dialog/closeDialog')
      }
    },
    title () {
      if (this.current) {
        return this.$i18n.t(`dialog.${this.current}`)
      } else {
        return this.$i18n.t('dialog.error')
      }
    },
    icon () {
      if (this.current) {
        return this.$i18n.t(`dialogIcon.${this.current}`)
      } else {
        return this.$i18n.t('dialogIcon.error')
      }
    },
    current () {
      return this.$store.getters['dialog/getDialogComponent']
      // return 'PostRegistration'
    },
    // показывать хедер модалки
    showHeader () {
      switch (this.current) {
        case 'PostRegistration' : return false
        case 'ThanksDialog' : return false
        case 'HelpModal' : return false
        case 'HelpSend' : return false
        default:
          return true
      }
    }
  },
  watch: {
    // блокировка скролла страницы
    dialogOpen (newVal) {
      if (newVal) {
        this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        this.disableScroll()
      } else {
        setTimeout(this.enableScroll, 300)
        this.restoreScrollPosition()
      }
    }
  },
  methods: {
    disableScroll () {
      document.body.style.overflow = 'visible'
      // document.body.style.position = 'fixed'
      document.body.style.top = `-${this.scrollPosition}px`
      document.body.style.width = '100%'
    },
    enableScroll () {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    },
    restoreScrollPosition () {
      setTimeout(() => {
        window.scrollTo(0, this.scrollPosition)
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: calc(var(--height-header) + 10px);
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
    max-height: calc(100vh - var(--height-header) + var(--height-header));
    border: 2px solid var(--color-border-1);
    border-radius: 7px;
    background-color: var(--color-bg-white-2);
    box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:  var(--height-header);
    padding: 0 sizeIncr(18, 36);
    border-bottom: 1px solid var(--color-border-1);
  }
  &__title-wrap {
    display: flex;
    align-items: center;
    width: 100%;
    padding-right: 10px;
  }
  &__curr {
    margin: 0 40px 0 auto;
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
    min-width: 30vw;
    max-width: 1230px;
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
