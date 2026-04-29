import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { Additional } from './Additional';
import type { AdditionalType } from './Additional.types';

const TYPES: AdditionalType[] = ['divider', 'caption', 'buttonStack', 'label'];

export default function AdditionalPreviewPage() {
  const [type, setType] = useState<AdditionalType>('divider');

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
            Additional Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            Sidebar 영역에서 보조 정보를 표시하는 4종 sub-shape: divider / caption / buttonStack / label
          </p>
        </header>

        <label style={{ display: 'flex', gap: spacing.scale['8'], alignItems: 'center' }}>
          <span style={{ minWidth: spacing.scale['56'] }}>Type</span>
          <select value={type} onChange={(e) => setType(e.target.value as AdditionalType)}>
            {TYPES.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
          }}
        >
          <Additional type={type} />
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['16'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>전체 4종</h2>
          <div
            style={{
              border: `1px solid ${colors.primitive.palette.gray['2']}`,
              borderRadius: spacing.scale['12'],
              padding: spacing.scale['16'],
              backgroundColor: colors.primitive.palette.base.white,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: spacing.scale['8'],
            }}
          >
            <Additional type="divider" />
            <Additional type="caption" />
            <Additional type="buttonStack" />
            <Additional type="label" />
          </div>
        </section>
      </section>
    </main>
  );
}
