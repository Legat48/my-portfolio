<template>
  <div class="filter">
    <div class="filter__title">
      Фильтр
    </div>
    <div class="filter__wrap-input">
      <label class="filter__search">
        <input
          v-model="search"
          class="filter__input"
          :placeholder="$t('filters.purchase')"
        >
        <v-icon class="filter__icon" size="24">
          mdi-magnify
        </v-icon>
      </label>
      <div class="filter__wrap-menu">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="dateFrom"
              :label="$t('purchases.datePayFrom')"
              solo
              persistent-hint
              readonly
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="updateDate('from', dateFrom)"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="dateFrom"
            no-title
            @input="menu1 = false"
          />
        </v-menu>
      </div>
      <div class="filter__wrap-menu">
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="dateTo"
              :label="$t('purchases.datePayTo')"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              solo
              readonly
              @blur="updateDate('to', dateTo)"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="dateTo"
            no-title
            @input="menu2 = false"
          />
        </v-menu>
      </div>
      <div class="filter__count" :class="{'filter__count_show': $store.getters['purchases/getFilterExists']}">
        {{ $t("filters.purchaseRez") }} {{ count }}
      </div>
    </div>
    <button v-show="$store.getters['purchases/getFilterExists']" v-ripple class="filter__btn-reset" @click="resetFilter()">
      {{ $t("purchases.filterReset") }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'FilterPurchases',
  data () {
    return {
      menu1: false,
      menu2: false
    }
  },
  computed: {
    count () {
      const arr = this.$store.getters['purchases/getFilterPurchases']
      if (arr && arr.length > 0) {
        return arr.length
      } else {
        return 0
      }
    },
    search: {
      get () {
        return this.$store.getters['purchases/getFilterName']
      },
      set (newValue) {
        this.$store.commit('purchases/setFilterName', newValue)
      }
    },
    dateFrom: {
      get () {
        return this.$store.getters['purchases/getDateFrom']
      },
      set (newValue) {
        this.$store.commit('purchases/setDateFrom', newValue)
      }
    },
    dateTo: {
      get () {
        return this.$store.getters['purchases/getDateTo']
      },
      set (newValue) {
        this.$store.commit('purchases/setDateTo', newValue)
      }
    }
  },
  methods: {
    updateDate (type, value) {
      if (type === 'from') {
        this.dateFrom = value
      } else {
        this.dateTo = value
      }
    },
    resetFilter () {
      this.dateFrom = null
      this.dateTo = null
      this.search = ''
    }
  }
}
</script>

<style lang='scss' scoped>
.filter {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: sizeIncr(8, 16) sizeIncr(16, 32);
  border-radius: 12px;
  background-color: var(--color-bg-4);
  &__title {
    display: flex;
    align-items: center;
    font-size: sizeIncr(16, 22);
    font-weight: 600;
    line-height: 110%;
    color: var(--color-text-1);
    white-space: nowrap;
  }
  &__wrap-input {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }
  &__wrap-menu {
    padding-left: 6px;
    border-radius: 10px;
    background-color: var(--color-bg-white-2);
    overflow: hidden;
  }
  &__search {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px 0 44px;
    border-radius: 10px;
    border: 1px solid var(--color-border-4);
    width: 100%;
    max-width: 540px;
    height: 48px;
    color: var(--color-text-1);
    background-color: var(--color-bg-white-2);
    opacity: 0.8;
    box-shadow: 3px 0px 28px 0px #00000003;
    @include transition;
    &:focus-within {
      opacity: 1;
      .filter__label-info {
        opacity: 1;
      }
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
  &__count {
    display: none;
    color: var(--color-text-1);
    opacity: 0;
    @include transition;
    &_show {
      display: flex;
      opacity: 1;
    }
  }
  &__btn-reset {
    position: absolute;
    inset: 10px 10px auto auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    width: 100px;
    height: 32px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-2);
    box-shadow: 3px 0px 28px rgba(0, 0, 0, 0.01);
  }
}
</style>
<style lang="scss">

.filter .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
  box-shadow: none !important;
}

.filter .v-text-field__details {
  display: none !important;
}

.filter .v-input__slot {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
