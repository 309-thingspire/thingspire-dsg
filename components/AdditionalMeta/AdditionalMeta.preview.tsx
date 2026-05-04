'use client';

import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { AdditionalMeta } from './AdditionalMeta';
import type { AdditionalMetaType } from './AdditionalMeta.types';

const TYPES: AdditionalMetaType[] = [
  'buttonGroupH',
  'buttonGroupV',
  'badgeContainer',
  'text',
  'divider',
  'input',
  'tabMenu',
  'avatar',
  'icon',
  'rating',
  'pagination',
  'empty',
];

export default function AdditionalMetaPreviewPage() {
  const [type, setType] = useState<AdditionalMetaType>('buttonGroupH');

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
            Additional Meta Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            컴팩트 메타/인디케이터 보조 영역. 12 sub-shape (320 wide).
          </p>
        </header>

        <label>
          Type{' '}
          <select value={type} onChange={(event) => setType(event.target.value as AdditionalMetaType)}>
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
          <AdditionalMeta type={type} />
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>전체 12 type</h2>
          <div
            style={{
              display: 'grid',
              gap: spacing.scale['16'],
              border: `1px solid ${colors.primitive.palette.gray['2']}`,
              borderRadius: spacing.scale['12'],
              padding: spacing.scale['16'],
              backgroundColor: colors.primitive.palette.base.white,
            }}
          >
            {TYPES.map((t) => (
              <div key={t} style={{ display: 'grid', gap: spacing.scale['4'] }}>
                <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>type={t}</span>
                <AdditionalMeta type={t} />
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
