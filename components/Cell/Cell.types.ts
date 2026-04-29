import type { CSSProperties, ReactNode } from 'react';

export interface CellChildItem {
  id?: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  leadIcon?: ReactNode;
  showLine?: boolean;
}

export interface CellProps {
  expandable?: boolean;
  defaultExpanded?: boolean;
  expanded?: boolean;
  label?: string;
  active?: boolean;
  leadIcon?: ReactNode;
  badge?: boolean | string;
  tailIcon1?: boolean;
  tailIcon2?: boolean;
  childItems?: CellChildItem[];
  className?: string;
  style?: CSSProperties;
  onMainClick?: () => void;
  onChildClick?: (id: string) => void;
  onToggleExpanded?: (next: boolean) => void;
}
