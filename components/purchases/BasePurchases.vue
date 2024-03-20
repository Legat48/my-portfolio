<template>
  <div class="purchases">
    <NoModalHeader class="purchases__header" :title="title()">
      <template #svg>
        <v-icon class="purchases__btn-icon" dense color="#394D5E">
          mdi-shopping
        </v-icon>
      </template>
    </NoModalHeader>

    <div class="purchases__wrap">
      <div class="purchases__wrap-top">
        <button v-ripple class="purchases__btn-top purchases__btn-top_mob btn" @click="$store.commit('purchases/setMobFilter')">
          {{ $t("purchases.filterTitle") }}
        </button>
        <button
          v-ripple
          class="purchases__btn-top purchases__btn-top_update btn"
          @click="update()"
        >
          <svg
            class="purchases__update-icon"
            :class="{'purchases__update-icon_anim' : awaiting}"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 13.01 17.75 13.97 17.3 14.8L18.76 16.26C19.54 15.03 20 13.57 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 10.99 6.25 10.03 6.7 9.2L5.24 7.74C4.46 8.97 4 10.43 4 12C4 16.42 7.58 20 12 20V23L16 19L12 15V18Z" fill="#fff" />
          </svg>
          <span>
            {{ $t("settings.updateAllOrders") }}
          </span>
        </button>
      </div>
      <div v-show="$store.getters['purchases/getFilterExists']" class="purchases__count">
        {{ $t("filters.purchaseRez") }} {{ count }}
      </div>
      <div
        v-if="!!purchases"
        class="purchases__table"
      >
        <FilterPurchases class="purchases__filter" />
        <MobFilterPurchases class="purchases__mob-filter" :class="{'purchases__mob-filter_active': $store.getters['purchases/getMobFilter']}" />
        <div
          v-for="(item, index) in purchases"
          :key="index"
          class="purchases__row"
          :class="{'purchases__row_wrap' : Array.isArray(item.dateUnloading)}"
        >
          <template v-if="!Array.isArray(item.dateUnloading)">
            <div class="purchases__item purchases__item_title">
              <BaseCountryIcon
                v-if="item.countryShort"
                class="purchases__icon"
                :country-code="item.countryShort"
              />
              <span class="purchases__row-title">
                {{ itemName(item) }}
              </span>
              <template v-if="item.period > 1">
                ({{ $t("purchases.period1") }} {{ item.period }} {{ $t("purchases.period2") }})
              </template>
            </div>
            <div class="purchases__item">
              <span class="purchases__subtext">
                {{ $t("purchases.uploadDate") }}
              </span>
              <span>
                {{ getCreatedDate(item.dateUnloading) }}
              </span>
            </div>
            <div class="purchases__item">
              <span class="purchases__subtext">
                {{ $t("purchases.received") }}
              </span>
              <span>
                {{ getCreatedDate(item.datePaid) }}
              </span>
            </div>
            <div class="purchases__item purchases__item_link">
              <a
                class="purchases__link pdf-button"
                :disabled="!!!item.fileUrl"
                :href="item.fileUrl"
                target="_blank"
              >
                <v-icon class="purchases__link-icon" size="18">
                  mdi-file-pdf-box
                </v-icon>
                <span
                  class="purchases__link-text"
                >
                  {{ $t("purchases.researchReview") }}
                </span>
              </a>
              <a
                class="purchases__link_last pdf-button"
                :href="item.fileXls"
                download
                :text="true"
              >
                <v-icon class="purchases__link-icon" size="18">
                  mdi-file-excel
                </v-icon>
                <span
                  class="purchases__link-text"
                >
                  {{ $t("purchases.researchExel") }}
                </span>
              </a>
            </div>
            <div class="purchases__item purchases__item_link purchases__item_last">
              <a
                class="purchases__link pdf-button"
                :href="item.fileXls"
                download
                :text="true"
              >
                <v-icon class="purchases__link-icon" size="18">
                  mdi-file-excel
                </v-icon>
                <span
                  class="purchases__link-text"
                >
                  {{ $t("purchases.researchExel") }}
                </span>
              </a>
            </div>
          </template>
          <template v-if="Array.isArray(item.dateUnloading)">
            <button v-ripple class="purchases__subrow purchases__subrow_header btn" @click.prevent="toggleClosedStatus(item.order_id)">
              <div class="purchases__item">
                <BaseCountryIcon
                  v-if="item.countryShort"
                  class="purchases__icon"
                  :country-code="item.countryShort"
                />
                {{
                  itemName(item)
                }}
              </div>
              <div class="purchases__item purchases__item_link">
                <span class="purchases__subtext">
                  <svg
                    class="purchases__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path d="M5.25 11.45L12.3 4.4L10.9 3L5.25 8.65L2.4 5.8L1 7.2L5.25 11.45Z" fill="#3FA6FA" />
                  </svg>
                  {{ $t("purchases.automaticUnloading") }}
                </span>
                <template v-if="item.period > 1">
                  <span class="purchases__subtext">
                    ({{ $t("coins.unlimitedTwo") }} {{ item.period }} {{ $t("coins.unlimitedThree") }})
                  </span>
                </template>
              </div>
              <div class="purchases__item">
                {{ getCreatedDate(item.dateStart) }} - {{ getCreatedDate(item.dateStop) }}
                <svg
                  class="purchases__icon purchases__icon_arr"
                  :class="{'purchases__icon_reverse': closedArr.find((e) => e.id === item.order_id && !e.closed)}"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M11.9984 8.3248L17.6484 13.9998L16.5984 15.0498L11.9984 10.4498L7.39844 15.0498L6.34844 13.9998L11.9984 8.3248Z" fill="#3FA6FA" />
                </svg>
              </div>
            </button>
            <template v-if="!closedArr.find((e) => e.id === item.order_id)?.closed">
              <div v-for="(subitem, subindex) of item.dateUnloading" :key="subindex" class="purchases__subrow">
                <div class="purchases__item purchases__item_last" />
                <div class="purchases__item purchases__item_link">
                  <span class="purchases__subtext">
                    {{ $t("purchases.uploadDate") }}
                  </span>
                  <span>
                    {{ getCreatedDate(item.dateUnloading[subindex]) }}
                  </span>
                </div>
                <div class="purchases__item purchases__item_link">
                  <span class="purchases__subtext">
                    {{ $t("purchases.received") }}
                  </span>
                  <span>
                    {{ getCreatedDate(item.datePaid) }}
                  </span>
                </div>
                <div class="purchases__item purchases__item_link">
                  <a
                    class="purchases__link pdf-button"
                    :disabled="!!!item.fileUrl[subindex]"
                    :href="item.fileUrl[subindex]"
                    target="_blank"
                  >
                    <v-icon class="purchases__link-icon" size="18">
                      mdi-file-pdf-box
                    </v-icon>
                    <span
                      class="purchases__link-text"
                    >
                      {{ $t("purchases.researchReview") }}
                    </span>
                  </a>
                </div>
                <div class="purchases__item purchases__item_link">
                  <a
                    class="purchases__link pdf-button"
                    :href="item.fileXls[subindex]"
                    download
                    :text="true"
                  >
                    <v-icon class="purchases__link-icon" size="18">
                      mdi-file-excel
                    </v-icon>
                    <span
                      class="purchases__link-text"
                    >
                      {{ $t("purchases.researchExel") }}
                    </span>
                  </a>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
      <div
        v-if="!purchases"
        class="purchases__plug"
      >
        {{ $t("purchases.noPurchases") }}
      </div>
    </div>
  </div>
