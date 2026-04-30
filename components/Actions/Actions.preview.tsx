'use client';

import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { Actions } from './Actions';
import type { ActionsDevice, ActionsType } from './Actions.types';

const TYPES: ActionsType[] = ['button', 'input', 'tabs'];
const DEVICES: ActionsDevice[] = ['desktop', 'mobile'];

export default function ActionsPreviewPage() {
  const [type, setType] = useState<ActionsType>('button');
  const [device, setDevice] = useState<ActionsDevice>('desktop');

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
            Actions Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            Hero / 가입 영역에 사용되는 액션 단위. 3 type × 2 device = 6 variants.
          </p>
        </header>

        <div style={{ display: 'flex', gap: spacing.scale['16'], flexWrap: 'wrap', alignItems: 'center' }}>
          <label>
            Type{' '}
            <select value={type} onChange={(event) => setType(event.target.value as ActionsType)}>
              {TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Device{' '}
            <select value={device} onChange={(event) => setDevice(event.target.value as ActionsDevice)}>
              {DEVICES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
            display: 'flex',
            justifyContent: 'flex-start',
            overflow: 'auto',
          }}
        >
          <Actions type={type} device={device} />
        </section>

        <section style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={{ margin: 0, fontSize: typography.scale.h6.medium.fontSize }}>전체 매트릭스 (3 × 2)</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: spacing.scale['16'],
              border: `1px solid ${colors.primitive.palette.gray['2']}`,
              borderRadius: spacing.scale['12'],
              padding: spacing.scale['16'],
              backgroundColor: colors.primitive.palette.base.white,
              overflow: 'auto',
            }}
          >
            {TYPES.flatMap((t) =>
              DEVICES.map((d) => (
                <div key={`${t}-${d}`} style={{ display: 'grid', gap: spacing.scale['6'] }}>
                  <span style={{ fontSize: 11, color: colors.primitive.palette.gray['9a'] }}>
                    type={t} / device={d}
                  </span>
                  <Actions type={t} device={d} />
                </div>
              )),
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
