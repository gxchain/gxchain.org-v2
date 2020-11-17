import Vue from 'vue'
// import VueAwesomeSwiper from 'vue-awesome-swiper'

// Vue.use(VueAwesomeSwiper)

import { Swiper as SwiperClass, Pagination, Autoplay } from 'swiper/core'

import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

// Swiper modules
SwiperClass.use([Pagination, Autoplay])

// -------------------------------------------------

// Global use
Vue.use(getAwesomeSwiper(SwiperClass))