</template>

<script>
import { createdDate } from '~/helpers/crearedDate'
export default {
  name: 'BasePurchases',
  data () {
    return {
      selected: [],
      activeButtons: [],
      closedArr: [],
      awaiting: false
    }
  },
  computed: {
    count () {
      const arr = this.$store.getters['purchases/getFilterPurchases']
      if (arr && arr.length > 0) {
        return arr.length
      } else {
        return 0
      }
    },
    purchases () {
      const obg = this.$store.getters['purchases/getFilterPurchases']
      return obg
    },
    isAllCompaniesLoaded () {
      return 100
    },
    isAllPdfsLoaded () {
      const answ = this.$store.getters['purchases/allPdfsLoaded']
      return answ
    }
  },
  async mounted () {
    this.closedArr = []
    await this.$store.dispatch('purchases/fetchOrders')
    const obg = this.$store.getters['purchases/getPurchases']
    this.closedArr = []
    for (const value of Object.values(obg)) {
      if (Array.isArray(value.dateUnloading)) {
        this.closedArr.push({
          id: value.order_id,
          closed: false
        })
      }
    }
  },
  methods: {
    toggleClosedStatus (id) {
      const itemIndex = this.closedArr.findIndex(item => Number(item.id) === Number(id))
      if (itemIndex !== -1) {
        this.closedArr[itemIndex].closed = !this.closedArr[itemIndex].closed
      }
    },
    title () {
      return `${this.$t('purchases.myPurchases')} ${this.$store.getters['purchases/getCount'] ? `(${this.$store.getters['purchases/getCount']})` : ''}`
    },
    getCreatedDate (date) {
      return createdDate(date)
    },
    itemName (item) {
      if (this.$nuxt.$i18n.locale === 'ru' && item.initValueRus) {
        return item.initValueRus
      }
      return item.initValue
    },
    resetFilter () {
      this.$store.commit('purchases/setDateFrom', null)
      this.$store.commit('purchases/setDateTo', null)
      this.$store.commit('purchases/setFilterName', '')
    },
    async update () {
      this.awaiting = true
      await this.$store.dispatch('purchases/fetchOrders')
      this.awaiting = false
    }
  }
}
</script>

