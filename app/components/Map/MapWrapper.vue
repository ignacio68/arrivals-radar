<template>
  <GridLayout columns="*, auto" rows="auto" class="map" horizontalAlignment="right">
    <MapBox
      ref="map"
      row="0"
      col="0"
      left="0"
      top="0"
      colSpan="2"
      width="100%"
      height="100%"
      :accessToken="mapToken"
      :mapStyle="mapStyle"
      :latitude="initialCoordinates.lat"
      :longitude="initialCoordinates.lng"
      :zoomLevel="15"
      :hideCompass="true"
      :disableRotation="true"
      :disableScroll="false"
      :disableZoom="false"
      :showUserLocation="true"
      @locationPermissionGranted="onLocationPermissionGranted"
      @locationPermissionDenied="onLocationPermissionDenied"
      @mapReady="onMapReady($event)"
    />
    <!-- <GridLayout
      class="right-menu"
      rows="auto"
      columns="auto"
      row="0"
      col="1"
    > -->
    <CustomSearchBar
      v-if="isVisibleSearchBar"
      class="searchBar m-16"
      verticalAlignment="top"
      row="0"
      col="1"
      height="64"
      :textFieldWidth="300"
      :itemFontSize="16"
      :maxLengthText="360"
      :hint="$t('lang.components.mapWrapper.searchBarHint')"
      @on-text-change="onTextChanged"
      @on-submit="onSubmit"
      @on-clear="onClear"
    />
    <!-- <SearchBar
      ref="searchBar"
      row="0"
      col="1"
      height="64"
      paddingTop="64"
      paddingRight="16"
      :hint="$t('lang.components.mapWrapper.searchBarHint')"
      :text="searchPhrase"
      v-model="searchPhrase"
      @textChange="onTextChanged"
      @submit="onSubmit"
      @clear="onClear"
      @loaded="onLoaded"
    /> -->
    <!-- </GridLayout> -->
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { mapToken, customMapStyle } from '@/setup/map'
import { getVisibility, setVisibility } from '@/composables/useComponent'
import { getFlightData } from '@/api/flights'
import { setViewport, getViewport } from '@/api/map'

import CustomSearchBar from '@/components/UI/CustomSearchBar.vue'

export default Vue.extend({
  name: 'MapWrapper',

  components: { CustomSearchBar },

  data() {
    return {
      mapToken: mapToken,
      mapStyle: customMapStyle,
      customMapStyle: customMapStyle,
      // satelliteMapStyle: MapStyle.SATELLITE_STREETS,
      // defaultMapStyle: MapStyle.TRAFFIC_DAY,
      // isSatelliteMap: false,
      // elevationFAB: Elevation.FAB_RESTING,
      // initialCoordinates: {
      //   lat: initialLocation().lat,
      //   lng: initialLocation().lng,
      // },
      initialCoordinates: {
        lat: 0,
        lng: 0,
      },
      searchPhrase: null,
    }
  },

  computed: {
    isVisibleSearchBar(): boolean {
      return getVisibility('searchBar')
    },
  },

  mounted() {},

  methods: {
    onLocationPermissionGranted() {
      console.log('MapWrapper::onLocationPermissionGranted()')
    },

    onLocationPermissionDenied() {
      console.log('MapWrapper::onLocationPermissionDenied()')
    },

    onMapReady(args: any) {
      console.log('MapWrapper::onMapReady()')
    },

    onTextChanged(query: string) {
      this.searchPhrase = query
      console.log(`MapWrapper::onTextChanged()::text: ${this.searchPhrase}`)
    },

    onSubmit() {
      console.log(`MapWrapper::onSubmit()::search text: ${this.searchPhrase}`)
      setVisibility('searchBar', false)
      this.getFlight(this.searchPhrase)
    },

    onClear() {
      this.searchPrase = null
      // this.hiddenSoftKeyboard()
      console.log(`MapWrapper::onClear()::text: ${this.searchPhrase}`)
    },

    getFlight(query: string) {
      getFlightData(query).then((result) => {
        console.log(`MapWrapper::getFlight()::flightData: ${JSON.stringify(result)}`)

        setViewport()
        getViewport()
      })
    },
  },
})
</script>
