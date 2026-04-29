import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { CellItem } from './CellItem';
import type { CellItemState, CellItemTarget, CellItemType } from './CellItem.types';

const TYPES: CellItemType[] = ['default', 'iconOnly'];
const STATES: CellItemState[] = ['default', 'hover', 'disabled'];
const TARGETS: CellItemTarget[] = ['default', 'indented'];

export default function CellItemPreviewPage() {
  const [type, setType] = useState<CellItemType>('default');
  const [state, setState] = useState<CellItemState>('default');
  const [target, setTarget] = useState<CellItemTarget>('default');
  const [active, setActive] = useState(false);

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
            CellItem Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            사이드바 행. type × state × active × target = 18종 매트릭스.
          </p>
        </header>

        <div style={{ display: 'flex', gap: spacing.scale['16'], flexWrap: 'wrap', alignItems: 'center' }}>
          <label>
            Type{' '}
            <select value={type} onChange={(e) => setType(e.target.value as CellItemType)}>
              {TYPES.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label>
            State{' '}
            <select value={state} onChange={(e) => setState(e.target.value as CellItemState)}>
              {STATES.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label>
            Target{' '}
            <select value={target} onChange={(e) => setTarget(e.target.value as CellItemTarget)}>
              {TARGETS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label>
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /> Active
          </label>
        </div>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
          }}
        >
          <CellItem type={type} forceState={state} active={active} target={target} />
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>전체 매트릭스 (default type)</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(280px, 1fr))',
              gap: spacing.scale['8'],
              border: `1px solid ${colors.primitive.palette.gray['2']}`,
              borderRadius: spacing.scale['12'],
              padding: spacing.scale['16'],
              backgroundColor: colors.primitive.palette.base.white,
            }}
          >
            {STATES.flatMap((s) => TARGETS.flatMap((t) => [false, true].map((a) => (
              <div key={`${s}-${t}-${a}`} style={{ display: 'grid', gap: spacing.scale['4'] }}>
                <div style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>{s} / {t} / active={String(a)}</div>
                <CellItem forceState={s} target={t} active={a} />
              </div>
            ))))}
          </div>
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>Icon Only</h2>
          <div
            style={{
              display: 'flex',
              gap: spacing.scale['8'],
              border: `1px solid ${colors.primitive.palette.gray['2']}`,
              borderRadius: spacing.scale['12'],
              padding: spacing.scale['16'],
              backgroundColor: colors.primitive.palette.base.white,
            }}
          >
            {STATES.map((s) => [false, true].map((a) => (
              <div key={`icon-${s}-${a}`} style={{ display: 'grid', gap: spacing.scale['4'], textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>{s} / active={String(a)}</div>
                <CellItem type="iconOnly" forceState={s} active={a} />
              </div>
            )))}
          </div>
        </section>
      </section>
    </main>
  );
}
