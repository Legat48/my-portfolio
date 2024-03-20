<template>
  <header class="header" @click-outside="closeSearch">
    <div class="header__content">
      <BaseLogo />
      <SearchTools v-if="!block && !$store.getters.getLoading" class="header__search" />
      <!-- <SmallSearchTools /> -->
      <div class="header__options">
        <LocaleSwitcher class="header__options-item" />
        <BtnCartOpen v-if="!block" :to-router="`${$i18n.locale === 'ru' ? '/ru/' : '/'}`" class="header__options-item" />
      </div>
      <UserMenu />
      <div class="header__seo">
        <h1>
          {{ $t('seo.h1') }}
        </h1>
        <h2>
          {{ $t('seo.h2') }}
        </h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'BaseHeader',
  props: {
    block: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeSearch () {
      this.search = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid var(--color-border-1);
  box-shadow: 0px 4px 10px 0px #0000000D;
  &__content {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    width: 100%;
    max-width: #{$maxvw}px;
    height: var(--height-header);
    background-color: var(--color-bg-white-2);
  }
  &__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
  }
  &__options-item {
    margin-right: sizeIncr(10, 51);
  }
  &__search {
    margin: 0 0 0 auto;
    @media (min-width: 768px) {
      margin: 0 auto;
    }
  }
  &__seo {
    position: absolute;
    top: -1000px;
    z-index: -1;
  }
}
</style>
