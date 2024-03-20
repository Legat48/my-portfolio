<template>
  <div style="width: 100%;" class="content">
    <PostRegistration class="content__wrap" :active="true" />
    <script>if(!window._teletypeWidget){window._teletypeWidget = window._teletypeWidget || {};!function(){var t = document.getElementsByTagName("app-teletype-root");if (t.length > 0 && _teletypeWidget.init)return;var d = new Date().getTime();var n = document.createElement("script"),c = document.getElementsByTagName("script")[0];n.id = "teletype-widget-embed",n.src = "https://widget.teletype.app/init.js?_=" + d,n.async = !0,n.setAttribute("data-embed-version", "0.1");c.parentNode.insertBefore(n, c);}();document.addEventListener("teletype.ready", function(){console.log("Teletype ready")});window.teletypeExternalId = "iS668tDgU8eMTDNrfulVB8fSbAPzHBIdM_nl0A_XwmlAKARJ4jhC0bINTTVMiIme";}</script>
  </div>
</template>

<script>
export default {
  layout: 'stock',
  mounted () {
    this.$store.commit('setLoading', false)
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  background: url("~/assets/images/bg.svg") #F8F9FD no-repeat center center fixed;
  &__wrap {
    border-radius: 7px;
    background-color: var(--color-bg-white-2);
    overflow: scroll;
    box-shadow: 0px 4px 26px 0px #080C421A;

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
