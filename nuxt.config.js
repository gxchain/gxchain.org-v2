
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'GXChain 可信数据的价值网络',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { name: 'keywords', content: 'GXChain官网，公信宝，区块链，GXChain白皮书，可信数据计算' },
      { hid: 'description', name: 'description', content: '公信链GXChain是一条为全球数据经济服务的基础链，旨在打造可信数据的价值网络。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_2057130_loyqm28j8nb.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/eleme.css?1' },
      { rel: 'stylesheet', type: 'text/css', href: '/style.css?2' },
    ],
    script: [
      { src: '/js/better-scroll@2.0.3.core.min.js' },
      // { src: 'https://cdn.bootcss.com/countup.js/2.0.7/countUp.js' },
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    // 'swiper/swiper-bundle.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/axios',
    // { src: '@/plugins/vue-swiper.js', mode: 'client' },
    { src: '@/plugins/vchart.js', mode: 'client' },
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
