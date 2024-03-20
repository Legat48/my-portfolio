<template>
  <div class="cards" @scroll="scrollTracking">
    <CountryCard
      v-for="country in countries"
      :key="country.name"
      class="cards__card"
      :country="country"
    />
    <div class="cards__bot-hide" />
  </div>
</template>

<script>
import EventBus from '~/helpers/event-bus.js'

export default {
  name: 'CountriesCards',
  computed: {
    countries () {
      return this.$store.getters['countries/getOneTierPortfolioArr'].filter(e => !e.children || (e.children && e.children[0].children) || e.name === 'Africa')
    }
  },
  methods: {
    scrollTracking () {
      EventBus.$emit('scrollTracking')
    }
  }
}
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-right: sizeIncr(1, 15);
  padding-top: sizeIncr(35, 35);
  padding-left: sizeIncr(16, 30);
  &__card {
    margin-right: 15px;
    margin-bottom: 15px;
    width: sizeIncr(328, 420);
    height: sizeIncr(140, 190);
  }
  &__bot-hide {
    opacity: 0;
    pointer-events: none;
    font-size: 56px;
    @media (min-width: 569px) {
      display: none;
    }
  }
}
</style>
