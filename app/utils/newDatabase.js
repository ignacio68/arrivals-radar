import { knownFolders, Folder, File } from "nativescript/core"

const airportsDatabase = require('@/data/airports.json')

const newDatabase = (source) => {
  let objectFormatted = {}
  Object.keys(source).forEach(key => {
      const { icao, lat, long } = key
    const newObject = {
      icao,
      lat,
      long
    }
    objectFormatted = Object.assign(objectFormatted, newObject)
    })
}

const newAirportDatabase = newDatabase(airportsDatabase)

export const