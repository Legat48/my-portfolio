<template>
  <button class="logo btn" text xl @click="$router.push(localePath('/'))">
    <img class="logo__img logo__img_1" src="~assets/images/logo1.svg" alt="Logo">
    <img class="logo__img logo__img_2" src="~assets/images/logo2.svg" alt="Logo ranks">
  </button>
</template>

<script>
export default {
  name: 'IndexLogo'
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 237px;

  @media (max-width: 970px) {
    width: 114px;
  }

  &__img {
    &_1 {
      margin-right: 4px;
      width: 103px;
      @media (max-width: 970px) {
        width: 71px;
      }
    }

    &_2 {
      width: 90px;
      @media (max-width: 970px) {
        width: 63px;
      }
    }
  }
}
</style>

<style lang="scss"></style>
