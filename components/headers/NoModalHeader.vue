<template>
  <div class="header">
    <h2 class="header__title">
      <slot name="svg" />
      {{ title }}
    </h2>
    <BtnBack :to-router="`${$i18n.locale === 'ru' ? '/ru/' : '/'}`" class="purchases__btn-back" />
  </div>
</template>

<script>

export default {
  name: 'NoModalHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
  }

}
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 sizeIncr(16, 40) ;
  height: sizeIncr(41, 82);
  border-bottom: 1px solid var(--color-border-4);
  &__title {
    display: flex;
    align-items: center;
    font-size: sizeIncr(16, 22);
    font-weight: 600;
    line-height: 110%;
    color: var(--color-text-1);
    white-space: nowrap;
    svg {
      margin-right: sizeIncr(7, 11);
      width: sizeIncr(16, 22);
      height: sizeIncr(16, 22);
    }
  }
}
</style>
