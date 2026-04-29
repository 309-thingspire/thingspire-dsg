import type { CSSProperties, MouseEvent, MouseEventHandler, ReactNode } from 'react';

export const TAIL_ICON_SIZE_OPTIONS = ['sm', 'lg'] as const;
export const TAIL_ICON_STATE_OPTIONS = ['default', 'hover', 'disabled'] as const;

export type TailIconSize = (typeof TAIL_ICON_SIZE_OPTIONS)[number];
export type TailIconState = (typeof TAIL_ICON_STATE_OPTIONS)[number];

export interface TailIconProps {
  size?: TailIconSize;
  state?: TailIconState;
  forceState?: TailIconState;
  icon?: ReactNode;
  disabled?: boolean;
  interactive?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
}
