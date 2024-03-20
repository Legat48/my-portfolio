<template>
  <div v-if="countryCode" class="d-flex icon">
    <picture class="icon__img">
      <!-- WebP image -->
      <source :srcset="webpUrl" type="image/webp">

      <!-- PNG image -->
      <img height="24" width="24" alt="" :src="pngUrl">
    </picture>
  </div>
</template>

<script>
export default {
  name: 'BaseCountryIcon',
  props: {
    countryCode: {
      type: String,
      default: ''
    }
  },
  computed: {
    webpUrl () {
      try {
        return require('@/assets/images/flags/' + this.countryCode + '.webp')
      } catch (e) {
        return ''
      }
    },
    pngUrl () {
      try {
        return require('@/assets/images/flags/' + this.countryCode + '.png')
      } catch (e) {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  border-radius: 100px;
  &__img {
    width: 24px;
    height: 24px;
  }
  width: 24px;
}
</style>
