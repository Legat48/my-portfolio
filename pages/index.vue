<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <div class="content__top-wrap" :class="{'content__top-wrap_nopd': $store.getters['countries/getHotOpen']}">
      <HotPortfolio />
      <TableModeSwitcher class="content__table-switch" :class="{'content__table-switch_hide': $store.getters['countries/getHotOpen']}" />
    </div>
    <div class="content__bot-wrap" @scroll="scrollTracking">
      <BaseCountries
        v-if="$store.getters['countries/getTableMode'] && $store.getters['countries/getCountries']?.length > 0"
        :class="{'content__countries_hide': $store.getters['countries/getHotOpen']}"
        class="content__countries"
      />
      <CountriesCards
        v-if="!$store.getters['countries/getTableMode'] && $store.getters['countries/getCountries']?.length > 0"
        :class="{'content__countries_hide': $store.getters['countries/getHotOpen']}"
        class="content__countries"
      />
      <div v-if="$store.getters['countries/getFilter'] && $store.getters['countries/getCountries']?.length < 1" class="content__not-found">
        {{ $t('texts.dataNotFound') }}
      </div>
      <HotList class="content__hot-list" :class="{'content__hot-list_active': $store.getters['countries/getHotOpen']}" />
      <FakeFooter class="content__footer" />
    </div>
    <BaseDialogs />
    <BaseSubDialogs />
    <NuxtLink v-if="$store.getters['user/getAdmin']" v-ripple class="go-admin btn" :to="'/ru/admin'">
      Перейти в администрирование
    </NuxtLink>
    <script>if(!window._teletypeWidget){window._teletypeWidget = window._teletypeWidget || {};!function(){var t = document.getElementsByTagName("app-teletype-root");if (t.length > 0 && _teletypeWidget.init)return;var d = new Date().getTime();var n = document.createElement("script"),c = document.getElementsByTagName("script")[0];n.id = "teletype-widget-embed",n.src = "https://widget.teletype.app/init.js?_=" + d,n.async = !0,n.setAttribute("data-embed-version", "0.1");c.parentNode.insertBefore(n, c);}();document.addEventListener("teletype.ready", function(){console.log("Teletype ready")});window.teletypeExternalId = "iS668tDgU8eMTDNrfulVB8fSbAPzHBIdM_nl0A_XwmlAKARJ4jhC0bINTTVMiIme";}</script>
  </div>
  <div v-else class="app__preloaded">
    <PreLoaded />
  </div>
</template>

<script>
import EventBus from '~/helpers/event-bus.js'

export default {
  middleware: ['countries', 'hotCountries', 'lang'],
  head () {
    return {
      title: this.$store.getters.getLoading ? this.$t('seo.logoTitle') : 'Ranks Portfolio',
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('seo.description') }
      ]
    }
  },
  mounted () {
    this.$store.commit('setLoading', false)
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
  },
  methods: {
    scrollTracking () {
      EventBus.$emit('scrollTracking')
    }
  }
}
</script>

<style lang="scss" scoped>

.go-admin {
  position: fixed;
  inset: auto 20px 20px auto;
  z-index: 10;
  padding: 10px;
  border-radius: 12px;
  font-weight: 600;
  font-style: 16px;
  color: var(--color-text-white-1);
  background-color: var(--color-btn);
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: url("~/assets/images/bg.svg") #F8F9FD no-repeat left bottom fixed;
  overflow: hidden;
  &__top-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px sizeIncr(16, 40) 3px 0;
    width: 100%;
    height: 65px;
    border-bottom: 1px solid var(--color-border-1);
    background-color: var(--color-bg-white-2);
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
    &_nopd {
      padding-right: 0;
    }
  }
  &__bot-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - var(--height-index-header) - 95px);
    min-height: calc(100vh - var(--height-index-header) - 95px);
    overflow: auto;
  }
  &__not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 100%;
    height: 100%;
    font-weight: 500;
    font-size: sizeIncr(18, 28);
    color: var(--color-text-2);
  }
  &__countries {
    height: calc(100% - var(--height-index-header) + var(--height-index-header) - 65px);
    overflow: auto;
    @include transition;
    &_hide {
      opacity: 0;
    }
  }
  &__table-switch {
    opacity: 1;
    @include transition;
    &_hide {
      display: none;
      opacity: 0;
    }
  }
  &__hot-list {
    position: absolute;
    inset: 0;
    z-index: 20;
    height: 100%;
    width: 100%;
    transform: translateX(-100%);
    background-color: var(--color-bg-white-2);
    @include transition;
    &_active {
      transform: translateX(0);
    }
  }
  &__footer {
    margin-top: auto;
    width: 100%;
    height: 20px;
  }
}
.wrap-preloader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 300px;
}
.transition-hot-enter-active,
.transition-hot-leave-active {
  @include transition
}

.transition-hot-enter,
.transition-hot-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
