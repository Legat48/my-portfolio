<template>
  <div class="tabs">
    <v-btn
      :text="!isActive(1)"
      class="tabs__btn"
      :class="isActive(1)?'tabs__btn_active':''"
      :color="isActive(1)?'colorBtn':'primary'"
      @click="setTab(1)"
    >
      <span class="tabs__text">
        {{ tabs[0] }}
      </span>
    </v-btn>
    <v-btn
      :text="!isActive(2)"
      class="tabs__btn"
      :class="isActive(2)?'tabs__btn_active':''"
      :color="isActive(2)?'colorBtn':'primary'"
      @click="setTab(2)"
    >
      <span class="tabs__text">
        {{ tabs[1] }}
      </span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'TabsComponent',
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      },
      require: true
    }
  },

  data () {
    return {
      tab: 1
    }
  },
  methods: {
    isActive (val) {
      return val === this.tab
    },
    setTab (val) {
      this.tab = val
      this.$emit('set-type', val)
    }
  }

}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  height: 36px;
  width: 100%;
  background: #E9E9F2;
  &__btn {
    height: 36px !important;
    width: 50% !important;
    &_active {
      .tabs__text {
        color: var(--color-text-white-1);
      }
    }
  }
  &__text {
    color: var(--color-text-1);
    @include transition;
  }
}
</style>
