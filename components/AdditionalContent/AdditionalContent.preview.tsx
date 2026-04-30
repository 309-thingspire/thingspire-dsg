'use client';

import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { AdditionalContent } from './AdditionalContent';
import type { AdditionalContentType } from './AdditionalContent.types';

const TYPES: AdditionalContentType[] = [
  'divider',
  'label',
  'caption',
  'button',
  'doubleButton',
  'searchInput',
  'tags',
  'segmented',
];

export default function AdditionalContentPreviewPage() {
  const [type, setType] = useState<AdditionalContentType>('divider');

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
            Additional Content Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            FeatureCard / 콘텐츠 카드 안에 넣는 보조 영역. 8 sub-shape (320 wide).
          </p>
        </header>

        <label>
          Type{' '}
          <select value={type} onChange={(event) => setType(event.target.value as AdditionalContentType)}>
            {TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <AdditionalContent type={type} />
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>전체 8 type</h2>
          <div
            style={{
              display: 'grid',
              gap: spacing.scale['8'],
              border: `1px solid ${colors.primitive.palette.gray['2']}`,
              borderRadius: spacing.scale['12'],
              padding: spacing.scale['16'],
              backgroundColor: colors.primitive.palette.base.white,
            }}
          >
            {TYPES.map((t) => (
              <div key={t} style={{ display: 'grid', gap: spacing.scale['4'] }}>
                <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>type={t}</span>
                <AdditionalContent type={t} />
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
