import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { Middle } from './Middle';
import type { MiddleBlock } from './Middle.types';

const ALL_BLOCKS: MiddleBlock[] = [
  { id: 'block-1', heading: 'Teamspaces', items: Array.from({ length: 5 }, (_, i) => ({ id: `b1-${i}`, label: 'Label' })) },
  { id: 'block-2', heading: 'Favorites', items: Array.from({ length: 5 }, (_, i) => ({ id: `b2-${i}`, label: 'Label' })) },
  { id: 'block-3', heading: 'Recent', items: Array.from({ length: 5 }, (_, i) => ({ id: `b3-${i}`, label: 'Label' })) },
  { id: 'block-4', heading: 'Archived', items: Array.from({ length: 5 }, (_, i) => ({ id: `b4-${i}`, label: 'Label' })) },
];

export default function MiddlePreviewPage() {
  const [count, setCount] = useState(1);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: colors.primitive.palette.base.white,
        padding: spacing.scale['24'],
        fontFamily: typography.scale.bodyM.medium.fontFamily,
      }}
    >
      <section
        style={{
          maxWidth: spacing.scale['1024'],
          marginInline: 'auto',
          display: 'grid',
          gap: spacing.scale['24'],
        }}
      >
        <header style={{ display: 'grid', gap: spacing.scale['8'] }}>
          <h1
            style={{
              margin: 0,
              fontFamily: typography.scale.h3.bold.fontFamily,
              fontSize: typography.scale.h3.bold.fontSize,
              fontWeight: typography.scale.h3.bold.fontWeight,
              lineHeight: `${typography.scale.h3.bold.lineHeight}px`,
            }}
          >
            Middle Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            Caption header + CellItem 그룹의 반복. 1~4개 block 토글.
          </p>
        </header>

        <label>
          Block 개수{' '}
          <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Middle blocks={ALL_BLOCKS.slice(0, count)} />
        </section>
      </section>
    </main>
  );
}
