<template>
  <transition name="transition-dialog">
    <div class="admin-dialog" :class="{'admin-dialog_open' : dialogOpen}">
      <div class="admin-dialog__wrap">
        <div v-if="dialogOpen" class="admin-dialog__header">
          <div class="admin-dialog__title-wrap">
            <h2 class="admin-dialog__title">
              {{ oldItem !== 'new' ? `Изменение компании  ${oldItem.Company_Common_Name ? oldItem.Company_Common_Name : oldItem.RIC} ` : 'Добавление компании' }}
            </h2>
          </div>
          <v-btn
            class="admin-dialog__close"
            icon
            @click.prevent="dialogOpen = false"
          >
            <v-icon color="#6D8DB9">
              mdi-close
            </v-icon>
          </v-btn>
        </div>
        <div class="admin-dialog__content">
          <div class="admin-dialog__search-wrap">
            <AdminSearch v-model="search" />
          </div>
          <div class="admin-dialog__wrap-btn-filter">
            <button
              v-for="group in mCapGroups"
              :key="group"
              v-ripple
              class="admin-dialog__btn-filter"
              :class="{ 'admin-dialog__btn-filter_active': mCapGroupState[group] }"
              @click="toggleGroupState(group)"
            >
              {{ group }}
            </button>
          </div>
          <div class="admin-dialog__company-list">
            <button v-for="(item, index) of filteredItems" :key="index" v-ripple class="admin-dialog__company-item" @click="newItem = item">
              {{ `${item.Company_Common_Name } | ${item.RIC} (${item.Country_of_Headquarters})` }}
            </button>
          </div>
          <div class="admin-dialog__footer">
            <button v-if="oldItem !== 'new'" v-ripple class="admin-dialog__btn-submit admin-dialog__btn-submit_del btn" @click="del()">
              Удалить
            </button>
            <button v-ripple :class="{'admin-dialog__btn-submit_disabled' : !newItem}" class="admin-dialog__btn-submit admin-dialog__btn-submit_add btn" @click="add()">
              Добавить
            </button>
            <div class="admin-dialog__text">
              {{ oldItem !== 'new' ? 'Изменить на:' : 'Добавить: ' }} {{ newItem ? ` ${newItem.Company_Common_Name } | ${newItem.RIC}` : '' }}
            </div>
            <button v-if="oldItem !== 'new'" v-ripple :class="{'admin-dialog__btn-submit_disabled' : !newItem}" class="admin-dialog__btn-submit btn" @click="submit()">
              Применить
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import EventBus from '~/helpers/event-bus.js'
import { portfolioURL } from '@/api'
const apiUrl = portfolioURL

