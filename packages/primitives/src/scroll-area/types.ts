import type { Primitive } from '../primitive';
import type { Scope } from '../context';

export type Direction = 'ltr' | 'rtl';
export interface Sizes {
  content: number;
  viewport: number;
  scrollbar: {
    size: number;
    paddingStart: number;
    paddingEnd: number;
  };
}

export type ScrollAreaElement = React.ElementRef<typeof Primitive.div>;
export type ScrollAreaViewportElement = React.ElementRef<typeof Primitive.div>;
export type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
export type ScrollAreaThumbImplElement = React.ElementRef<typeof Primitive.div>;
export type ScrollAreaCornerImplElement = React.ElementRef<typeof Primitive.div>;

export type ScrollAreaScrollbarImplElement = React.ElementRef<typeof Primitive.div>;
export type ScrollAreaScrollbarAxisElement = ScrollAreaScrollbarImplElement;
export type ScrollAreaThumbElement = ScrollAreaThumbImplElement;
export type ScrollAreaScrollbarVisibleElement = ScrollAreaScrollbarAxisElement;
export type ScrollAreaScrollbarElement = ScrollAreaScrollbarVisibleElement;
export type ScrollAreaCornerElement = ScrollAreaCornerImplElement;
export type ScrollAreaScrollbarAutoElement = ScrollAreaScrollbarVisibleElement;
export type ScrollAreaScrollbarScrollElement = ScrollAreaScrollbarVisibleElement;
export type ScrollAreaScrollbarHoverElement = ScrollAreaScrollbarAutoElement;

export interface ScrollbarContext {
  hasThumb: boolean;
  scrollbar: ScrollAreaScrollbarElement | null;
  onThumbChange: (thumb: ScrollAreaThumbElement | null) => void;
  onThumbPointerUp: () => void;
  onThumbPointerDown: (pointerPos: { x: number; y: number }) => void;
  onThumbPositionChange: () => void;
}

export interface ScrollAreaScrollbarImplPrivateProps {
  sizes: Sizes;
  hasThumb: boolean;
  onThumbChange: ScrollbarContext['onThumbChange'];
  onThumbPointerUp: ScrollbarContext['onThumbPointerUp'];
  onThumbPointerDown: ScrollbarContext['onThumbPointerDown'];
  onThumbPositionChange: ScrollbarContext['onThumbPositionChange'];
  onWheelScroll: (event: WheelEvent, maxScrollPos: number) => void;
  onDragScroll: (pointerPos: { x: number; y: number }) => void;
  onResize: () => void;
}

interface ScrollAreaScrollbarImplProps
  extends Omit<PrimitiveDivProps, keyof ScrollAreaScrollbarImplPrivateProps>,
  ScrollAreaScrollbarImplPrivateProps {}

export interface ScrollAreaScrollbarAxisProps
  extends Omit<ScrollAreaScrollbarImplProps, keyof ScrollAreaScrollbarImplPrivateProps>,
  ScrollAreaScrollbarAxisPrivateProps {}

export interface ScrollAreaScrollbarAxisPrivateProps {
  hasThumb: boolean;
  sizes: Sizes;
  onSizesChange: (sizes: Sizes) => void;
  onThumbChange: (thumb: ScrollAreaThumbElement | null) => void;
  onThumbPointerDown: (pointerPos: number) => void;
  onThumbPointerUp: () => void;
  onThumbPositionChange: () => void;
  onWheelScroll: (scrollPos: number) => void;
  onDragScroll: (pointerPos: number) => void;
};

export interface ScrollAreaContextValue {
  type: 'auto' | 'always' | 'scroll' | 'hover';
  dir: Direction;
  scrollHideDelay: number;
  scrollArea: ScrollAreaElement | null;
  viewport: ScrollAreaViewportElement | null;
  onViewportChange: (viewport: ScrollAreaViewportElement | null) => void;
  content: HTMLDivElement | null;
  onContentChange: (content: HTMLDivElement) => void;
  scrollbarX: ScrollAreaScrollbarElement | null;
  onScrollbarXChange: (scrollbar: ScrollAreaScrollbarElement | null) => void;
  scrollbarXEnabled: boolean;
  onScrollbarXEnabledChange: (rendered: boolean) => void;
  scrollbarY: ScrollAreaScrollbarElement | null;
  onScrollbarYChange: (scrollbar: ScrollAreaScrollbarElement | null) => void;
  scrollbarYEnabled: boolean;
  onScrollbarYEnabledChange: (rendered: boolean) => void;
  onCornerWidthChange: (width: number) => void;
  onCornerHeightChange: (height: number) => void;
}

export type ScopedProps<P> = P & { __scopeScrollArea?: Scope };
