import type { CSSProperties } from 'react';

import type { BottomProps } from '../Bottom/Bottom.types';
import type { MiddleProps } from '../Middle/Middle.types';
import type { TopProps } from '../Top/Top.types';

export interface SidebarProps {
  fill?: boolean;
  height?: number;
  showTop?: boolean;
  showMiddle?: boolean;
  showBottom?: boolean;
  top?: TopProps;
  middle?: MiddleProps;
  bottom?: BottomProps;
  className?: string;
  style?: CSSProperties;
}
