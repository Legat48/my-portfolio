<template>
  <div class="filter">
    <div v-ripple class="filter__header" @click="closedFilter()">
      <div class="filter__title">
        {{ $t("purchases.filterTitle") }}
      </div>
      <svg
        class="filter__header-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6.39961 18.6496L5.34961 17.5996L10.9496 11.9996L5.34961 6.39961L6.39961 5.34961L11.9996 10.9496L17.5996 5.34961L18.6496 6.39961L13.0496 11.9996L18.6496 17.5996L17.5996 18.6496L11.9996 13.0496L6.39961 18.6496Z"
          fill="#394D5E"
        />
      </svg>
    </div>
    <div class="filter__wrap">
      <label class="filter__search">
        <input v-model="search" class="filter__input" :placeholder="$t('filters.purchase')">
        <v-icon class="filter__icon" size="24">
          mdi-magnify
        </v-icon>
      </label>
      <div class="filter__wrap-input">
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
      <div class="filter__footer">
        <button v-ripple class="filter__footer-btn filter__footer-btn_reset" @click="resetFilter()">
          {{ $t("purchases.filterReset") }}
        </button>
        <button v-ripple class="filter__footer-btn" @click="closedFilter()">
          {{ $t("purchases.filterApply") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobFilterPurchases',
  data () {
    return {
      menu1: false,
      menu2: false
    }
  },
  computed: {
    count () {
      const arr = this.$store.getters['purchases/getFilterPurchases']
      return arr && arr.length > 0 ? arr.length : 0
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
      this.$store.commit('purchases/setMobFilter')
    },
    closedFilter () {
      this.$store.commit('purchases/setMobFilter')
    }
  }
}
</script>

<style lang='scss' scoped>
.filter {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  gap: 8px;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 sizeIncr(16, 40) ;
    height: sizeIncr(41, 82);
    border-bottom: 1px solid var(--color-border-4);
  }
  &__title {
    display: flex;
    align-items: center;
    font-size: sizeIncr(16, 22);
    font-weight: 600;
    line-height: 110%;
    color: var(--color-text-1);
    white-space: nowrap;
  }
  &__header-icon {
    margin-right: sizeIncr(7, 11);
    width: 24px;
    height: 24px;
  }
  &__wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: sizeIncr(16, 40) sizeIncr(16, 40) sizeIncr(36, 40) sizeIncr(16, 40);
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
    height: 40px;
    color: var(--color-text-1);
    background-color: var(--color-bg-4);
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

    &::placeholder {
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
  &__wrap-input {
    position: relative;
  }
  &__footer {
    display: flex;
    gap: 8px;
    margin-top: auto;
    width: 100%;
  }
  &__footer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    width: 100%;
    height: 42px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn);
    box-shadow: 3px 0px 28px rgba(0, 0, 0, 0.01);
    &_reset {
      background-color: var(--color-btn-2);
    }
  }
}
</style>

<style lang="scss">
.filter__wrap-input {
  .v-picker__content {
    position: absolute !important;
  }
}
</style>
