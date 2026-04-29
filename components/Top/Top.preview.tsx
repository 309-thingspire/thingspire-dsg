import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { Top } from './Top';

export default function TopPreviewPage() {
  const [showUser, setShowUser] = useState(true);
  const [showDivider, setShowDivider] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [showButtonStack, setShowButtonStack] = useState(true);
  const [showLabel, setShowLabel] = useState(true);

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
            Top Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            사이드바 상단 영역 합성: User + Divider + Caption + ButtonStack + Label.
          </p>
        </header>

        <div style={{ display: 'flex', gap: spacing.scale['16'], flexWrap: 'wrap' }}>
          <label><input type="checkbox" checked={showUser} onChange={(e) => setShowUser(e.target.checked)} /> User</label>
          <label><input type="checkbox" checked={showDivider} onChange={(e) => setShowDivider(e.target.checked)} /> Divider</label>
          <label><input type="checkbox" checked={showCaption} onChange={(e) => setShowCaption(e.target.checked)} /> Caption</label>
          <label><input type="checkbox" checked={showButtonStack} onChange={(e) => setShowButtonStack(e.target.checked)} /> ButtonStack</label>
          <label><input type="checkbox" checked={showLabel} onChange={(e) => setShowLabel(e.target.checked)} /> Label</label>
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
          <Top
            showUser={showUser}
            showDivider={showDivider}
            showCaption={showCaption}
            showButtonStack={showButtonStack}
            showLabel={showLabel}
          />
        </section>
      </section>
    </main>
  );
}
