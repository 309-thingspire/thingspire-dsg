import React from 'react';

import { colors, radius, spacing, typography } from '../../style-tokens';
import { Button } from '../Button/Button';
import { IconAddLine, IconArrowLeftLine } from '../icons';

import type { PageHeaderActionItem, PageHeaderProps } from './PageHeader.types';

const palette = colors.primitive.palette;

const headlineTypography = typography.scale.h6.semiBold;
const descriptionTypography = typography.scale.bodyS.regular;

const headlineStyle: React.CSSProperties = {
  fontFamily: headlineTypography.fontFamily,
  fontSize: headlineTypography.fontSize,
  fontWeight: headlineTypography.fontWeight,
  lineHeight: `${headlineTypography.lineHeight}px`,
  letterSpacing: `${headlineTypography.letterSpacing}px`,
  color: palette.gray['13'],
  margin: 0,
  width: '100%',
};

const descriptionStyle: React.CSSProperties = {
  fontFamily: descriptionTypography.fontFamily,
  fontSize: descriptionTypography.fontSize,
  fontWeight: descriptionTypography.fontWeight,
  lineHeight: `${descriptionTypography.lineHeight}px`,
  letterSpacing: `${descriptionTypography.letterSpacing}px`,
  color: palette.gray['9a'],
  margin: 0,
  width: '100%',
};

const ICON_PX = spacing.scale['16'];

const DEFAULT_ICON: React.CSSProperties = {
  width: ICON_PX,
  height: ICON_PX,
  display: 'block',
};

function defaultLeadIcon() {
  return <IconAddLine aria-hidden style={DEFAULT_ICON} />;
}

const DEFAULT_TOP_ACTIONS: PageHeaderActionItem[] = [
  { id: 'top-1', label: 'Button', variant: 'tertiary' },
  { id: 'top-2', label: 'Button', variant: 'primary' },
];

const DEFAULT_BOTTOM_LEFT: PageHeaderActionItem[] = [
  { id: 'bl-1', label: 'Button', variant: 'secondary' },
  { id: 'bl-2', label: 'Button', variant: 'secondary' },
];

const DEFAULT_BOTTOM_RIGHT: PageHeaderActionItem[] = [
  { id: 'br-1', label: 'Button', variant: 'ghost' },
  { id: 'br-2', label: 'Button', variant: 'secondary' },
];

function ActionButton({ item, fallbackVariant }: { item: PageHeaderActionItem; fallbackVariant: PageHeaderActionItem['variant'] }) {
  const variant = item.variant ?? fallbackVariant ?? 'secondary';
  const leadIcon = item.leadIcon ?? defaultLeadIcon();
  return (
    <Button
      variant={variant}
      size="sm"
      shape="rounded"
      leftIcon={leadIcon}
      rightIcon={item.rightIcon}
      disabled={item.disabled}
      onClick={item.onClick}
      style={{ borderRadius: radius.scale.lg, flexShrink: 0 }}
    >
      {item.label}
    </Button>
  );
}

export function PageHeader({
  showTop = true,
  showBottom = true,
  showBackButton = true,
  backIcon,
  onBackClick,
  headline = 'Medium length headline',
  description = 'Design better and spend less time without restricting creative freedom.',
  showDescription = true,
  topActions = DEFAULT_TOP_ACTIONS,
  bottomLeftActions = DEFAULT_BOTTOM_LEFT,
  bottomRightActions = DEFAULT_BOTTOM_RIGHT,
  width = spacing.scale['800'],
  className,
  style,
}: PageHeaderProps) {
  return (
    <div
      className={className}
      style={{
        width,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing.scale['24'],
        ...style,
      }}
    >
      {showTop ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: spacing.scale['12'],
          }}
        >
          {showBackButton ? (
            <button
              type="button"
              aria-label="Back"
              onClick={onBackClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBlock: spacing.scale['4'],
                paddingInline: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                appearance: 'none',
                outline: 'none',
                color: palette.gray['13'],
                flexShrink: 0,
              }}
            >
              {backIcon ?? (
                <IconArrowLeftLine
                  aria-hidden
                  style={{ width: spacing.scale['24'], height: spacing.scale['24'], display: 'block' }}
                />
              )}
            </button>
          ) : null}

          <div
            style={{
              flex: '1 0 0',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: spacing.scale['8'],
            }}
          >
            <p style={headlineStyle}>{headline}</p>
            {showDescription && description ? (
              <p style={descriptionStyle}>{description}</p>
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: spacing.scale['8'],
              flexShrink: 0,
            }}
          >
            {topActions.map((item, index) => (
              <ActionButton
                key={item.id ?? `top-${index}`}
                item={item}
                fallbackVariant={index === topActions.length - 1 ? 'primary' : 'tertiary'}
              />
            ))}
          </div>
        </div>
      ) : null}

      {showBottom ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: spacing.scale['12'],
          }}
        >
          <div
            style={{
              flex: '1 0 0',
              minWidth: 0,
              display: 'flex',
              alignItems: 'flex-start',
              gap: spacing.scale['8'],
            }}
          >
            {bottomLeftActions.map((item, index) => (
              <ActionButton
                key={item.id ?? `bl-${index}`}
                item={item}
                fallbackVariant="secondary"
              />
            ))}
          </div>

          <div
            style={{
              flex: '1 0 0',
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: spacing.scale['8'],
            }}
          >
            {bottomRightActions.map((item, index) => (
              <ActionButton
                key={item.id ?? `br-${index}`}
                item={item}
                fallbackVariant={index === bottomRightActions.length - 1 ? 'secondary' : 'ghost'}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PageHeader;
