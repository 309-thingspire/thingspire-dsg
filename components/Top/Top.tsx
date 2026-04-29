import React from 'react';

import { spacing } from '../../style-tokens';
import { Additional } from '../Additional/Additional';
import { User } from '../User/User';

import type { TopProps } from './Top.types';

const SIDEBAR_WIDTH = spacing.primitive['256'] + spacing.scale['24'];

export function Top({
  showUser = true,
  showDivider = true,
  showCaption = true,
  showButtonStack = true,
  showLabel = true,
  user,
  captionText,
  buttonLabels,
  labelText,
  className,
  style,
}: TopProps) {
  return (
    <div
      className={className}
      style={{
        width: SIDEBAR_WIDTH,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        ...style,
      }}
    >
      {showUser ? <User {...user} /> : null}
      {showDivider ? <Additional type="divider" /> : null}
      {showCaption ? <Additional type="caption" text={captionText} /> : null}
      {showButtonStack ? <Additional type="buttonStack" buttons={buttonLabels} /> : null}
      {showLabel ? <Additional type="label" text={labelText} /> : null}
    </div>
  );
}

export default Top;
