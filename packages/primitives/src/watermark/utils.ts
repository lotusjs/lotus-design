export function toLowercaseSeparator(key: string) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function getStyleStr(style: React.CSSProperties): string {
  return Object.keys(style)
    .map(key => `${toLowercaseSeparator(key)}: ${style[key as keyof React.CSSProperties]};`)
    .join(' ');
}

export function getPixelRatio() {
  return window.devicePixelRatio || 1;
}

/** Whether to re-render the watermark */
export function reRendering(mutation: MutationRecord, isWatermarkEle: (ele: Node) => boolean) {
  let flag = false;
  // Whether to delete the watermark node
  if (mutation.removedNodes.length) {
    flag = Array.from<Node>(mutation.removedNodes).some(node => isWatermarkEle(node));
  }
  // Whether the watermark dom property value has been modified
  if (mutation.type === 'attributes' && isWatermarkEle(mutation.target)) {
    flag = true;
  }
  return flag;
}
