import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

export const INFO_CARD_TYPE_OPTIONS = ['lg', 'sm'] as const;
export type InfoCardType = (typeof INFO_CARD_TYPE_OPTIONS)[number];

export interface InfoCardProps {
  type?: InfoCardType;
  label?: string;
  caption?: string;
  leadIcon?: ReactNode;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  showCloseButton?: boolean;
  progressLabel?: string;
  progressState?: string;
  progressValue?: number;
  className?: string;
  style?: CSSProperties;
  onPrimaryClick?: MouseEventHandler<HTMLButtonElement>;
  onSecondaryClick?: MouseEventHandler<HTMLButtonElement>;
  onClose?: MouseEventHandler<HTMLButtonElement>;
}
