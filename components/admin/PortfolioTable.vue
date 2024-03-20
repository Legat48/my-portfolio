<template>
  <div v-if="!preload" class="admin">
    <div class="admin__btn-wrap">
      <!-- <button
        v-ripple
        class="admin__btn-submit admin__btn-submit_del btn"
        color="white"
        :class="{'admin__btn-submit_disabled' :deleteBlock}"
        @click.prevent="delPortfolio()"
      >
        <svg
          class="admin__icon-save"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_6_12267)">
            <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8.46 11.88L9.87 10.47L12 12.59L14.12 10.47L15.53 11.88L13.41 14L15.53 16.12L14.12 17.53L12 15.41L9.88 17.53L8.47 16.12L10.59 14L8.46 11.88ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#fff" />
          </g>
          <defs>
            <clipPath id="clip0_6_12267">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        Удалить
      </button> -->
      <button
        v-ripple
        class="admin__btn-submit btn"
        color="white"
        :class="{ 'admin__btn-submit_disabled': saveBlock }"
        @click.prevent="submit()"
      >
        <svg
          class="admin__icon-save"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 12V19H5V12H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V12H19ZM13 12.67L15.59 10.09L17 11.5L12 16.5L7 11.5L8.41 10.09L11 12.67V3H13V12.67Z"
            fill="#fff"
          />
        </svg>
        Сохранить изменения
      </button>
    </div>
    <div class="admin__top-wrap">
      <div class="admin__top-list">
        <div
          v-for="(item, key, index) of dataPortfolio"
          :key="index"
          class="admin__top-item"
          :class="{
            'admin__top-item_dn': typeof item !== 'boolean'
          }"
        >
          <template v-if="typeof item === 'boolean'">
            <button
              v-ripple
              class="admin__btn btn"
              :class="{
                'admin__btn_active': item
              }"
              color="white"
              @click.prevent="dataPortfolio[key] = !item"
            >
              <BaseCheckbox class="admin__checkbox" :status="item" />
              <div v-if="texts[key]" class="admin__btn-text">
                {{ texts[key] }}
              </div>
              <div v-else class="admin__btn-text">
                {{ item }}
              </div>
            </button>
          </template>
        </div>
      </div>
      <button v-ripple class="admin__btn-reset btn" @click="resetAll()">
        Автообновление портфеля
      </button>
      <div class="admin__count" :class="{'admin__count_alert': countShare !== 100}">
        Сумма рекомендуемых долей в портфеле: {{ countShare }}%
      </div>
      <div v-if="dataPortfolioArr" class="admin__count">
        Компаний в портфеле: {{ dataPortfolioArr.length }}/{{ dataPortfolio.json_recommended_companies.length }}(рек.)
      </div>
    </div>
    <div class="admin__wrap-table">
      <table v-if="dataPortfolioArr !== null && !preload" class="admin__table">
        <thead>
          <tr class="admin__row admin__row_header">
            <th
              v-for="(item, index) in headers"
              :key="item.key"
              class="admin__item admin__item_header"
              :class="{ 'admin__item_fix': item.key === 'Company_Common_Name' }"
              @mousedown="moveStart(item.key)"
              @mouseup="moveStop(item.key)"
            >
              <div v-if="index === 0" class="admin__table-header-wrap">
                <button v-ripple class="admin__add btn" @click="openModal('new')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                    <path d="M19.5 2V37" stroke="#fff" stroke-width="3.13333" stroke-linecap="round" />
                    <path d="M2 19.5L37 19.5" stroke="#fff" stroke-width="3.13333" stroke-linecap="round" />
                  </svg>
                </button>
                <span>
                  {{ item.name }}
                </span>
              </div>
              <template v-else>
                {{ item.name }}
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(portfolio, indexRow) in dataPortfolioArr" :key="indexRow" class="admin__row" :class="{'admin__row_update' : !!noInputArr.find(e => e === portfolio['RIC'])}">
            <td
              v-for="(item, indexItem) in headers"
              :key="`${indexItem}${item.key}`"
              class="admin__item"
              :class="{ 'admin__item_fix': item.key === 'Company_Common_Name' }"
            >
              <div
                class="admin__item-wrap"
                :class="{
                  'admin__item-wrap_no-input': portfolioSelects.hasOwnProperty(item.key),
                  'admin__item-wrap_update': item.key !== 'RIC' && checkBtnUpdate(portfolio['RIC'], item.key),
                  'admin__item-wrap_RIC': item.key === 'RIC',
                  'admin__item-wrap_change': item.key !== 'RIC' && isValueChanged(indexRow, item.key)
                }"
              >
                <template v-if="item.key === 'RIC'">
                  <button v-ripple class="admin__item-btn btn" :class="{'admin__item-btn_not-rec' : !dataPortfolio.json_recommended_companies.find(e => e === portfolio[item.key])}" @click="openModal(portfolio)">
                    {{ portfolio[item.key] }}
                  </button>
                </template>
                <template v-else>
                  <template v-if="portfolioSelects.hasOwnProperty(item.key)">
                    <v-autocomplete
                      v-model="portfolio[item.key]"
                      class="admin__item-input"
                      :readonly="!!noInputArr.find(e => e === portfolio['RIC'])"
                      :items="portfolioSelects[item.key]"
                      item-text="key"
                      item-value="key"
                      outlined
                      dense
                      hide-selected
                    />
                  </template>
                  <template v-else>
                    <input
                      :ref="`inputFields${indexRow}${item.key}`"
                      v-model="portfolio[item.key]"
                      :type="inputType(item.key)"
                      :readonly="!!noInputArr.find(e => e === portfolio['RIC'])"
                      class="admin__item-input"
                    >
                  </template>
                  <button
                    v-if="checkBtnUpdate(portfolio['RIC'], item.key)"
                    v-ripple
                    class="admin__btn-update btn"
                    :class="{
                      'admin__btn-update_active': buttonActive(portfolio['RIC'], item.key),
                      'admin__btn-update_error': buttonError(portfolio['RIC'], item.key)
                    }"
                    @click="updateValue(item.key, portfolio['RIC'])"
                  >
                    <v-icon class="admin__btn-update-icon" color="#fff">
                      mdi-sync
                    </v-icon>
                  </button>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else class="admin admin_pre-loaded ">
    <PreLoaded />
  </div>
