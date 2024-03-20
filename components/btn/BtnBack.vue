<template>
  <nuxt-link v-ripple :to="toRouter" button class="btn-back btn">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 16L4 10L10 4L11.062 5.062L6.875 9.25H16V10.75H6.875L11.062 14.938L10 16Z" fill="#3FA6FA" />
    </svg>
    <span>
      {{ $t('buttons.return') }}
    </span>
  </nuxt-link>
</template>

<script>

export default {
  name: 'BtnBack',
  props: {
    toRouter: {
      type: String,
      default: '/'
    }
  },
  data () {
    return {

    }
  },
  computed: {
  },
  methods: {
  }

}
</script>

<style lang='scss' scoped>
.btn-back {
  display: flex;
  align-items: center;
  height: 100%;
  padding: sizeIncr(8, 20) sizeIncr(16, 40);
  font-size: sizeIncr(14, 16);
  font-weight: 600;
  line-height: 110%;
  color: var(--color-text-1);
  svg {
    width: 20px;
    height: 20px;
  }
  @media (max-width: 768px) {
    justify-content: center;
    padding: sizeIncr(16, 40) 0;
    width: 70px;
    span {
      display: none;
    }
  }
}
</style>
