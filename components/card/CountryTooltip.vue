<template>
  <v-menu
    ref="menuRef"
    v-model="menu"
    color="#fff"
    bottom
    :close-on-content-click="true"
    close-delay="100"
    offset-x
    offset-y
  >
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        icon
        class="tooltip"
        v-on="on"
      >
        <svg
          class="tooltip__svg"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
        >
          <path d="M7.02435 12.4614H8.97565V7.5813H7.02435V12.4614ZM8 6.58636C8.30623 6.58636 8.56132 6.48408 8.76527 6.27951C8.96984 6.07556 9.07212 5.82047 9.07212 5.51424C9.07212 5.20801 8.96984 4.95292 8.76527 4.74897C8.56132 4.5444 8.30623 4.44212 8 4.44212C7.70663 4.44212 7.4546 4.5444 7.24391 4.74897C7.03323 4.95292 6.92788 5.20801 6.92788 5.51424C6.92788 5.80761 7.03016 6.05964 7.23473 6.27033C7.43868 6.48101 7.69377 6.58636 8 6.58636ZM8 16.5C6.89022 16.5 5.85025 16.2927 4.88011 15.878C3.91058 15.4634 3.06201 14.8926 2.3344 14.1656C1.60741 13.438 1.03659 12.5894 0.621957 11.6199C0.207319 10.6497 0 9.60978 0 8.5C0 7.37735 0.207319 6.33433 0.621957 5.37092C1.03659 4.40752 1.60741 3.56201 2.3344 2.8344C3.06201 2.10741 3.91058 1.53659 4.88011 1.12196C5.85025 0.707319 6.89022 0.5 8 0.5C9.12265 0.5 10.1657 0.707319 11.1291 1.12196C12.0925 1.53659 12.938 2.10741 13.6656 2.8344C14.3926 3.56201 14.9634 4.40752 15.378 5.37092C15.7927 6.33433 16 7.37735 16 8.5C16 9.60978 15.7927 10.6497 15.378 11.6199C14.9634 12.5894 14.3926 13.438 13.6656 14.1656C12.938 14.8926 12.0925 15.4634 11.1291 15.878C10.1657 16.2927 9.12265 16.5 8 16.5Z" fill="#3FA6FA" />
        </svg>
      </v-btn>
    </template>
    <div class="tooltip__wrap">
      <button v-ripple class="tooltip__close-btn" @click.prevent="menu = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1.39961 13.6496L0.349609 12.5996L5.94961 6.99961L0.349609 1.39961L1.39961 0.349609L6.99961 5.94961L12.5996 0.349609L13.6496 1.39961L8.04961 6.99961L13.6496 12.5996L12.5996 13.6496L6.99961 8.04961L1.39961 13.6496Z" fill="#7F9DC6" />
        </svg>
      </button>
      <div class="tooltip__title">
        {{ localizedCountryNameParent }}  {{ count ? `(${count})`: '' }}
      </div>
      <template v-if="country.children && country.children.length">
        <div v-for="item in countryGatherer(country.children)" :key="item.name" class="tooltip__item">
          <BaseCountryIcon v-if="item.children && item.children.length > 0" :item-code="item.name" class="card__icon" />
          <BaseitemIcon v-if="!!item.childrenInCustom && !item.children" :item-code="replaceOthers(item.name)" class="card__icon" />
          <BaseCountryIcon v-if="'short' in item && !item.children" :country-code="item.short" class="tooltip__icon" />
          <div class="tooltip__text">
            {{ localizedCountryName(item) }}
          </div>
        </div>
      </template>
      <template v-else-if="country.childrenInCustom && country.childrenInCustom.length">
        <div v-for="item in country.childrenInCustom" :key="item.name" class="tooltip__item">
          <BaseCountryIcon v-if="'short' in item && !item.childrenInCustom" :country-code="item.short" class="tooltip__icon" />
          <div class="tooltip__text">
            {{ localizedCountryName(item) }}
          </div>
        </div>
      </template>
    </div>
  </v-menu>
</template>

<script>
import EventBus from '~/helpers/event-bus.js'

export default {
  name: 'CompaniesTooltip',
  props: {
    country: {
      type: Object,
      required: true
    },
    count: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data () {
    return {
      menu: false
    }
  },
  computed: {
    localizedCountryNameParent () {
      const locale = this.$nuxt.$i18n.locale
      if (locale === 'en') {
        return this.country.name
      } else if (locale === 'ru') {
        return this.country.nameRus
      } else {
        return this.country.name
      }
    }
  },
  mounted () {
    EventBus.$on('scrollTracking', this.handleScroll)
  },
  beforeDestroy () {
    // Отписываемся от события перед уничтожением компонента
    EventBus.$off('scrollTracking')
  },
  methods: {
    replaceOthers (name) {
      return name.replace(/\sOthers$/, '')
    },
    localizedCountryName (country) {
      const locale = this.$nuxt.$i18n.locale
      if (locale === 'en') {
        return country.name
      } else if (locale === 'ru') {
        return country.nameRus
      } else {
        return country.name
      }
    },
    countryGatherer (countries) {
      const gather = (countries) => {
        let result = []
        for (const country of countries) {
          if (
            (!country.children || country.children.length === 0) &&
          (!country.childrenInCustom || country.childrenInCustom.length === 0)
          ) {
            result.push(country)
          } else {
            if (country.children && country.children.length > 0) {
              result = result.concat(gather(country.children))
            }
            if (country.childrenInCustom && country.childrenInCustom.length > 0) {
              result = result.concat(gather(country.childrenInCustom))
            }
          }
        }
        return result
      }

      return gather(countries)
    },
    // Обработчик события scroll
    handleScroll () {
      // Получаем элемент меню
      const menuElement = this.$refs.menuRef.$el

      // Получаем координаты верхней и нижней границы меню
      const menuTop = menuElement.offsetTop
      const menuBottom = menuTop + menuElement.offsetHeight

      // Получаем координаты верхней и нижней границы вьюпорта (окна просмотра)
      const viewportTop = window.scrollY
      const viewportBottom = viewportTop + window.innerHeight

      // Проверяем, находится ли скролл в пределах меню
      const scrollInsideMenu = viewportTop >= menuTop && viewportBottom <= menuBottom

      // Если скролл находится внутри меню, не закрываем его
      if (scrollInsideMenu) {
        this.menu = true
      } else {
        // Если скролл за пределами меню, закрываем его
        this.menu = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip {
  width: sizeIncr(20, 24);
  height: sizeIncr(20, 24);
  &__wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 10px;
    max-width: 338px;
    min-width: 238px;
    max-height: 300px;
    overflow-y: scroll;
    box-shadow: 3px 0px 28px 0px rgba(0, 0, 0, 0.01);
    background-color: var(--color-bg-white-2);
    opacity: 1 !important;
  }
  &__title {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 500;
    max-width: calc(100% - 30px);
    color: var(--color-text-1);
  }
  &__close-btn {
    position: absolute;
    inset: 10px 10px auto auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 20px;
    svg {
      width: 14px;
      height: 14px;
    }
  }
  &__icon {
    margin-right: 13px;
    width: 24px;
    height: 24px;
  }
  &__item {
    display: flex;
    align-items: center;
    height: 40px;
  }
  &__text {
    font-weight: 500;
    font-size: sizeIncr(14, 16);
    line-height: 17px;
    color: var(--color-text-1);
  }
  &__svg {
    width: 16px;
    height: 16px;
  }
}
</style>
<style>
  .tooltip__wrap {
    display: block !important;
    opacity: 1 !important;
  }
</style>