</template>

<script>
import EventBus from '~/helpers/event-bus.js'

import { createdDate } from '~/helpers/crearedDate'
import inputType from '~/helpers/inputType'
import { portfolioURL } from '@/api'
const apiUrl = portfolioURL
export default {
  name: 'PortfolioTable',
  props: {
    id: {
      type: String,
      default: '',
      require: true
    }
  },
  data () {
    return {
      buttons: [],
      texts: {
        id: 'ID портфеля',
        param_generate: 'Генерация параметра',
        time_without_update: 'Время без обновления',
        country_short: 'Иконка',
        init_field: 'init field',
        init_value: 'Название',
        init_value_rus: 'Название на русском',
        autoupdate_list_company: 'Компании из списка автообновлений',
        hot_for_ru: 'Горячий для русского',
        hot_for_en: 'Горячий для английского',
        version: ' Версия',
        created_at: 'Создан',
        updated_at: 'Обновлен',
        unloading: 'Выгрузок'
      },

      startId: '',
      preload: false,
      portfolio: null,
      saveBlock: false,
      deleteBlock: false,
      dataPortfolioArr: null,
      noUpdateArr: [],
      noInputArr: [],
      dataPortfolio: null,
      defaultHeaders: [
        {
          key: 'RIC',
          name: 'RIC'
        },
        {
          key: 'Company_Common_Name',
          name: 'Название компании»'
        },
        {
          key: 'local_name',
          name: 'Рус. название'
        },
        {
          key: 'Country_of_Headquarters',
          name: 'Страна'
        },
        {
          key: 'ISIN',
          name: 'ISIN'
        },
        {
          key: 'Recommended_share_in_portfolio',
          name: 'Рекомендуемая доля в портфеле'
        },
        {
          key: 'Issuer_Ticker',
          name: 'Тикер эмитента'
        },
        {
          key: 'Rank_RANK_7_prc',
          name: 'Rank RANK 7 prc'
        },
        {
          key: 'C_Diluted_EPS_Excluding_Extraordinary_Items',
          name: 'Прибыль на акцию'
        },
        {
          key: 'C_Net_Income_after_Tax',
          name: 'Прибыль после уплаты налога'
        },
        {
          key: 'Company_Market_Cap',
          name: 'Рыночная капитализация компании'
        },
        {
          key: 'C_Price_Target_Median',
          name: 'Медиана целевой цены'
        },
        {
          key: 'C_Revenue',
          name: 'Доход'
        },
        {
          key: 'C_Total_Equity',
          name: 'Total капитализация'
        },
        {
          key: 'EBITDA_3_Yr_Interim_CAGR_x',
          name: 'EBITDA темп роста'
        },
        {
          key: 'Enterprise_Value_to_EBITDA',
          name: 'Стоимость к EBITDA'
        },
        {
          key: 'Forward_PE',
          name: 'Forward PE'
        },

        {
          key: 'Net_Profit_Margin_prc_x',
          name: 'Маржа чистой прибыли prc x'
        },
        {
          key: 'P_to_E',
          name: 'P to E'
        },
        {
          key: 'Price_Close',
          name: 'Цена закрытия'
        },
        {
          key: 'Price_To_Book_Value_Per_Share',
          name: 'Цена балансовой стоимости на акцию'
        },
        {
          key: 'Price_To_Sales_Per_Share',
          name: 'Цена продаж за акцию'
        },
        {
          key: 'RANK_Credit_prc',
          name: 'RANK Credit prc'
        },
        {
          key: 'RANK_Forecast_prc',
          name: 'RANK прогноз'
        },
        {
          key: 'RANK_Growth_prc',
          name: 'RANK Growth prc'
        },
        {
          key: 'RANK_Value_prc',
          name: 'RANK Value prc'
        },
        {
          key: 'ROA_Total_Assets_Percent',
          name: 'ROA Total Assets Percent'
        },
        {
          key: 'ROE_Total_Equity_perc_TTM',
          name: 'ROE Total Equity perc TTM'
        },
        {
          key: 'Total_Revenue_per_Share_3_Yr_Interim_CAGR_x',
          name: 'Общая выручка на акцию'
        },
        {
          key: 'gicsIndustryName',
          name: 'Название отрасли'
        },
        {
          key: 'gicsSectorName',
          name: 'Имя сектора'
        },
        {
          key: 'gicsSectorNameRus',
          name: 'Имя сектора(рус.)'
        },
        {
          key: 'gicsSubIndustryName',
          name: 'Название подотрасли'
        },
        {
          key: 'gicsSubIndustryNameRus',
          name: 'Название подотрасли(рус.)'
        },
        {
          key: 'Recommendation_Mean_1_5',
          name: 'Рекомендуемое среднее 1 5'
        }
      ]
    }
  },
  computed: {
    headers () {
      const storedHeaders = localStorage.getItem('headersTable')
      if (storedHeaders) {
        return JSON.parse(storedHeaders)
      } else {
        // Если заголовки отсутствуют в LocalStorage, используйте заголовки по умолчанию
        return this.defaultHeaders
      }
    },
    portfolioArr () {
      return this.$store.getters['admin/getPortfolioInfoArrFilter']
    },
    portfolioSelects () {
      return this.$store.getters['admin/getPortfolioSelects']
    },
    countShare () {
      if (this.dataPortfolioArr) {
        return this.dataPortfolioArr.reduce((sum, e) => {
        // Прибавляем значение текущего объекта к аккумулятору
          if (e.Recommended_share_in_portfolio) {
            return Number(e.Recommended_share_in_portfolio) + sum
          } else {
            return sum
          }
        }, 0)
      }
      return 0
    }
  },
  mounted () {
    this.preload = true
    if (this.$store.getters['admin/getPortfolioInfoArr']) {
      this.portfolio = this.$store.getters['admin/getPortfolioInfoArr'].find(e => e.id === this.id)
    }
    const jsonArr = this.portfolio.json_portfolio
    this.dataPortfolioArr = JSON.parse(JSON.stringify(jsonArr))
    this.updateButtons(this.dataPortfolioArr)
    const json = this.portfolio
    this.dataPortfolio = JSON.parse(JSON.stringify(json))
    EventBus.$on('modalDataChanged', this.handleModalData)
    this.preload = false
  },
  beforeDestroy () {
    // Отписываемся от события перед уничтожением компонента
    EventBus.$off('modalDataChanged')
  },
  methods: {
    updateButtons (arr) {
      this.buttons = []
      arr.forEach((item) => {
        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            this.buttons.push({
              RIC: item.RIC,
              key,
              updateActive: false,
              updateError: false
            })
          }
        }
      })
    },
    buttonActive (RIC, key) {
      return this.buttons.find(e => e.RIC === RIC && e.key === key)?.updateActive
    },
    buttonError (RIC, key) {
      return this.buttons.find(e => e.RIC === RIC && e.key === key)?.updateError
    },
    // тут запутано с  oldRic - это не только олд рик, надо смотреть в функцию как что передается
    handleModalData (data, oldRic) {
      this.preload = true
      if (data === 'del') {
        const item = this.dataPortfolioArr.find(e => e.RIC === oldRic)
        this.dataPortfolioArr = this.dataPortfolioArr.filter(e => e.RIC !== oldRic)
        const companiesObg = {
          ric: oldRic,
          action: 'del',
          newRic: '',
          name: item.Company_Common_Name,
          date: new Date().getTime()
        }
        this.dataPortfolio.json_portfolio = this.dataPortfolio.json_portfolio.filter(e => e.RIC !== oldRic)
        this.dataPortfolio.autoupdate_list_company = false
        this.dataPortfolio.json_companies.push(companiesObg)
        this.noInputArr = this.noInputArr.filter(e => e !== oldRic) // удаляем старый рик из невводимых риков
      } else if (data === 'add') {
        const companiesObg = {
          ric: '',
          action: 'add',
          newRic: oldRic.RIC,
          name: oldRic.Company_Common_Name,
          date: new Date().getTime()
        }
        this.noInputArr.push(oldRic.RIC) // фиксируем до сохранения компанию
        this.dataPortfolioArr.unshift(oldRic)
        this.dataPortfolio.json_portfolio.unshift(oldRic)
        this.dataPortfolio.autoupdate_list_company = false
        this.dataPortfolio.json_companies.push(companiesObg)
      } else {
        const item = this.dataPortfolioArr.find(e => e.RIC === oldRic)
        const companiesObg = {
          ric: oldRic,
          action: 'replace',
          newRic: data.RIC,
          name: item.Company_Common_Name,
          date: new Date().getTime()
        }
        this.noInputArr.push(data.RIC) // фиксируем до сохранения компанию
        this.noInputArr = this.noInputArr.filter(e => e !== oldRic) // удаляем старый рик из невводимых риков

        // Принимаем данные и выполняем нужные действия
        const indexToReplace = this.dataPortfolioArr.findIndex(obj => obj.RIC === oldRic)
        if (indexToReplace !== -1) {
          this.dataPortfolioArr[indexToReplace] = data
        }
        this.dataPortfolio.json_companies.push(companiesObg)
      }
      // Отписываемся от события после обработки данных
      EventBus.$off('modalDataChanged', this.handleModalData)
      this.preload = false
    },
    createdDate (data) {
      return createdDate(data)
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
        localStorage.setItem('headersTable', JSON.stringify(this.headers))
      }
      this.preload = false
      this.startId = ''
    },
    moveStart (key) {
      this.startId = key
    },
    isValueChanged (indexRow, key) {
      if (this.dataPortfolioArr[indexRow] && this.portfolio.json_portfolio && this.portfolio.json_portfolio.length) {
        const RIC = this.dataPortfolioArr[indexRow].RIC
        // Находим соответствующий объект в this.portfolio.json_portfolio
        const correspondingObj = this.portfolio.json_portfolio.find(
          obj => obj.RIC === RIC
        )

        if (correspondingObj && correspondingObj[key] !== this.dataPortfolioArr[indexRow][key]) {
          return true
        }
      }

      return false
    },
    openModal (item) {
      this.preload = true
      EventBus.$off('modalDataChanged', this.handleModalData)
      this.$store.commit('admin/setDialogOpenItem', item)
      this.$store.commit('admin/openDialog')
      EventBus.$on('modalDataChanged', this.handleModalData)
      this.preload = false
    },
    checkBtnUpdate (RIC, key) {
      if (this.noUpdateArr.length > 0) {
        const index = this.noUpdateArr.findIndex((e) => {
          return e.RIC === RIC
        })

        if (index !== -1 && this.noUpdateArr[index].key === key) {
          return false
        }
      }
      if (Array.isArray(this.portfolio.json_change_data)) {
        const index = this.portfolio.json_change_data.findIndex((e) => {
          return e.RIC === RIC
        }
        )
        if (index !== -1 && this.portfolio.json_change_data[index][key]) {
          return true
        } else { return false }
      }
    },
    async updateValue (valueKey, ric) {
      this.buttons.find(e => e.RIC === ric && e.key === valueKey).updateError = false
      this.buttons.find(e => e.RIC === ric && e.key === valueKey).updateActive = true
      const data = new FormData()
      data.append('ric', ric) // Готовим новый RIC к отправке на сервер
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
        if (response.status === 200 && response.data.status !== 500) {
          const data = response.data
          const value = data[valueKey]
          const indexToReplace = this.dataPortfolioArr.findIndex(obj => obj.RIC === ric)
          if (indexToReplace !== -1) {
            this.preload = true
            this.dataPortfolioArr[indexToReplace][valueKey] = value
            this.noUpdateArr.push({
              RIC: ric,
              key: valueKey
            })
            this.preload = false
          }
        } else {
          this.buttons.find(e => e.RIC === ric && e.key === valueKey).updateError = true
        }
        // Обработка успешного ответа
      } catch (error) {
        console.error(error)
        this.buttons.find(e => e.RIC === ric && e.key === valueKey).updateError = true
        // Обработка ошибки
      }
      this.buttons.find(e => e.RIC === ric && e.key === valueKey).updateActive = false
    },
    async submit () {
      this.saveBlock = true // блокировка кнопки сохранения
      const data = this.dataPortfolio // создание объекта отправки на сервер
      data.json_portfolio = this.dataPortfolioArr // присваивание  текущей копии таблицы
      data.json_companies = data.json_companies.length > 30 ? data.json_companies.slice(-30) : data.json_companies // подрезаем историю не более 30 итемов
      const changedFieldsArray = [...this.portfolio.json_change_data] // массив обновленных полей и его копия
      const currentTime = new Date().getTime() // текущий таймштамп
      const arrayLikePortfolio = {} // массивоподобный объект таблицы для сравнения
      // наполняем из приходящего объекта
      this.portfolio.json_portfolio.forEach((e) => {
        arrayLikePortfolio[`${e.RIC}`] = e
      })
      // Обработка изменений в существующих записях
      for (let i = 0; i < data.json_portfolio.length; i++) {
        const obj = data.json_portfolio[i]

        if (obj && obj.RIC) {
          // поиск в массиве обновленных такого же рик, если такой есть то будет в него ложить свойства, а если нет создадим
          const changedFieldIndex = changedFieldsArray.findIndex(item => item.RIC === obj.RIC)
          let changedField
          // пустой объект полей обновления
          if (changedFieldIndex !== -1 && Object.keys(changedFieldsArray[changedFieldIndex]).length > 1) {
            changedField = changedFieldsArray[changedFieldIndex]
          } else {
            changedField = {
              RIC: obj.RIC
            }
          }

          // ищем изменения, проходим циклом по строке
          for (const key in obj) {
            // если в массиве входящем есть рик такой и значение по ключу отличается, то добавляем в обновления. Так же проверяем что это обновление не в списке исключений
            if (arrayLikePortfolio[obj.RIC] && arrayLikePortfolio[obj.RIC][key] !== obj[key] && this.noUpdateArr.findIndex(item => item.RIC === obj.RIC && item.key !== obj[key]) === -1) {
              changedField[key] = currentTime
            }
          }

          // если есть какие то найденные обновления
          if (Object.keys(changedField).length > 1) {
            if (changedFieldIndex !== -1) {
              changedFieldsArray[changedFieldIndex] = Object.assign({}, changedField)
            } else {
              changedFieldsArray.push(Object.assign({}, changedField))
            }
          }
        }
      }

      // Удаление объектов с совпадающими значениями ric и key
      for (const noUpdateObj of this.noUpdateArr) {
        const indexToRemove = changedFieldsArray.findIndex(item => item.RIC === noUpdateObj.RIC && item[noUpdateObj.key] !== undefined)
        if (indexToRemove !== -1) {
          const objToRemove = changedFieldsArray[indexToRemove]
          if (Object.keys(objToRemove).length === 1) {
            changedFieldsArray.splice(indexToRemove, 1)
          } else {
            delete objToRemove[noUpdateObj.key]
            if (Object.keys(objToRemove).length === 1) {
              changedFieldsArray.splice(indexToRemove, 1)
            }
          }
        }
      }

      data.json_change_data = changedFieldsArray.filter(item =>
        data.json_portfolio.some(portfolioItem => portfolioItem.RIC === item.RIC)
      )

      const config = {
        method: 'put',
        url: `${apiUrl}/portfolio/portfolio_admin/panel_item/${this.portfolio.id}`,
        data,
        headers: {
          Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
        }
      }

      try {
        const response = await this.$axios(config)
        if (response.status === 200) {
          this.preload = true
          await this.$store.dispatch('admin/portfolioInfoArr')
          this.portfolio = this.$store.getters['admin/getPortfolioInfoArr'].find(e => e.id === this.id)
          const jsonArr = this.portfolio.json_portfolio
          this.dataPortfolioArr = JSON.parse(JSON.stringify(jsonArr))
          this.dataPortfolio = JSON.parse(JSON.stringify(this.portfolio))
          this.noUpdateArr = []
          this.noInputArr = []
          this.preload = false
        }
        // Обработка успешного ответа
      } catch (error) {
        console.error(error)
        // Обработка ошибки
      }

      this.saveBlock = false
    },
    async delPortfolio () {
      this.deleteBlock = true
      const config = {
        method: 'DELETE',
        url: `${apiUrl}/portfolio/portfolio_admin/panel_item/${this.portfolio.id}`,
        headers: {
          Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
        }
      }
      try {
        const response = await this.$axios(config)
        if (response) {
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
      this.deleteBlock = false
    },
    // eslint-disable-next-line require-await
    async resetAll () {
      this.preload = true
      const dataObg = this.dataPortfolio // создание объекта отправки на сервер
      dataObg.json_portfolio = [] // присваивание новой таблицы
      dataObg.json_change_data = []
      dataObg.json_companies = [] // очистка истории
      dataObg.autoupdate_list_company = true
      let errorFetch = false
      for (const e of this.dataPortfolio.json_recommended_companies) {
        const data = new FormData()
        data.append('ric', e)

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
          if (response.status === 200 && !!response.data.RIC) {
            dataObg.json_portfolio.push(response.data)
          }
        } catch (error) {
          console.error(error)
          errorFetch = true
        }
      }
      if (errorFetch) {
        return
      }

      const config = {
        method: 'put',
        url: `${apiUrl}/portfolio/portfolio_admin/panel_item/${this.portfolio.id}`,
        data: dataObg,
        headers: {
          Authorization: `Bearer ${window.$nuxt.$store.state.user.user.access}`
        }
      }

      try {
        const response = await this.$axios(config)
        if (response.status === 200) {
          await this.$store.dispatch('admin/portfolioInfoArr')
          this.portfolio = this.$store.getters['admin/getPortfolioInfoArr'].find(e => e.id === this.id)
          const jsonArr = this.portfolio.json_portfolio
          this.dataPortfolioArr = JSON.parse(JSON.stringify(jsonArr))
          this.dataPortfolio = JSON.parse(JSON.stringify(this.portfolio))
          this.noUpdateArr = []
          this.preload = false
        }
        // Обработка успешного ответа
      } catch (error) {
        console.error(error)
        // Обработка ошибки
      }
      this.preload = false
    },
    inputType (value) {
      return inputType(value) ? 'text' : 'number'
    }
  }
}
</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  color: var(--color-text-1);
  font-size: 14px;

  &_pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - var(--height-header));
  }

  &__table {
    border-collapse: collapse !important;
  }

  &__row {
    border-bottom: 1px solid var(--color-border-1);
    &_header {
      position: sticky;
      inset: 0 0 auto 0;
      z-index: 13;
      background-color: #fff;
      border-bottom: none;
    }
    &_update {
      background-color: #f7d437;
    }
  }

  &__wrap-table {
    position: relative;
    height: 70vh;
    width: 100%;
    background-color: #fff;
    overflow: auto;
  }

  &__item {
    padding: 3px;
    border-radius: 0px;
    overflow: hidden;
    text-align: start;
    @include transition;
    &_fix {
      position: sticky;
      inset: auto auto auto 0;
      background-color: #fff;
      &::before {
        content: '';
        position: absolute;
        inset: 0 0 0 auto;
        width: 8px;
        background-color:var(--color-border-1);
      }
      z-index: 12;
    }

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

      &::after {
        content: '';
        position: absolute;
        inset: auto 0 0 0;
        height: 2px;
        background-color: var(--color-border-1);
        z-index: 12;
      }

      &::before {
        content: '';
        position: absolute;
        inset: 0 0 auto 0;
        height: 1px;
        background-color: var(--color-border-1);
        z-index: 12;
      }
    }
  }

  &__add {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    width: 35px;
    height: 35px;
    font-size: 20px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn);

    svg {
      width: 20px;
    }
  }

  &__table-header-wrap {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__item-wrap {
    display: flex;
    gap: 5px;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 3px;
    border: 1px solid var(--color-border-1);
    border-radius: 7px;
    @include transition;

    &_no-input {
      padding: 0px;
      border: none;
    }

    &_update {
      border: 1px solid var(--color-btn);
    }

    &_RIC {
      padding: 0;
      border: none;
      border-radius: 0;
    }

    &_change {
      background-color: #f7d437;
    }
  }

  &__btn-update {
    border-radius: 5px;
    width: 30px;
    height: 30px;
    background-color: var(--color-btn);
    @include transition;

    &_active {
      .admin__btn-update-icon {
        animation: spin 1s infinite linear;
      }
    }

    &_error {
      background-color: #ff0000;
    }
  }

  &__btn-update-icon {
    @include transition;
    font-size: 26px !important;
  }

  &__item-btn {
    padding: 3px sizeIncr(5, 10);
    border-radius: 7px;
    width: 100%;
    color: var(--color-bg-white-1);
    background-color: var(--color-btn);
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    &_not-rec {
      background-color: #07B021;
    }
  }

  &__btn-reset {
    padding: 3px sizeIncr(5, 10);
    border-radius: 7px;
    color: var(--color-bg-white-1);
    background-color: var(--color-btn);
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }

  &__item-input {
    padding: 3px sizeIncr(5, 5);
    min-width: 220px;
    border-radius: 7px;
  }

  &__link {
    font-weight: 600;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  &__top-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 5px;

    @media (min-width: 560px) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__top-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
  }

  &__count {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    font-weight: 500;
    color: var(--color-text-1);
    font-size: 16px;
    @include transition;
    &_alert {
      color: #e70004;
    }
  }

  &__top-item {
    &_dn {
      display: none;
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    padding: 2px 20px;
    border-radius: 7px;
    border: 1px solid var(--color-border-1);
    border-radius: 7px;
    min-height: 40px;
    font-weight: 500;
    color: var(--color-text-1);
    filter: drop-shadow(3px 0px 28px rgba(0, 0, 0, 0.01));
    @include transition;

    &_active {
      border: 1px solid var(--color-border-3);
    }
  }

  &__checkbox {
    margin-right: 6px;
  }

  &__btn-wrap {
    position: fixed;
    inset: auto 20px 20px auto;
    z-index: 11;
    display: flex;
    gap: 10px;
  }

  &__btn-submit {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px sizeIncr(5, 10);
    border-radius: 7px;
    font-weight: 500;
    color: var(--color-text-white-1);
    background-color: var(--color-btn);
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;

    &:hover {
      background-color: var(--color-btn-3);
      box-shadow: 0 0 0 4px var(--color-btn);
    }

    &:active {
      background-color: var(--color-btn-3);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }

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

  &__icon-save {
    margin-right: 6px;
    width: 24px;
    height: 24px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-360deg);
    }
  }

  *::-webkit-scrollbar {
    height: 40px;
    width: 13px;
  }
}
</style>
<style>
.admin__item-input .v-text-field__details {
  display: none !important;
}
</style>
