import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { TailIcon } from './TailIcon';
import type { TailIconSize, TailIconState } from './TailIcon.types';

const SIZES: TailIconSize[] = ['sm', 'lg'];
const STATES: TailIconState[] = ['default', 'hover', 'disabled'];

export default function TailIconPreviewPage() {
  const [size, setSize] = useState<TailIconSize>('lg');
  const [state, setState] = useState<TailIconState>('default');

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
            Tail Icon Preview
          </h1>
          <p
            style={{
              margin: 0,
              color: colors.primitive.palette.gray['9a'],
              fontSize: typography.scale.bodyS.regular.fontSize,
              fontWeight: typography.scale.bodyS.regular.fontWeight,
              lineHeight: `${typography.scale.bodyS.regular.lineHeight}px`,
            }}
          >
            사이드바 행에 부착되는 액션 아이콘. size × state 토글로 5종 확인.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: spacing.scale['12'], alignItems: 'center' }}>
          <label style={{ display: 'flex', gap: spacing.scale['8'] }}>
            <span style={{ minWidth: spacing.scale['56'] }}>Size</span>
            <select value={size} onChange={(e) => setSize(e.target.value as TailIconSize)}>
              {SIZES.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label style={{ display: 'flex', gap: spacing.scale['8'] }}>
            <span style={{ minWidth: spacing.scale['56'] }}>State</span>
            <select value={state} onChange={(e) => setState(e.target.value as TailIconState)}>
              {STATES.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: colors.primitive.palette.base.white,
          }}
        >
          <TailIcon size={size} forceState={state} interactive />
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>전체 매트릭스</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(3, 1fr)', gap: spacing.scale['8'] }}>
            <div />
            {STATES.map((s) => <div key={s} style={{ textAlign: 'center', color: colors.primitive.palette.gray['9a'] }}>{s}</div>)}
            {SIZES.map((sz) => (
              <React.Fragment key={sz}>
                <div style={{ color: colors.primitive.palette.gray['9a'] }}>{sz}</div>
                {STATES.map((st) => (
                  <div key={`${sz}-${st}`} style={{ display: 'flex', justifyContent: 'center', padding: spacing.scale['8'] }}>
                    <TailIcon size={sz} forceState={st} interactive />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
