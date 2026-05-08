'use client';

import React, { useState, type ReactNode } from 'react';

import { border, colors, radius, shadows, spacing, typography } from '../../style-tokens';
import { IconMoreLine, IconSearchLine } from '../icons';

import type {
  AdditionalContentProps,
  AdditionalContentSegmentedTab,
} from './AdditionalContent.types';

const palette = colors.primitive.palette;

const captionMRegular = typography.scale.captionM.regular;
const captionMMedium = typography.scale.captionM.medium;
const captionLRegular = typography.scale.captionL.regular;
const captionLMedium = typography.scale.captionL.medium;

const SIDEBAR_WIDTH = spacing.scale['320'];

const labelTextStyle: React.CSSProperties = {
  fontFamily: captionMMedium.fontFamily,
  fontSize: captionMMedium.fontSize,
  fontWeight: captionMMedium.fontWeight,
  lineHeight: `${captionMMedium.lineHeight}px`,
  letterSpacing: `${captionMMedium.letterSpacing}px`,
  color: palette.gray['9a'],
  margin: 0,
  flex: '1 0 0',
  minWidth: 0,
};

const captionTextStyle: React.CSSProperties = {
  fontFamily: captionMRegular.fontFamily,
  fontSize: captionMRegular.fontSize,
  fontWeight: captionMRegular.fontWeight,
  lineHeight: `${captionMRegular.lineHeight}px`,
  letterSpacing: `${captionMRegular.letterSpacing}px`,
  color: palette.gray['7a'],
  margin: 0,
  flex: '1 0 0',
  minWidth: 0,
};

const placeholderTextStyle: React.CSSProperties = {
  fontFamily: captionLRegular.fontFamily,
  fontSize: captionLRegular.fontSize,
  fontWeight: captionLRegular.fontWeight,
  lineHeight: `${captionLRegular.lineHeight}px`,
  letterSpacing: `${captionLRegular.letterSpacing}px`,
  color: palette.gray['7a'],
  margin: 0,
  flex: '1 0 0',
  minWidth: 0,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  paddingInline: spacing.scale['4'],
};

const buttonTextStyle: React.CSSProperties = {
  fontFamily: captionMMedium.fontFamily,
  fontSize: captionMMedium.fontSize,
  fontWeight: captionMMedium.fontWeight,
  lineHeight: `${captionMMedium.lineHeight}px`,
  letterSpacing: `${captionMMedium.letterSpacing}px`,
  margin: 0,
  whiteSpace: 'nowrap',
  textAlign: 'center',
};

const tagTextStyle: React.CSSProperties = {
  fontFamily: captionMMedium.fontFamily,
  fontSize: captionMMedium.fontSize,
  fontWeight: captionMMedium.fontWeight,
  lineHeight: `${captionMMedium.lineHeight}px`,
  letterSpacing: `${captionMMedium.letterSpacing}px`,
  color: palette.gray['9a'],
  margin: 0,
  whiteSpace: 'nowrap',
};

const segmentedTextStyle: React.CSSProperties = {
  fontFamily: captionLMedium.fontFamily,
  fontSize: captionLMedium.fontSize,
  fontWeight: captionLMedium.fontWeight,
  lineHeight: `${captionLMedium.lineHeight}px`,
  letterSpacing: `${captionLMedium.letterSpacing}px`,
  margin: 0,
  whiteSpace: 'nowrap',
  textAlign: 'center',
};

const DEFAULT_TAGS = ['Best sellers', 'Pro access', 'UI Kits', 'Framer'];
const DEFAULT_SEGMENTED_TABS: AdditionalContentSegmentedTab[] = [
  { id: 'tab-1', label: 'Label' },
  { id: 'tab-2', label: 'Label', badge: '12' },
];

function getContainerPadding(type: AdditionalContentProps['type']): React.CSSProperties {
  if (type === 'divider') {
    return { paddingInline: spacing.scale['0'], paddingBlock: spacing.scale['4'] };
  }
  if (type === 'button' || type === 'doubleButton' || type === 'caption') {
    return { paddingInline: spacing.scale['12'], paddingBlock: spacing.scale['8'] };
  }
  // label / searchInput / tags / segmented
  return { paddingInline: spacing.scale['12'], paddingBlock: spacing.scale['6'] };
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: spacing.scale['6'],
        paddingBlock: spacing.scale['2'],
        backgroundColor: palette.base.white,
        borderStyle: 'solid',
        borderWidth: border.width['1'],
        borderColor: palette.gray['2a'],
        borderRadius: radius.scale.sm,
      }}
    >
      <span style={tagTextStyle}>{children}</span>
    </div>
  );
}

