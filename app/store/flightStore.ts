import Vue from 'nativescript-vue'

import { FlightData, Airport } from '@/types'

const state = Vue.observable({
  flightData: null as FlightData,
})

export const getFlightData = () => state.flightData

export const setFlightData = (flightData: FlightData) => {
  state.flightData = flightData
}

export const isFlightData = (): boolean => !!state.flightData

export const getAirportsData = (): Airport[] => state.flightData.airports
