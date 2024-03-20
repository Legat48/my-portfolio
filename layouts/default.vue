<template>
  <v-app class="app" :class="{'app_big-header': /^(\/|\/ru(\/|$))/.test($route.path)}">
    <IndexHeader class="app__header" :class="headerStyle" />
    <main class="app__main">
      <Nuxt />
    </main>
    <!-- <script>if(!window._teletypeWidget){window._teletypeWidget = window._teletypeWidget || {};!function(){var t = document.getElementsByTagName("app-teletype-root");if (t.length > 0 && _teletypeWidget.init)return;var d = new Date().getTime();var n = document.createElement("script"),c = document.getElementsByTagName("script")[0];n.id = "teletype-widget-embed",n.src = "https://widget.teletype.app/init.js?_=" + d,n.async = !0,n.setAttribute("data-embed-version", "0.1");c.parentNode.insertBefore(n, c);}();document.addEventListener("teletype.ready", function(){console.log("Teletype ready")});window.teletypeExternalId = "iS668tDgU8eMTDNrfulVB8fSbAPzHBIdM_nl0A_XwmlAKARJ4jhC0bINTTVMiIme";}</script> -->
  </v-app>
</template>

<script>
export default {
  head () {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale || 'en'
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') }
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
  margin: 0 auto;
  height: 100vh;
  width: 100%;
  &_big-header {
    @media (max-width: 1042px) {
      --height-index-header: 105px
    }
  }
  &__header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 203;
  }
  &__main {
    padding-top: var(--height-index-header);
    width: 100%;
    height: 100vh;
    min-height: 100vh;
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
<style>
</style>
