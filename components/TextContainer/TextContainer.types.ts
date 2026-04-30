import type { CSSProperties, ReactNode } from 'react';

export const TEXT_CONTAINER_SIZE_OPTIONS = [
  'lg',
  'md',
  'sm',
  'xs',
  'xxs',
  'xxxs',
  'xxxxs',
] as const;

export const TEXT_CONTAINER_ALIGN_OPTIONS = ['left', 'center'] as const;

export type TextContainerSize = (typeof TEXT_CONTAINER_SIZE_OPTIONS)[number];
export type TextContainerAlign = (typeof TEXT_CONTAINER_ALIGN_OPTIONS)[number];

export interface TextContainerProps {
  size?: TextContainerSize;
  align?: TextContainerAlign;
  headline?: ReactNode;
  description?: ReactNode;
  caption?: ReactNode;
  showDescription?: boolean;
  showCaption?: boolean;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
}
