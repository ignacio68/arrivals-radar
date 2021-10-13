import { addMarkers, setViewport } from './map'
import { httpGetFlightByIcaoCode } from '@/services/aviationstackServices'

import { LatLng, Airport, AirportType, Aircraft, FlightData } from '@/types'
import { Marker } from './types'

import airportsDatabase from '@/data/airports.json'

import { setFlightData, getFlightData as flightData } from '@/store/flightStore'

const fakeFlight = {
  pagination: {
    limit: 100,
    offset: 0,
    count: 100,
    total: 1669022,
  },
  data: [
    {
      flight_date: '2019-12-12',
      flight_status: 'active',
      departure: {
        airport: 'San Francisco International',
        timezone: 'America/Los_Angeles',
        iata: 'SFO',
        icao: 'KSFO',
        terminal: '2',
        gate: 'D11',
        delay: 13,
        scheduled: '2019-12-12T04:20:00+00:00',
        estimated: '2019-12-12T04:20:00+00:00',
        actual: '2019-12-12T04:20:13+00:00',
        estimated_runway: '2019-12-12T04:20:13+00:00',
        actual_runway: '2019-12-12T04:20:13+00:00',
      },
      arrival: {
        airport: 'Dallas/Fort Worth International',
        timezone: 'America/Chicago',
        iata: 'DFW',
        icao: 'KDFW',
        terminal: 'A',
        gate: 'A22',
        baggage: 'A17',
        delay: 0,
        scheduled: '2019-12-12T04:20:00+00:00',
        estimated: '2019-12-12T04:20:00+00:00',
        actual: null,
        estimated_runway: null,
        actual_runway: null,
      },
      airline: {
        name: 'American Airlines',
        iata: 'AA',
        icao: 'AAL',
      },
      flight: {
        number: '1004',
        iata: 'AA1004',
        icao: 'AAL1004',
        codeshared: null,
      },
      aircraft: {
        registration: 'N160AN',
        iata: 'A321',
        icao: 'A321',
        icao24: 'A0F1BB',
      },
      live: {
        updated: '2019-12-12T10:00:00+00:00',
        latitude: 36.2856,
        longitude: -106.807,
        altitude: 8846.82,
        direction: 114.34,
        speed_horizontal: 894.348,
        speed_vertical: 1.188,
        is_ground: false,
      },
    },
  ],
}

export const getFlightData = async (query: string): Promise<void | FlightData> => {
  // const flightData = await fetchFlightData(query)
  //   .then((result) => {
  //     console.log(`flights::getFlightData()::flightData: ${JSON.stringify(result)}`)
  //     const airports = getAirports(result)
  //     // const aircraft = getAircraft(result)
  //     const flightData: FlightData = {
  //       airports,
  //       // aircraft,
  //     }

  //     return flightData
  //     // return result
  //   })
  //   .catch((error) => console.log(`flights::getFlightData::error: ${error}`))
  console.log(`flights::getFlightData()`)
  const airports = getAirports(fakeFlight)
  console.log('🚀 -> getFlightData -> airports ', airports)
  const aircraft = getAircraft(fakeFlight)
  console.log('🚀 -> getFlightData -> aircraft', aircraft)
  const flightData: FlightData = {
    airports,
    aircraft,
  }

  console.log(`flights::getFlightData()::flightData: ${JSON.stringify(flightData)}`)

  setFlightData(flightData)
  // setAirportsMarkers()

  return flightData

  // if (!!flightData) {
  // } else {getFlightData::
  //   console.log('Error')
  // }
}

const fetchFlightData = (query: string): Promise<any> => httpGetFlightByIcaoCode(query)

const getAirportCoordinates = (icaoCode: string): LatLng => ({
  lat: airportsDatabase[icaoCode].lat,
  lng: airportsDatabase[icaoCode].lon,
})

// const getAirportIcaoCode = (dataBase: any, type: string): string => {
const getAirportIcaoCode = (type: string): string => {
  console.log(`flights::getAirportIcaoCode()::type: ${type}`)
  const icaoCode: string = fakeFlight.data[0][type].icao
  if (!!icaoCode) {
    console.log(`flights::getAirportIcaoCode()::icaoCode: ${icaoCode}`)
    return icaoCode
  } else {
    console.log(`flights::getAirportIcaoCode()::icaoCode: ERROR!!`)
    return
  }
}

const getAirportData = (data: any, type: AirportType): Airport => {
  console.log(`flights::getAirportData()`)
  const icao = getAirportIcaoCode(type)
  const { lat, lng } = getAirportCoordinates(icao)
  const airport: Airport = {
    type,
    icao,
    lat,
    lng,
  }
  return airport
}

const getAirports = (data: any): Airport[] => {
  console.log(`flights::getAirports()`)
  const departure = getAirportData(data, 'departure')
  const arrival = getAirportData(data, 'arrival')
  const airports: Airport[] = [departure, arrival]

  return airports
}

const getAircraft = (dataBase: any): Aircraft => dataBase.data[0].aircraft.icao24

export const setAirportsMarkers = (): void => {
  console.log(`flights::setAirportsMarker()`)
  const airportsMarkers = setAirportsArgs()
  console.log('🚀 -> setAirportsMarker -> airportsMarkers', airportsMarkers)
  addMarkers(airportsMarkers)
}

const setAirportsArgs = (): Marker[] => {
  const airports = flightData().airports
  // console.log('🚀 -> setAirportsArgs -> airports', airports)
  const airportsMarkers: Marker[] = []

  airports.map((airport) => {
    const args = getAirportArgs(airport)
    console.log('🚀 -> setAirportsArgs -> args', args)
    airportsMarkers.push(args)
  })

  console.log(`map.ts::setMarkers::locations: ${JSON.stringify(airportsMarkers)}`)
  return airportsMarkers
}

const getAirportArgs = (airport: Airport): Marker => {
  const { icao: id, lat, lng } = airport
  const args: Marker = {
    id,
    lat,
    lng,
    title: `Airport code: ${id}`,
    icon: 'res:ic_fiber_manual_record_white_24dp',
    onTap: () => onTap(id),
  }
  return args
}

const onTap = (name: string) => console.log(`Selected airport: ${name}`)
