import React from 'react';

import { spacing } from '../../style-tokens';
import { Additional } from '../Additional/Additional';
import { CellItem } from '../CellItem/CellItem';
import { InfoCard } from '../InfoCard/InfoCard';
import { User } from '../User/User';

import type { BottomProps } from './Bottom.types';

const SIDEBAR_WIDTH = spacing.primitive['256'] + spacing.scale['24'];

const DEFAULT_CELLS = {
  heading: 'Teamspaces',
  items: Array.from({ length: 3 }, (_, index) => ({
    id: `bottom-item-${index + 1}`,
    label: 'Label',
  })),
};

export function Bottom({
  showCard = true,
  showCells = true,
  showUser = true,
  card,
  cells = DEFAULT_CELLS,
  user,
  className,
  style,
}: BottomProps) {
  return (
    <div
      className={className}
      style={{
        width: SIDEBAR_WIDTH,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing.scale['16'],
        ...style,
      }}
    >
      {showCard ? <InfoCard type="lg" {...card} /> : null}

      {showCells ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Additional type="caption" text={cells.heading} />
          {cells.items.map((item, index) => (
            <CellItem
              key={item.id ?? `${cells.heading}-${index}`}
              type="default"
              target="default"
              label={item.label}
              leadIcon={item.leadIcon}
              active={item.active ?? false}
              disabled={item.disabled ?? false}
              badge={false}
              tailIcon1={false}
              tailIcon2={false}
            />
          ))}
        </div>
      ) : null}

      {showUser ? <User {...user} /> : null}
    </div>
  );
}

export default Bottom;
