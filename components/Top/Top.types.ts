import type { CSSProperties } from 'react';

import type { UserProps } from '../User/User.types';

export interface TopProps {
  showUser?: boolean;
  showDivider?: boolean;
  showCaption?: boolean;
  showButtonStack?: boolean;
  showLabel?: boolean;
  user?: UserProps;
  captionText?: string;
  buttonLabels?: [string, string];
  labelText?: string;
  className?: string;
  style?: CSSProperties;
}
