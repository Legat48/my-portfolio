<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="checkbox" :class="{'checkbox_active': status, 'checkbox_white': white}">
    <svg class="checkbox__icon" :class="{'checkbox__icon_active': status}" width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.59961 9.2L11.6496 2.15L10.2496 0.75L4.59961 6.4L1.74961 3.55L0.349609 4.95L4.59961 9.2Z" :fill="white ? '#3FA6FA': 'white'" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    status: {
      type: Boolean,
      default: false
    },
    white: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-border-1);
  border-radius: 2px;
  width:18px;
  min-width:18px;
  height:18px;
  @include transition;
  &_active {
    border-color: var(--color-border-3);
    background-color: var(--color-border-3)
  }
  &__icon {
    width:12px;
    height:10px;
    opacity: 0;
    @include transition;
    &_active {
      opacity: 1;
    }
  }
}
.checkbox_white.checkbox_active {
  border-color: var(--color-bg-white-2);
  background-color: var(--color-bg-white-2)
}
</style>
