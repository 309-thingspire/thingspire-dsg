'use client';

import React, { useMemo, useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { TextRows } from './TextRows';
import type { TextRowsDotColor, TextRowsItem } from './TextRows.types';

const COLORS: TextRowsDotColor[] = ['purple', 'blue', 'green', 'orange', 'red', 'gray'];

const ALL_ROWS: TextRowsItem[] = Array.from({ length: 10 }, (_, index) => {
  const n = String(index + 1).padStart(2, '0');
  return { id: `row-${index + 1}`, title: `Title ${n}`, content: `Content ${n}` };
});

export default function TextRowsPreviewPage() {
  const [count, setCount] = useState(5);
  const [showHeadline, setShowHeadline] = useState(true);
  const [showDot, setShowDot] = useState(true);
  const [showDivider, setShowDivider] = useState(true);
  const [dotColor, setDotColor] = useState<TextRowsDotColor>('purple');

  const rows = useMemo(
    () => ALL_ROWS.slice(0, count).map((row) => ({ ...row, dotColor })),
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
            Text Rows Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            세로 stack 의 title-content 행. 좌측 dot+title / 가운데 dotted divider / 우측 content. 1~10 rows.
          </p>
        </header>

        <div style={{ display: 'flex', gap: spacing.scale['16'], flexWrap: 'wrap', alignItems: 'center' }}>
          <label>
            Row 개수{' '}
            <select value={count} onChange={(event) => setCount(Number(event.target.value))}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label>
            Dot color{' '}
            <select value={dotColor} onChange={(event) => setDotColor(event.target.value as TextRowsDotColor)}>
              {COLORS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              checked={showHeadline}
              onChange={(event) => setShowHeadline(event.target.checked)}
            />{' '}
            Headline
          </label>
          <label>
            <input type="checkbox" checked={showDot} onChange={(event) => setShowDot(event.target.checked)} /> Dot
          </label>
          <label>
            <input
              type="checkbox"
              checked={showDivider}
              onChange={(event) => setShowDivider(event.target.checked)}
            />{' '}
            Divider
          </label>
        </div>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
            display: 'flex',
            justifyContent: 'flex-start',
            overflow: 'auto',
          }}
        >
          <TextRows
            rows={rows}
            showHeadline={showHeadline}
            showDot={showDot}
            showDivider={showDivider}
          />
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>옵션 조합</h2>
          <div
            style={{
              display: 'grid',
              gap: spacing.scale['16'],
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              border: `1px solid ${colors.primitive.palette.gray['2']}`,
              borderRadius: spacing.scale['12'],
              padding: spacing.scale['16'],
              backgroundColor: colors.primitive.palette.base.white,
              overflow: 'auto',
            }}
          >
            <div style={{ display: 'grid', gap: spacing.scale['6'] }}>
              <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>headline + dot + divider</span>
              <TextRows rows={ALL_ROWS.slice(0, 5)} />
            </div>
            <div style={{ display: 'grid', gap: spacing.scale['6'] }}>
              <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>no headline</span>
              <TextRows rows={ALL_ROWS.slice(0, 5)} showHeadline={false} />
            </div>
            <div style={{ display: 'grid', gap: spacing.scale['6'] }}>
              <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>no dot</span>
              <TextRows rows={ALL_ROWS.slice(0, 5)} showDot={false} />
            </div>
            <div style={{ display: 'grid', gap: spacing.scale['6'] }}>
              <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>no divider</span>
              <TextRows rows={ALL_ROWS.slice(0, 5)} showDivider={false} />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
