import { Primitive, type ComponentPropsWithoutRef } from '../primitive'
import { ORIENTATIONS } from './constants'

export type Orientation = typeof ORIENTATIONS[number];
export type SeparatorElement = React.ElementRef<typeof Primitive.div>;
export type PrimitiveDivProps = ComponentPropsWithoutRef<typeof Primitive.div>;

export interface SeparatorProps extends PrimitiveDivProps {
  /**
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: Orientation;
  /**
   * Whether or not the component is purely decorative. When true, accessibility-related attributes
   * are updated so that that the rendered element is removed from the accessibility tree.
   */
  decorative?: boolean;
}
