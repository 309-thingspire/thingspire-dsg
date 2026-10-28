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
  /** Accessible name of the previous arrow button (arrows / numbers). Default 'Previous page'. */
  prevAriaLabel?: string;
  /** Accessible name of the next arrow button (arrows / numbers). Default 'Next page'. */
  nextAriaLabel?: string;
  onPrevClick?: () => void;
  onNextClick?: () => void;
  onNumberClick?: (id: string) => void;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
}

