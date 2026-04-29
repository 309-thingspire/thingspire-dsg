import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { Bottom } from './Bottom';

export default function BottomPreviewPage() {
  const [showCard, setShowCard] = useState(true);
  const [showCells, setShowCells] = useState(true);
  const [showUser, setShowUser] = useState(true);

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
            Bottom Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            사이드바 하단 영역 합성: InfoCard(lg) + Cells block + User.
          </p>
        </header>

        <div style={{ display: 'flex', gap: spacing.scale['16'], flexWrap: 'wrap' }}>
          <label><input type="checkbox" checked={showCard} onChange={(e) => setShowCard(e.target.checked)} /> Card</label>
          <label><input type="checkbox" checked={showCells} onChange={(e) => setShowCells(e.target.checked)} /> Cells</label>
          <label><input type="checkbox" checked={showUser} onChange={(e) => setShowUser(e.target.checked)} /> User</label>
        </div>

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
          <Bottom showCard={showCard} showCells={showCells} showUser={showUser} />
        </section>
      </section>
    </main>
  );
}
