import { ORIENTATIONS } from './constants'
import type { Orientation } from './types'

export function isValidOrientation(orientation: any): orientation is Orientation {
  return ORIENTATIONS.includes(orientation);
}
