import React, { useCallback, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { border, colors, radius, shadows, spacing, typography } from '../../style-tokens';

import { Checkbox } from '../Checkbox/Checkbox';

import type {
  SelectInputItem,
  SelectInputProps,
  SelectInputSize,
  SelectInputTarget,
  SelectInputVisualState,
} from './SelectInput.types';

const palette = colors.primitive.palette;
const textBase = colors.semantic.theme.text.base;
const textStatus = colors.semantic.theme.text.status;

const DEFAULT_ITEMS: SelectInputItem[] = [
  { id: 'option-1', label: 'Anna Green', supportText: '@anna_green', avatarLabel: 'AG' },
  { id: 'option-2', label: 'Baha Sattarov', supportText: '@baha', avatarLabel: 'BS' },
  { id: 'option-3', label: 'George Jones', supportText: '@support', avatarLabel: 'GJ' },
  { id: 'option-4', label: 'Noah Smith', supportText: '@noah', avatarLabel: 'NS' },
  { id: 'option-5', label: 'James Mark', supportText: '@james.m', avatarLabel: 'JM' },
  { id: 'option-6', label: 'Oliver Taylor', supportText: '@otaylor', badgeLabel: 'Remote', avatarLabel: 'OT' },
  { id: 'option-7', label: 'Sarah Walker', supportText: '@sarah', avatarLabel: 'SW' },
];

type SizeStyle = {
  fieldPaddingY: number;
  fieldRadius: number;
  dropdownTop: number;
};

const SIZE_STYLES: Record<SelectInputSize, SizeStyle> = {
  md: {
    fieldPaddingY: spacing.scale['10'],
    fieldRadius: radius.scale.xl,
    dropdownTop: spacing.scale['48'],
  },
  sm: {
    fieldPaddingY: spacing.scale['6'],
    fieldRadius: radius.scale.lg,
    dropdownTop: spacing.scale['40'],
  },
};

function toTypographyStyle(token: {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
}) {
  return {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    lineHeight: `${token.lineHeight}px`,
    letterSpacing: `${token.letterSpacing}px`,
  };
}

// Single-line text that truncates with an ellipsis instead of widening the row.
const ELLIPSIS: React.CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  minWidth: 0,
};

const MENU_MAX_HEIGHT = spacing.scale['320'];
const SCROLL_TRACK_INSET = spacing.scale['6'];
const SCROLL_THUMB_MIN = spacing.scale['24'];

function resolveVisualState(
  forcedState: SelectInputVisualState | undefined,
  disabled: boolean,
  hovered: boolean,
  focused: boolean,
  hasValue: boolean,
): SelectInputVisualState {
  if (disabled || forcedState === 'disabled') {
    return 'disabled';
  }

  if (forcedState) {
    return forcedState;
  }

  if (focused) {
    return 'focus';
  }

  if (hovered) {
    return 'hover';
  }

  if (hasValue) {
    return 'filled';
  }

  return 'default';
}

function getFieldBorderColor(target: SelectInputTarget, state: SelectInputVisualState): string {
  if (state === 'disabled') {
    return colors.semantic.theme.background.surface.neutralSubtle;
  }

  if (target === 'destructive') {
    if (state === 'hover') {
      return palette.red['5'];
    }

    if (state === 'focus') {
      return palette.red['6'];
    }

    return palette.red['4'];
  }

  if (state === 'hover') {
    return palette.gray['4'];
  }

  if (state === 'focus') {
    return palette.purple['6'];
  }

  return colors.semantic.theme.border.action.normal;
}

function getFieldFocusShadow(target: SelectInputTarget, state: SelectInputVisualState): string {
  if (state !== 'focus') {
    return 'none';
  }

  return target === 'destructive' ? shadows.focusRing.lightDestructive.css : shadows.focusRing.light.css;
}

function getAvatarBackground(optionId: string): string {
  switch (optionId) {
    case 'option-1':
      return palette.orange['3'];
    case 'option-2':
      return palette.purple['3'];
    case 'option-3':
      return palette.blue['3'];
    case 'option-4':
      return palette.orange['4'];
    case 'option-5':
      return palette.red['3'];
    case 'option-6':
      return palette.red['4'];
    case 'option-7':
      return palette.purple['4'];
    default:
      return colors.semantic.theme.border.action.normal;
  }
}

