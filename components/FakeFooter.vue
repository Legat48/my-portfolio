<template>
  <footer class="footer">
    <PaymentIcons class="footer__icons" />
    <a
      v-if="$i18n.locale==='ru'"
      v-ripple
      class="footer__link"
      href="https://ranks.pro/oferta-research"
      target="_blank"
    >
      {{ $t('docs.offer') }}
    </a>
    <a
      v-ripple
      class="footer__link"
      :href="($i18n.locale==='ru')?'https://ranks.pro/persondata':'https://www.ranksworld.com/personal-data'"
      target="_blank"
    >
      {{ $t('docs.privacyPolicy') }}
    </a>
    <a
      v-ripple
      class="footer__link"
      :href="($i18n.locale==='ru')?'https://ranks.pro/agreement':'https://www.ranksworld.com/privacy-policy'"
      target="_blank"
    >
      {{ $t('docs.personalData') }}
    </a>
    <a
      v-ripple
      class="footer__link"
      :href="($i18n.locale==='ru')?'https://ranks.pro/resplimitation':'https://www.ranksworld.com/limitation-of-liability'"
      target="_blank"
    >
      {{ $t('docs.limitationOfLiability') }}
    </a>
  </footer>
</template>

<script>
export default {
  name: 'FakeFooter'
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 3px;
  border-top: 2px solid var(--color-border-1);
  width: 100%;
  min-height: 35px;
  overflow-x: auto;
  overflow-y: hidden;
  @media (min-width: 920px) {
    justify-content: center;
  }
  &__icons {
    min-width: 124px;
  }
  &__link {
    padding: 0px 10px;
    font-family: "Inter", sans-serif !important;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 220% */
    text-decoration: none;
    white-space: nowrap;
    color: var(--color-text-1);
  }
}
</style>
