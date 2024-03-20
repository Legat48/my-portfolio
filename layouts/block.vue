<template>
  <div>
    <v-app class="app">
      <BaseHeader class="app__header" :block="true" :class="headerStyle" />
      <main class="app__main">
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
  },
  computed: {
    headerStyle () {
      return {
        'z-index-203': this.$store.getters['dialog/getDialogOpen'] || this.$store.getters['dialog/getSubDialogOpen'],
        'z-index-199': !this.$store.getters['dialog/getDialogOpen'] && !this.$store.getters['dialog/getSubDialogOpen']
      }
    }
  }
}
</script>

<style lang="scss">
.app {
  height: 100vh;
  width: 100%;
  &__header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 203;
  }
  &__main {
    padding-top: calc(var(--height-header));
    width: 100%;
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
