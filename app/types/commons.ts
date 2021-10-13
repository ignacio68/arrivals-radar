// Map types

export interface LatLng {
  /**
   * The latitude of the geolocation, in degrees.
   */
  lat: number
  /**
   * The longitude of the geolocation, in degrees.
   */
  lng: number
}

export interface LngLat {
  /**
   * The latitude of the geolocation, in degrees, to match the GeoJSON specification.
   */
  lng: number
  /**
   * The longitude of the geolocation, in degrees. to match the GeoJSON specification.
   */
  lat: number
}

export type Position = [number, number]

export interface InitialCoordinates {
  /**
   * The latitude of the initial coordinates, in degrees.
   */
  lat: string

  /**
   * The longitude of the initial coordinates, in degrees.
   */
  lng: string
}

export interface Id {
  id: string
}

export interface User extends Id {
  location?: LatLng
  phoneNumber: string
}

export interface UserMarker extends Id, LatLng {
  onTap?: () => unknown
  update?: (newSettings: UserMarker) => void
}

// Flight Types

export type AirportType = 'departure' | 'arrival'

export interface Airport extends LngLat {
  type: AirportType
  icao: string
}

export interface Aircraft {
  icao: string
}

export interface FlightData {
  airports?: Airport[]
  aircraft?: Aircraft
}
