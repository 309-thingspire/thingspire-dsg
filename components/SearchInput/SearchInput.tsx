import React, { useState } from 'react';

import { colors, radius, spacing, typography } from '../../style-tokens';
import { IconInformationLine, IconSearchLine } from '../icons';

import type { SearchInputProps, SearchInputState } from './SearchInput.types';

const palette = colors.primitive.palette;
const textBase = colors.semantic.theme.text.base;

type TypographyToken = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
};

function toTypographyStyle(token: TypographyToken) {
  return {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    lineHeight: `${token.lineHeight}px`,
    letterSpacing: `${token.letterSpacing}px`,
  };
}

function resolveState(forcedState: SearchInputState | undefined, disabled: boolean, value: string): SearchInputState {
  if (disabled || forcedState === 'disabled') {
    return 'disabled';
  }

  if (forcedState) {
    return forcedState;
  }

  if (value.trim().length > 0) {
    return 'filled';
  }

  return 'default';
}

function IconSlot({
  size,
  disabled,
  children,
}: {
  size: number;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.5 : 1,
        fontSize: size,
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

export function SearchInput({
  id,
  className,
  style,
  state,
  disabled = false,
  placeholder = 'Placeholder',
  value,
  defaultValue = '',
  badgeLabel = '⌘K',
  showLeadIcon = true,
  showTailIcon = true,
  leadIcon,
  tailIcon,
  inputAriaLabel = 'Search input',
  onValueChange,
  ...rest
}: SearchInputProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const resolvedValue = value ?? uncontrolledValue;
  const resolvedState = resolveState(state, disabled, resolvedValue);
  const componentDisabled = resolvedState === 'disabled';

  const textColor =
    resolvedState === 'disabled'
      ? textBase.staticDarkQuaternary
      : resolvedState === 'filled'
      ? textBase.staticDark
      : textBase.staticDarkTertiary;

  const badgeColor = resolvedState === 'disabled' ? textBase.staticDarkQuaternary : textBase.staticDarkSecondary;

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (value === undefined) {
      setUncontrolledValue(event.target.value);
    }

    onValueChange?.(event.target.value);
  };

  return (
    <div
      id={id}
      className={className}
      style={{
        width: spacing.scale['390'],
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: spacing.scale['40'],
        paddingInline: spacing.scale['12'],
        paddingBlock: spacing.scale['0'],
        backgroundColor: palette.base.white,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale['4'],
          minWidth: spacing.scale['0'],
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.scale['4'],
            flex: '1 0 0',
            minWidth: spacing.scale['0'],
          }}
        >
          {showLeadIcon ? (
            <>
              {leadIcon ?? (
                <IconSlot size={spacing.scale['16']} disabled={componentDisabled}>
                  <IconSearchLine />
                </IconSlot>
              )}
            </>
          ) : null}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: '1 0 0',
              minWidth: spacing.scale['0'],
              paddingInline: spacing.scale['4'],
              paddingBlock: spacing.scale['0'],
            }}
          >
            <input
              aria-label={inputAriaLabel}
              value={resolvedValue}
              placeholder={placeholder}
              disabled={componentDisabled}
              onChange={handleInputChange}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                color: textColor,
                padding: spacing.scale['0'],
                margin: spacing.scale['0'],
                ...toTypographyStyle(typography.scale.captionL.regular),
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            paddingInline: spacing.scale['4'],
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: palette.gray['2'],
              borderRadius: radius.scale.sm,
              paddingInline: spacing.primitive['3'],
              paddingBlock: spacing.scale['2'],
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingInline: spacing.primitive['3'],
                paddingBlock: spacing.scale['0'],
              }}
            >
              <span
                style={{
                  color: badgeColor,
                  ...toTypographyStyle(typography.scale.captionM.medium),
                  whiteSpace: 'nowrap',
                }}
              >
                {badgeLabel}
              </span>
            </div>
          </div>
        </div>

        {showTailIcon ? (
          <>
            {tailIcon ?? (
              <IconSlot size={spacing.scale['20']} disabled={componentDisabled}>
                <IconInformationLine />
              </IconSlot>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
