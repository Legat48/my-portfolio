<template>
  <label class="search" :class="{'search_mob': mob}">
    <input
      v-model="search"
      class="search__input"
      :placeholder="
        $vuetify.breakpoint.smAndUp
          ? $t('filters.labelForSearchInput')
          : $t('filters.labelForSearchInputSmall')
      "
    >
    <v-icon class="search__icon" size="24">
      mdi-magnify
    </v-icon>
    <div v-if="$store.getters['countries/getFilter'] && $store.getters['countries/getFilter'].length > 0" class="search__text">
      Найдено портфелей: {{ $store.getters['countries/getCountPortfolio'] }}
    </div>
    <button
      v-if="$store.getters['countries/getFilter']"
      v-ripple
      class="search__close"
      @click.prevent="$store.commit('countries/setFilter', '')"
    >
      <svg
        v-ripple

        width="25"
        height="25"
        viewBox="0 -0.5 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#394D5E" />
      </svg>
    </button>
  </label>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    mob: {
      type: Boolean,
      default () {
        return false
      },
      require: false
    }
  },
  computed: {
    search: {
      get () {
        return this.$store.getters['countries/getFilter']
      },
      set (val) {
        this.$store.commit('countries/setFilter', val)
      }
    }
  },
  methods: {
    // async setSearch (event) {
    //   if (event !== 'input') {
    //     await this.$store.dispatch('filter/fetchCompanies')
    //     if (Object.keys(this.$route.query).length) {
    //       this.$router.push({ query: { search: this.search } })
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px 0 44px;
  border-radius: 10px;
  border: 1px solid var(--color-border-4);
  width: sizeIncr(320, 426);
  height: 40px;
  color: var(--color-text-1);
  background-color: var(--color-bg-4);
  opacity: 0.8;
  box-shadow: 3px 0px 28px 0px #00000003;
  @include transition;
  &_mob {
    position: fixed !important;
    inset: sizeIncr(50, 84) 0 auto 0;
    z-index: 198;
    padding: 10px 10px 10px 44px;
    height: 60px;
    border-radius: 0px;
    border: none;
    border-top: 1px solid var(--color-border-1) !important;
    border-bottom: 1px solid var(--color-border-1) !important;
    width: 100%;
    background-color: var(--color-bg-white-2);
    opacity: 1;
  }
  &:focus-within {
      opacity: 1;
      .search__label-info {
        opacity: 1;
      }
    }
  &__input {
    width: 100%;
    color: var(--color-text-1);
    &::placeholder{
      color: var(--color-text-4);
      font-size: 14px;
      font-family: 'Inter', sans-serif !important;
    }
  }
  &__icon {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    inset: 0 auto auto 16px;
    pointer-events: none;
    color: var(--color-text-1) !important;
  }
  &__text {
    margin-left: auto;
    margin-right: 5px;
    font-size: 12px;
    white-space: nowrap;
    color: var(--color-text-1);

  }
  &__close {
    border-radius: 3px;
    width: 40px;
    height: 25px;
    svg {
      pointer-events: none;
    }
  }
}
</style>
