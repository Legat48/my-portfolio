<template>
  <div v-if="!preload && !$store.getters.getLoading" style="width: 100%;" class="content">
    <div class="content__wrap">
      <div class="content__header">
        <div class="content__title">
          Добавить портфель
        </div>
        <BtnBack class="content__btn-back" :to-router="`/ru/admin`" />
      </div>
      <div class="content__content">
        <AdminSelect v-model="selectValue" :title="'Portfolio generate:'" :options="portfolioSelects" />
        <button v-ripple class="content__btn btn" color="white" @click.prevent="autoupdate_list_company = !autoupdate_list_company">
          <BaseCheckbox class="content__checkbox" :status="autoupdate_list_company" />
          <div class="content__btn-text">
            Авто-обновление списка компаний
          </div>
        </button>
        <button v-ripple class="content__btn btn" color="white" @click.prevent="hot_for_en = !hot_for_en">
          <BaseCheckbox class="content__checkbox" :status="hot_for_en" />
          <div class="content__btn-text">
            Горячий портфель для российских заказов
          </div>
        </button>
        <button v-ripple class="content__btn btn" color="white" @click.prevent="hot_for_ru = !hot_for_ru">
          <BaseCheckbox class="content__checkbox" :status="hot_for_ru" />
          <div class="content__btn-text">
            Горячий портфель для иностранных заказов
          </div>
        </button>
        <button v-ripple :class="{'content__btn-add_disabled' :!selectValue}" class="content__btn-add btn" @click="submit">
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
          Сохранить
        </button>
      </div>
    </div>
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>

<script>
import { portfolioURL } from '@/api'
const apiUrl = portfolioURL

export default {
  layout: 'block',
  data () {
    return {
      selectValue: '',
      preload: true,
      autoupdate_list_company: true,
      hot_for_en: false,
      hot_for_ru: false
    }
  },
  computed: {
    portfolioSelects () {
      return this.$store.getters['admin/getPortfolioSelects'].Country_of_Headquarters
    }
  },
  async mounted () {
    this.$store.commit('setLoading', false)

    this.preload = true
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
      // if (this.$store.state.admin.portfolioSelects === null) {
      //   await this.$store.dispatch('admin/portfolioSelects')
      // }
    }
    this.preload = false
  },
  methods: {
    async submit () {
      this.preload = true
      const data = {
        param_generate: this.selectValue,
        init_value: this.selectValue,
        init_field: 'Country_of_Headquarters',
        autoupdate_list_company: this.autoupdate_list_company,
        hot_for_en: this.hot_for_en,
        hot_for_ru: this.hot_for_ru
      }
      const config = {
        method: 'post',
        url: `${apiUrl}/portfolio/portfolio_admin/panel/`,
        data,
        headers: {
          Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
        }
      }

      try {
        const response = await this.$axios(config)
        if (response.status === 201) {
          this.preload = true
          await this.$store.dispatch('admin/portfolioInfoArr')
          this.$router.push(`${this.$i18n.locale === 'ru' ? '/ru/' : '/'}admin`)
          this.preload = false
        }
        // Обработка успешного ответа
      } catch (error) {
        console.error(error)
        // Обработка ошибки
      }
      this.preload = false
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  height: 100%;
  padding: 10px;
  background: url("~/assets/images/bg.svg") #F8F9FD no-repeat center center fixed;
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
    overflow-y: auto;
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: sizeIncr(8, 16);
    border-bottom: 1px solid var(--color-border-1);
  }
  &__title {
    font-weight: 600;
    font-size: sizeIncr(18, 24);
    line-height: 110%;
    color: var(--color-text-1);
  }
  &__btn-back {
    height: auto;
    border-radius: 7px;
    border: 1px solid var(--color-border-3);
    background-color: var(--color-bg-white-2);
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
  }
  &__btn {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 2px 20px;
    border: 1px solid var(--color-border-1);
    border-radius: 7px;
    height: 40px;
    font-weight: 500;
    color: var(--color-text-1);
    border-radius: 7px;
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.1);
  }
  &__checkbox {
    margin-right: 6px;
  }
  &__btn-add {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
    padding: 7px sizeIncr(5, 10);
    border-radius: 7px;
    font-weight: 500;
    color: var(--color-text-white-1);
    background-color: var(--color-btn);
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;
    &_disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    &:hover {
      background-color: var(--color-btn-3);
      box-shadow: 0 0 0 4px var(--color-btn);
      .content__icon-add {
        transform: rotate(90deg);
      }
    }
    &:active {
      background-color: var(--color-btn-3);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
      .content__icon-add {
        transform: rotate(180deg);
      }
    }
  }
  &__icon-add {
    @include transition;
    pointer-events: none;
    width: 24px;
    height: 24px;
  }
  &__search {
    margin-bottom: 10px;
    margin-left: 10px;
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
