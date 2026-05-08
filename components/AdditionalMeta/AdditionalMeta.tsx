'use client';

import React, { useState, type ReactNode } from 'react';

import { border, colors, radius, spacing, typography } from '../../style-tokens';
import {
  IconArrowLeftLine,
  IconArrowRightLine,
  IconStarFill,
  IconUser2Line,
} from '../icons';

import type {
  AdditionalMetaBadge,
  AdditionalMetaProps,
  AdditionalMetaTab,
  BadgeTone,
} from './AdditionalMeta.types';

const palette = colors.primitive.palette;

const captionLMedium = typography.scale.captionL.medium;
const captionLRegular = typography.scale.captionL.regular;
const captionMMedium = typography.scale.captionM.medium;
const bodySRegular = typography.scale.bodyS.regular;

const SIDEBAR_WIDTH = spacing.scale['320'];
const AVATAR_SIZE = spacing.scale['40'];
const ICON_BUBBLE_SIZE = spacing.scale['40'];
const PAGINATION_BUTTON_SIZE = spacing.scale['32'];

const BADGE_TONE_BG: Record<BadgeTone, string> = {
  green: palette.green['2'],
  orange: palette.orange['2'],
  blue: palette.blue['2'],
  red: palette.red['2'],
  purple: palette.purple['2'],
  gray: palette.gray['2'],
};

const BADGE_TONE_FG: Record<BadgeTone, string> = {
  green: palette.green['11'],
  orange: palette.orange['11'],
  blue: palette.blue['11'],
  red: palette.red['11'],
  purple: palette.purple['11'],
  gray: palette.gray['13'],
};

const buttonTextStyle: React.CSSProperties = {
  fontFamily: captionLMedium.fontFamily,
  fontSize: captionLMedium.fontSize,
  fontWeight: captionLMedium.fontWeight,
  lineHeight: `${captionLMedium.lineHeight}px`,
  letterSpacing: `${captionLMedium.letterSpacing}px`,
  margin: 0,
  whiteSpace: 'nowrap',
  textAlign: 'center',
};

const badgeTextStyle: React.CSSProperties = {
  fontFamily: captionLMedium.fontFamily,
  fontSize: captionLMedium.fontSize,
  fontWeight: captionLMedium.fontWeight,
  lineHeight: `${captionLMedium.lineHeight}px`,
  letterSpacing: `${captionLMedium.letterSpacing}px`,
  margin: 0,
  whiteSpace: 'nowrap',
  textAlign: 'center',
};

const textStyle: React.CSSProperties = {
  fontFamily: bodySRegular.fontFamily,
  fontSize: bodySRegular.fontSize,
  fontWeight: bodySRegular.fontWeight,
  lineHeight: `${bodySRegular.lineHeight}px`,
  letterSpacing: `${bodySRegular.letterSpacing}px`,
  color: palette.gray['9a'],
  margin: 0,
  width: '100%',
};

const inputTextStyle: React.CSSProperties = {
  fontFamily: captionLRegular.fontFamily,
  fontSize: captionLRegular.fontSize,
  fontWeight: captionLRegular.fontWeight,
  lineHeight: `${captionLRegular.lineHeight}px`,
  letterSpacing: `${captionLRegular.letterSpacing}px`,
  color: palette.gray['13'],
  margin: 0,
  flex: '1 0 0',
  minWidth: 0,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  paddingInline: spacing.scale['4'],
};

const tabTextStyle: React.CSSProperties = {
  fontFamily: captionLMedium.fontFamily,
  fontSize: captionLMedium.fontSize,
  fontWeight: captionLMedium.fontWeight,
  lineHeight: `${captionLMedium.lineHeight}px`,
  letterSpacing: `${captionLMedium.letterSpacing}px`,
  margin: 0,
  whiteSpace: 'nowrap',
  textAlign: 'center',
};

const tabBadgeTextStyle: React.CSSProperties = {
  fontFamily: captionMMedium.fontFamily,
  fontSize: captionMMedium.fontSize,
  fontWeight: captionMMedium.fontWeight,
  lineHeight: `${captionMMedium.lineHeight}px`,
  letterSpacing: `${captionMMedium.letterSpacing}px`,
  color: palette.gray['13'],
  margin: 0,
  whiteSpace: 'nowrap',
};

