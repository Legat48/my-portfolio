<template>
  <div>
    <v-app class="app">
      <main class="app__main app__main_stock">
        <Nuxt />
      </main>
    </v-app>
    <!-- <script>if(!window._teletypeWidget){window._teletypeWidget = window._teletypeWidget || {};!function(){var t = document.getElementsByTagName("app-teletype-root");if (t.length > 0 && _teletypeWidget.init)return;var d = new Date().getTime();var n = document.createElement("script"),c = document.getElementsByTagName("script")[0];n.id = "teletype-widget-embed",n.src = "https://widget.teletype.app/init.js?_=" + d,n.async = !0,n.setAttribute("data-embed-version", "0.1");c.parentNode.insertBefore(n, c);}();document.addEventListener("teletype.ready", function(){console.log("Teletype ready")});window.teletypeExternalId = "iS668tDgU8eMTDNrfulVB8fSbAPzHBIdM_nl0A_XwmlAKARJ4jhC0bINTTVMiIme";}</script> -->
  </div>
</template>
<script>

export default {
  head () {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale || 'en'
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('seo.description') }
      ]
    }
  }
}
</script>

<style lang="scss">
.app {
  height: 100vh;
  width: 100%;
  &__main_stock {
    padding: 0 !important;
    width: 100%;
    height: 100%;
  }
  &__preloaded {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
