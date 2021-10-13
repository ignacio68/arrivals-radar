// import airports from '@/data/airports.json';

const airportsDatabase = require('@/data/airports.json')

// const airports = () => {
//   // const objectFormatted = JSON.stringify(airportsDatabase)
//   // const len = objectFormatted.length
//   let objectFormatted = {}
//   Object.keys(airportsDatabase).forEach( key in keys => {
//   const newObject = {
//     key: {
//       longitude: key.lon,
//       latitude: key.lat
//       }
//   }
//   objectFormatted = Object.assign(objectFormatted, newObject)
//   }
// }

interface AirportData {
  icao: string
  iata: string | null
  name: string
  city: string
  state: string
  country: string
  elevation: number
  lat: number
  lon: number
  tz: string
}

interface Airport {
  [name: string]: AirportData
}

interface AirportLatLon {
  icao?: string
  lat: number
  lon: number
}

// const airport =
//    {"00AK": {
//         "icao": "00AK",
//         "iata": "",
//         "name": "Lowell Field",
//         "city": "Anchor Point",
//         "state": "Alaska",
//         "country": "US",
//         "elevation": 450,
//         "lat": 59.94919968,
//         "lon": -151.695999146,
//         "tz": "America\/Anchorage"
//     }}

// const example: Airport = JSON.parse(JSON.stringify(airport))

const airportsParse: Airport = JSON.parse(JSON.stringify(airportsDatabase))

// const newObject = (target: any, sources: object): any => {
//   const newObj = Object.keys(airportsParse).forEach((airport) => {
//     const {icao, lat, lon} = airport as
//     // const newObject: Airport = {
//     //   icao: airport,
//     //   lon: airport.lon,
//     //   lat: airport.lat,
//     // }
//     return newObject
//   })
// }
