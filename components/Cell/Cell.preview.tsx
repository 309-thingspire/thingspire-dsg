import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { Cell } from './Cell';

export default function CellPreviewPage() {
  const [expandable, setExpandable] = useState(true);

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
            Cell Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            CellItem 헤더 + 선택적 indented 자식. expandable 토글로 확장.
          </p>
        </header>

        <label>
          <input type="checkbox" checked={expandable} onChange={(e) => setExpandable(e.target.checked)} /> Expandable
        </label>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
            display: 'flex',
            gap: spacing.scale['24'],
          }}
        >
          <Cell expandable={expandable} />
        </section>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
            display: 'flex',
            gap: spacing.scale['24'],
          }}
        >
          <Cell expandable={false} />
          <Cell expandable={true} />
        </section>
      </section>
    </main>
  );
}
