import React, { useState } from 'react';

import { colors, radius, spacing, typography } from '../../style-tokens';
import { IconBook2Line, IconMoreLine } from '../icons';
import { TailIcon } from '../TailIcon/TailIcon';

import type { CellItemProps, CellItemState } from './CellItem.types';

const palette = colors.primitive.palette;

const SIDEBAR_WIDTH = spacing.primitive['256'] + spacing.scale['24'];
const INDENT_LEFT = spacing.scale['32'];
const INDENT_LINE_LEFT = spacing.scale['24'] + spacing.scale['2'];

const labelTypography = typography.scale.captionL.medium;
const badgeTypography = typography.scale.captionM.medium;

function resolveState(
  forceState: CellItemState | undefined,
  baseState: CellItemState | undefined,
  hovered: boolean,
  disabled: boolean,
): CellItemState {
  if (disabled || forceState === 'disabled' || baseState === 'disabled') {
    return 'disabled';
  }

  if (forceState) {
    return forceState;
  }

  if (baseState && baseState !== 'default') {
    return baseState;
  }

  return hovered ? 'hover' : 'default';
}

function getRowBackground(state: CellItemState, active: boolean): string {
  if (state === 'hover') {
    return active ? palette.gray['2a'] : palette.gray['1a'];
  }

  if (state === 'disabled') {
    if (active) {
      return palette.gray['1a'];
    }
    return palette.base.transparent;
  }

  return active ? palette.gray['1a'] : palette.base.transparent;
}

function getLabelColor(state: CellItemState, active: boolean, target: 'default' | 'indented'): string {
  if (state === 'disabled') {
    return palette.gray['5a'];
  }

  if (target === 'indented' && !active) {
    return palette.gray['9a'];
  }

  return palette.gray['13'];
}

function getBadgeBorderColor(state: CellItemState): string {
  if (state === 'disabled') {
    return palette.gray['1a'];
  }
  return palette.gray['2a'];
}

function getBadgeTextColor(state: CellItemState): string {
  if (state === 'disabled') {
    return palette.gray['5a'];
  }
  return palette.gray['9a'];
}

function getLeadIconColor(state: CellItemState): string {
  if (state === 'disabled') {
    return palette.gray['5a'];
  }
  return palette.gray['9a'];
}

