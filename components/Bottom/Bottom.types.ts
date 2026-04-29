import type { CSSProperties } from 'react';

import type { InfoCardProps } from '../InfoCard/InfoCard.types';
import type { MiddleBlock } from '../Middle/Middle.types';
import type { UserProps } from '../User/User.types';

export interface BottomProps {
  showCard?: boolean;
  showCells?: boolean;
  showUser?: boolean;
  card?: InfoCardProps;
  cells?: MiddleBlock;
  user?: UserProps;
  className?: string;
  style?: CSSProperties;
}
