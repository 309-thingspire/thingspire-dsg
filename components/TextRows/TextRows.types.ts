import type { CSSProperties, ReactNode } from 'react';

export const TEXT_ROWS_DOT_COLOR_OPTIONS = [
  'purple',
  'blue',
  'green',
  'orange',
  'red',
  'gray',
] as const;

export type TextRowsDotColor = (typeof TEXT_ROWS_DOT_COLOR_OPTIONS)[number];

export interface TextRowsItem {
  id?: string;
  title: ReactNode;
  content: ReactNode;
  dotColor?: TextRowsDotColor;
}

export interface TextRowsProps {
  rows?: TextRowsItem[];
  headline?: ReactNode;
  showHeadline?: boolean;
  showDot?: boolean;
  showDivider?: boolean;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
}
