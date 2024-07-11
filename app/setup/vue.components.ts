import { MapboxView } from '@nativescript-community/ui-mapbox'

const Plugin = {
  install(Vue: any) {
    Vue.registerElement('Mapbox', () => MapboxView)
  },
}

export default Plugin
