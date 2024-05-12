import { ScrollArea, type ScrollAreaProps } from './ScrollArea'
import { ScrollAreaViewport, type ScrollAreaViewportProps } from './ScrollAreaViewport'
import { ScrollAreaScrollbar, type ScrollAreaScrollbarProps } from './ScrollAreaScrollbar'
import { ScrollAreaThumb, type ScrollAreaThumbProps } from './ScrollAreaThumb'
import { ScrollAreaCorner, type ScrollAreaCornerProps } from './ScrollAreaCorner'

const Root = ScrollArea;
const Viewport = ScrollAreaViewport;
const Scrollbar = ScrollAreaScrollbar;
const Thumb = ScrollAreaThumb;
const Corner = ScrollAreaCorner;

export {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,

  Root,
  Viewport,
  Scrollbar,
  Thumb,
  Corner,
}

export type {
  ScrollAreaProps,
  ScrollAreaViewportProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaCornerProps,
}
