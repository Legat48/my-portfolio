<template>
  <label class="select">
    <div class="select__title">
      {{ title }}
    </div>
    <!-- <select v-model="selectedValue" class="select__select">
      <option value="">Все</option>
      <option v-for="(option, index) in options" :key="index" :value="option.id">
        {{ option.name }}
      </option>
    </select> -->

    <v-select
      v-model="selectedValue"
      :items="options"
      item-value="key"
      item-text="value"
      hide-details
      solo
      append-icon="mdi-chevron-down"
      class="select__select"
    />
  </label>
</template>

<script>
export default {
  name: 'AdminSelect',
  props: {
    value: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    // eslint-disable-next-line vue/require-default-prop
    options: {
      type: Array,
      require: true
    }
  },
  computed: {
    selectedValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  flex-direction: column;
  gap: sizeIncr(5, 10);
  padding: sizeIncr(10, 15);
  border-radius: 9px;
  width: sizeIncr(190, 310);
  color: var(--color-text-1);
  background-color: var(--color-bg-4);
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
  &__title {
    font-size: sizeIncr(14, 18);
    font-weight: 500;
  }
  &__select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    border-radius: 5px;
    background-color: var(--color-bg-white-1);
  }
}
</style>
<style lang="scss">
.select__select {
  .v-input__control {
    height: 28px !important;
    min-height: auto !important;
  }
}
.theme--light.v-select .v-select__selections {
  color: var(--color-text-1) !important;
}
.v-sheet.v-list {
  border-radius: 12px !important;
  padding: 0 !important;
}

</style>
