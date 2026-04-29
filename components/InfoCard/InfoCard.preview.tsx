import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { InfoCard } from './InfoCard';
import type { InfoCardType } from './InfoCard.types';

const TYPES: InfoCardType[] = ['lg', 'sm'];

export default function InfoCardPreviewPage() {
  const [type, setType] = useState<InfoCardType>('lg');

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
            InfoCard Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            사이드바 하단 안내/업그레이드 카드. lg(warning) / sm(success+ProgressBar).
          </p>
        </header>

        <label>
          Type{' '}
          <select value={type} onChange={(e) => setType(e.target.value as InfoCardType)}>
            {TYPES.map((option) => <option key={option} value={option}>{option}</option>)}
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
          <InfoCard type={type} />
        </section>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
            display: 'flex',
            gap: spacing.scale['24'],
            flexWrap: 'wrap',
          }}
        >
          <InfoCard type="lg" />
          <InfoCard type="sm" />
        </section>
      </section>
    </main>
  );
}