const ratingTextStyle: React.CSSProperties = {
  ...captionLMedium,
  fontFamily: captionLMedium.fontFamily,
  fontSize: captionLMedium.fontSize,
  fontWeight: captionLMedium.fontWeight,
  lineHeight: `${captionLMedium.lineHeight}px`,
  letterSpacing: `${captionLMedium.letterSpacing}px`,
  color: palette.gray['13'],
  margin: 0,
  whiteSpace: 'nowrap',
};

const DEFAULT_BADGES: AdditionalMetaBadge[] = [
  { id: 'badge-1', label: 'Badge', tone: 'green' },
  { id: 'badge-2', label: 'Badge', tone: 'orange' },
  { id: 'badge-3', label: 'Badge', tone: 'blue' },
];

const DEFAULT_TABS: AdditionalMetaTab[] = [
  { id: 'tab-1', label: 'Label' },
  { id: 'tab-2', label: 'Label', badge: '12' },
];

function ButtonGroup({
  isVertical,
  primaryLabel = 'Button',
  secondaryLabel = 'Button',
  onPrimaryClick,
  onSecondaryClick,
}: {
  isVertical: boolean;
  primaryLabel?: ReactNode;
  secondaryLabel?: ReactNode;
  onPrimaryClick?: AdditionalMetaProps['onPrimaryClick'];
  onSecondaryClick?: AdditionalMetaProps['onSecondaryClick'];
}) {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    alignItems: isVertical ? 'stretch' : 'flex-start',
    gap: spacing.scale['8'],
  };

  return (
    <div style={containerStyle}>
      <button
        type="button"
        onClick={onPrimaryClick}
        style={{
          width: isVertical ? '100%' : 'fit-content',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.scale['2'],
          paddingInline: spacing.scale['10'],
          paddingBlock: spacing.scale['6'],
          backgroundColor: palette.gray['13'],
          borderRadius: radius.scale.lg,
          borderStyle: 'none',
          color: palette.base.white,
          boxShadow: '0px 1px 2px 0px rgba(20,21,26,0.05)',
          cursor: 'pointer',
          appearance: 'none',
          outline: 'none',
          ...buttonTextStyle,
        }}
      >
        {primaryLabel}
      </button>
      <button
        type="button"
        onClick={onSecondaryClick}
        style={{
          width: isVertical ? '100%' : 'fit-content',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.scale['2'],
          paddingInline: spacing.scale['10'],
          paddingBlock: spacing.scale['6'],
          backgroundColor: palette.base.white,
          borderStyle: 'solid',
          borderWidth: border.width['1'],
          borderColor: palette.gray['3'],
          borderRadius: radius.scale.lg,
          color: palette.gray['13'],
          boxShadow: '0px 1px 2px 0px rgba(20,21,26,0.05)',
          cursor: 'pointer',
          appearance: 'none',
          outline: 'none',
          ...buttonTextStyle,
        }}
      >
        {secondaryLabel}
      </button>
    </div>
  );
}

function BadgePill({ badge }: { badge: AdditionalMetaBadge }) {
  const tone = badge.tone ?? 'green';
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: spacing.scale['8'],
        paddingBlock: spacing.scale['2'],
        backgroundColor: BADGE_TONE_BG[tone],
        borderStyle: 'solid',
        borderWidth: border.width['1'],
        borderColor: palette.gray['2a'],
        borderRadius: radius.scale.full,
      }}
    >
      <span style={{ ...badgeTextStyle, color: BADGE_TONE_FG[tone] }}>{badge.label}</span>
    </div>
  );
}

