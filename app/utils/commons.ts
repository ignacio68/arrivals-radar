import { LatLng, Position } from '@/types'

export const getId = (id: string, substr: string): string => `${id}_${substr}`

export const latLngToPosition = (coordinates: LatLng): Position => [
  coordinates.lng,
  coordinates.lat,
]