function getChipBackground(optionId: string): string {
  switch (optionId) {
    case 'option-2':
      return palette.blue['2'];
    case 'option-3':
      return palette.red['2'];
    case 'option-6':
      return palette.purple['2'];
    default:
      return colors.semantic.theme.background.surface.neutralSubtle;
  }
}

function getChipTextColor(optionId: string): string {
  switch (optionId) {
    case 'option-2':
      return palette.blue['11'];
    case 'option-3':
      return palette.red['11'];
    case 'option-6':
      return palette.purple['11'];
    default:
      return textBase.secondary;
  }
}

function UserIcon({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: spacing.scale['20'],
        height: spacing.scale['20'],
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        flexShrink: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="6.5" r="2.75" stroke="currentColor" strokeWidth={border.width['1']} />
        <path
          d="M3.75 15.875C4.347 13.055 6.86 11 10 11C13.14 11 15.653 13.055 16.25 15.875"
          stroke="currentColor"
          strokeWidth={border.width['1']}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function InfoIcon({ color, size = 'md' }: { color: string; size?: 'md' | 'sm' }) {
  const iconSize = size === 'sm' ? spacing.scale['16'] : spacing.scale['20'];

  return (
    <span
      aria-hidden="true"
      style={{
        width: iconSize,
        height: iconSize,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        flexShrink: 0,
      }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="6.75" stroke="currentColor" strokeWidth={border.width['1']} />
        <path d="M10 9.25V13" stroke="currentColor" strokeWidth={border.width['1']} strokeLinecap="round" />
        <circle cx="10" cy="6.75" r="0.875" fill="currentColor" />
      </svg>
    </span>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: spacing.scale['20'],
        height: spacing.scale['20'],
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        flexShrink: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M5.5 10.5L8.5 13.5L14.5 7.5"
          stroke="currentColor"
          strokeWidth={border.width['2']}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Avatar({
  optionId,
  label,
  src,
  dimmed = false,
}: {
  optionId: string;
  label: string;
  src?: string;
  dimmed?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: spacing.scale['20'],
        height: spacing.scale['20'],
        borderRadius: radius.scale.full,
        backgroundColor: getAvatarBackground(optionId),
        color: textBase.primary,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        opacity: dimmed ? 0.45 : 1,
        overflow: 'hidden',
      }}
    >
      {src ? (
        <img
          alt=""
          src={src}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
          }}
        />
      ) : (
        <span style={toTypographyStyle(typography.scale.captionS.medium)}>{label.slice(0, 2)}</span>
      )}
    </span>
  );
}

function ShortcutBadge({ label, disabled }: { label: string; disabled: boolean }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'flex-start',
        paddingInline: spacing.scale['4'],
        paddingBlock: spacing.scale['0'],
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.semantic.theme.background.surface.neutralSubtle,
          borderRadius: radius.scale.sm,
          paddingInline: spacing.scale['2'],
          paddingBlock: spacing.scale['0'],
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingInline: spacing.scale['4'],
            paddingBlock: spacing.scale['0'],
          }}
        >
          <span
            style={{
              color: disabled ? textBase.quaternary : textBase.secondary,
              ...toTypographyStyle(typography.scale.captionL.medium),
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

export function SelectInput({
  id,
  className,
  style,
  size = 'md',
  target = 'default',
  type = 'default',
  state,
  disabled = false,
  open,
  defaultOpen = false,
  label = 'Label',
  optionalLabel = '(optional)',
  helperText = 'Helper text',
  placeholder = 'Select...',
  showLabel = true,
  showHelper = true,
  showShortcutBadge = true,
  shortcutLabel = '⌘K',
  showLeadIcon = true,
  showTailIcon = true,
  leadIcon,
  tailIcon,
  items,
  selectedId: controlledSelectedId,
  defaultSelectedId,
  selectedIds: controlledSelectedIds,
  defaultSelectedIds = [],
  onSelectedIdChange,
  onSelectedIdsChange,
  onOpenChange,
  triggerAriaLabel = 'Select input',
  onMouseEnter,
  onMouseLeave,
  ...rest
}: SelectInputProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [uncontrolledSelectedId, setUncontrolledSelectedId] = useState<string | undefined>(defaultSelectedId);
  const [uncontrolledSelectedIds, setUncontrolledSelectedIds] = useState<string[]>(defaultSelectedIds);
  const [hoveredOptionId, setHoveredOptionId] = useState<string | null>(null);

  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuScrollRef = useRef<HTMLDivElement>(null);
  const [menuScroll, setMenuScroll] = useState({ top: 0, client: 0, scroll: 0 });

  // The menu hides the native scrollbar and draws its own thumb, so track
  // the scroll position to size and place that thumb.
  const syncMenuScroll = useCallback(() => {
    const node = menuScrollRef.current;
    if (!node) {
      return;
    }

    setMenuScroll((previous) =>
      previous.top === node.scrollTop && previous.client === node.clientHeight && previous.scroll === node.scrollHeight
        ? previous
        : { top: node.scrollTop, client: node.clientHeight, scroll: node.scrollHeight },
    );
  }, []);

  const normalizedItems = useMemo(() => {
    if (!items || items.length === 0) {
      return DEFAULT_ITEMS;
    }

    return items;
  }, [items]);

  const sizeStyle = SIZE_STYLES[size];

  const selectedId = controlledSelectedId ?? uncontrolledSelectedId;
  const selectedIds = controlledSelectedIds ?? uncontrolledSelectedIds;

  const selectedItem = normalizedItems.find((item) => item.id === selectedId);
  const selectedItems = normalizedItems.filter((item) => selectedIds.includes(item.id));

  const hasValue = type === 'multi-select' ? selectedItems.length > 0 : Boolean(selectedItem);

  const resolvedState = resolveVisualState(state, disabled, hovered, focused, hasValue);
  const componentDisabled = resolvedState === 'disabled';

  const forcedFocusState = resolvedState === 'focus';
  const isOpen = componentDisabled ? false : forcedFocusState ? true : open ?? uncontrolledOpen;

  const interactive = state === undefined;

  const fieldBorderColor = getFieldBorderColor(target, resolvedState);
  const fieldFocusShadow = getFieldFocusShadow(target, resolvedState);

  const fieldContentColor =
    componentDisabled
      ? textBase.quaternary
      : target === 'destructive' && hasValue && type !== 'multi-select'
      ? textStatus.destructive
      : textBase.primary;

  const placeholderColor = componentDisabled ? textBase.quaternary : textBase.tertiary;
  const supportTextColor = componentDisabled ? textBase.quaternary : textBase.tertiary;
  const helperColor =
    componentDisabled
      ? textBase.quaternary
      : target === 'destructive'
      ? textStatus.destructive
      : textBase.tertiary;

  // Per Figma carbonscope: form-field controls render flat, no elevation
  // shadow. Focus ring still applies elsewhere via the focused state.
  const controlShadow = 'none';

  const fieldTypography = toTypographyStyle(typography.scale.captionL.regular);
  const mediumTypography = toTypographyStyle(typography.scale.captionL.medium);
  const captionMTypography = toTypographyStyle(typography.scale.captionM.regular);
  const captionMMediumTypography = toTypographyStyle(typography.scale.captionM.medium);

  const setOpenState = (nextOpen: boolean) => {
    if (open === undefined) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  const setSingleSelectedId = (nextSelectedId: string) => {
    if (controlledSelectedId === undefined) {
      setUncontrolledSelectedId(nextSelectedId);
    }

    onSelectedIdChange?.(nextSelectedId);
  };

  const setMultiSelectedIds = (nextSelectedIds: string[]) => {
    if (controlledSelectedIds === undefined) {
      setUncontrolledSelectedIds(nextSelectedIds);
    }

    onSelectedIdsChange?.(nextSelectedIds);
  };

  const handleTriggerClick = () => {
    if (componentDisabled || !interactive) {
      return;
    }

    setOpenState(!isOpen);
  };

  const handleOptionClick = (item: SelectInputItem) => {
    if (componentDisabled || !interactive) {
      return;
    }

    if (type === 'multi-select') {
      const nextSelectedIds = selectedIds.includes(item.id)
        ? selectedIds.filter((selected) => selected !== item.id)
        : [...selectedIds, item.id];

      setMultiSelectedIds(nextSelectedIds);
      return;
    }

    setSingleSelectedId(item.id);
    setOpenState(false);
  };

  const handleBlur: React.FocusEventHandler<HTMLButtonElement> = (event) => {
    if (!interactive) {
      return;
    }

    const nextFocusedNode = event.relatedTarget as Node | null;

    if (nextFocusedNode && rootRef.current?.contains(nextFocusedNode)) {
      return;
    }

    setFocused(false);
    setOpenState(false);
  };

  useLayoutEffect(() => {
    if (isOpen) {
      syncMenuScroll();
    }
  }, [isOpen, normalizedItems, syncMenuScroll]);

  const menuScrollable = menuScroll.scroll > menuScroll.client + 1;
  const scrollTrack = Math.max(menuScroll.client - SCROLL_TRACK_INSET * 2, 0);
  const scrollThumb = menuScrollable
    ? Math.max(SCROLL_THUMB_MIN, Math.round((scrollTrack * menuScroll.client) / menuScroll.scroll))
    : 0;
  const scrollThumbTop = menuScrollable
    ? SCROLL_TRACK_INSET +
      Math.round(((scrollTrack - scrollThumb) * menuScroll.top) / (menuScroll.scroll - menuScroll.client))
    : 0;

  const displayedChips = selectedItems.slice(0, 3);
  const remainingChipCount = Math.max(selectedItems.length - displayedChips.length, 0);

  const renderTextContent = () => {
    if (type === 'multi-select') {
      if (!hasValue) {
        return (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flex: '1 0 0',
              minWidth: spacing.scale['0'],
              paddingInline: spacing.scale['4'],
              paddingBlock: spacing.scale['0'],
            }}
          >
            <span
              style={{
                ...fieldTypography,
                color: placeholderColor,
                ...ELLIPSIS,
              }}
            >
              {placeholder}
            </span>
          </div>
        );
      }

      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: spacing.scale['4'],
            flex: '1 0 0',
            minWidth: spacing.scale['0'],
            paddingInline: spacing.scale['4'],
            paddingBlock: spacing.scale['0'],
          }}
        >
          {displayedChips.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.scale['0'],
                borderStyle: 'solid',
                borderWidth: border.width['1'],
                borderColor: colors.semantic.theme.background.button.tertiaryHover,
                borderRadius: radius.scale.sm,
                backgroundColor: getChipBackground(item.id),
                paddingInline: spacing.primitive['3'],
                paddingBlock: spacing.scale['2'],
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  ...captionMMediumTypography,
                  color: getChipTextColor(item.id),
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label.split(' ')[0]}
              </span>
            </div>
          ))}

          {remainingChipCount > 0 ? (
            <span
              style={{
                ...captionMTypography,
                color: supportTextColor,
                whiteSpace: 'nowrap',
              }}
            >
              +{remainingChipCount} more
            </span>
          ) : null}
        </div>
      );
    }

    if (!selectedItem) {
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            flex: '1 0 0',
            minWidth: spacing.scale['0'],
            paddingInline: spacing.scale['4'],
            paddingBlock: spacing.scale['0'],
          }}
        >
          <span
            style={{
              ...fieldTypography,
              color: placeholderColor,
              ...ELLIPSIS,
            }}
          >
            {placeholder}
          </span>
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: spacing.scale['4'],
          flex: '1 0 0',
          minWidth: spacing.scale['0'],
          paddingInline: spacing.scale['4'],
          paddingBlock: spacing.scale['0'],
        }}
      >
        <span
          style={{
            ...fieldTypography,
            ...ELLIPSIS,
            flex: '0 1 auto',
            color: fieldContentColor,
          }}
        >
          {selectedItem.label}
          {selectedItem.supportText ? (
            <span
              style={{
                ...captionMTypography,
                color: supportTextColor,
                marginLeft: spacing.scale['4'],
              }}
            >
              {selectedItem.supportText}
            </span>
          ) : null}
        </span>
      </div>
    );
  };

  const triggerIconColor = componentDisabled ? textBase.quaternary : hasValue ? fieldContentColor : placeholderColor;

  return (
    <div
      id={id}
      ref={rootRef}
      className={className}
      style={{
        // Fill: the field takes the width of its container.
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing.scale['8'],
        width: '100%',
        minWidth: spacing.scale['144'],
        boxSizing: 'border-box',
        ...style,
      }}
      onMouseEnter={(event) => {
        if (interactive) {
          setHovered(true);
        }

        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        if (interactive) {
          setHovered(false);
        }

        onMouseLeave?.(event);
      }}
      {...rest}
    >
      {showLabel ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: spacing.scale['0'],
            padding: spacing.scale['0'],
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: spacing.scale['4'],
              paddingInline: spacing.scale['0'],
              paddingBlock: spacing.scale['2'],
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: textBase.primary, ...mediumTypography }}>{label}</span>
            <span style={{ color: textBase.tertiary, ...mediumTypography }}>{optionalLabel}</span>
          </div>
        </div>
      ) : null}

      <div
        style={{
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'stretch',
          boxShadow: controlShadow,
        }}
      >
        {isOpen ? (
          <div
            id={menuId}
            role="listbox"
            aria-multiselectable={type === 'multi-select' ? true : undefined}
            style={{
              position: 'absolute',
              top: sizeStyle.dropdownTop,
              left: spacing.scale['0'],
              right: spacing.scale['0'],
              zIndex: 1,
              boxSizing: 'border-box',
              backgroundColor: colors.semantic.theme.background.surface.default,
              borderStyle: 'solid',
              borderWidth: border.width['1'],
              borderColor: colors.semantic.theme.border.action.normal,
              borderRadius: sizeStyle.fieldRadius,
              boxShadow: shadows.elevation.lg.css,
              overflow: 'hidden',
            }}
          >
            <div
              ref={menuScrollRef}
              onScroll={syncMenuScroll}
              style={{
                boxSizing: 'border-box',
                maxHeight: MENU_MAX_HEIGHT - border.width['1'] * 2,
                paddingInline: spacing.scale['0'],
                paddingBlock: spacing.scale['4'],
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.scale['0'],
                // One scrollbar only: the native one is hidden (the thumb below
                // replaces it) and rows never scroll sideways.
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarWidth: 'none',
              }}
            >
            {normalizedItems.map((item) => {
              const selected = type === 'multi-select' ? selectedIds.includes(item.id) : item.id === selectedId;
              const activeBackground = selected || hoveredOptionId === item.id ? colors.semantic.theme.background.button.tertiary : palette.base.transparent;

              return (
                <div
                  key={item.id}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.scale['0'],
                    paddingInline: spacing.scale['6'],
                    paddingBlock: spacing.scale['2'],
                  }}
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setHoveredOptionId(item.id)}
                    onMouseLeave={() => setHoveredOptionId(null)}
                    onClick={() => handleOptionClick(item)}
                    style={{
                      width: '100%',
                      minWidth: 0,
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.scale['4'],
                      padding: spacing.scale['6'],
                      borderStyle: 'solid',
                      borderWidth: border.width['0'],
                      borderRadius: radius.scale.sm,
                      backgroundColor: activeBackground,
                      color: textBase.primary,
                      textAlign: 'left',
                      cursor: componentDisabled ? 'not-allowed' : 'pointer',
                    }}
                    disabled={componentDisabled}
                  >
                    {type === 'multi-select' ? (
                      <span style={{ display: 'inline-flex', padding: spacing.scale['2'], flexShrink: 0 }}>
                        <Checkbox size="sm" checked={selected} ariaLabel={`${item.label} checkbox`} />
                      </span>
                    ) : null}

                    <Avatar optionId={item.id} label={item.avatarLabel ?? item.label} src={item.avatarSrc} />

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: spacing.scale['4'],
                        flex: '1 0 0',
                        minWidth: spacing.scale['0'],
                        overflow: 'hidden',
                        paddingInline: spacing.scale['4'],
                        paddingBlock: spacing.scale['0'],
                      }}
                    >
                      {/* Label and support text share one line that ends in an
                          ellipsis, so a long name never widens the menu. */}
                      <span style={{ ...fieldTypography, ...ELLIPSIS, flex: '0 1 auto', color: textBase.primary }}>
                        {item.label}
                        {item.supportText ? (
                          <span style={{ ...captionMTypography, color: textBase.tertiary, marginLeft: spacing.scale['4'] }}>
                            {item.supportText}
                          </span>
                        ) : null}
                      </span>

                      {type === 'multi-select' && item.badgeLabel ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderStyle: 'solid',
                            borderWidth: border.width['1'],
                            borderColor: colors.semantic.theme.background.button.tertiaryHover,
                            borderRadius: radius.scale.xs,
                            backgroundColor: palette.red['2'],
                            paddingInline: spacing.scale['2'],
                            paddingBlock: spacing.scale['0'],
                            flexShrink: 0,
                          }}
                        >
                          <span style={{ ...captionMMediumTypography, color: palette.red['11'], whiteSpace: 'nowrap' }}>
                            {item.badgeLabel}
                          </span>
                        </span>
                      ) : null}
                    </span>

                    {type !== 'multi-select' && selected ? <CheckIcon color={textBase.secondary} /> : null}
                  </button>
                </div>
              );
            })}

            </div>

            {menuScrollable ? (
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: spacing.scale['0'],
                  right: spacing.scale['0'],
                  bottom: spacing.scale['0'],
                  width: spacing.scale['16'],
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: scrollThumbTop,
                    left: '50%',
                    width: spacing.scale['4'],
                    height: scrollThumb,
                    marginLeft: -spacing.scale['4'] / 2,
                    borderRadius: radius.scale.full,
                    backgroundColor: colors.semantic.theme.background.surface.neutralSubtle,
                  }}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        <button
          type="button"
          aria-label={triggerAriaLabel}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? menuId : undefined}
          disabled={componentDisabled}
          onClick={handleTriggerClick}
          onFocus={() => {
            if (interactive) {
              setFocused(true);
              setOpenState(true);
            }
          }}
          onBlur={handleBlur}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: spacing.scale['0'],
            paddingInline: spacing.scale['12'],
            paddingBlock: sizeStyle.fieldPaddingY,
            borderStyle: 'solid',
            borderWidth: border.width['1'],
            borderColor: fieldBorderColor,
            borderRadius: sizeStyle.fieldRadius,
            backgroundColor: colors.semantic.theme.background.surface.default,
            boxShadow: fieldFocusShadow,
            textAlign: 'left',
            cursor: componentDisabled ? 'not-allowed' : 'pointer',
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
            {type === 'avatar' ? (
              <Avatar
                optionId={selectedItem?.id ?? 'option-1'}
                label={selectedItem?.avatarLabel ?? 'AV'}
                src={selectedItem?.avatarSrc}
                dimmed={componentDisabled}
              />
            ) : showLeadIcon ? (
              leadIcon ? (
                <>{leadIcon}</>
              ) : (
                <UserIcon color={triggerIconColor} />
              )
            ) : null}

            {renderTextContent()}

            {showShortcutBadge ? <ShortcutBadge label={shortcutLabel} disabled={componentDisabled} /> : null}
            {showTailIcon ? (tailIcon ? <>{tailIcon}</> : <InfoIcon color={triggerIconColor} />) : null}
          </div>
        </button>
      </div>

      {showHelper ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: spacing.scale['4'],
            paddingInline: spacing.scale['0'],
            paddingBlock: spacing.scale['2'],
          }}
        >
          <InfoIcon color={helperColor} size="sm" />
          <span style={{ color: helperColor, ...fieldTypography, whiteSpace: 'nowrap' }}>{helperText}</span>
        </div>
      ) : null}
    </div>
  );
}