function TabMenu({
  tabs = DEFAULT_TABS,
  activeId,
  defaultActiveId,
  onChange,
}: {
  tabs?: AdditionalMetaTab[];
  activeId?: string;
  defaultActiveId?: string;
  onChange?: (id: string) => void;
}) {
  const isControlled = typeof activeId === 'string';
  const [internalActive, setInternalActive] = useState(
    () => defaultActiveId ?? tabs[1]?.id ?? tabs[0]?.id ?? '',
  );
  const active = isControlled ? activeId! : internalActive;

  const handleClick = (id: string) => {
    if (!isControlled) setInternalActive(id);
    onChange?.(id);
  };

  return (
    <div
      role="tablist"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.scale['2'],
        padding: spacing.scale['2'],
        backgroundColor: palette.gray['2a'],
        borderRadius: radius.scale.lg,
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
              paddingInline: spacing.scale['8'],
              paddingBlock: spacing.scale['4'],
              borderRadius: radius.scale.md,
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
                ...tabTextStyle,
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
                  paddingInline: spacing.scale['6'],
                  paddingBlock: spacing.scale['2'],
                  backgroundColor: palette.gray['1a'],
                  borderRadius: radius.scale.sm,
                }}
              >
                <span style={tabBadgeTextStyle}>{tab.badge}</span>
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function PaginationDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: spacing.scale['6'],
        height: spacing.scale['6'],
        borderRadius: radius.scale.full,
        backgroundColor: active ? palette.gray['13'] : palette.gray['2'],
        flexShrink: 0,
        display: 'inline-block',
      }}
    />
  );
}

function PaginationRow({
  pageDots = 6,
  activeDotIndex = 0,
  showDots = true,
  onPrev,
  onNext,
}: {
  pageDots?: number;
  activeDotIndex?: number;
  showDots?: boolean;
  onPrev?: AdditionalMetaProps['onPrevPage'];
  onNext?: AdditionalMetaProps['onNextPage'];
}) {
  const dots = Math.max(1, Math.min(pageDots, 12));

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <button
        type="button"
        aria-label="Previous"
        onClick={onPrev}
        style={{
          width: PAGINATION_BUTTON_SIZE,
          height: PAGINATION_BUTTON_SIZE,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: palette.gray['1a'],
          borderRadius: radius.scale.full,
          borderStyle: 'none',
          cursor: 'pointer',
          appearance: 'none',
          outline: 'none',
          color: palette.gray['9a'],
        }}
      >
        <IconArrowLeftLine
          aria-hidden
          style={{ width: spacing.scale['16'], height: spacing.scale['16'], display: 'block' }}
        />
      </button>

      {showDots ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.scale['4'] }}>
          {Array.from({ length: dots }).map((_, index) => (
            <PaginationDot key={`dot-${index}`} active={index === activeDotIndex} />
          ))}
        </div>
      ) : null}

      <button
        type="button"
        aria-label="Next"
        onClick={onNext}
        style={{
          width: PAGINATION_BUTTON_SIZE,
          height: PAGINATION_BUTTON_SIZE,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: palette.gray['1a'],
          borderRadius: radius.scale.full,
          borderStyle: 'none',
          cursor: 'pointer',
          appearance: 'none',
          outline: 'none',
          color: palette.gray['9a'],
        }}
      >
        <IconArrowRightLine
          aria-hidden
          style={{ width: spacing.scale['16'], height: spacing.scale['16'], display: 'block' }}
        />
      </button>
    </div>
  );
}

