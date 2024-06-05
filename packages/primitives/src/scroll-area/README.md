<h1 align="center">
  ScrollArea（滚动区域）
</h1>

> 增强本机滚动功能，以实现自定义的跨浏览器样式

## 特性

- 滚动条位于可滚动内容的顶部，不占用空间
- 滚动是原生的；没有通过 CSS 转换进行的底层位置移动
- 仅在与控件交互时填充指针行为，因此键盘控件不受影响
- 支持从右到左的方向

## 组件效果

<image src="../../ScrollArea.webp"></image>

## 如何使用

1. 安装依赖

```sh
pnpm i @lotus-design/react-primitives
```

2. 加入样式

```tsx
import { Root, Viewport, Corner } from '@lotus-design/react-primitives/scroll-area'

export const ScrollArea = () => {
  const prefixCls = 'scroll-area';

  return (
    <Root
      className={prefixCls}
    >
      <Viewport className={`${prefixCls}-viewport`}>
        {children}
      </Viewport>
      <ScrollAreaScrollbar
        className={`${prefixCls}-scrollbar`}
      >
        <ScrollAreaThumb className={`${prefixCls}-thumb`} />
      </ScrollAreaScrollbar>
      <Corner />
    </Root>
  )
}
```
