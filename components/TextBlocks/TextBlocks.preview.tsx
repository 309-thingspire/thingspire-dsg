'use client';

import React, { useMemo, useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { TextBlocks } from './TextBlocks';
import type { TextBlocksDotColor, TextBlocksItem } from './TextBlocks.types';

const COLORS: TextBlocksDotColor[] = ['purple', 'blue', 'green', 'orange', 'red', 'gray'];

const ALL_BLOCKS: TextBlocksItem[] = [
  { id: 'block-1', title: 'Title 01', label: 'Label 01' },
  { id: 'block-2', title: 'Title 02', label: 'Label 02' },
  { id: 'block-3', title: 'Title 03', label: 'Label 03' },
  { id: 'block-4', title: 'Title 04', label: 'Label 04' },
  { id: 'block-5', title: 'Title 05', label: 'Label 05' },
];

export default function TextBlocksPreviewPage() {
  const [count, setCount] = useState(5);
  const [dotColor, setDotColor] = useState<TextBlocksDotColor>('purple');

  const blocks = useMemo(
    () => ALL_BLOCKS.slice(0, count).map((block) => ({ ...block, dotColor })),
    [count, dotColor],
  );

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
              letterSpacing: `${typography.scale.h3.bold.letterSpacing}px`,
            }}
          >
            Text Blocks Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            가로 스택 텍스트 블록 (1~5 blocks). 각 block 에 dot + title + label.
          </p>
        </header>

        <div style={{ display: 'flex', gap: spacing.scale['16'], flexWrap: 'wrap', alignItems: 'center' }}>
          <label>
            Block 개수{' '}
            <select value={count} onChange={(event) => setCount(Number(event.target.value))}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label>
            Dot color{' '}
            <select value={dotColor} onChange={(event) => setDotColor(event.target.value as TextBlocksDotColor)}>
              {COLORS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
            display: 'flex',
            justifyContent: 'center',
            overflow: 'auto',
          }}
        >
          <TextBlocks blocks={blocks} />
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>1~5 block 매트릭스</h2>
          <div
            style={{
              display: 'grid',
              gap: spacing.scale['16'],
              border: `1px solid ${colors.primitive.palette.gray['2']}`,
              borderRadius: spacing.scale['12'],
              padding: spacing.scale['16'],
              backgroundColor: colors.primitive.palette.base.white,
              overflow: 'auto',
            }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} style={{ display: 'grid', gap: spacing.scale['6'] }}>
                <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>{n} block</span>
                <TextBlocks blocks={ALL_BLOCKS.slice(0, n)} />
              </div>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>Dot color 변형</h2>
          <div
            style={{
              display: 'grid',
              gap: spacing.scale['12'],
              border: `1px solid ${colors.primitive.palette.gray['2']}`,
              borderRadius: spacing.scale['12'],
              padding: spacing.scale['16'],
              backgroundColor: colors.primitive.palette.base.white,
              overflow: 'auto',
            }}
          >
            {COLORS.map((c) => (
              <div key={c} style={{ display: 'grid', gap: spacing.scale['6'] }}>
                <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>dotColor={c}</span>
                <TextBlocks
                  blocks={[
                    { id: `${c}-1`, title: 'Title 01', label: 'Label 01', dotColor: c },
                    { id: `${c}-2`, title: 'Title 02', label: 'Label 02', dotColor: c },
                    { id: `${c}-3`, title: 'Title 03', label: 'Label 03', dotColor: c },
                  ]}
                />
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
