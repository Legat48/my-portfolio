<template>
  <div class="logo btn" @click="$router.push(localePath('/'))">
    <img class="logo__img logo__img_1" src="~assets/images/mastercard.svg" alt="mastercard">
    <img class="logo__img logo__img_2" src="~assets/images/mir.svg" alt="mir">
    <img class="logo__img logo__img_3" src="~assets/images/visa.svg" alt="visa">
  </div>
</template>

<script>
export default {
  name: 'PaymentIcons'
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  height: sizeIncr(24, 24);
  opacity: 0.6;
  @include transition;
  &:hover {
    opacity: 1;
  }
  &__img_2 {
    padding: 4px 0;
  }
}
</style>

<style lang="scss">

</style>
