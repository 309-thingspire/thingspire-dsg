'use client';

import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { TextContainer } from './TextContainer';
import type {
  TextContainerAlign,
  TextContainerSize,
} from './TextContainer.types';

const SIZES: TextContainerSize[] = ['lg', 'md', 'sm', 'xs', 'xxs', 'xxxs', 'xxxxs'];
const ALIGNS: TextContainerAlign[] = ['left', 'center'];

export default function TextContainerPreviewPage() {
  const [size, setSize] = useState<TextContainerSize>('lg');
  const [align, setAlign] = useState<TextContainerAlign>('left');
  const [showDescription, setShowDescription] = useState(true);
  const [showCaption, setShowCaption] = useState(true);

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
            Text Container Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            Headline + description + caption 의 3-단 텍스트 블록. 7 size × 2 align = 14 variant.
          </p>
        </header>

        <div style={{ display: 'flex', gap: spacing.scale['16'], flexWrap: 'wrap', alignItems: 'center' }}>
          <label>
            Size{' '}
            <select value={size} onChange={(event) => setSize(event.target.value as TextContainerSize)}>
              {SIZES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Align{' '}
            <select value={align} onChange={(event) => setAlign(event.target.value as TextContainerAlign)}>
              {ALIGNS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              checked={showDescription}
              onChange={(event) => setShowDescription(event.target.checked)}
            />{' '}
            Description
          </label>
          <label>
            <input
              type="checkbox"
              checked={showCaption}
              onChange={(event) => setShowCaption(event.target.checked)}
            />{' '}
            Caption
          </label>
        </div>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
            display: 'flex',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
          }}
        >
          <TextContainer
            size={size}
            align={align}
            showDescription={showDescription}
            showCaption={showCaption}
          />
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>
            전체 매트릭스 (7 sizes × 2 aligns)
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: spacing.scale['24'],
              border: `1px solid ${colors.primitive.palette.gray['2']}`,
              borderRadius: spacing.scale['12'],
              padding: spacing.scale['24'],
              backgroundColor: colors.primitive.palette.base.white,
            }}
          >
            {SIZES.flatMap((s) =>
              ALIGNS.map((a) => (
                <div key={`${s}-${a}`} style={{ display: 'grid', gap: spacing.scale['6'] }}>
                  <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>
                    size={s} / align={a}
                  </span>
                  <TextContainer size={s} align={a} />
                </div>
              )),
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
