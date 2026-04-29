import React from 'react';

import { colors, spacing } from '../../style-tokens';
import { Bottom } from '../Bottom/Bottom';
import { Middle } from '../Middle/Middle';
import { Top } from '../Top/Top';

import type { SidebarProps } from './Sidebar.types';

const palette = colors.primitive.palette;

const SIDEBAR_WIDTH = spacing.primitive['256'] + spacing.scale['24'];
const SIDEBAR_HEIGHT = spacing.scale['1024'];

export function Sidebar({
  fill = false,
  height = SIDEBAR_HEIGHT,
  showTop = true,
  showMiddle = true,
  showBottom = true,
  top,
  middle,
  bottom,
  className,
  style,
}: SidebarProps) {
  return (
    <div
      className={className}
      style={{
        width: SIDEBAR_WIDTH,
        height,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing.scale['16'],
        paddingBlock: spacing.scale['8'],
        backgroundColor: fill ? palette.gray['1'] : palette.base.white,
        ...style,
      }}
    >
      {showTop ? (
        <Top
          showButtonStack={false}
          showLabel={false}
          {...top}
          style={{ width: '100%', ...top?.style }}
        />
      ) : null}

      {showMiddle ? (
        <Middle
          {...middle}
          style={{ width: '100%', ...middle?.style }}
        />
      ) : null}

      {showBottom ? (
        <Bottom
          {...bottom}
          style={{ width: '100%', flex: '1 0 0', justifyContent: 'flex-end', ...bottom?.style }}
        />
      ) : null}
    </div>
  );
}

export default Sidebar;
