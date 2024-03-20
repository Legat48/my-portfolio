<template>
  <div class="search">
    <div class="search__container" style="width:100%">
      <template v-if="isMobile">
        <v-btn
          icon
          tile
          class="search__btn search__btn_search"
          outlined
          color="primary"
          @click="toggleSearchInput"
          @click.stop
        >
          <v-icon size="25">
            mdi-magnify
          </v-icon>
        </v-btn>
        <transition name="slide">
          <SearchInput
            v-if="showSearchInput"
            :mob="true"
            @click="stopPropagation"
            @scroll="stopPropagation"
          />
        </transition>
      </template>
      <template v-else>
        <SearchInput />
      </template>
    </div>
  </div>
</template>

<script>
import EventBus from '~/helpers/event-bus.js'

export default {
  name: 'SearchTools',
  data () {
    return {
      isMobile: false,
      showSearchInput: false
    }
  },
  mounted () {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
    window.addEventListener('click', this.hideSearchInput)
    window.addEventListener('scroll', this.hideSearchInput)
    EventBus.$on('scrollTracking', this.handleScroll)
  },
  beforeDestroy () {
    EventBus.$off('scrollTracking')
    window.removeEventListener('resize', this.checkMobile)
    window.removeEventListener('click', this.hideSearchInput)
    window.removeEventListener('scroll', this.hideSearchInput)
  },
  methods: {
    checkMobile () {
      this.isMobile = window.innerWidth <= 768
    },
    toggleSearchInput () {
      this.showSearchInput = !this.showSearchInput
    },
    handleScroll () {
      this.showSearchInput = false
    },
    hideSearchInput (event) {
      if (
        this.showSearchInput &&
        event.target !== this.$el &&
        !this.$el?.contains(event.target) &&
        !event.target.classList?.contains('search__close') && !event.target.classList?.contains('search__text')
      ) {
        this.showSearchInput = false
      }
    },
    stopPropagation (event) {
      event.stopPropagation()
    },
    showFilters () {
      this.$store.commit('dialog/setDialogComponent', 'BaseFilter')
    },
    reset () {
      this.$store.commit('filter/resetSelectedCountries')
      this.$store.commit('filter/resetSelectedSectors')
      this.$store.commit('filter/resetCapGroup')
      this.$store.commit('dialog/closeDialog')
      this.$store.dispatch('filter/fetchCompanies')
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  &__btn {
    border-radius: 7px;
    width: 40px;
    height: 40px;
    border-color: var(--color-border-1) !important;
  }
  &__container {
    display: flex;
    align-items: center;
  }
  &__container {
    display: flex;
    align-items: center;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
