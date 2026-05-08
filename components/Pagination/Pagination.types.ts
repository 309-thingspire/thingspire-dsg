import type { HTMLAttributes } from 'react';

export type PaginationType = 'arrows' | 'numbers' | 'buttons';

export type PaginationSize = 'md' | 'sm';

export type PaginationInteractionState = 'default' | 'hover' | 'focus' | 'disabled';

export interface PaginationNumberItem {
  id: string;
  label: string;
  kind?: 'page' | 'more';
  active?: boolean;
  disabled?: boolean;
}

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  type?: PaginationType;
  size?: PaginationSize;
  interactionState?: PaginationInteractionState;
  showDots?: boolean;
  dotCount?: number;
  activeDotIndex?: number;
  leftButtonLabel?: string;
  rightButtonLabel?: string;
  numberItems?: PaginationNumberItem[];
  onPrevClick?: () => void;
  onNextClick?: () => void;
  onNumberClick?: (id: string) => void;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
}

