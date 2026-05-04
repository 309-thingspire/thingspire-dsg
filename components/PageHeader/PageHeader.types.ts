import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

import type { ButtonVariant } from '../Button/Button.types';

export interface PageHeaderActionItem {
  id?: string;
  label: ReactNode;
  variant?: ButtonVariant;
  leadIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface PageHeaderProps {
  showTop?: boolean;
  showBottom?: boolean;

  // Top
  showBackButton?: boolean;
  backIcon?: ReactNode;
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
  headline?: ReactNode;
  description?: ReactNode;
  showDescription?: boolean;
  topActions?: PageHeaderActionItem[];

  // Bottom
  bottomLeftActions?: PageHeaderActionItem[];
  bottomRightActions?: PageHeaderActionItem[];

  width?: number | string;
  className?: string;
  style?: CSSProperties;
}
