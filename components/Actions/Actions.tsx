'use client';

import React, { useState } from 'react';

import { border, colors, radius, shadows, spacing, typography } from '../../style-tokens';
import { Button } from '../Button/Button';
import { IconMailLine } from '../icons';

import type {
  ActionsProps,
  ActionsTabItem,
} from './Actions.types';

const palette = colors.primitive.palette;

const captionLMedium = typography.scale.captionL.medium;
const captionLRegular = typography.scale.captionL.regular;
const bodySMedium = typography.scale.bodyS.medium;

const FIELD_TEXT_STYLE: React.CSSProperties = {
  fontFamily: captionLRegular.fontFamily,
  fontSize: captionLRegular.fontSize,
  fontWeight: captionLRegular.fontWeight,
  lineHeight: `${captionLRegular.lineHeight}px`,
  letterSpacing: `${captionLRegular.letterSpacing}px`,
  color: palette.gray['13'],
  margin: 0,
};

const TAB_TEXT_STYLE: React.CSSProperties = {
  fontFamily: bodySMedium.fontFamily,
  fontSize: bodySMedium.fontSize,
  fontWeight: bodySMedium.fontWeight,
  lineHeight: `${bodySMedium.lineHeight}px`,
  letterSpacing: `${bodySMedium.letterSpacing}px`,
  margin: 0,
  whiteSpace: 'nowrap',
};

const TAB_BADGE_TEXT_STYLE: React.CSSProperties = {
  fontFamily: captionLMedium.fontFamily,
  fontSize: captionLMedium.fontSize,
  fontWeight: captionLMedium.fontWeight,
  lineHeight: `${captionLMedium.lineHeight}px`,
  letterSpacing: `${captionLMedium.letterSpacing}px`,
  color: palette.gray['13'],
  margin: 0,
  whiteSpace: 'nowrap',
};

const DEFAULT_TABS: ActionsTabItem[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'annual', label: 'Annual', badge: 'Save 25%' },
];

const DESKTOP_BUTTON_WIDTH = spacing.scale['390'];
const MOBILE_WIDTH = spacing.scale['320'] + spacing.scale['40'];
const TABS_WIDTH = spacing.scale['390'];

function ButtonActions({
  primaryLabel = 'Get started',
  secondaryLabel = 'Try Blank free',
  isMobile,
  onPrimaryClick,
  onSecondaryClick,
}: {
  primaryLabel?: React.ReactNode;
  secondaryLabel?: React.ReactNode;
  isMobile: boolean;
  onPrimaryClick?: ActionsProps['onPrimaryClick'];
  onSecondaryClick?: ActionsProps['onSecondaryClick'];
}) {
  return (
    <>
      <Button
        variant="primary"
        size="md"
        shape="rounded"
        fullWidth={isMobile}
        onClick={onPrimaryClick}
        style={{ borderRadius: radius.scale.xl }}
      >
        {primaryLabel}
      </Button>
      <Button
        variant="secondary"
        size="md"
        shape="rounded"
        fullWidth={isMobile}
        onClick={onSecondaryClick}
        style={{ borderRadius: radius.scale.xl }}
      >
        {secondaryLabel}
      </Button>
    </>
  );
}

function InputActions({
  isMobile,
  placeholder,
  value,
  onChange,
  name,
  inputType = 'email',
  showLeadIcon = true,
  leadIcon,
  actionLabel = 'Get early access',
  onAction,
}: {
  isMobile: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  inputType?: 'email' | 'text';
  showLeadIcon?: boolean;
  leadIcon?: React.ReactNode;
  actionLabel?: React.ReactNode;
  onAction?: ActionsProps['onInputAction'];
}) {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <div
        style={{
          flex: isMobile ? undefined : '1 0 0',
          width: isMobile ? '100%' : undefined,
          minWidth: spacing.scale['144'],
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale['4'],
          paddingInline: spacing.scale['12'],
          paddingBlock: spacing.scale['10'],
          backgroundColor: palette.base.white,
          borderStyle: 'solid',
          borderWidth: border.width['1'],
          borderColor: focused ? palette.purple['8'] : palette.gray['3'],
          borderRadius: radius.scale.xl,
          boxShadow: focused ? shadows.focusRing.light.css : '0px 1px 2px 0px rgba(20,21,26,0.05)',
          boxSizing: 'border-box',
        }}
      >
        {showLeadIcon ? (
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              color: palette.gray['7a'],
            }}
          >
            {leadIcon ?? (
              <IconMailLine
                aria-hidden
                style={{ width: spacing.scale['20'], height: spacing.scale['20'], display: 'block' }}
              />
            )}
          </span>
        ) : null}
        <input
          type={inputType}
          name={name}
          value={value}
          placeholder={placeholder ?? 'Enter your email'}
          onChange={onChange ? (event) => onChange(event.target.value) : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...FIELD_TEXT_STYLE,
            flex: '1 0 0',
            minWidth: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            paddingInline: spacing.scale['4'],
          }}
        />
      </div>

      <Button
        variant="primary"
        size="md"
        shape="rounded"
        fullWidth={isMobile}
        onClick={onAction}
        style={{ borderRadius: radius.scale.xl, flexShrink: 0 }}
      >
        {actionLabel}
      </Button>
    </>
  );
}

