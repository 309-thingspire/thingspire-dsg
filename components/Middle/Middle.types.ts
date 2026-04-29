import type { CSSProperties, ReactNode } from 'react';

export interface MiddleBlockItem {
  id?: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  leadIcon?: ReactNode;
}

export interface MiddleBlock {
  id?: string;
  heading: string;
  items: MiddleBlockItem[];
}

export interface MiddleProps {
  blocks?: MiddleBlock[];
  className?: string;
  style?: CSSProperties;
  onItemClick?: (blockId: string, itemId: string) => void;
}
