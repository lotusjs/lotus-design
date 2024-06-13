import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Slot } from './Slot';
import { Slottable } from './Slottable';

const Button = React.forwardRef<
  React.ElementRef<'button'>,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  }
>(({ children, asChild = false, iconLeft, iconRight, ...props }, forwardedRef) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp {...props} ref={forwardedRef}>
      {iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight}
    </Comp>
  );
});

describe('given a Button with Slottable', () => {
  describe('without asChild', () => {
    it('should render a button with icon on the left/right', async () => {
      const tree = render(
        <Button iconLeft={<span>left</span>} iconRight={<span>right</span>}>
          Button
          {' '}
          <em>text</em>
        </Button>,
      );

      expect(tree.container).toMatchSnapshot();
    });

    describe('with asChild', () => {
      it('should render a link with icon on the left/right', async () => {
        const tree = render(
          <Button iconLeft={<span>left</span>} iconRight={<span>right</span>} asChild>
            <a href="https://radix-ui.com">
              Button
              {' '}
              <em>text</em>
            </a>
          </Button>,
        );

        expect(tree.container).toMatchSnapshot();
      });
    });
  });
});