function Segmented({
  tabs = DEFAULT_SEGMENTED_TABS,
  activeId,
  defaultActiveId,
  onChange,
}: {
  tabs?: AdditionalContentSegmentedTab[];
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
        flex: '1 0 0',
        minWidth: 0,
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
        const id = tab.id ?? `seg-${index}`;
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
                ...segmentedTextStyle,
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
                  fontFamily: captionMMedium.fontFamily,
                  fontSize: captionMMedium.fontSize,
                  fontWeight: captionMMedium.fontWeight,
                  lineHeight: `${captionMMedium.lineHeight}px`,
                  letterSpacing: `${captionMMedium.letterSpacing}px`,
                  color: palette.gray['13'],
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function AdditionalContent({
  type = 'divider',
  text,
  placeholder = 'Search',
  searchValue,
  onSearchChange,
  tags,
  segmentedTabs,
  activeSegmentId,
  defaultActiveSegmentId,
  onSegmentChange,
  buttonLabel = 'Button',
  doubleButtonIcon,
  onButtonClick,
  onDoubleButtonIconClick,
  width = SIDEBAR_WIDTH,
  className,
  style,
}: AdditionalContentProps) {
  const containerPadding = getContainerPadding(type);

  const baseStyle: React.CSSProperties = {
    width,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    ...containerPadding,
    ...style,
  };

  if (type === 'divider') {
    return (
      <div className={className} style={baseStyle}>
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

  if (type === 'label') {
    return (
      <div className={className} style={baseStyle}>
        <p style={labelTextStyle}>{text ?? 'Label'}</p>
      </div>
    );
  }

  if (type === 'caption') {
    return (
      <div className={className} style={{ ...baseStyle, alignItems: 'flex-start', gap: spacing.scale['4'] }}>
        <p style={captionTextStyle}>
          {text ?? 'A caption is a brief description accompanying an illustration'}
        </p>
      </div>
    );
  }

  if (type === 'button') {
    return (
      <div className={className} style={baseStyle}>
        <button
          type="button"
          onClick={onButtonClick}
          style={{
            flex: '1 0 0',
            minWidth: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.scale['4'],
            paddingInline: spacing.scale['8'],
            paddingBlock: spacing.scale['4'],
            backgroundColor: palette.gray['13'],
            borderRadius: radius.scale.md,
            borderStyle: 'none',
            color: palette.base.white,
            boxShadow: '0px 1px 2px 0px rgba(20,21,26,0.05)',
            cursor: 'pointer',
            appearance: 'none',
            outline: 'none',
            ...buttonTextStyle,
          }}
        >
          {buttonLabel}
        </button>
      </div>
    );
  }

  if (type === 'doubleButton') {
    return (
      <div className={className} style={{ ...baseStyle, justifyContent: 'space-between', gap: spacing.scale['8'] }}>
        <button
          type="button"
          onClick={onButtonClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.scale['4'],
            paddingInline: spacing.scale['8'],
            paddingBlock: spacing.scale['4'],
            backgroundColor: palette.gray['1a'],
            borderRadius: radius.scale.md,
            borderStyle: 'none',
            color: palette.gray['13'],
            cursor: 'pointer',
            appearance: 'none',
            outline: 'none',
            ...buttonTextStyle,
          }}
        >
          {buttonLabel}
        </button>
        <button
          type="button"
          aria-label="More"
          onClick={onDoubleButtonIconClick}
          style={{
            width: spacing.scale['24'],
            height: spacing.scale['24'],
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: palette.gray['1a'],
            borderRadius: radius.scale.md,
            borderStyle: 'none',
            cursor: 'pointer',
            appearance: 'none',
            outline: 'none',
            color: palette.gray['9a'],
          }}
        >
          {doubleButtonIcon ?? (
            <IconMoreLine
              aria-hidden
              style={{ width: spacing.scale['14'], height: spacing.scale['14'], display: 'block' }}
            />
          )}
        </button>
      </div>
    );
  }

  if (type === 'searchInput') {
    return (
      <div className={className} style={baseStyle}>
        <div
          style={{
            flex: '1 0 0',
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.scale['4'],
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              color: palette.gray['7a'],
            }}
          >
            <IconSearchLine
              aria-hidden
              style={{ width: spacing.scale['16'], height: spacing.scale['16'], display: 'block' }}
            />
          </span>
          <input
            type="text"
            value={searchValue}
            placeholder={placeholder}
            onChange={onSearchChange ? (event) => onSearchChange(event.target.value) : undefined}
            style={placeholderTextStyle}
          />
        </div>
      </div>
    );
  }

  if (type === 'tags') {
    const items = tags ?? DEFAULT_TAGS;
    return (
      <div className={className} style={{ ...baseStyle, alignItems: 'flex-start' }}>
        <div
          style={{
            flex: '1 0 0',
            minWidth: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: spacing.scale['8'],
          }}
        >
          {items.map((item, index) => (
            <Tag key={`tag-${index}`}>{item}</Tag>
          ))}
        </div>
      </div>
    );
  }

  // segmented
  return (
    <div className={className} style={baseStyle}>
      <Segmented
        tabs={segmentedTabs}
        activeId={activeSegmentId}
        defaultActiveId={defaultActiveSegmentId}
        onChange={onSegmentChange}
      />
    </div>
  );
}

export default AdditionalContent;
