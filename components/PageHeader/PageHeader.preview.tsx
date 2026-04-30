'use client';

import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { PageHeader } from './PageHeader';

export default function PageHeaderPreviewPage() {
  const [showTop, setShowTop] = useState(true);
  const [showBottom, setShowBottom] = useState(true);
  const [showBackButton, setShowBackButton] = useState(true);
  const [showDescription, setShowDescription] = useState(true);

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
            Page Header Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            페이지 헤더 (back + headline + description + actions / 보조 button row). Top + Bottom 합성.
          </p>
        </header>

        <div style={{ display: 'flex', gap: spacing.scale['16'], flexWrap: 'wrap', alignItems: 'center' }}>
          <label>
            <input type="checkbox" checked={showTop} onChange={(e) => setShowTop(e.target.checked)} /> Top
          </label>
          <label>
            <input type="checkbox" checked={showBottom} onChange={(e) => setShowBottom(e.target.checked)} /> Bottom
          </label>
          <label>
            <input
              type="checkbox"
              checked={showBackButton}
              onChange={(e) => setShowBackButton(e.target.checked)}
            />{' '}
            Back button
          </label>
          <label>
            <input
              type="checkbox"
              checked={showDescription}
              onChange={(e) => setShowDescription(e.target.checked)}
            />{' '}
            Description
          </label>
        </div>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
            overflow: 'auto',
          }}
        >
          <PageHeader
            showTop={showTop}
            showBottom={showBottom}
            showBackButton={showBackButton}
            showDescription={showDescription}
          />
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>섹션 조합</h2>
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
            <div style={{ display: 'grid', gap: spacing.scale['6'] }}>
              <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>top + bottom</span>
              <PageHeader />
            </div>
            <div style={{ display: 'grid', gap: spacing.scale['6'] }}>
              <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>top only</span>
              <PageHeader showBottom={false} />
            </div>
            <div style={{ display: 'grid', gap: spacing.scale['6'] }}>
              <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>bottom only</span>
              <PageHeader showTop={false} />
            </div>
            <div style={{ display: 'grid', gap: spacing.scale['6'] }}>
              <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>no description</span>
              <PageHeader showBottom={false} showDescription={false} />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
