import React, { useState } from 'react';

import { colors, radius, spacing } from '../../style-tokens';
import { IconAddLine } from '../icons';

import type { TailIconProps, TailIconSize, TailIconState } from './TailIcon.types';

const palette = colors.primitive.palette;

const SIZE_TO_PADDING: Record<TailIconSize, number> = {
  sm: spacing.scale['2'],
  lg: spacing.scale['4'],
};

const SIZE_TO_PX: Record<TailIconSize, number> = {
  sm: spacing.scale['16'],
  lg: spacing.scale['20'],
};

function resolveState(
  forceState: TailIconState | undefined,
  hovered: boolean,
  disabled: boolean,
): TailIconState {
  if (disabled || forceState === 'disabled') {
    return 'disabled';
  }

  if (forceState) {
    return forceState;
  }

  return hovered ? 'hover' : 'default';
}

function getBackgroundColor(state: TailIconState): string {
  if (state === 'hover') {
    return palette.gray['1a'];
  }

  return palette.base.transparent;
}

function getIconColor(state: TailIconState): string {
  if (state === 'disabled') {
    return palette.gray['5a'];
  }
  return palette.gray['9a'];
}

export function TailIcon({
  size = 'lg',
  state,
  forceState,
  icon,
  disabled = false,
  interactive,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: TailIconProps) {
  const [hovered, setHovered] = useState(false);

  const resolvedState = resolveState(forceState ?? state, hovered, disabled);
  const padding = SIZE_TO_PADDING[size];
  const iconPx = SIZE_TO_PX[size];
  const backgroundColor = getBackgroundColor(resolvedState);
  const iconColor = getIconColor(resolvedState);
  const isInteractive = interactive ?? Boolean(onClick);

  const iconNode = icon ?? <IconAddLine aria-hidden style={{ width: iconPx, height: iconPx, display: 'block' }} />;

  const sharedStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding,
    borderRadius: radius.scale.xs,
    backgroundColor,
    color: iconColor,
    boxSizing: 'border-box',
    ...style,
  };

  if (isInteractive) {
    return (
      <button
        type="button"
        className={className}
        disabled={resolvedState === 'disabled'}
        onMouseEnter={(event) => {
          if (!disabled) {
            setHovered(true);
          }
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          if (!disabled) {
            setHovered(false);
          }
          onMouseLeave?.(event);
        }}
        onClick={(event) => {
          if (resolvedState === 'disabled') {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        style={{
          ...sharedStyles,
          borderStyle: 'none',
          cursor: resolvedState === 'disabled' ? 'not-allowed' : 'pointer',
          appearance: 'none',
          outline: 'none',
        }}
      >
        {iconNode}
      </button>
    );
  }

  return (
    <span
      className={className}
      onMouseEnter={(event) => {
        if (!disabled) {
          setHovered(true);
        }
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        if (!disabled) {
          setHovered(false);
        }
        onMouseLeave?.(event);
      }}
      style={sharedStyles}
    >
      {iconNode}
    </span>
  );
}

export default TailIcon;
