<template>
  <div class="switch">
    <v-btn
      icon
      class="switch__icon switch__icon_first"
      :color="!tableMode?'primary':'colorBtn'"
      :aria-label="$t('seo.switcherOne')"
      @click="setTableMode(true)"
    >
      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>
    <v-btn
      class="switch__icon"
      icon
      :color="tableMode?'primary':'colorBtn'"
      :aria-label="$t('seo.switcherTwo')"
      @click="setTableMode(false)"
    >
      <v-icon>mdi-view-grid-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'TableModeSwitcher',
  computed: {
    tableMode () {
      return this.$store.getters['countries/getTableMode']
    }
  },
  methods: {
    setTableMode (value) {
      this.$store.commit('countries/setTableMode', value)
      localStorage.setItem('isTableMode', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.switch {
  display: flex;
  flex-wrap: nowrap;
  width: 64px;
  &__icon {
    width: 24px;
    height: 24px;
    &_first {
      margin-right: 16px;
    }
  }
}
</style>
