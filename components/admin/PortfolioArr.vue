<!-- eslint-disable vue/no-unused-vars -->
<template>
  <table v-if="!preload" class="admin">
    <thead>
      <tr class="admin__row admin__row_header">
        <th
          v-for="item in headers"
          :key="item.key"
          class="admin__item admin__item_header"

          @mousedown="moveStart(item.key)"
          @mouseup="moveStop(item.key)"
        >
          {{ item.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="portfolio in portfolioArr"
        :key="portfolio.id"
        v-ripple
        class="admin__row"
        @click="!$event.target.classList.contains('admin__link_td') && goPortfolio(portfolio.id)"
      >
        <td v-for="(item, index) in headers" :key="`${index}${item.key}`" class="admin__item">
          <nuxt-link
            v-if="item.key === 'id'"
            :class="{ 'admin__link': item.key === 'id' }"
            :to="`admin/${portfolio[item.key]}`"
          >
            {{ portfolio[item.key] }}
          </nuxt-link>
          <template v-if="portfolio[item.key] === false">
            <svg
              class="admin__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M24 44C21.2667 44 18.6833 43.475 16.25 42.425C13.8167 41.375 11.6917 39.9417 9.875 38.125C8.05833 36.3083 6.625 34.1833 5.575 31.75C4.525 29.3167 4 26.7333 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05833 11.65 9.875 9.85C11.6917 8.05 13.8167 6.625 16.25 5.575C18.6833 4.525 21.2667 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7333 43.475 29.3167 42.425 31.75C41.375 34.1833 39.95 36.3083 38.15 38.125C36.35 39.9417 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44ZM24 41C28.7333 41 32.75 39.3417 36.05 36.025C39.35 32.7083 41 28.7 41 24C41 19.2667 39.35 15.25 36.05 11.95C32.75 8.65 28.7333 7 24 7C19.3 7 15.2917 8.65 11.975 11.95C8.65833 15.25 7 19.2667 7 24C7 28.7 8.65833 32.7083 11.975 36.025C15.2917 39.3417 19.3 41 24 41Z"
                fill="#EA0C0E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M33.0297 17.2537L30.776 15L24.0148 21.7611L17.2537 15L15 17.2537L21.7611 24.0148L15 30.776L17.2537 33.0297L24.0148 26.2685L30.776 33.0297L33.0297 30.776L26.2686 24.0148L33.0297 17.2537Z"
                fill="#EA0C0E"
              />
            </svg>
          </template>
          <template v-if="portfolio[item.key] === true">
            <svg
              class="admin__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M21.05 33.1L35.2 18.95L32.9 16.7L21.05 28.55L15.05 22.55L12.8 24.8L21.05 33.1ZM24 44C21.2667 44 18.6833 43.475 16.25 42.425C13.8167 41.375 11.6917 39.9417 9.875 38.125C8.05833 36.3083 6.625 34.1833 5.575 31.75C4.525 29.3167 4 26.7333 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05833 11.65 9.875 9.85C11.6917 8.05 13.8167 6.625 16.25 5.575C18.6833 4.525 21.2667 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7333 43.475 29.3167 42.425 31.75C41.375 34.1833 39.95 36.3083 38.15 38.125C36.35 39.9417 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44ZM24 41C28.7333 41 32.75 39.3417 36.05 36.025C39.35 32.7083 41 28.7 41 24C41 19.2667 39.35 15.25 36.05 11.95C32.75 8.65 28.7333 7 24 7C19.3 7 15.2917 8.65 11.975 11.95C8.65833 15.25 7 19.2667 7 24C7 28.7 8.65833 32.7083 11.975 36.025C15.2917 39.3417 19.3 41 24 41Z"
                fill="#07B021"
              />
            </svg>
          </template>
          <div
            v-if="item.key === 'country_short' && portfolio[item.key]"
            class="admin__icon"
          >
            <BaseCountryIcon
              :country-code="portfolio['country_short']"
            />
          </div>
          <a v-if="item.key === 'admin_link_portfolio'" class="admin__link admin__link_td" :href="portfolio[item.key]" target="_blank">
            Ссылка на портфель
          </a>
          <template v-if="item.key === 'created_at' || item.key === 'updated_at'">
            {{ createdDate(portfolio[item.key]) }}
          </template>
          <template
            v-else-if="portfolio[item.key] !== true && portfolio[item.key] !== false && item.key !== 'id' && item.key !== 'country_short' && item.key !== 'admin_link_portfolio'"
          >
            {{ portfolio[item.key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { createdDate } from '~/helpers/crearedDate'
export default {
  name: 'PortfolioArr',
  data () {
    return {
      defaultHeaders: [
        {
          key: 'id',
          name: 'ID портфеля'
        },
        {
          key: 'admin_link_portfolio',
          name: 'Ссылка на портфель'
        },
        {
          key: 'param_generate',
          name: 'Генерация параметра'
        },
        {
          key: 'created_at',
          name: 'Создан'
        },
        {
          key: 'updated_at',
          name: 'Обновлен'
        },
        {
          key: 'time_without_update',
          name: 'Время без обновления'
        },
        {
          key: 'country_short',
          name: 'Иконка'
        },
        {
          key: 'init_field',
          name: 'Инициирующее значение'
        },
        {
          key: 'init_value',
          name: 'Название'
        },
        {
          key: 'init_value_rus',
          name: 'Название на русском'
        },
        {
          key: 'autoupdate_list_company',
          name: 'Компании из списка автообновлений'
        },
        {
          key: 'hot_for_ru',
          name: 'Горячий для русского'
        },
        {
          key: 'hot_for_en',
          name: 'Горячий для английского'
        },
        {
          key: 'version',
          name: 'Версия'
        },
        {
          key: 'unloading',
          name: 'Выгрузок'
        }
      ],
      startId: '',
      preload: false
    }
  },
  computed: {
    headers () {
      const storedHeaders = localStorage.getItem('headers')
      if (storedHeaders) {
        return JSON.parse(storedHeaders)
      } else {
        // Если заголовки отсутствуют в LocalStorage, используйте заголовки по умолчанию
        return this.defaultHeaders
      }
    },
    portfolioArr () {
      return this.$store.getters['admin/getPortfolioInfoArrFilter']
    }
  },
  methods: {
    createdDate (data) {
      return createdDate(data)
    },
    goPortfolio (id) {
      this.$router.push(`admin/${id}`)
    },
    moveStop (key) {
      this.preload = true
      if (key && this.startId && key !== this.startId) {
        const index1 = this.headers.findIndex(e => e.key === this.startId)
        const index2 = this.headers.findIndex(e => e.key === key)
        if (index1 !== -1 && index2 !== -1) {
          const temp = this.headers[index1]
          this.headers[index1] = this.headers[index2]
          this.headers[index2] = temp
        }
        localStorage.setItem('headers', JSON.stringify(this.headers))
      }
      this.preload = false
      this.startId = ''
    },
    moveStart (key) {
      this.startId = key
    }
  }
}
</script>

<style lang="scss" scoped>
.admin {
  position: relative;
  width: 100%;
  border-collapse: collapse !important;
  color: var(--color-text-1);
  box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
  &__row {
    border-bottom: 1px solid var(--color-border-1);
    cursor: pointer;
    @include transition;
    &:focus,
    &:hover {
      background-color: var(--color-bg-white-1);
    }

    &:active {
      background-color: var(--color-bg-white-1);
      border-bottom: var(--color-btn);
    }

    &_header {
      position: sticky;
      inset: 0 0 auto 0;
      z-index: 13;
      background-color: #fff;
      border-bottom: none;
      ::after {
        content: '';
        position: absolute;
        inset: auto 0 0 0;
        height: 2px;
        background-color: var(--color-border-1);
      }
      ::before {
        content: '';
        position: absolute;
        inset: 0 0 auto 0 ;
        height: 1px;
        background-color: var(--color-border-1);
      }
      &:focus,
      &:hover {
        background-color: transparent;
      }

      &:active {
        background-color: transparent;
      }
    }
  }

  &__item {
    padding: 5px sizeIncr(5, 10);
    max-height: 40px;
    text-align: start;
    @include transition;

    &_header {
      user-select: none;
      cursor: grab;
      text-align: left;

      &:hover {
        background-color: var(--color-bg-white-1);
      }

      &:active {
        background-color: var(--color-border-1);
      }
    }
    &_header-id {
      width: 200px;
    }
  }

  &__link {
    font-weight: 500;
    &_td {
      text-decoration: underline;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>
