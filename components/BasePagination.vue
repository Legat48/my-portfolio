<template>
  <div v-if="$store.state.filter.page" class="pagination" :style="'max-width:'+($vuetify.breakpoint.smAndDown?'320px':'500px')+';'">
    <v-pagination
      v-model="page"
      :length="$store.state.filter.pageCount"
    />
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  data () {
    return {}
  },
  computed: {
    page: {
      set (val) {
        this.$store.commit('filter/setPage', val)
      },
      get () {
        return this.$store.getters['filter/page']
      }
    }
  },
  watch: {
    page () {
      this.$store.dispatch('filter/fetchCompanies')
    }
  }
}
</script>

<style scoped>
.pagination{
  position: sticky;
}
</style>
