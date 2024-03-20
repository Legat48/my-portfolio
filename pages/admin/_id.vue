<template>
  <div v-if="portfolio && !preload && !$store.getters.getLoading" class="portfolio-page">
    <BtnBack class="portfolio-page__btn-back" :to-router="`/ru/admin`" />
    <div class="portfolio-page__title">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7.85023 6.05008V4.10004C7.85023 3.51683 8.05424 3.02082 8.46226 2.61201C8.87028 2.204 9.36629 2 9.95032 2H14.0497C14.6337 2 15.1297 2.204 15.5377 2.61201C15.9458 3.02082 16.1498 3.51683 16.1498 4.10004V6.05008H19.8999C20.4831 6.05008 20.9792 6.25409 21.388 6.6621C21.796 7.07011 22 7.56612 22 8.15013V18.9C22 19.4832 21.796 19.9792 21.388 20.388C20.9792 20.796 20.4831 21 19.8999 21H4.10008C3.51686 21 3.02084 20.796 2.61202 20.388C2.20401 19.9792 2 19.4832 2 18.9V8.15013C2 7.56612 2.20401 7.07011 2.61202 6.6621C3.02084 6.25409 3.51686 6.05008 4.10008 6.05008H7.85023ZM9.95032 6.05008H14.0497V4.10004H9.95032V6.05008ZM19.8999 15.0743H15.0997V17.1251H8.90028V15.0743H4.10008V18.9H19.8999V15.0743ZM11.0004 15.0251H12.9996V13.0246H11.0004V15.0251ZM4.10008 12.9742H8.90028V10.9246H15.0997V12.9742H19.8999V8.15013H4.10008V12.9742Z" fill="#394D5E" />
      </svg>
      <div class="portfolio-page__title-text">
        Портфель под номером {{ id }} название {{ portfolio.init_value }}
      </div>
    </div>
    <div class="portfolio-page__table">
      <PortfolioTable v-if="portfolio && portfolio.json_portfolio" :id="id" />
    </div>
    <AdminModal :country="portfolio.init_value" />
  </div>
  <div v-else class="app__preloaded">
    <PreLoaded />
  </div>
</template>

<script>

export default {
  layout: 'block',
  data () {
    return {
      preload: true,
      id: this.$route.params.id,
      portfolio: null
    }
  },
  async mounted () {
    // eslint-disable-next-line camelcase
    this.$store.commit('setLoading', false)
    this.preload = true
    // авторизация через локалсторадж
    this.$store.commit('user/initializeStore')
    // если авторизован:
    if (window.$nuxt.$store.state.user.user.access) {
      await this.$store.dispatch('user/fetchProfileData')
      // загрузка покупок, сейчас во время открытия модалки будет работать
    }
    if (!this.$store.state.user?.profile?.isStaff && !this.$store.state.user?.profile?.isSuperuser) {
      this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}`)
    }
    if (this.$store.state.user?.profile?.isStaff || this.$store.state.user?.profile?.isSuperuser) {
      if (this.$store.state.admin.countryArr === null) {
        await this.$store.dispatch('admin/countryArr')
      }
      if (this.$store.state.admin.portfolioInfoArr === null) {
        await this.$store.dispatch('admin/portfolioInfoArr')
      }
      if (this.$store.state.admin.portfolioSelects === null) {
        await this.$store.dispatch('admin/portfolioSelects')
      }
    }
    if (this.$store.getters['admin/getPortfolioInfoArr']) {
      this.portfolio = this.$store.getters['admin/getPortfolioInfoArr'].find(e => e.id === this.id)
    }
    this.preload = false
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.portfolio-page {
  position: relative;
  padding: 15px;
  // height: 100%;
  &__btn-back {
    position: absolute;
    inset: 10px 10px auto auto;
    z-index: 2;
    height: auto;
    max-height: 45px;
    border-radius: 7px;
    border: 1px solid var(--color-border-3);
    background-color: var(--color-bg-white-2);
  }
  &_pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - var(--height-header));

  }

  &__title {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 62px;
    margin-right: sizeIncr(4, 8);
    margin-bottom: 10px;
    padding-right: 75px;
    font-size: sizeIncr(18, 22);
    font-weight: 600;
    line-height: 114%;
    color: var(--color-text-1);
    svg {
      width: 24px;
      height: 24px;
    }
  }
  &__title-text {
    max-width: calc(100% - 29px);
  }

  &__btn {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 2px 20px;
    border: 1px solid var(--color-border-3);
    border-radius: 7px;
    height: 40px;
    font-weight: 500;
    color: var(--color-text-1);
    border: 1px solid #3FA6FA;
    filter: drop-shadow(3px 0px 28px rgba(0, 0, 0, 0.01));
    border-radius: 7px;
  }

  &__checkbox {
    margin-right: 6px;
  }
  &__table {
    height: 100%;
    &_preload {

    }
  }
}
</style>
