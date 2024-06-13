import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Slot } from './Slot';

type TriggerProps = React.ComponentProps<'button'> & { as: React.ElementType };

const Trigger = ({ as: Comp = 'button', ...props }: TriggerProps) => <Comp {...props} />;

describe('given a slotted Trigger', () => {
  afterEach(() => {
    cleanup();
  });

  describe('with onClick on itself', () => {
    const handleClick = vi.fn();

    beforeEach(() => {
      handleClick.mockReset();

      render(
        <Trigger as={Slot} onClick={handleClick}>
          <button type="button">Click me</button>
        </Trigger>,
      );
      fireEvent.click(screen.getByRole('button'));
    });

    it('should call the onClick passed to the Trigger', async () => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('with onClick on the child', () => {
    const handleClick = vi.fn();

    beforeEach(() => {
      handleClick.mockReset();

      render(
        <Trigger as={Slot}>
          <button type="button" onClick={handleClick}>
            Click me
          </button>
        </Trigger>,
      );

      fireEvent.click(screen.getByRole('button'));
    });

    it('should call the child\'s onClick', async () => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('with onClick on itself AND the child', () => {
    const handleTriggerClick = vi.fn();
    const handleChildClick = vi.fn();

    beforeEach(() => {
      handleTriggerClick.mockReset();
      handleChildClick.mockReset();

      render(
        <Trigger as={Slot} onClick={handleTriggerClick}>
          <button type="button" onClick={handleChildClick}>
            Click me
          </button>
        </Trigger>,
      );

      fireEvent.click(screen.getByRole('button'));
    });

    it('should call the Trigger\'s onClick', async () => {
      expect(handleTriggerClick).toHaveBeenCalledTimes(1);
    });

    it('should call the child\'s onClick', async () => {
      expect(handleChildClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('with onClick on itself AND undefined onClick on the child', () => {
    const handleTriggerClick = vi.fn();

    beforeEach(() => {
      handleTriggerClick.mockReset();
      render(
        <Trigger as={Slot} onClick={handleTriggerClick}>
          <button type="button" onClick={undefined}>
            Click me
          </button>
        </Trigger>,
      );
      fireEvent.click(screen.getByRole('button'));
    });

    it('should call the Trigger\'s onClick', async () => {
      expect(handleTriggerClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('with undefined onClick on itself AND onClick on the child', () => {
    const handleChildClick = vi.fn();

    beforeEach(() => {
      handleChildClick.mockReset();
      render(
        <Trigger as={Slot} onClick={undefined}>
          <button type="button" onClick={handleChildClick}>
            Click me
          </button>
        </Trigger>,
      );
      fireEvent.click(screen.getByRole('button'));
    });

    it('should call the child\'s onClick', async () => {
      expect(handleChildClick).toHaveBeenCalledTimes(1);
    });
  });
});
