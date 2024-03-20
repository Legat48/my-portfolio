<template>
  <button class="logo btn" text xl @click="$router.push(localePath('/'))">
    <img class="logo__img logo__img_1" src="~assets/images/logo1.svg" :alt="$t('seo.logoTitle')">
    <img class="logo__img logo__img_2" src="~assets/images/logo2.svg" alt="Logo ranks">
  </button>
</template>

<script>
export default {
  name: 'BaseLogo'
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  width: sizeIncr(114, 237);
  padding: sizeIncr(0, 20);
  &__img {
    &_1 {
      margin-right: 4px;
      width: sizeIncr(70, 103);
    }
    &_2 {
      width: sizeIncr(63, 90);
    }
  }
}
</style>

<style lang="scss">

</style>
