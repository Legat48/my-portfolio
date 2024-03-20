<template>
  <div v-if="!$store.getters.getLoading" style="width: 100%;" class="content">
    <BasePurchases class="content__wrap" :class="{'content__wrap_hidden': $store.getters['purchases/getMobFilter']}" :modal="false" />
    <script>if(!window._teletypeWidget){window._teletypeWidget = window._teletypeWidget || {};!function(){var t = document.getElementsByTagName("app-teletype-root");if (t.length > 0 && _teletypeWidget.init)return;var d = new Date().getTime();var n = document.createElement("script"),c = document.getElementsByTagName("script")[0];n.id = "teletype-widget-embed",n.src = "https://widget.teletype.app/init.js?_=" + d,n.async = !0,n.setAttribute("data-embed-version", "0.1");c.parentNode.insertBefore(n, c);}();document.addEventListener("teletype.ready", function(){console.log("Teletype ready")});window.teletypeExternalId = "iS668tDgU8eMTDNrfulVB8fSbAPzHBIdM_nl0A_XwmlAKARJ4jhC0bINTTVMiIme";}</script>
  </div>
  <div v-else class="app__preloaded">
    <PreLoaded />
  </div>
</template>

<script>
export default {
  layout: 'block',
  mounted () {
    this.$store.commit('setLoading', false)
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100% - var(--height-header) + var(--height-header));
  padding: 10px;
  background: url("~/assets/images/bg.svg") #F8F9FD no-repeat center center fixed;
  &__wrap {
    border-radius: 7px;
    background-color: var(--color-bg-white-2);
    width: 100%;
    max-width: #{$maxvw - 40}px;
    overflow: auto;
    box-shadow: 0px 4px 26px 0px rgba(8, 12, 66, 0.10);
    &_hidden {
      overflow: hidden;
    }
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
</style>
