<h1 align="center">
  ScrollArea（滚动区域）
</h1>

> 增强本机滚动功能，以实现自定义的跨浏览器样式

## 组件效果

<image src="../ScrollArea.webp"></image>

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
