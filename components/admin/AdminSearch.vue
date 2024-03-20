<template>
  <label class="search">
    <input
      v-model="search"
      class="search__input"
      placeholder="Введите RIC или название компании на английском"
    >
    <v-icon class="search__icon" size="24">
      mdi-magnify
    </v-icon>
  </label>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    value: {
      type: String,
      require: true,
      default: ''
    }
  },
  computed: {
    search: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  methods: {
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
  width: sizeIncr(320, 783);
  height: 40px;
  color: var(--color-text-1);
  background-color: var(--color-bg-4);
  opacity: 0.8;
  box-shadow: 3px 0px 28px 0px #00000003;
  @include transition;
  &_mob {
    position: fixed !important;
    inset: sizeIncr(55, 84) 0 auto 0;
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
