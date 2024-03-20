<template>
  <div />
</template>

<script>
export default {
  name: 'Verify',
  // eslint-disable-next-line require-await
  async asyncData ({ store }) {
    store.commit('setLoading', false)
  },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  mounted () {
    this.$store.dispatch('user/verify', this.id)
    this.$router.replace('/')
  }
}
</script>

<style scoped>

</style>
