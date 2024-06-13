import { createContextScope } from '../context';
import { SCROLLBAR_NAME, SCROLL_AREA_NAME } from './constants';
import type { ScrollAreaContextValue, ScrollbarContext } from './types';

const [createScrollAreaContext, createScrollAreaScope] = createContextScope(SCROLL_AREA_NAME);

const [ScrollAreaProvider, useScrollAreaContext]
  = createScrollAreaContext<ScrollAreaContextValue>(SCROLL_AREA_NAME);

const [ScrollbarProvider, useScrollbarContext]
  = createScrollAreaContext<ScrollbarContext>(SCROLLBAR_NAME);

export {
  ScrollAreaProvider,
  useScrollAreaContext,

  ScrollbarProvider,
  useScrollbarContext,

  createScrollAreaScope,
  createScrollAreaContext,
};
