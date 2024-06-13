import type React from 'react';
import { useState } from 'react';
import { getStyleStr } from '../utils';

export const BaseSize = 2;
export const FontGap = 3;

const emphasizedStyle = {
  visibility: 'visible !important',
};

export type AppendWatermark = (
  base64Url: string,
  markWidth: number,
  container: HTMLElement,
) => void;

export function useWatermark(
  markStyle: React.CSSProperties,
): {
    appendWatermark: AppendWatermark;
    removeWatermark: (container: HTMLElement) => void;
    isWatermarkEle: (ele: Node) => boolean;
  } {
  const [watermarkMap] = useState(() => new Map<HTMLElement, HTMLDivElement>());

  const appendWatermark = (base64Url: string, markWidth: number, container: HTMLElement) => {
    if (container) {
      if (!watermarkMap.get(container)) {
        const newWatermarkEle = document.createElement('div');
        watermarkMap.set(container, newWatermarkEle);
      }

      const watermarkEle = watermarkMap.get(container)!;

      watermarkEle.setAttribute(
        'style',
        getStyleStr({
          ...markStyle,
          backgroundImage: `url('${base64Url}')`,
          backgroundSize: `${Math.floor(markWidth)}px`,
          ...(emphasizedStyle as React.CSSProperties),
        }),
      );
      // Prevents using the browser `Hide Element` to hide watermarks
      watermarkEle.removeAttribute('class');

      if (watermarkEle.parentElement !== container) {
        container.append(watermarkEle);
      }
    }

    return watermarkMap.get(container);
  };

  const removeWatermark = (container: HTMLElement) => {
    const watermarkEle = watermarkMap.get(container);

    if (watermarkEle && container) {
      container.removeChild(watermarkEle);
    }

    watermarkMap.delete(container);
  };

  const isWatermarkEle = (ele: any) => Array.from(watermarkMap.values()).includes(ele);

  return { appendWatermark, removeWatermark, isWatermarkEle };
}
