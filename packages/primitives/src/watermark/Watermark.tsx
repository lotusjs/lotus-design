import React, { useEffect, useMemo, useState } from 'react';
import { Primitive } from '../primitive';
import { getPixelRatio, reRendering } from './utils';
import { FontGap, useClips } from './hooks/useClips';
import { useWatermark } from './hooks/useWatermark';
import { useRafDebounce } from './hooks/useRafDebounce';
import { useMutateObserver } from './hooks/useMutateObserver';

import type { WatermarkProps } from './interface';

const DEFAULT_GAP_X = 100;
const DEFAULT_GAP_Y = 100;

function Watermark(props: WatermarkProps) {
  const {
    className,
    style,
    // eslint-disable-next-line react/no-unstable-default-props
    font = {},
    // eslint-disable-next-line react/no-unstable-default-props
    gap = [DEFAULT_GAP_X, DEFAULT_GAP_Y],
    offset,
    width,
    height,
    image,
    content,
    zIndex = 9,
    rotate = -22,
    children,
  } = props;
  const {
    color = 'rgba(0,0,0,.15)',
    fontSize = 16,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = 'sans-serif',
    textAlign = 'center',
  } = font;
  const [gapX = DEFAULT_GAP_X, gapY = DEFAULT_GAP_Y] = gap;
  const gapXCenter = gapX / 2;
  const gapYCenter = gapY / 2;
  const offsetLeft = offset?.[0] ?? gapXCenter;
  const offsetTop = offset?.[1] ?? gapYCenter;

  const markStyle = useMemo(
    () => {
      const mergedStyle: React.CSSProperties = {
        zIndex,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundRepeat: 'repeat',
      };

      /** Calculate the style of the offset */
      let positionLeft = offsetLeft - gapXCenter;
      let positionTop = offsetTop - gapYCenter;
      if (positionLeft > 0) {
        mergedStyle.left = `${positionLeft}px`;
        mergedStyle.width = `calc(100% - ${positionLeft}px)`;
        positionLeft = 0;
      }
      if (positionTop > 0) {
        mergedStyle.top = `${positionTop}px`;
        mergedStyle.height = `calc(100% - ${positionTop}px)`;
        positionTop = 0;
      }
      mergedStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

      return mergedStyle;
    },
    [zIndex, offsetLeft, gapXCenter, offsetTop, gapYCenter],
  );

  const [container, setContainer] = useState<HTMLDivElement | null>();
  const [subElements] = useState(new Set<HTMLElement>());

  const targetElements = useMemo(() => {
    const list = container ? [container] : [];
    return [...list, ...Array.from(subElements)];
  }, [container, subElements]);

  // ============================ Content =============================

  const getMarkSize = (ctx: CanvasRenderingContext2D) => {
    let defaultWidth = 120;
    let defaultHeight = 64;

    if (!image) {
      ctx.font = `${Number(fontSize)}px ${fontFamily}`;
      const contents = Array.isArray(content) ? content : [content];
      const sizes = contents.map((item) => {
        const metrics = ctx.measureText(item!);

        return [metrics.width, metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent];
      });

      defaultWidth = Math.ceil(Math.max(...sizes.map(size => size[0])));
      defaultHeight
          = Math.ceil(Math.max(...sizes.map(size => size[1]))) * contents.length
          + (contents.length - 1) * FontGap;
    }

    return [width ?? defaultWidth, height ?? defaultHeight] as const;
  };

  const getClips = useClips();

  const [watermarkInfo, setWatermarkInfo] = useState<[base64: string, contentWidth: number]>(
    null!,
  );

  const renderWatermark = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const ratio = getPixelRatio();
      const [markWidth, markHeight] = getMarkSize(ctx);

      const drawCanvas = (
        drawContent?: NonNullable<WatermarkProps['content']> | HTMLImageElement,
      ) => {
        const [nextClips, clipWidth] = getClips(
          drawContent || '',
          rotate,
          ratio,
          markWidth,
          markHeight,
          {
            color,
            fontSize,
            fontStyle,
            fontWeight,
            fontFamily,
            textAlign,
          },
          gapX,
          gapY,
        );

        setWatermarkInfo([nextClips, clipWidth]);
      };

      if (image) {
        const img = new Image();
        img.onload = () => {
          drawCanvas(img);
        };
        img.onerror = () => {
          drawCanvas(content);
        };
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
      }
      else {
        drawCanvas(content);
      }
    }
  };

  const syncWatermark = useRafDebounce(renderWatermark);

  // ============================= Effect =============================

  const { appendWatermark, isWatermarkEle } = useWatermark(markStyle);

  useEffect(() => {
    if (watermarkInfo) {
      targetElements.forEach((holder) => {
        appendWatermark(watermarkInfo[0], watermarkInfo[1], holder);
      });
    }
  }, [watermarkInfo, targetElements]);

  // ============================ Observe =============================

  const onMutate = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      if (reRendering(mutation, isWatermarkEle)) {
        syncWatermark();
      }
    });
  };

  useMutateObserver(targetElements, onMutate);

  useEffect(syncWatermark, [
    rotate,
    zIndex,
    width,
    height,
    image,
    content,
    color,
    fontSize,
    fontWeight,
    fontStyle,
    fontFamily,
    textAlign,
    gapX,
    gapY,
    offsetLeft,
    offsetTop,
  ]);

  // ============================= Render =============================

  return (
    <Primitive.div
      ref={setContainer}
      className={className}
      style={{ position: 'relative', ...style }}
    >
      {children}
    </Primitive.div>
  );
}

/* ---------------------------------------------------------------------------------------------- */

const Root = Watermark;

export {
  Watermark,
  Root,
};
export type { WatermarkProps };
