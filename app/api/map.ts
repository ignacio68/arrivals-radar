import circle from '@turf/circle'
import bBox from '@turf/bbox'
import { BBox } from '@turf/helpers'

import {
  mbAnimateCamera,
  mbSetMapStyle,
  mbSetViewport,
  mbGetViewport,
  mbAddMarkers,
  mbRemoveMarkers,
  mbAddSource,
  mbRemoveSource,
  mbAddLayer,
  mbRemoveLayer,
} from '@/services/mapboxServices'

import { getMap } from '@/store/mapStore'
import { getFlightData as flightData, getAirportsData as airportsData } from '@/store/flightStore'

import { getId, latLngToPosition } from '@/utils/commons'

import {
  Source,
  GeoJSON,
  CircleLayerOptions,
  PolygonLayer,
  PolygonLayerStyleOptions,
  SetViewportOptions,
  Bounds,
} from './types'
import { LatLng, Position, Airport } from '@/types'

export const setMapStyle = (style: string): Promise<unknown> => mbSetMapStyle(getMap(), style)

export const flyTo = (location: LatLng): void => {
  const map = getMap()
  mbAnimateCamera(map, {
    target: location,
    zoomLevel: 15, // Android
    // bearing: 270, // Where the camera is pointing, 0-360 (degrees)
    // tilt: 50,
    //  TODO: calculate programmatically the duration
    duration: 5000, // default 10000 (milliseconds)
  }).then(() => {})
}

// VIEWPORT
// export const

export const setViewport = () => {
  const map = getMap()
  const options = setViewportOptions()
  console.log(`map.ts::setViewPort()`)
  mbSetViewport(map, options)
  console.log(`map.ts::setViewPort::options: ${JSON.stringify(options)}`)
  getViewport()
  // mbSetViewport(getMap(), setViewportOptions())
}

const setViewportOptions = (): SetViewportOptions => {
  const bounds = getBounds()
  const options = { bounds, animation: true, padding: 100 }
  return options
}

const getBounds = (): Bounds => getBBox(convertToGeoJSON(getAirportsCoordinates(airportsData())))

const getBBox = (geoJSONObject: GeoJSON): Bounds => convertBBoxToBounds(bBox(geoJSONObject))

const convertBBoxToBounds = (bbox: BBox): Bounds => ({
  north: bbox[3],
  east: bbox[2],
  south: bbox[1],
  west: bbox[0],
  // north: bbox[0],
  // east: bbox[1],
  // south: bbox[2],
  // west: bbox[3],
})

const convertToGeoJSON = (coordinates: number[][]): GeoJSON => ({
  type: 'Feature',
  geometry: {
    type: 'MultiPoint',
    coordinates,
  },
  properties: {},
})

const getAirportsCoordinates = (airports: Airport[]): number[][] => {
  const coordinates = airports.map((airport) => [airport.lat, airport.lng])
  console.log(`map.ts::getAirportsCoordinates::coordinates: ${JSON.stringify(coordinates)}`)
  return coordinates
}

export const getViewport = () => {
  console.log('map.ts::getViewport()')
  const map = getMap()
  mbGetViewport(map)
  // const viewPort = mbGetViewport(map)
  // console.log(`map.ts::getViewport::viewport: ${JSON.stringify(viewPort)}`)
}

// MARKERS

export const addMarkers = (markers: any[]) => {
  mbAddMarkers(getMap(), markers)
}

export const removeMarkers = (ids: string[]) => {
  mbRemoveMarkers(getMap(), ids)
}

// SOURCE

export const createSource = (args: Airport): Source => {
  console.log('maps::createSource()')
  const id = getId(args.icao, 'source')
  const source: Source = getSource(id, args)
  mbAddSource(getMap(), id, source)
  return source
}

const getSource = (id: string, args: Airport): Source => {
  const sourceData = getSourceData(args)
  const source: Source = {
    id,
    type: 'geojson' as const,
    data: sourceData,
  }
  return source
}

const getSourceData = (args: Airport): GeoJSON => {
  const radius = 10
  const center = { lat: args.lat, lng: args.lng }
  const centerPosition = getCircleCenter(center)
  const options = getCircleOptions()
  const sourceData = circle(centerPosition, radius, options)
  return sourceData
}

const getCircleCenter = (center: LatLng): Position => latLngToPosition(center)

const getCircleOptions = (): Record<string, unknown> => ({
  steps: 64,
  units: 'kilometers' as const,
  properties: {},
})

export const removeSource = async (id: string): Promise<void> => {
  console.log(`source::removeSource()::source: ${id}`)
  const sourceId = getId(id, 'source')
  sourceId.length > 0
    ? mbRemoveSource(getMap(), sourceId)
    : console.log(`source.ts::removeSource: The source doesn't exist!!`)
}

// LAYER

export const createLayer = (options: CircleLayerOptions, sourceId: string): PolygonLayer => {
  console.log('createLayer()')
  const map = getMap()
  const layerOptions = setLayerOptions(options, sourceId)
  mbAddLayer(map, layerOptions)

  return layerOptions
}

export const removeLayer = async (id: string) => {
  console.log(`layer::removeLayer()::layer: ${id}`)
  const layerId = getId(id, 'layer')
  mbRemoveLayer(getMap(), layerId)
}

const setLayerOptions = (options: CircleLayerOptions, sourceId: string): PolygonLayer => {
  // TODO: review options to include icao to get the layer id
  const id = getId(options.id, 'layer')
  const style = getLayerStyle(options)
  // const source = await createSource(id, options)
  const layerOptions = getLayerOptions(id, sourceId, style)
  return layerOptions
}

const getLayerStyle = (args: CircleLayerOptions): PolygonLayerStyleOptions => {
  const { fillColor, fillOpacity } = args
  const style: PolygonLayerStyleOptions = {
    'fill-antialias': true,
    'fill-color': fillColor,
    'fill-opacity': fillOpacity,
  }
  return style
}

const getLayerOptions = (
  id: string,
  source: Source | string,
  style: PolygonLayerStyleOptions,
): PolygonLayer => ({
  id,
  source,
  type: 'fill',
  layout: {},
  paint: style,
})
