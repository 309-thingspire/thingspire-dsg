import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { Sidebar } from './Sidebar';

export default function SidebarPreviewPage() {
  const [fill, setFill] = useState(false);
  const [showTop, setShowTop] = useState(true);
  const [showMiddle, setShowMiddle] = useState(true);
  const [showBottom, setShowBottom] = useState(true);

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
            Sidebar Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            Top + Middle + Bottom 합성 사이드바 (molecule). fill 토글로 배경 채우기.
          </p>
        </header>

        <div style={{ display: 'flex', gap: spacing.scale['16'], flexWrap: 'wrap' }}>
          <label><input type="checkbox" checked={fill} onChange={(e) => setFill(e.target.checked)} /> Fill</label>
          <label><input type="checkbox" checked={showTop} onChange={(e) => setShowTop(e.target.checked)} /> Top</label>
          <label><input type="checkbox" checked={showMiddle} onChange={(e) => setShowMiddle(e.target.checked)} /> Middle</label>
          <label><input type="checkbox" checked={showBottom} onChange={(e) => setShowBottom(e.target.checked)} /> Bottom</label>
        </div>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.gray['1'],
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Sidebar
            fill={fill}
            showTop={showTop}
            showMiddle={showMiddle}
            showBottom={showBottom}
          />
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>Fill 비교</h2>
          <div
            style={{
              border: `1px solid ${colors.primitive.palette.gray['2']}`,
              borderRadius: spacing.scale['12'],
              padding: spacing.scale['24'],
              backgroundColor: colors.primitive.palette.gray['1'],
              display: 'flex',
              gap: spacing.scale['24'],
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'grid', gap: spacing.scale['8'] }}>
              <span style={{ color: colors.primitive.palette.gray['9a'] }}>fill=true</span>
              <Sidebar fill={true} />
            </div>
            <div style={{ display: 'grid', gap: spacing.scale['8'] }}>
              <span style={{ color: colors.primitive.palette.gray['9a'] }}>fill=false</span>
              <Sidebar fill={false} />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
