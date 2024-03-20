<template>
  <div v-if="!preload && !$store.getters.getLoading" style="width: 100%;" class="content">
    <div class="content__wrap">
      <div class="content__header">
        <div class="content__title">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7.85023 6.05008V4.10004C7.85023 3.51683 8.05424 3.02082 8.46226 2.61201C8.87028 2.204 9.36629 2 9.95032 2H14.0497C14.6337 2 15.1297 2.204 15.5377 2.61201C15.9458 3.02082 16.1498 3.51683 16.1498 4.10004V6.05008H19.8999C20.4831 6.05008 20.9792 6.25409 21.388 6.6621C21.796 7.07011 22 7.56612 22 8.15013V18.9C22 19.4832 21.796 19.9792 21.388 20.388C20.9792 20.796 20.4831 21 19.8999 21H4.10008C3.51686 21 3.02084 20.796 2.61202 20.388C2.20401 19.9792 2 19.4832 2 18.9V8.15013C2 7.56612 2.20401 7.07011 2.61202 6.6621C3.02084 6.25409 3.51686 6.05008 4.10008 6.05008H7.85023ZM9.95032 6.05008H14.0497V4.10004H9.95032V6.05008ZM19.8999 15.0743H15.0997V17.1251H8.90028V15.0743H4.10008V18.9H19.8999V15.0743ZM11.0004 15.0251H12.9996V13.0246H11.0004V15.0251ZM4.10008 12.9742H8.90028V10.9246H15.0997V12.9742H19.8999V8.15013H4.10008V12.9742Z" fill="#394D5E" />
          </svg>
          Все портфели
        </div>
        <BtnBack class="content__btn" :to-router="`/ru`" />

        <!-- <nuxt-link v-ripple :to="'admin/new'" class="content__btn btn">
          <svg
            class="content__icon-add"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path d="M14 2V26" stroke="white" stroke-width="2.4" stroke-linecap="round" />
            <path d="M2 14L26 14" stroke="white" stroke-width="2.4" stroke-linecap="round" />
          </svg>
          Добавить
        </nuxt-link> -->
      </div>
      <div class="content__wrap-top">
        <AdminSearch v-model="searchPortfolio" class="content__search" />
        <div v-if="$store.getters['admin/getPortfolioInfoArrFilter']" class="content__count">
          Всего портфелей: {{ $store.getters['admin/getPortfolioInfoArrFilter'].length }}
        </div>
        <button
          class="btn content__btn"
          :class="{
            'content__btn_update-true' : updateTrue,
            'content__btn_update-error' : updateError,
          }"
          @click="goToUpdate()"
        >
          Авто-обновить все портфели (ожидание около минуты)
        </button>
      </div>
      <div class="content__content">
        <PortfolioArr />
      </div>
    </div>
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>

<script>
export default {
  layout: 'block',
  data () {
    return {
      preload: true,
      updateTrue: false,
      updateError: false
    }
  },
  computed: {
    searchPortfolio: {
      get () {
        return this.$store.getters['admin/getPortfolioSearch']
      },
      set (value) {
        this.$store.commit('admin/setPortfolioSearch', value)
      }
    }
  },
  async mounted () {
    this.$store.commit('setLoading', false)
    this.preload = true
    // авторизация через локалсторадж
    await this.$store.commit('user/initializeStore')
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
    this.preload = false
  },
  methods: {
    async goToUpdate () {
      this.updateTrue = false
      this.updateError = false
      const startAns = await this.$store.dispatch('admin/portfoliosAllUpdate')

      if (startAns) {
        this.preload = true

        // Ограничение выполнения до 40 секунд
        const timeout = 60 * 1000 // в миллисекундах
        const startTime = new Date().getTime()

        // Зацикливаем выполнение функции
        while (true) {
          const checkUpdateResult = await this.$store.dispatch('admin/checkAllUpdate' /* Передайте необходимые данные */)

          if (checkUpdateResult) {
          // Пометить, что обновление завершено, и выйти из цикла
            await this.$store.dispatch('admin/portfolioInfoArr')
            this.updateTrue = true
            this.preload = false
            break
          }

          // Проверка на превышение времени выполнения
          const currentTime = new Date().getTime()
          if (currentTime - startTime > timeout) {
            console.warn('Превышено время выполнения (40 секунд). Прерывание цикла.')
            this.updateError = true
            this.preload = false
            break
          }

          // Добавить небольшую задержку перед следующей итерацией цикла (например, 1 секунда)
          await new Promise(resolve => setTimeout(resolve, 3000))
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  // flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  background: url("~/assets/images/bg.svg") #F8F9FD no-repeat center center fixed;
  overflow: auto;
  &_pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - var(--height-header));
  }
  &__wrap {
    border-radius: 7px;
    background-color: var(--color-bg-white-2);
    min-width: 40vw;
    min-height: 60vh;
    overflow: hidden;
  }
  &__wrap-top {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 10px;
    padding: 10px sizeIncr(18, 36);
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: sizeIncr(16, 16);
    border-bottom: 1px solid var(--color-border-1);
  }
  &__count {
    font-weight: 500;
    color: var(--color-text-1);
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    height: 100%;
    max-height: calc(100vh - 90px - 105px - 20px);
    overflow: auto;
  }
  &__title {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: sizeIncr(18, 24);
    line-height: 110%;
    color: var(--color-text-1);
    svg {
      margin-right: 4px;
      width: 24px;
      height: 24px;
    }
  }
  &__btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 7px sizeIncr(5, 10);
    max-height: 45px;
    border: 1px solid #3FA6FA;
    border-radius: 7px;
    font-weight: 500;
    color: var(--color-text-1);
    background-color: transparent;
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;
    &:hover {
      border-color: var(--color-btn-3);
      box-shadow: 0 0 0 4px var(--color-btn);
    }
    &:active {
      border-color: var(--color-btn-3);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }
    &_update-true {
      border: 1px solid #07B021;
      color: #fff;
      background-color: #07B021;
    }
    &_update-error {
      border: 1px solid #EA0C0E;
      color: #fff;
      background-color: #EA0C0E;
    }
  }
  &__icon-add {
    @include transition;
    pointer-events: none;
    width: 24px;
    height: 24px;
  }
  &__search {
  }
}
.wrap-preloader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