export function AdditionalMeta({
  type = 'buttonGroupH',
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  badges,
  text,
  placeholder = 'Placeholder',
  inputValue,
  onInputChange,
  tabs,
  activeTabId,
  defaultActiveTabId,
  onTabChange,
  avatarSrc,
  avatarFallback,
  icon,
  ratingValue,
  pageDots,
  activeDotIndex,
  showDots,
  onPrevPage,
  onNextPage,
  width = SIDEBAR_WIDTH,
  className,
  style,
}: AdditionalMetaProps) {
  const baseStyle: React.CSSProperties = {
    width,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'flex-start',
    ...style,
  };

  if (type === 'buttonGroupH' || type === 'buttonGroupV') {
    return (
      <div className={className} style={baseStyle}>
        <ButtonGroup
          isVertical={type === 'buttonGroupV'}
          primaryLabel={primaryLabel}
          secondaryLabel={secondaryLabel}
          onPrimaryClick={onPrimaryClick}
          onSecondaryClick={onSecondaryClick}
        />
      </div>
    );
  }

  if (type === 'badgeContainer') {
    const items = badges ?? DEFAULT_BADGES;
    return (
      <div
        className={className}
        style={{
          ...baseStyle,
          flexWrap: 'wrap',
          gap: spacing.scale['8'],
        }}
      >
        {items.map((badge, index) => (
          <BadgePill key={badge.id ?? `badge-${index}`} badge={badge} />
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className={className} style={baseStyle}>
        <p style={textStyle}>
          {text ?? 'Design better and spend less time without restricting creative freedom.'}
        </p>
      </div>
    );
  }

  if (type === 'divider') {
    return (
      <div
        className={className}
        style={{
          ...baseStyle,
          alignItems: 'center',
          paddingBlock: spacing.scale['2'],
        }}
      >
        <div
          aria-hidden="true"
          style={{
            flex: '1 0 0',
            minWidth: 0,
            height: 1,
            backgroundColor: palette.gray['2'],
          }}
        />
      </div>
    );
  }

  if (type === 'input') {
    return (
      <div className={className} style={baseStyle}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingInline: spacing.scale['8'],
            paddingBlock: spacing.scale['6'],
            backgroundColor: palette.base.white,
            borderStyle: 'solid',
            borderWidth: border.width['1'],
            borderColor: palette.gray['3'],
            borderRadius: radius.scale.lg,
            boxShadow: '0px 1px 1px 0px rgba(20,21,26,0.05)',
            boxSizing: 'border-box',
          }}
        >
          <input
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={onInputChange ? (event) => onInputChange(event.target.value) : undefined}
            style={inputTextStyle}
          />
        </div>
      </div>
    );
  }

  if (type === 'tabMenu') {
    return (
      <div className={className} style={baseStyle}>
        <TabMenu
          tabs={tabs}
          activeId={activeTabId}
          defaultActiveId={defaultActiveTabId}
          onChange={onTabChange}
        />
      </div>
    );
  }

  if (type === 'avatar') {
    return (
      <div className={className} style={baseStyle}>
        <div
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: radius.scale.full,
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: palette.purple['2'],
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: palette.purple['11'],
          }}
        >
          {avatarFallback ?? (avatarSrc ? (
            <img
              src={avatarSrc}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <IconUser2Line
              aria-hidden
              style={{ width: spacing.scale['20'], height: spacing.scale['20'], display: 'block' }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'icon') {
    return (
      <div className={className} style={baseStyle}>
        <div
          style={{
            width: ICON_BUBBLE_SIZE,
            height: ICON_BUBBLE_SIZE,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: palette.base.white,
            borderStyle: 'solid',
            borderWidth: border.width['1'],
            borderColor: palette.gray['2a'],
            borderRadius: radius.scale.full,
            color: palette.gray['9a'],
            flexShrink: 0,
          }}
        >
          {icon ?? (
            <IconUser2Line
              aria-hidden
              style={{ width: spacing.scale['16'], height: spacing.scale['16'], display: 'block' }}
            />
          )}
        </div>
      </div>
    );
  }

  if (type === 'rating') {
    return (
      <div
        className={className}
        style={{
          ...baseStyle,
          alignItems: 'center',
          gap: spacing.scale['8'],
        }}
      >
        <IconStarFill
          aria-hidden
          style={{
            width: spacing.scale['20'],
            height: spacing.scale['20'],
            display: 'block',
            color: palette.gray['13'],
          }}
        />
        <span style={ratingTextStyle}>{ratingValue ?? '4.8'}</span>
      </div>
    );
  }

  if (type === 'pagination') {
    return (
      <div className={className} style={baseStyle}>
        <PaginationRow
          pageDots={pageDots}
          activeDotIndex={activeDotIndex}
          showDots={showDots}
          onPrev={onPrevPage}
          onNext={onNextPage}
        />
      </div>
    );
  }

  // empty
  return (
    <div
      className={className}
      style={{
        ...baseStyle,
        height: spacing.scale['24'],
      }}
      aria-hidden="true"
    />
  );
}

export default AdditionalMeta;