function CountBadge({ value, state }: { value: string; state: CellItemState }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: spacing.scale['2'],
        backgroundColor: palette.base.white,
        border: `1px solid ${getBadgeBorderColor(state)}`,
        borderRadius: radius.scale.xs,
      }}
    >
      <span
        style={{
          paddingInline: spacing.scale['2'],
          fontFamily: badgeTypography.fontFamily,
          fontSize: badgeTypography.fontSize,
          fontWeight: badgeTypography.fontWeight,
          lineHeight: `${badgeTypography.lineHeight}px`,
          letterSpacing: `${badgeTypography.letterSpacing}px`,
          color: getBadgeTextColor(state),
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function CellItem({
  type = 'default',
  state,
  forceState,
  active = false,
  target = 'default',
  label = 'Label',
  leadIcon,
  showLeadIcon = true,
  tailIcon1 = true,
  tailIcon2 = true,
  badge = true,
  showLine = false,
  disabled = false,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onTailIcon1Click,
  onTailIcon2Click,
}: CellItemProps) {
  const [hovered, setHovered] = useState(false);

  const resolvedState = resolveState(forceState, state, hovered, disabled);
  const isIconOnly = type === 'iconOnly';
  const isIndented = type === 'default' && target === 'indented';
  const showLeadFinal =
    showLeadIcon &&
    !(type === 'default' && target === 'indented' && !active && resolvedState !== 'disabled');

  const rowBackground = getRowBackground(resolvedState, active);
  const labelColor = getLabelColor(resolvedState, active, target);
  const leadIconColor = getLeadIconColor(resolvedState);

  const containerPadding: React.CSSProperties = isIconOnly
    ? {
        paddingInline: spacing.scale['8'],
        paddingBlock: spacing.scale['4'],
      }
    : isIndented
      ? {
          paddingLeft: INDENT_LEFT,
          paddingRight: spacing.scale['8'],
          paddingBlock: spacing.scale['2'],
          width: SIDEBAR_WIDTH,
        }
      : {
          paddingInline: spacing.scale['8'],
          paddingBlock: spacing.scale['2'],
          width: SIDEBAR_WIDTH,
        };

  const innerWidth: React.CSSProperties = isIconOnly ? {} : { width: '100%' };
  const innerPaddingBlock = isIconOnly ? spacing.scale['8'] : spacing.scale['6'];
  const innerPaddingInline = spacing.scale['8'];

  const isInteractive = Boolean(onClick) && resolvedState !== 'disabled';

  const tailIcon1Node =
    tailIcon1 === false
      ? null
      : typeof tailIcon1 === 'object' && tailIcon1 !== null
        ? tailIcon1
        : <TailIcon size="sm" interactive={Boolean(onTailIcon1Click)} onClick={onTailIcon1Click} />;

  const tailIcon2Node =
    tailIcon2 === false
      ? null
      : typeof tailIcon2 === 'object' && tailIcon2 !== null
        ? tailIcon2
        : (
          <TailIcon
            size="sm"
            icon={
              <IconMoreLine
                aria-hidden
                style={{ width: spacing.scale['16'], height: spacing.scale['16'], display: 'block' }}
              />
            }
            interactive={Boolean(onTailIcon2Click)}
            onClick={onTailIcon2Click}
          />
        );

  const badgeValue = typeof badge === 'string' ? badge : '02';
  const showBadge = badge !== false && !isIconOnly;
  const showTailIcons = !isIconOnly;

  const leadIconNode =
    leadIcon ?? (
      <IconBook2Line
        aria-hidden
        style={{
          width: spacing.scale['20'],
          height: spacing.scale['20'],
          display: 'block',
          color: leadIconColor,
        }}
      />
    );

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        boxSizing: 'border-box',
        ...containerPadding,
        ...style,
      }}
    >
      <div
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-disabled={resolvedState === 'disabled' || undefined}
        onClick={(event) => {
          if (resolvedState === 'disabled') {
            return;
          }
          onClick?.(event);
        }}
        onMouseEnter={(event) => {
          if (!disabled) {
            setHovered(true);
          }
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          if (!disabled) {
            setHovered(false);
          }
          onMouseLeave?.(event);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale['4'],
          paddingInline: innerPaddingInline,
          paddingBlock: innerPaddingBlock,
          borderRadius: radius.scale.lg,
          backgroundColor: rowBackground,
          cursor: resolvedState === 'disabled' ? 'not-allowed' : isInteractive ? 'pointer' : 'default',
          ...innerWidth,
        }}
      >
        {showLeadFinal ? (
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              flexShrink: 0,
              width: spacing.scale['20'],
              height: spacing.scale['20'],
            }}
          >
            {leadIconNode}
          </span>
        ) : null}

        {!isIconOnly ? (
          <div
            style={{
              flex: '1 0 0',
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.scale['8'],
              paddingInline: spacing.scale['4'],
            }}
          >
            <span
              style={{
                fontFamily: labelTypography.fontFamily,
                fontSize: labelTypography.fontSize,
                fontWeight: labelTypography.fontWeight,
                lineHeight: `${labelTypography.lineHeight}px`,
                letterSpacing: `${labelTypography.letterSpacing}px`,
                color: labelColor,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {label}
            </span>
            {showBadge ? <CountBadge value={badgeValue} state={resolvedState} /> : null}
          </div>
        ) : null}

        {showTailIcons && tailIcon1Node ? <span style={{ flexShrink: 0 }}>{tailIcon1Node}</span> : null}
        {showTailIcons && tailIcon2Node ? <span style={{ flexShrink: 0 }}>{tailIcon2Node}</span> : null}
      </div>

      {isIndented && showLine ? (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: INDENT_LINE_LEFT,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: resolvedState === 'disabled' ? palette.gray['1a'] : palette.gray['2a'],
          }}
        />
      ) : null}
    </div>
  );
}

export default CellItem;