<style lang="scss" scoped>
.purchases {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 85vw;
  max-width: #{$maxvw - 40}px;
  width: 100%;
  min-height: 85vh;
  color: var(--color-text-1);
  @media (min-width: 560px) {
    min-width: 40vw;
  }
  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: sizeIncr(8, 16);
    padding: 10px sizeIncr(16, 40) sizeIncr(56, 80) sizeIncr(16, 40);
    width: 100%;
    // @media (max-width: 1500px) {
    //   padding: 10px 0 sizeIncr(16, 40);
    // }
  }
  &__table {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__mob-filter {
    position: absolute;
    inset: 0;
    z-index: 230;
    background-color: var(--color-bg-white-2);
    transform: translateX(-120%);
    opacity: 0;
    @include transition;
    &_active {
      opacity: 1;
      transform: translateX(0%);
    }
  }
  &__header {
    position: sticky;
    inset: 0 0 auto 0;
    z-index: 10;
    height: 60px;
    background-color: var(--color-bg-white-2);
  }
  &__row {
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-border-1);
    }
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    height: 56px;
    font-family: "Inter", sans-serif !important;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: var(--color-text-1);
    @media (max-width: 1500px) {
      padding: 8px 0;
      grid-template-columns: 1fr 1fr;
      height: auto;
    }
    @media (max-width: 750px) {
      padding: 8px 0;
      display: flex;
      flex-direction: column;
      height: auto;
    }
    &_wrap {
      grid-template-columns: 1fr;
      height: auto;
    }
  }
  &__subrow {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    height: 56px;
    background-color: #F7F9FC;
    @media (max-width: 1500px) {
      padding: 8px 0;
      grid-template-columns: 1fr 1fr;
      height: auto;
    }
    @media (max-width: 750px) {
      padding: 8px 0;
      display: flex;
      flex-direction: column;
      height: auto;
    }
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-border-1);
    }
    &_header {
      background-color: transparent;
      border-bottom: 1px solid var(--color-border-3) !important;
    }
  }
  &__item {
    padding: 0 14px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    &_link {
      gap: 3px;
      @media (max-width: 1500px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
    &_last {
      @media (max-width: 1500px) {
        display: none;
      }
    }
    &_title {
      @media (max-width: 1500px) {
        margin-bottom: 8px;
      }
    }
  }
  &__row-title {
    margin-right: 3px;
    @media (max-width: 1500px) {
      font-size: 16px;
      font-weight: 500;
    }
  }
  &__icon {
    margin-right: 4px;
    width: 24px;
    height: 24px;
    @include transition;
    &_arr {
      margin-left: auto;
    }
    &_reverse {
      transform: rotate3d(1, 0, 0, 180deg);
    }
  }
  &__link {
    text-transform: none !important;
    &_last {
      display: none;
      @media (max-width: 1500px) {
        display: flex;
      }
    }
  }
  &__link-text {
    font-weight: 500;
    font-size: 16px;
    color: var(--color-text-6);
  }
  &__link-icon {
    color: var(--color-text-6) !important;
  }
  &__btn-icon {
    margin-right: 5px;
  }
  &__plug {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 200px;
    font-size: 20px;
    font-weight: 600;
    color: var(--color-text-1);
  }
  &__wrap-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__card {
    display: flex;
    flex-direction: column;
    padding: sizeIncr(16, 40);
    width: 100%;
    border-bottom: 1px solid var(--color-border-1);
  }
  &__card-item {
    display: flex;
    width: 100%;
    max-width: 400px;
    &_s-b {
      justify-content: space-between;
    }
  }
  &__wrap-top {
    display: flex;
    gap: 8px;
    width: 100%;
  }
  &__filter {
    display: none !important;
    @media (min-width: 768px) {
      display: flex !important;
    }
  }
  &__mob-filter {
    @media (min-width: 768px) {
      display: none !important;
    }
  }
  &__count {
    margin-bottom: 8px;
    color: var(--color-text-1);
    display: flex;
    @media (min-width: 768px) {
      display: none !important;
    }
  }
  &__btn-top {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 7px sizeIncr(8, 20);
    border-radius: 7px;
    font-weight: 500;
    color: var(--color-text-white-1);
    background-color: var(--color-btn);
    &_reset {
      background-color: var(--color-btn-2);
    }
    &_update {
      margin-left: auto;
      @media (min-width: 768px) {
        position: fixed;
        inset: auto 14px 14px auto;
      }
    }
    &_mob {
      @media (min-width: 768px) {
        display: none;
      }
    }
    path {
      fill: #fff;
    }
  }
  &__update-icon {
    margin-right: 6px;
    width: 24px;
    height: 24px;
    pointer-events: none;
    @include transition;
    &_anim {
      animation: spin 1s infinite linear;
    }
  }
  &__subtext {
    display: flex;
    align-items: center;
    margin-right: 4px;
    color: var(--color-text-7);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
