import { addMarkers, createSource, createLayer } from '@/api/map'
import { getFlightData as flightData } from '@/store/flightStore'

import { Airport } from '@/types'

const getAirportData = (type: string): Airport => flightData().airports[type]

export const drawAirport = (type: string): any => {
  const airportData = getAirportData(type)
  // Add marker
  // addMarkers(airportData)
  // Add geoJSON source
  // const source = createSource(airportData)
  // AddLayer
  // const layer = createLayer(airportData)
}

export const removeAirport = () => {}