function TabsActions({
  tabs = DEFAULT_TABS,
  activeTabId,
  defaultActiveTabId,
  onTabChange,
}: {
  tabs?: ActionsTabItem[];
  activeTabId?: string;
  defaultActiveTabId?: string;
  onTabChange?: (id: string) => void;
}) {
  const isControlled = typeof activeTabId === 'string';
  const [internalActive, setInternalActive] = useState(
    () => defaultActiveTabId ?? tabs[1]?.id ?? tabs[0]?.id ?? '',
  );
  const active = isControlled ? activeTabId! : internalActive;

  const handleClick = (id: string) => {
    if (!isControlled) {
      setInternalActive(id);
    }
    onTabChange?.(id);
  };

  return (
    <div
      role="tablist"
      style={{
        flex: '1 0 0',
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.scale['2'],
        padding: spacing.scale['2'],
        backgroundColor: palette.gray['2'],
        borderRadius: radius.scale.xl,
      }}
    >
      {tabs.map((tab, index) => {
        const id = tab.id ?? `tab-${index}`;
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleClick(id)}
            style={{
              flex: '1 0 0',
              minWidth: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.scale['4'],
              paddingInline: spacing.scale['12'],
              paddingBlock: spacing.scale['10'],
              borderRadius: radius.scale.lg,
              borderStyle: 'solid',
              borderWidth: isActive ? border.width['1'] : border.width['0'],
              borderColor: isActive ? palette.gray['3'] : 'transparent',
              backgroundColor: isActive ? palette.base.white : 'transparent',
              boxShadow: isActive ? '0px 1px 2px 0px rgba(20,21,26,0.05)' : 'none',
              cursor: 'pointer',
              appearance: 'none',
              outline: 'none',
            }}
          >
            <span
              style={{
                ...TAB_TEXT_STYLE,
                color: isActive ? palette.gray['13'] : palette.gray['9a'],
              }}
            >
              {tab.label}
            </span>
            {tab.badge != null ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingInline: spacing.scale['8'],
                  paddingBlock: spacing.scale['2'],
                  backgroundColor: palette.gray['1a'],
                  borderRadius: radius.scale.md,
                }}
              >
                <span style={TAB_BADGE_TEXT_STYLE}>{tab.badge}</span>
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function Actions({
  type = 'button',
  device = 'desktop',
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  inputPlaceholder,
  inputValue,
  inputName,
  inputType = 'email',
  inputLeadIcon,
  showInputLeadIcon = true,
  inputActionLabel,
  onInputChange,
  onInputAction,
  tabs,
  activeTabId,
  defaultActiveTabId,
  onTabChange,
  className,
  style,
}: ActionsProps) {
  const isMobile = device === 'mobile';
  const isInput = type === 'input';
  const isTabs = type === 'tabs';

  const containerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: isMobile && !isTabs ? 'stretch' : 'flex-start',
    flexDirection: isMobile && !isTabs ? 'column' : 'row',
    gap: isMobile && !isTabs ? spacing.scale['12'] : isInput ? spacing.scale['8'] : spacing.scale['16'],
    justifyContent: isInput && !isMobile ? 'center' : isInput ? 'flex-start' : isTabs ? 'flex-start' : 'flex-start',
    width: isTabs
      ? TABS_WIDTH
      : isMobile
        ? MOBILE_WIDTH
        : isInput
          ? DESKTOP_BUTTON_WIDTH
          : undefined,
    maxWidth: isTabs || (isInput && !isMobile) ? spacing.scale['390'] : undefined,
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {type === 'button' ? (
        <ButtonActions
          isMobile={isMobile}
          primaryLabel={primaryLabel ?? 'Get started'}
          secondaryLabel={secondaryLabel ?? 'Try Blank free'}
          onPrimaryClick={onPrimaryClick}
          onSecondaryClick={onSecondaryClick}
        />
      ) : null}

      {isInput ? (
        <InputActions
          isMobile={isMobile}
          placeholder={inputPlaceholder}
          value={inputValue}
          name={inputName}
          inputType={inputType}
          showLeadIcon={showInputLeadIcon}
          leadIcon={inputLeadIcon}
          actionLabel={inputActionLabel ?? 'Get early access'}
          onChange={onInputChange}
          onAction={onInputAction}
        />
      ) : null}

      {isTabs ? (
        <TabsActions
          tabs={tabs}
          activeTabId={activeTabId}
          defaultActiveTabId={defaultActiveTabId}
          onTabChange={onTabChange}
        />
      ) : null}
    </div>
  );
}

export default Actions;
