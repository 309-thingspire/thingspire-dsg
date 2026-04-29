import React from 'react';

import { spacing } from '../../style-tokens';
import { Additional } from '../Additional/Additional';
import { CellItem } from '../CellItem/CellItem';

import type { MiddleProps } from './Middle.types';

const SIDEBAR_WIDTH = spacing.primitive['256'] + spacing.scale['24'];

const DEFAULT_BLOCKS = [
  {
    id: 'block-1',
    heading: 'Teamspaces',
    items: Array.from({ length: 5 }, (_, index) => ({
      id: `block-1-item-${index + 1}`,
      label: 'Label',
    })),
  },
];

export function Middle({ blocks = DEFAULT_BLOCKS, className, style, onItemClick }: MiddleProps) {
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
      {blocks.map((block, blockIndex) => {
        const blockId = block.id ?? `block-${blockIndex}`;
        return (
          <div
            key={blockId}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Additional type="caption" text={block.heading} />
            {block.items.map((item, itemIndex) => {
              const itemId = item.id ?? `${blockId}-item-${itemIndex}`;
              return (
                <CellItem
                  key={itemId}
                  type="default"
                  target="default"
                  active={item.active ?? false}
                  disabled={item.disabled ?? false}
                  label={item.label}
                  leadIcon={item.leadIcon}
                  badge={false}
                  tailIcon1={false}
                  tailIcon2={false}
                  onClick={onItemClick ? () => onItemClick(blockId, itemId) : undefined}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Middle;
