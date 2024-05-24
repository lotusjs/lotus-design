export function getAnimationName(styles?: CSSStyleDeclaration) {
  return styles?.animationName || 'none';
}
