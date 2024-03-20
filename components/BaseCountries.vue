<template>
  <div class="countries" @scroll="scrollTracking">
    <!-- надо ждать загрузку -->
    <div class="countries__wrap" @scroll="scrollTracking">
      <div
        v-for="child in countries"
        :key="child.name"
        class="countries__item"
      >
        <CountryDropdown :country="child" />
      </div>
      <div class="countries__bot-hide" />
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import EventBus from '~/helpers/event-bus.js'

export default {
  filters: {
    numberFormat
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    countries () {
      return this.$store.getters['countries/getCountries']
    },
    selectedCountries () {
      return this.$store.getters['countries/getSelectedCountries']
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
.countries {
  position: relative;
  display: flex;
  justify-content: center;
  padding: sizeIncr(10, 40) 0 0 sizeIncr(10, 40);
  width: 100%;
  background-color: transparent;
  &__wrap {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    gap: sizeIncr(3, 18);
    width: 100%;
    @media (min-width: 569px) {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      padding-right: 3px;
      overflow-x: auto;
    }
  }
  &__item {
    position: relative;
    background-color: transparent;
    box-shadow: 3px 0px 28px rgba(0, 0, 0, 0.01);
    &_list {
      padding: 10px 19px 0;
      color: var(--color-text-white-1);
    }
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
