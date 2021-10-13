import { GeoJSON } from 'geojson'
import { Color } from '@nativescript/core/color'
import { Id, LatLng } from '@/types'
import { Map, SetViewportOptions, Bounds } from '@/services/types'

export { Map, SetViewportOptions, GeoJSON, Bounds }

export interface Marker extends Id, LatLng {
  title?: string
  subtitle?: string
  selected?: boolean
  icon?: string
  onTap?: () => void
}

export interface SourceOptions {
  type: 'geojson'
  data: GeoJSON
}

export interface Source extends Id, SourceOptions {}

export type LayerVisibility = 'visible' | 'none'

export interface CircleLayerOptions extends Id {
  radius: number
  center: LatLng
  fillColor: string | Color
  fillOpacity: number
  visibility: LayerVisibility
}

export interface PolygonLayerStyleOptions {
  'fill-antialias'?: boolean
  'fill-color': string | Color
  'fill-opacity': number
  'fill-outlineColor'?: string | Color
  'fill-sortKey'?: number
  visibility?: LayerVisibility
}

export interface PolygonLayer extends Id {
  source: Source | string
  type?: string
  paint: PolygonLayerStyleOptions
  layout?: Record<string, string>
}
