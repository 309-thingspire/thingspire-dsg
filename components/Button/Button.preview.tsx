import React, { useMemo, useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';
import { IconAddLine } from '../icons';

import { Button } from './Button';
import type { ButtonShape, ButtonSize, ButtonType, ButtonVariant, ButtonVisualState } from './Button.types';

const VARIANTS: ButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
  'destructive',
  'destructiveSecondary',
  'destructiveTertiary',
  'destructiveGhost',
];

const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg'];
const TYPES: ButtonType[] = ['default', 'iconOnly'];
const SHAPES: ButtonShape[] = ['rounded', 'pill'];

const STATE_OPTIONS: Array<'default' | ButtonVisualState> = ['default', 'hover', 'focus'];

function toTitle(value: string): string {
  return value.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase());
}

export default function ButtonPreviewPage() {
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [type, setType] = useState<ButtonType>('default');
  const [shape, setShape] = useState<ButtonShape>('rounded');
  const [state, setState] = useState<'default' | ButtonVisualState>('default');
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);

  const forceState = useMemo(() => (state === 'default' ? undefined : state), [state]);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: colors.semantic.theme.background.surface.default,
        color: colors.semantic.theme.text.base.primary,
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
            Button Preview
          </h1>
          <p
            style={{
              margin: 0,
              color: colors.semantic.theme.text.base.secondary,
              fontSize: typography.scale.bodyS.regular.fontSize,
              fontWeight: typography.scale.bodyS.regular.fontWeight,
              lineHeight: `${typography.scale.bodyS.regular.lineHeight}px`,
              letterSpacing: `${typography.scale.bodyS.regular.letterSpacing}px`,
            }}
          >
            Figma MCP 토큰 기반 variant/state 토글 프리뷰
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${spacing.scale['224']}px, 1fr))`,
            gap: spacing.scale['12'],
          }}
        >
          <label style={{ display: 'grid', gap: spacing.scale['4'] }}>
            <span style={{ color: colors.semantic.theme.text.base.secondary }}>Variant</span>
            <select
              value={variant}
              onChange={(event) => setVariant(event.target.value as ButtonVariant)}
              style={{
                minHeight: spacing.scale['40'],
                borderStyle: 'solid',
                borderWidth: spacing.scale['1'],
                borderColor: colors.semantic.theme.border.base.neutral,
                backgroundColor: colors.semantic.theme.background.input.normal,
                color: colors.semantic.theme.text.base.primary,
                paddingInline: spacing.scale['12'],
                borderRadius: spacing.scale['8'],
              }}
            >
              {VARIANTS.map((item) => (
                <option key={item} value={item}>
                  {toTitle(item)}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'grid', gap: spacing.scale['4'] }}>
            <span style={{ color: colors.semantic.theme.text.base.secondary }}>Size</span>
            <select
              value={size}
              onChange={(event) => setSize(event.target.value as ButtonSize)}
              style={{
                minHeight: spacing.scale['40'],
                borderStyle: 'solid',
                borderWidth: spacing.scale['1'],
                borderColor: colors.semantic.theme.border.base.neutral,
                backgroundColor: colors.semantic.theme.background.input.normal,
                color: colors.semantic.theme.text.base.primary,
                paddingInline: spacing.scale['12'],
                borderRadius: spacing.scale['8'],
              }}
            >
              {SIZES.map((item) => (
                <option key={item} value={item}>
                  {item.toUpperCase()}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'grid', gap: spacing.scale['4'] }}>
            <span style={{ color: colors.semantic.theme.text.base.secondary }}>Type</span>
            <select
              value={type}
              onChange={(event) => setType(event.target.value as ButtonType)}
              style={{
                minHeight: spacing.scale['40'],
                borderStyle: 'solid',
                borderWidth: spacing.scale['1'],
                borderColor: colors.semantic.theme.border.base.neutral,
                backgroundColor: colors.semantic.theme.background.input.normal,
                color: colors.semantic.theme.text.base.primary,
                paddingInline: spacing.scale['12'],
                borderRadius: spacing.scale['8'],
              }}
            >
              {TYPES.map((item) => (
                <option key={item} value={item}>
                  {toTitle(item)}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'grid', gap: spacing.scale['4'] }}>
            <span style={{ color: colors.semantic.theme.text.base.secondary }}>Shape</span>
            <select
              value={shape}
              onChange={(event) => setShape(event.target.value as ButtonShape)}
              style={{
                minHeight: spacing.scale['40'],
                borderStyle: 'solid',
                borderWidth: spacing.scale['1'],
                borderColor: colors.semantic.theme.border.base.neutral,
                backgroundColor: colors.semantic.theme.background.input.normal,
                color: colors.semantic.theme.text.base.primary,
                paddingInline: spacing.scale['12'],
                borderRadius: spacing.scale['8'],
              }}
            >
              {SHAPES.map((item) => (
                <option key={item} value={item}>
                  {toTitle(item)}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'grid', gap: spacing.scale['4'] }}>
            <span style={{ color: colors.semantic.theme.text.base.secondary }}>State</span>
            <select
              value={state}
              onChange={(event) => setState(event.target.value as 'default' | ButtonVisualState)}
              style={{
                minHeight: spacing.scale['40'],
                borderStyle: 'solid',
                borderWidth: spacing.scale['1'],
                borderColor: colors.semantic.theme.border.base.neutral,
                backgroundColor: colors.semantic.theme.background.input.normal,
                color: colors.semantic.theme.text.base.primary,
                paddingInline: spacing.scale['12'],
                borderRadius: spacing.scale['8'],
              }}
            >
              {STATE_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {toTitle(item)}
                </option>
              ))}
            </select>
          </label>

          <label
            style={{
              minHeight: spacing.scale['40'],
              borderStyle: 'solid',
              borderWidth: spacing.scale['1'],
              borderColor: colors.semantic.theme.border.base.neutral,
              borderRadius: spacing.scale['8'],
              paddingInline: spacing.scale['12'],
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: spacing.scale['8'],
              backgroundColor: colors.semantic.theme.background.input.normal,
            }}
          >
            <span>Disabled</span>
            <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
          </label>

          <label
            style={{
              minHeight: spacing.scale['40'],
              borderStyle: 'solid',
              borderWidth: spacing.scale['1'],
              borderColor: colors.semantic.theme.border.base.neutral,
              borderRadius: spacing.scale['8'],
              paddingInline: spacing.scale['12'],
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: spacing.scale['8'],
              backgroundColor: colors.semantic.theme.background.input.normal,
            }}
          >
            <span>Full Width</span>
            <input type="checkbox" checked={fullWidth} onChange={(event) => setFullWidth(event.target.checked)} />
          </label>
        </div>

        <section
          style={{
            borderStyle: 'solid',
            borderWidth: spacing.scale['1'],
            borderColor: colors.semantic.theme.border.base.neutral,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            display: 'grid',
            gap: spacing.scale['16'],
            backgroundColor: colors.semantic.theme.background.surface.neutral,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: typography.scale.h6.medium.fontFamily,
              fontSize: typography.scale.h6.medium.fontSize,
              fontWeight: typography.scale.h6.medium.fontWeight,
              lineHeight: `${typography.scale.h6.medium.lineHeight}px`,
              letterSpacing: `${typography.scale.h6.medium.letterSpacing}px`,
            }}
          >
            Interactive Preview
          </h2>

          <div style={{ display: 'grid', gap: spacing.scale['12'] }}>
            <Button
              variant={variant}
              size={size}
              type={type}
              shape={shape}
              forceState={forceState}
              disabled={disabled}
              fullWidth={fullWidth}
              leftIcon={<IconAddLine />}
            >
              {toTitle(variant)} Button
            </Button>
          </div>
        </section>

        <section
          style={{
            borderStyle: 'solid',
            borderWidth: spacing.scale['1'],
            borderColor: colors.semantic.theme.border.base.neutral,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            display: 'grid',
            gap: spacing.scale['16'],
            backgroundColor: colors.semantic.theme.background.surface.neutral,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: typography.scale.h6.medium.fontFamily,
              fontSize: typography.scale.h6.medium.fontSize,
              fontWeight: typography.scale.h6.medium.fontWeight,
              lineHeight: `${typography.scale.h6.medium.lineHeight}px`,
              letterSpacing: `${typography.scale.h6.medium.letterSpacing}px`,
            }}
          >
            All Variants Matrix
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fit, minmax(${spacing.scale['224']}px, 1fr))`,
              gap: spacing.scale['12'],
            }}
          >
            {VARIANTS.map((item) => (
              <div
                key={item}
                style={{
                  display: 'grid',
                  gap: spacing.scale['8'],
                  borderStyle: 'solid',
                  borderWidth: spacing.scale['1'],
                  borderColor: colors.semantic.theme.border.base.neutral,
                  borderRadius: spacing.scale['10'],
                  backgroundColor: colors.semantic.theme.background.surface.default,
                  padding: spacing.scale['12'],
                }}
              >
                <span
                  style={{
                    color: colors.semantic.theme.text.base.secondary,
                    fontSize: typography.scale.captionM.regular.fontSize,
                    fontWeight: typography.scale.captionM.regular.fontWeight,
                    lineHeight: `${typography.scale.captionM.regular.lineHeight}px`,
                    letterSpacing: `${typography.scale.captionM.regular.letterSpacing}px`,
                  }}
                >
                  {toTitle(item)}
                </span>
                <Button
                  variant={item}
                  size={size}
                  type={type}
                  shape={shape}
                  forceState={forceState}
                  disabled={disabled}
                  fullWidth
                  leftIcon={<IconAddLine />}
                >
                  {toTitle(item)}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Variants × States — 8 variants × {default, hover, focus, disabled} */}
        <section
          style={{
            borderStyle: 'solid',
            borderWidth: spacing.scale['1'],
            borderColor: colors.semantic.theme.border.base.neutral,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            display: 'grid',
            gap: spacing.scale['16'],
            backgroundColor: colors.semantic.theme.background.surface.neutral,
            overflowX: 'auto',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: typography.scale.h6.medium.fontFamily,
              fontSize: typography.scale.h6.medium.fontSize,
              fontWeight: typography.scale.h6.medium.fontWeight,
              lineHeight: `${typography.scale.h6.medium.lineHeight}px`,
              letterSpacing: `${typography.scale.h6.medium.letterSpacing}px`,
            }}
          >
            Variants × States
          </h2>
          <div style={{ display: 'grid', gap: spacing.scale['8'], gridTemplateColumns: `auto repeat(4, minmax(${spacing.scale['120']}px, 1fr))`, alignItems: 'center' }}>
            <span />
            {(['default', 'hover', 'focus', 'disabled'] as const).map((label) => (
              <span
                key={label}
                style={{
                  color: colors.semantic.theme.text.base.secondary,
                  fontSize: typography.scale.captionM.regular.fontSize,
                  textTransform: 'capitalize',
                }}
              >
                {label}
              </span>
            ))}
            {VARIANTS.map((v) => (
              <React.Fragment key={`states-${v}`}>
                <span
                  style={{
                    color: colors.semantic.theme.text.base.secondary,
                    fontSize: typography.scale.captionM.regular.fontSize,
                    paddingRight: spacing.scale['12'],
                  }}
                >
                  {toTitle(v)}
                </span>
                <Button variant={v} size="md" leftIcon={<IconAddLine />}>{toTitle(v)}</Button>
                <Button variant={v} size="md" forceState="hover" leftIcon={<IconAddLine />}>{toTitle(v)}</Button>
                <Button variant={v} size="md" forceState="focus" leftIcon={<IconAddLine />}>{toTitle(v)}</Button>
                <Button variant={v} size="md" disabled leftIcon={<IconAddLine />}>{toTitle(v)}</Button>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Variants × Sizes — 8 variants × {xs, sm, md, lg} */}
        <section
          style={{
            borderStyle: 'solid',
            borderWidth: spacing.scale['1'],
            borderColor: colors.semantic.theme.border.base.neutral,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            display: 'grid',
            gap: spacing.scale['16'],
            backgroundColor: colors.semantic.theme.background.surface.neutral,
            overflowX: 'auto',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: typography.scale.h6.medium.fontFamily,
              fontSize: typography.scale.h6.medium.fontSize,
              fontWeight: typography.scale.h6.medium.fontWeight,
              lineHeight: `${typography.scale.h6.medium.lineHeight}px`,
              letterSpacing: `${typography.scale.h6.medium.letterSpacing}px`,
            }}
          >
            Variants × Sizes
          </h2>
          <div style={{ display: 'grid', gap: spacing.scale['8'], gridTemplateColumns: `auto repeat(4, minmax(${spacing.scale['120']}px, 1fr))`, alignItems: 'center' }}>
            <span />
            {SIZES.map((s) => (
              <span
                key={s}
                style={{
                  color: colors.semantic.theme.text.base.secondary,
                  fontSize: typography.scale.captionM.regular.fontSize,
                  textTransform: 'uppercase',
                }}
              >
                {s}
              </span>
            ))}
            {VARIANTS.map((v) => (
              <React.Fragment key={`sizes-${v}`}>
                <span
                  style={{
                    color: colors.semantic.theme.text.base.secondary,
                    fontSize: typography.scale.captionM.regular.fontSize,
                    paddingRight: spacing.scale['12'],
                  }}
                >
                  {toTitle(v)}
                </span>
                {SIZES.map((s) => (
                  <Button key={`${v}-${s}`} variant={v} size={s} leftIcon={<IconAddLine />}>
                    {toTitle(v)}
                  </Button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Shape: rounded vs pill — for primary, secondary, destructive at md */}
        <section
          style={{
            borderStyle: 'solid',
            borderWidth: spacing.scale['1'],
            borderColor: colors.semantic.theme.border.base.neutral,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            display: 'grid',
            gap: spacing.scale['16'],
            backgroundColor: colors.semantic.theme.background.surface.neutral,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: typography.scale.h6.medium.fontFamily,
              fontSize: typography.scale.h6.medium.fontSize,
              fontWeight: typography.scale.h6.medium.fontWeight,
              lineHeight: `${typography.scale.h6.medium.lineHeight}px`,
              letterSpacing: `${typography.scale.h6.medium.letterSpacing}px`,
            }}
          >
            Shape: Rounded vs Pill
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fit, minmax(${spacing.scale['224']}px, 1fr))`,
              gap: spacing.scale['12'],
            }}
          >
            {(['primary', 'secondary', 'destructive', 'destructiveSecondary'] as ButtonVariant[]).map((v) => (
              <div
                key={`shape-${v}`}
                style={{
                  display: 'grid',
                  gap: spacing.scale['8'],
                  borderStyle: 'solid',
                  borderWidth: spacing.scale['1'],
                  borderColor: colors.semantic.theme.border.base.neutral,
                  borderRadius: spacing.scale['10'],
                  backgroundColor: colors.semantic.theme.background.surface.default,
                  padding: spacing.scale['12'],
                }}
              >
                <span
                  style={{
                    color: colors.semantic.theme.text.base.secondary,
                    fontSize: typography.scale.captionM.regular.fontSize,
                  }}
                >
                  {toTitle(v)}
                </span>
                <Button variant={v} shape="rounded" leftIcon={<IconAddLine />}>Rounded</Button>
                <Button variant={v} shape="pill" leftIcon={<IconAddLine />}>Pill</Button>
              </div>
            ))}
          </div>
        </section>

        {/* IconOnly variants — all variants as iconOnly at all sizes */}
        <section
          style={{
            borderStyle: 'solid',
            borderWidth: spacing.scale['1'],
            borderColor: colors.semantic.theme.border.base.neutral,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            display: 'grid',
            gap: spacing.scale['16'],
            backgroundColor: colors.semantic.theme.background.surface.neutral,
            overflowX: 'auto',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: typography.scale.h6.medium.fontFamily,
              fontSize: typography.scale.h6.medium.fontSize,
              fontWeight: typography.scale.h6.medium.fontWeight,
              lineHeight: `${typography.scale.h6.medium.lineHeight}px`,
              letterSpacing: `${typography.scale.h6.medium.letterSpacing}px`,
            }}
          >
            Icon-only × Sizes
          </h2>
          <div style={{ display: 'grid', gap: spacing.scale['8'], gridTemplateColumns: `auto repeat(4, auto)`, alignItems: 'center', justifyContent: 'start' }}>
            <span />
            {SIZES.map((s) => (
              <span
                key={s}
                style={{
                  color: colors.semantic.theme.text.base.secondary,
                  fontSize: typography.scale.captionM.regular.fontSize,
                  textTransform: 'uppercase',
                  paddingInline: spacing.scale['12'],
                }}
              >
                {s}
              </span>
            ))}
            {VARIANTS.map((v) => (
              <React.Fragment key={`iconOnly-${v}`}>
                <span
                  style={{
                    color: colors.semantic.theme.text.base.secondary,
                    fontSize: typography.scale.captionM.regular.fontSize,
                    paddingRight: spacing.scale['12'],
                  }}
                >
                  {toTitle(v)}
                </span>
                {SIZES.map((s) => (
                  <Button
                    key={`iconOnly-${v}-${s}`}
                    variant={v}
                    size={s}
                    type="iconOnly"
                    leftIcon={<IconAddLine />}
                    aria-label={`${toTitle(v)} ${s}`}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
