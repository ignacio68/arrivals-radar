/**
 * @file Flying arrivals radar
 *
 * @copyright Ignacio López-Amor Pinillos 2021
 * @author Ignacio López-Amor Pinillos <ignaciolopezamor@gmail.com>
 * @license APACHE
 * @version 0.1.0
 */

import Vue from 'nativescript-vue'
import ComponentsPlugin from './setup/vue.components'
import Home from '@/views/Home.vue'

// Internationalization
import { i18n, setLanguage } from '@/locales'

Vue.use(ComponentsPlugin)

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = !__DEV__

new Vue({
  i18n,
  created() {
    setLanguage()
  },
  render: h => h('frame', [h(Home)]),
}).$start()
