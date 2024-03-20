import local from './static/local/local'
export default {
  ssr: true,

  head: {
    title: 'RANKS portfolio',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: 'Ranks is a ready-made list of stocks in the form of a Ranks portfolio. Model automatic stock portfolios for any country' },
      {
        name: 'google-site-verification',
        content: 'X0JaJ323lPO-Qe9u4iN2xjibi55HKv6tfgg1EkpYCAM'
      },
      {
        name: 'yandex-verification',
        content: '1f7bfe1a591ae4e2'
      },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'alternate', hreflang: 'en', href: 'https://portfolio.ranks.pro/' },
      { rel: 'alternate', hreflang: 'ru', href: 'https://portfolio.ranks.pro/ru/' }
    ]
  },
  server: {
    port: 8876 // default: 3000
    // host: '0.0.0.0' // Это важно, так как это позволит вашему серверу принимать запросы с любых IP-адресов
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'flag-icons/css/flag-icons.css',
    '~/assets/scss/style.scss'
  ],
  // Путь к резервному HTML-файлу
  generate: {
    fallback: true
  },

  styleResources: {
    scss: ['~/assets/scss/scss/*.scss']
  },

  // Подключение плагинов
  plugins: [
    '~/plugins/foo.js',
    { src: '~/plugins/ripple.js', mode: 'client' }
  ],

  middleware: ['~/middleware'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    true: true,
    dirs: [
      '~/components',
      '~/components/dialog',
      '~/components/switchers',
      '~/components/filter',
      '~/components/search',
      '~/components/registration',
      '~/components/cart',
      '~/components/settings',
      '~/components/dropdown',
      '~/components/card',
      '~/components/btn',
      '~/components/headers',
      '~/components/header',
      '~/components/admin',
      '~/components/purchases',
      '~/components/confirm',
      '~/components/registr',
      '~/components/user'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/recaptcha',
    '@nuxtjs/dotenv'
  ],

  recaptcha: {
    hideBadge: false, // Опционально: скрывать ли значок reCAPTCHA
    siteKey: '6Ld_MoMpAAAAAGnIQUfOlKefSctYrevQudD9tulB', // Замените YOUR_SITE_KEY на ваш ключ сайта reCAPTCHA
    version: 2 // Версия reCAPTCHA
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    // '@nuxtjs/yandex-metrika',
    '@nuxtjs/i18n'
  ],

  publicRuntimeConfig: {
    // yandexMetrika: {
    //   id: process.env.YANDEX_METRIKA_ID
    //   // ...
    // }
  },
  router: {
    middleware: ['loading'],
    base: '/' // Устанавливаем базовый путь для вашего приложения
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://research.ranks.pro/'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShake: true,
    fonts: {
      family: 'Inter'
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#4ed2ff',
          accent: '#252525',
          secondary: '#368dc5',
          info: '#ffffff',
          warning: '#fec500',
          error: '#ff0000',
          success: '#2cdd9b',
          disabled: '#EA0C0E',
          active: '#FFFFFF',
          background: '#0c0c0c',
          colorBtn: '#1C96FA',
          colorBtn2: '#3264fe',
          white: '#ffffff',
          border: '#D0D9EA'
        },
        light: {
          primary: '#394D5E',
          accent: '#F4F4F7',
          secondary: '#368dc5',
          info: '#0c0c0c',
          warning: '#fec500',
          error: '#FF0000',
          success: '#2cdd9b',
          disabled: '#EA0C0E',
          active: '#dedede',
          background: '#FFFFFF',
          colorBtn: '#1C96FA',
          colorBtn2: '#3264fe',
          white: '#ffffff',
          border: '#D0D9EA'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
      if (ctx.isDev && process.isClient) {
        config.devtool = 'source-map'
      }
    }
  },
  // Locales

  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    strategy: 'prefix_except_default', // Используем 'prefix_except_default' для переключения языка на основе префикса
    fallbackLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: local
    },
    generate: {
      routes: ['/', '/en/', '/ru/'] // Добавляем языковые маршруты для статической генерации
    }
  }
}
