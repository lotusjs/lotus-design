import type React from 'react';
import type { Primitive } from '../primitive';

export type WatermarkElement = React.ElementRef<typeof Primitive.div>;

export interface WatermarkProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 图片源，优先于文字
   */
  image?: string;
  /**
   * 水印文字内容
   */
  content?: string | string[];
  /**
   * 追加的水印元素的 z-index
   */
  zIndex?: number;
  /**
   * 水印的宽度
   */
  width?: number;
  /**
   * 水印的高度
   */
  height?: number;
  /**
   * 水印绘制时，旋转的角度
   */
  rotate?: number;
  font?: {
    color?: CanvasFillStrokeStyles['fillStyle'];
    fontSize?: number | string;
    fontWeight?: 'normal' | 'light' | 'weight' | number;
    fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
    fontFamily?: string;
    textAlign?: CanvasTextAlign;
  };
  /**
   * 水印之间的间距
   */
  gap?: [number, number];
  /**
   * 水印距离容器左上角的偏移量
   */
  offset?: [number, number];
  inherit?: boolean;
  children?: React.ReactNode;
}
