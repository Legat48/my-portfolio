<template>
  <div class="switch-btn d-flex align-center">
    <v-btn icon :color="!$nuxt.$store.state.filter.marketCapRangeMode?'primary':'colorBtn'" @click="setRangeMode(true)">
      <v-icon>mdi-ray-start-end</v-icon>
    </v-btn>
    <v-btn icon :color="$nuxt.$store.state.filter.marketCapRangeMode?'primary':'colorBtn'" @click="setRangeMode(false)">
      <v-icon>mdi-button-pointer</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'MarketCapModeSwitcher',
  methods: {
    setRangeMode (val) {
      this.$store.commit('filter/setMarketCapRangeMode', val)
      if (val) {
        this.$store.commit('filter/setCapitalization', [this.$store.state.filter.baseCapitalization[0], this.$store.state.filter.baseCapitalization[1]])
      } else {
        this.$store.commit('filter/resetCapGroup')
      }
    }
  }
}
</script>

<style scoped>
.switch-btn{
  position: absolute;
  top: 10px;
  right: 34px;
}
</style>
