import type { CSSProperties, MouseEvent, MouseEventHandler, ReactNode } from 'react';

export const CELL_ITEM_TYPE_OPTIONS = ['default', 'iconOnly'] as const;
export const CELL_ITEM_STATE_OPTIONS = ['default', 'hover', 'disabled'] as const;
export const CELL_ITEM_TARGET_OPTIONS = ['default', 'indented'] as const;

export type CellItemType = (typeof CELL_ITEM_TYPE_OPTIONS)[number];
export type CellItemState = (typeof CELL_ITEM_STATE_OPTIONS)[number];
export type CellItemTarget = (typeof CELL_ITEM_TARGET_OPTIONS)[number];

export interface CellItemProps {
  type?: CellItemType;
  state?: CellItemState;
  forceState?: CellItemState;
  active?: boolean;
  target?: CellItemTarget;
  label?: string;
  leadIcon?: ReactNode;
  showLeadIcon?: boolean;
  tailIcon1?: boolean | ReactNode;
  tailIcon2?: boolean | ReactNode;
  badge?: boolean | string;
  showLine?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLElement>;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  onTailIcon1Click?: MouseEventHandler<HTMLButtonElement>;
  onTailIcon2Click?: MouseEventHandler<HTMLButtonElement>;
}