export default {
  name: 'AdminModal',
  props: {
    country: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      newItem: null,
      search: '',
      mCapGroupState: {
        nan: false,
        Средние: true,
        Крупнейшие: true,
        Крупные: true,
        Нано: false,
        Микро: false,
        Малые: false
      },
      scrollPosition: 0 // Переменная для хранения текущей позиции прокрутки
    }
  },
  computed: {
    mCapGroups () {
      return ['nan', 'Средние', 'Крупнейшие', 'Крупные', 'Нано', 'Микро', 'Малые']
    },
    filteredItems () {
      const filteredByCountry = this.companyArr.filter(item => item.Country_of_Headquarters === this.country)
      const restOfCompanies = this.companyArr.filter(item => item.Country_of_Headquarters !== this.country)
      let newArr = filteredByCountry.concat(restOfCompanies)
      newArr = newArr.filter(item => this.mCapGroupState[item.MCap_group])
      if (this.search.length > 0) {
        const keyword = this.search.toLowerCase()
        return newArr.filter(item =>
          (item.Company_Common_Name && item.Company_Common_Name.toLowerCase().includes(keyword)) ||
        (item.RIC && item.RIC.toLowerCase().includes(keyword))
        )
      } else {
        return newArr
      }
    },
    companyArr () {
      return this.$store.getters['admin/getCountryArr']
    },
    oldItem () {
      return this.$store.getters['admin/getDialogOpenItem']
    },
    dialogOpen: {
      get () {
        return this.$store.getters['admin/getDialogOpen']
        // return true
      },
      set () {
        this.$store.commit('admin/closeDialog')
      }
    }
  },
  watch: {
    // блокировка скролла страницы
    dialogOpen (newVal) {
      if (newVal) {
        this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        this.disableScroll()
      } else {
        setTimeout(this.enableScroll, 300)
        this.restoreScrollPosition()
      }
    },
    // Сохраняем состояние кнопок при изменении
    mCapGroupState: {
      handler () {
        this.saveGroupState()
      },
      deep: true
    }
  },
  mounted () {
  // Загружаем состояние кнопок при загрузке компонента
    this.loadGroupState()
  },
  methods: {
    toggleGroupState (group) {
      // Переключаем состояние группы
      this.mCapGroupState[group] = !this.mCapGroupState[group]
    },
    saveGroupState () {
    // Сохраняем состояние кнопок в локальное хранилище
      localStorage.setItem('mCapGroupState', JSON.stringify(this.mCapGroupState))
    },
    loadGroupState () {
    // Загружаем состояние кнопок из локального хранилища
      const savedState = localStorage.getItem('mCapGroupState')
      if (savedState) {
        this.mCapGroupState = JSON.parse(savedState)
      }
    },
    disableScroll () {
      document.body.style.overflow = 'visible'
      // document.body.style.position = 'fixed'
      document.body.style.top = `-${this.scrollPosition}px`
      document.body.style.width = '100%'
    },
    enableScroll () {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    },
    restoreScrollPosition () {
      setTimeout(() => {
        window.scrollTo(0, this.scrollPosition)
      }, 0)
    },
    async submit () {
      const data = new FormData()
      data.append('ric', this.newItem.RIC) // Готовим новый RIC к отправке на сервер
      const config = {
        method: 'post',
        url: `${apiUrl}/portfolio/portfolio_admin/get_data_cmpany/`,
        data,
        headers: {
          Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
        }
      }

      try {
        const response = await this.$axios(config)
        if (response.status === 200) {
          const data = response.data
          EventBus.$emit('modalDataChanged', data, this.oldItem.RIC)
          this.dialogOpen = false
        }
        // Обработка успешного ответа
      } catch (error) {
        console.error(error)
        // Обработка ошибки
      }
    },
    del () {
      EventBus.$emit('modalDataChanged', 'del', this.oldItem.RIC)
      this.dialogOpen = false
    },
    async add () {
      const data = new FormData()
      data.append('ric', this.newItem.RIC) // Готовим новый RIC к отправке на сервер
      const config = {
        method: 'post',
        url: `${apiUrl}/portfolio/portfolio_admin/get_data_cmpany/`,
        data,
        headers: {
          Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
        }
      }
      try {
        const response = await this.$axios(config)
        if (response.status === 200) {
          const data = response.data
          EventBus.$emit('modalDataChanged', 'add', data)
          this.dialogOpen = false
        }
        // Обработка успешного ответа
      } catch (error) {
        console.error(error)
        // Обработка ошибки
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-dialog {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: sizeIncr(65, 94);
  height: 100vh;
  color: var(--color-text-1);
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  z-index: -1;
  pointer-events: none;
  &_open {
    z-index: 202;
    pointer-events: all;
  }
  &__wrap {
    position: relative;
    z-index: 204;
    padding: 0 !important;
    overflow: hidden;
    min-width: #{$minvw}px;
    max-height: 100%;
    border: 2px solid var(--color-border-1);
    border-radius: 7px;
    background-color: var(--color-bg-white-2);
    box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: sizeIncr(18, 36);
    border-bottom: 1px solid var(--color-border-1);
  }
  &__title-wrap {
    display: flex;
    padding-right: 10px;
  }
  &__title-icon {
    margin-right: 6px;
  }
  &__title {
    font-weight: 600;
    font-size: sizeIncr(18, 24);
    line-height: 110%;
    color: var(--color-text-1);
  }
  &__close {
    width: 14px !important;
    height: 14px !important;
    min-width: none !important;
  }
  &__content {
    max-height: 78vh;
    min-width: 330px;
    max-width: 1230px;
    overflow-y: auto;
    &_no-min-height {
      min-height: auto;
    }
  }
  &__search-wrap {
    padding: 5px;
    border-bottom: 1px solid var(--color-border-1);
  }
  &__wrap-btn-filter {
    display: flex;
    gap: 6px;
    padding: 8px;
  }
  &__btn-filter {
    display: flex;
    align-items: center;
    border-radius: 100px;
    padding: 0 8px;
    height: 30px;
    color: var(--color-text-1);
    background-color: var(--color-btn-4);
    @include transition;
    &_active {
      color: var(--color-text-white-1);
      background-color: var(--color-btn);
    }
  }
  &__company-list {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 300px;
  }
  &__company-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--color-border-1);
    width: 100%;
    padding: 5px 10px;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-top: 1px solid var(--color-border-1);
  }
  &__btn-submit {
    padding: 7px sizeIncr(5, 10);
    border-radius: 7px;
    color: var(--color-bg-white-1);
    background-color: var(--color-btn);
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;
    &_disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    &_del {
      background-color: #db2124;
      &:hover {
        background-color: #e70004;
        box-shadow: 0 0 0 4px var(#db2124) !important;
      }
      &:active {
        background-color: #EA0C0E;
        box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
      }
    }
  }
}

.transition-dialog-enter-active,
.transition-dialog-leave-active {
  @include transition
}

.transition-dialog-enter,
.transition-dialog-leave-to {
  opacity: 0;
}
</style>
