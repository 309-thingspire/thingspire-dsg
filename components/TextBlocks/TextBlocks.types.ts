import type { CSSProperties, ReactNode } from 'react';

export const TEXT_BLOCKS_DOT_COLOR_OPTIONS = [
  'purple',
  'blue',
  'green',
  'orange',
  'red',
  'gray',
] as const;

export type TextBlocksDotColor = (typeof TEXT_BLOCKS_DOT_COLOR_OPTIONS)[number];

export interface TextBlocksItem {
  id?: string;
  title: ReactNode;
  label: ReactNode;
  dotColor?: TextBlocksDotColor;
  showDot?: boolean;
}

export interface TextBlocksProps {
  blocks?: TextBlocksItem[];
  width?: number | string;
  className?: string;
  style?: CSSProperties;
}
