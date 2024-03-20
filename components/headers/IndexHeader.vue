<template>
  <header class="header header_index" @click-outside="closeSearch">
    <div class="header__content">
      <div class="header__wrap header__wrap_top">
        <IndexLogo class="header__logo" />
        <h1 class="header__title">
          {{ $t('seo.h1') }}
        </h1>
      </div>
      <div class="header__wrap">
        <HelpModalBtn class="header__help-btn" />
        <SearchTools v-if="!block && !$store.getters.getLoading" class="header__search" />
        <!-- <SmallSearchTools /> -->
        <div class="header__options">
          <LocaleSwitcher class="header__options-item" />
          <BtnCartOpen
            v-if="!block"
            :to-router="`${$i18n.locale === 'ru' ? '/ru/' : '/'}`"
            class="header__options-item"
          />
        </div>
        <UserMenu />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'IndexHeader',
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
    gap: 10px;
    width: 100%;
    max-width: #{$maxvw}px;
    height: var(--height-index-header);
    background-color: var(--color-bg-white-2);
    @media (max-width: 1042px) {
      flex-direction: column;
      justify-content: space-between;
      padding: 0;
      gap: 0;
    }
  }

  &__wrap {
    display: flex;
    align-items: center;
    gap: sizeIncr(10, 44);
    &_top {
      flex-direction: column;
      justify-content: space-between;
      align-items: start;
      gap: 0;

      @media (max-width: 1042px) {
        flex-direction: row;
        align-items: center;
        gap: 20px;
        border-bottom: 1px solid var(--color-border-1);
      }
    }
    @media (max-width: 1042px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        width: 100%;
        height: 50%;
      }
  }

  &__logo {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    width: sizeIncr(71, 197);
  }

  &__title {
    font-size: 14px;
    font-weight: 700;
  }

  &__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1042px) {
    }
  }

  &__options-item {
    margin-right: sizeIncr(10, 51);
  }

  &__search {
    margin: 0 0 0 auto;
    @media (max-width: 1042px) {
      margin: 0;
    }
  }
}</style>
