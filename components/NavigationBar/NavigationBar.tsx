import React, { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { border, colors, radius, shadows, spacing, typography } from '../../style-tokens';
import { IconArrowDownSLine, IconCheckLine, IconGlobalLine, IconMenuLine } from '../icons';

import type {
  NavigationBarInteractionState,
  NavigationBarLanguageItem,
  NavigationBarLinkItem,
  NavigationBarProps,
  NavigationBarType,
} from './NavigationBar.types';

type TypographyToken = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
};

// Brand assets — kept as static images so the existing artwork is preserved.
// Postbuild mirrors components/NavigationBar/assets/ to public/components/NavigationBar/assets/.
const LOGO_SRC = '/components/NavigationBar/assets/logo.svg';
const PRO_ACCESS_ICON_SRC = '/components/NavigationBar/assets/pro-access.svg';
const DEFAULT_AVATAR_SRC = '/components/NavigationBar/assets/avatar.png';

const palette = colors.primitive.palette;
const textBase = colors.semantic.theme.text.base;
const textAccent = colors.semantic.theme.text.accent;

const NAV_DEFAULT_WIDTH = spacing.scale['1440'];
const NAV_HEIGHT = spacing.scale['64'];
const NAV_HEIGHT_DOUBLE = spacing.scale['112'];
// Wordmark frame: w 100 (32 × 3 + 4) × h 32 per Figma carbonscope-Library v1.0
// (node 1108:19278). Native vector is 85.501 × 21.204 — frame adds ~7px
// horizontal and ~5px vertical padding so the wordmark sits centered.
const LOGO_FRAME_WIDTH = spacing.scale['96'] + spacing.scale['4'];
const LOGO_FRAME_HEIGHT = spacing.scale['32'];
const LOGO_VECTOR_WIDTH = 85.501;
const LOGO_VECTOR_HEIGHT = 21.204;
const ICON_SIZE = spacing.scale['16'];
const SEARCH_MAX_WIDTH = spacing.primitive['360'];

const DEFAULT_MAIN_LINKS: NavigationBarLinkItem[] = [
  { id: 'library', label: 'Library' },
  { id: 'studio', label: 'Studio' },
  { id: 'pronunciation-dictionary', label: 'Pronunciation Dictionary' },
  { id: 'voice', label: 'Voice' },
];

const TYPE06_DEFAULT_LINKS: NavigationBarLinkItem[] = [
  { id: 'explore', label: 'Explore' },
  { id: 'pro-access', label: 'Pro Access', accent: true },
];

const TYPE07_DEFAULT_LINKS: NavigationBarLinkItem[] = [
  { id: 'library', label: 'Library' },
  { id: 'studio', label: 'Studio' },
  { id: 'pronunciation-dictionary', label: 'Pronunciation Dictionary' },
  { id: 'voice-cloning', label: 'Voice Cloning', hasChevron: true },
];

const TYPE02_DEFAULT_LANGUAGE_ITEMS: NavigationBarLanguageItem[] = [
  { id: 'ko', label: '한국어' },
  { id: 'en', label: 'English' },
  { id: 'ja', label: '日本語' },
  { id: 'zh', label: '中文' },
];

const TYPE08_DEFAULT_BOTTOM_LINKS: NavigationBarLinkItem[] = [
  { id: 'library', label: 'Library' },
  { id: 'studio', label: 'Studio', badgeText: '12' },
  { id: 'pronunciation-dictionary', label: 'Pronunciation Dictionary' },
  { id: 'voice-cloning', label: 'Voice Cloning', badgeText: '08' },
];

function toTypographyStyle(token: TypographyToken): CSSProperties {
  return {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    lineHeight: `${token.lineHeight}px`,
    letterSpacing: `${token.letterSpacing}px`,
  };
}

function withFocusRing(baseShadow: string, interactionState: NavigationBarInteractionState, disabled: boolean): string {
  if (interactionState === 'focus' && !disabled) {
    return `${baseShadow}, ${shadows.focusRing.light.css}`;
  }

  return baseShadow;
}

function getMainLinks(type: NavigationBarType, links: NavigationBarLinkItem[] | undefined): NavigationBarLinkItem[] {
  if (links && links.length > 0) {
    return links;
  }

  if (type === '06') {
    return TYPE06_DEFAULT_LINKS;
  }

  if (type === '07') {
    return TYPE07_DEFAULT_LINKS;
  }

  return DEFAULT_MAIN_LINKS;
}

function getBottomLinks(bottomLinks: NavigationBarLinkItem[] | undefined): NavigationBarLinkItem[] {
  if (bottomLinks && bottomLinks.length > 0) {
    return bottomLinks;
  }

  return TYPE08_DEFAULT_BOTTOM_LINKS;
}

function IconImage({ src, size = ICON_SIZE }: { src: string; size?: number }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: 'block',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: LOGO_FRAME_WIDTH,
        height: LOGO_FRAME_HEIGHT,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <img
        src={LOGO_SRC}
        alt="thingspire"
        style={{
          width: LOGO_VECTOR_WIDTH,
          height: LOGO_VECTOR_HEIGHT,
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </span>
  );
}

function SearchField({
  placeholder,
  shortcutLabel,
  interactionState,
  disabled,
}: {
  placeholder: string;
  shortcutLabel: string;
  interactionState: NavigationBarInteractionState;
  disabled: boolean;
}) {
  const fieldBorderColor = disabled ? palette.gray['2'] : palette.gray['3'];
  const fieldBackground = disabled ? palette.gray['1'] : palette.base.white;
  const placeholderColor = disabled ? textBase.staticDarkQuaternary : textBase.staticDarkTertiary;
  const shortcutColor = disabled ? textBase.staticDarkQuaternary : textBase.staticDarkSecondary;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: SEARCH_MAX_WIDTH,
        minWidth: spacing.scale['144'],
        boxShadow: withFocusRing(shadows.elevation.xs.css, interactionState, disabled),
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale['4'],
          borderStyle: 'solid',
          borderWidth: border.width['1'],
          borderColor: fieldBorderColor,
          borderRadius: radius.scale.lg,
          backgroundColor: fieldBackground,
          paddingInline: spacing.scale['8'],
          paddingBlock: spacing.scale['6'],
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            flex: '1 0 0',
            minWidth: spacing.scale['0'],
            color: placeholderColor,
            ...toTypographyStyle(typography.scale.captionL.regular),
          }}
        >
          {placeholder}
        </span>

        <span
          aria-hidden="true"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: radius.scale.sm,
            backgroundColor: disabled ? palette.gray['2a'] : palette.gray['2'],
            paddingInline: spacing.scale['8'],
            paddingBlock: spacing.scale['2'],
            color: shortcutColor,
            ...toTypographyStyle(typography.scale.captionL.medium),
            whiteSpace: 'nowrap',
          }}
        >
          {shortcutLabel}
        </span>
      </div>
    </div>
  );
}

function NavigationMainItem({
  item,
  interactionState,
  componentDisabled,
  onClick,
}: {
  item: NavigationBarLinkItem;
  interactionState: NavigationBarInteractionState;
  componentDisabled: boolean;
  onClick?: (id: string) => void;
}) {
  const disabled = componentDisabled || item.disabled;
  const textColor = disabled ? textBase.staticDarkQuaternary : item.accent ? textAccent.blueAccent : textBase.staticDarkSecondary;
  const hasProIcon = item.id === 'pro-access';
  const hasLeadingIcon = Boolean(item.icon) || hasProIcon;
  const hasTrailingChevron = item.hasChevron;
  const isInteractive = Boolean(onClick) && !disabled;

  let iconNode: ReactNode = null;

  if (item.icon) {
    iconNode = item.icon;
  } else if (hasProIcon) {
    iconNode = <IconImage src={PRO_ACCESS_ICON_SRC} />;
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={isInteractive ? () => onClick?.(item.id) : undefined}
      aria-disabled={disabled || undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: hasLeadingIcon || hasTrailingChevron ? spacing.scale['6'] : spacing.scale['0'],
        borderStyle: 'solid',
        borderWidth: border.width['0'],
        backgroundColor: palette.base.transparent,
        paddingInline: spacing.scale['0'],
        paddingBlock: spacing.scale['0'],
        margin: spacing.scale['0'],
        color: textColor,
        cursor: isInteractive ? 'pointer' : 'default',
        boxShadow: interactionState === 'focus' && !disabled ? shadows.focusRing.light.css : 'none',
      }}
    >
      {iconNode}

      <span
        style={{
          whiteSpace: 'nowrap',
          textAlign: 'center',
          ...toTypographyStyle(typography.scale.captionL.medium),
        }}
      >
        {item.label}
      </span>

      {hasTrailingChevron ? (
        <IconArrowDownSLine
          aria-hidden
          style={{ width: ICON_SIZE, height: ICON_SIZE, display: 'block' }}
        />
      ) : null}
    </button>
  );
}

function NavigationBottomTabItem({
  item,
  active,
  interactionState,
  componentDisabled,
  onClick,
}: {
  item: NavigationBarLinkItem;
  active: boolean;
  interactionState: NavigationBarInteractionState;
  componentDisabled: boolean;
  onClick?: (id: string) => void;
}) {
  const disabled = componentDisabled || item.disabled;
  const textColor = disabled ? textBase.staticDarkQuaternary : textBase.staticDarkSecondary;
  const badgeBackground = disabled ? palette.gray['2a'] : palette.gray['1a'];
  const badgeTextColor = disabled ? textBase.staticDarkQuaternary : active ? textBase.staticDark : textBase.staticDarkSecondary;
  const isInteractive = Boolean(onClick) && !disabled;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={isInteractive ? () => onClick?.(item.id) : undefined}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.scale['8'],
        borderStyle: 'solid',
        borderWidth: border.width['0'],
        borderBottomWidth: active ? border.width['2'] : border.width['0'],
        borderBottomColor: active ? border.color.theme.select.primary : palette.base.transparent,
        backgroundColor: palette.base.transparent,
        paddingInline: spacing.scale['0'],
        paddingTop: spacing.scale['10'],
        paddingBottom: spacing.scale['14'],
        margin: spacing.scale['0'],
        cursor: isInteractive ? 'pointer' : 'default',
        boxShadow: interactionState === 'focus' && !disabled ? shadows.focusRing.light.css : 'none',
      }}
    >
      <span
        style={{
          whiteSpace: 'nowrap',
          textAlign: 'center',
          color: textColor,
          ...toTypographyStyle(typography.scale.captionL.medium),
        }}
      >
        {item.label}
      </span>

      {item.badgeText ? (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: radius.scale.md,
            backgroundColor: badgeBackground,
            paddingInline: spacing.scale['8'],
            paddingBlock: spacing.scale['2'],
            color: badgeTextColor,
            ...toTypographyStyle(typography.scale.captionL.medium),
            whiteSpace: 'nowrap',
          }}
        >
          {item.badgeText}
        </span>
      ) : null}
    </button>
  );
}

function BaseCenterLinks({
  links,
  interactionState,
  componentDisabled,
  onLinkClick,
  justify,
}: {
  links: NavigationBarLinkItem[];
  interactionState: NavigationBarInteractionState;
  componentDisabled: boolean;
  onLinkClick?: (id: string) => void;
  justify: 'flex-start' | 'center';
}) {
  return (
    <div
      style={{
        display: 'flex',
        flex: '1 0 0',
        alignItems: 'center',
        justifyContent: justify,
        gap: spacing.scale['24'],
        minWidth: spacing.scale['0'],
      }}
    >
      {links.map((item) => (
        <NavigationMainItem
          key={item.id}
          item={item}
          interactionState={interactionState}
          componentDisabled={componentDisabled}
          onClick={onLinkClick}
        />
      ))}
    </div>
  );
}

interface NavigationBarType02Props {
  id?: string;
  className?: string;
  style?: CSSProperties;
  commonRootStyle: CSSProperties;
  interactionState: NavigationBarInteractionState;
  componentDisabled: boolean;
  showMenuButton: boolean;
  languageLabel?: string;
  languageItems?: NavigationBarLanguageItem[];
  selectedLanguageId?: string;
  defaultSelectedLanguageId?: string;
  languageMenuOpen?: boolean;
  defaultLanguageMenuOpen: boolean;
  searchPlaceholder: string;
  searchShortcutLabel: string;
  onMenuClick?: () => void;
  onLanguageClick?: () => void;
  onLanguageMenuOpenChange?: (open: boolean) => void;
  onLanguageChange?: (id: string) => void;
  rest: Record<string, unknown>;
}

function NavigationBarType02({
  id,
  className,
  style,
  commonRootStyle,
  interactionState,
  componentDisabled,
  showMenuButton,
  languageLabel,
  languageItems,
  selectedLanguageId,
  defaultSelectedLanguageId,
  languageMenuOpen,
  defaultLanguageMenuOpen,
  searchPlaceholder,
  searchShortcutLabel,
  onMenuClick,
  onLanguageClick,
  onLanguageMenuOpenChange,
  onLanguageChange,
  rest,
}: NavigationBarType02Props) {
  const resolvedItems = languageItems && languageItems.length > 0 ? languageItems : TYPE02_DEFAULT_LANGUAGE_ITEMS;

  const isSelectionControlled = typeof selectedLanguageId === 'string';
  const [internalSelectedId, setInternalSelectedId] = useState<string>(
    () => defaultSelectedLanguageId ?? resolvedItems[0]?.id ?? '',
  );
  const activeSelectedId = isSelectionControlled ? selectedLanguageId : internalSelectedId;

  const selectedItem =
    resolvedItems.find((item) => item.id === activeSelectedId) ?? resolvedItems[0];
  const triggerLabel = languageLabel ?? selectedItem?.label ?? '';

  const isOpenControlled = typeof languageMenuOpen === 'boolean';
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultLanguageMenuOpen);
  const isOpen = isOpenControlled ? languageMenuOpen : internalOpen;

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const updateOpen = (next: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(next);
    }
    onLanguageMenuOpenChange?.(next);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current) {
        return;
      }
      if (!wrapperRef.current.contains(event.target as Node)) {
        updateOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        updateOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
    // updateOpen is stable for this lifecycle; intentionally skip the deps lint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isOpenControlled]);

  const handleTriggerClick = () => {
    if (componentDisabled) {
      return;
    }
    updateOpen(!isOpen);
    onLanguageClick?.();
  };

  const handleItemClick = (id: string) => {
    if (!isSelectionControlled) {
      setInternalSelectedId(id);
    }
    onLanguageChange?.(id);
    updateOpen(false);
  };

  const ghostBorderColor = palette.base.transparent;
  const languageTextColor = componentDisabled ? textBase.staticDarkQuaternary : textBase.staticDarkSecondary;
  const iconButtonColor = componentDisabled ? textBase.staticDarkQuaternary : textBase.staticDarkSecondary;
  const placeholderText = searchPlaceholder === 'Search...' ? 'Placeholder' : searchPlaceholder;
  const shortcutText = searchShortcutLabel === '/' ? '' : searchShortcutLabel;
  const triggerBackground = isOpen && !componentDisabled ? palette.gray['1a'] : palette.base.transparent;

  return (
    <header
      id={id}
      className={className}
      aria-disabled={componentDisabled || undefined}
      style={{
        ...commonRootStyle,
        minHeight: NAV_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: spacing.scale['16'],
        paddingRight: spacing.scale['32'],
        paddingTop: spacing.scale['16'],
        paddingBottom: spacing.scale['16'],
        borderBottomStyle: 'solid',
        borderBottomWidth: border.width['1'],
        borderBottomColor: componentDisabled ? palette.gray['2'] : palette.gray['3'],
        backgroundColor: palette.base.white,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale['0'],
        }}
      >
        {showMenuButton ? (
          <button
            type="button"
            aria-label="Menu"
            disabled={componentDisabled}
            onClick={!componentDisabled ? onMenuClick : undefined}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: spacing.scale['8'],
              borderStyle: 'solid',
              borderWidth: border.width['0'],
              borderColor: ghostBorderColor,
              borderRadius: radius.scale.lg,
              backgroundColor: palette.base.transparent,
              color: iconButtonColor,
              cursor: componentDisabled ? 'default' : 'pointer',
              appearance: 'none',
              outline: 'none',
              marginRight: spacing.scale['4'],
            }}
          >
            <IconMenuLine
              aria-hidden
              style={{ width: ICON_SIZE, height: ICON_SIZE, display: 'block' }}
            />
          </button>
        ) : null}

        <LogoMark />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: spacing.scale['16'],
        }}
      >
        <div style={{ width: spacing.primitive['256'] + spacing.scale['24'] }}>
          <SearchField
            placeholder={placeholderText}
            shortcutLabel={shortcutText}
            interactionState={interactionState}
            disabled={componentDisabled}
          />
        </div>

        <div ref={wrapperRef} style={{ position: 'relative' }}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-disabled={componentDisabled || undefined}
            disabled={componentDisabled}
            onClick={handleTriggerClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.scale['2'],
              paddingInline: spacing.scale['10'],
              paddingBlock: spacing.scale['6'],
              borderStyle: 'solid',
              borderWidth: border.width['0'],
              borderColor: ghostBorderColor,
              borderRadius: radius.scale.lg,
              backgroundColor: triggerBackground,
              color: languageTextColor,
              cursor: componentDisabled ? 'default' : 'pointer',
              appearance: 'none',
              outline: 'none',
              boxShadow: interactionState === 'focus' && !componentDisabled ? shadows.focusRing.light.css : 'none',
              transition: 'background-color 120ms ease',
            }}
          >
            <IconGlobalLine
              aria-hidden
              style={{ width: ICON_SIZE, height: ICON_SIZE, display: 'block' }}
            />
            <span
              style={{
                paddingInline: spacing.scale['4'],
                whiteSpace: 'nowrap',
                ...toTypographyStyle(typography.scale.captionL.medium),
              }}
            >
              {triggerLabel}
            </span>
            <IconArrowDownSLine
              aria-hidden
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                display: 'block',
                transform: isOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 160ms ease',
              }}
            />
          </button>

          {isOpen ? (
            <ul
              role="listbox"
              aria-label="Language"
              style={{
                position: 'absolute',
                top: `calc(100% + ${spacing.scale['6']}px)`,
                right: 0,
                margin: 0,
                padding: spacing.scale['4'],
                listStyle: 'none',
                minWidth: spacing.scale['144'],
                backgroundColor: palette.base.white,
                borderStyle: 'solid',
                borderWidth: border.width['1'],
                borderColor: palette.gray['3'],
                borderRadius: radius.scale.lg,
                boxShadow: shadows.elevation.md.css,
                zIndex: 50,
              }}
            >
              {resolvedItems.map((item) => {
                const isActive = item.id === activeSelectedId;
                return (
                  <li key={item.id} role="presentation" style={{ margin: 0 }}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => handleItemClick(item.id)}
                      style={{
                        width: '100%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: spacing.scale['8'],
                        paddingInline: spacing.scale['8'],
                        paddingBlock: spacing.scale['6'],
                        borderStyle: 'solid',
                        borderWidth: border.width['0'],
                        borderRadius: radius.scale.md,
                        backgroundColor: isActive ? palette.gray['1a'] : palette.base.transparent,
                        color: textBase.staticDark,
                        cursor: 'pointer',
                        appearance: 'none',
                        outline: 'none',
                        textAlign: 'left',
                        ...toTypographyStyle(typography.scale.captionL.medium),
                      }}
                      onMouseEnter={(event) => {
                        if (!isActive) {
                          event.currentTarget.style.backgroundColor = palette.gray['1a'];
                        }
                      }}
                      onMouseLeave={(event) => {
                        if (!isActive) {
                          event.currentTarget.style.backgroundColor = palette.base.transparent;
                        }
                      }}
                    >
                      <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: spacing.scale['2'] }}>
                        <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                        {item.caption ? (
                          <span
                            style={{
                              color: textBase.staticDarkSecondary,
                              ...toTypographyStyle(typography.scale.captionM.regular),
                            }}
                          >
                            {item.caption}
                          </span>
                        ) : null}
                      </span>
                      {isActive ? (
                        <IconCheckLine
                          aria-hidden
                          style={{ width: ICON_SIZE, height: ICON_SIZE, display: 'block', flexShrink: 0 }}
                        />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export function NavigationBar({
  id,
  className,
  style,
  type = '01',
  width = NAV_DEFAULT_WIDTH,
  interactionState = 'default',
  links,
  bottomLinks,
  activeBottomLinkId,
  searchPlaceholder = 'Search...',
  searchShortcutLabel = '/',
  ctaLabel = 'Try for free',
  helpLabel = 'Help',
  avatarSrc,
  showMenuButton = true,
  languageLabel,
  languageItems,
  selectedLanguageId,
  defaultSelectedLanguageId,
  languageMenuOpen,
  defaultLanguageMenuOpen = false,
  onMenuClick,
  onLanguageClick,
  onLanguageMenuOpenChange,
  onLanguageChange,
  onLinkClick,
  onCtaClick,
  onBottomLinkClick,
  ...props
}: NavigationBarProps) {
  const componentDisabled = interactionState === 'disabled';
  const resolvedMainLinks = getMainLinks(type, links);
  const resolvedBottomLinks = getBottomLinks(bottomLinks);
  const resolvedActiveBottomLinkId =
    activeBottomLinkId ?? resolvedBottomLinks[spacing.scale['1']]?.id ?? resolvedBottomLinks[spacing.scale['0']]?.id ?? '';

  const commonRootStyle: CSSProperties = {
    width,
    boxSizing: 'border-box',
  };

  if (type === '02') {
    return (
      <NavigationBarType02
        id={id}
        className={className}
        style={style}
        commonRootStyle={commonRootStyle}
        interactionState={interactionState}
        componentDisabled={componentDisabled}
        showMenuButton={showMenuButton}
        languageLabel={languageLabel}
        languageItems={languageItems}
        selectedLanguageId={selectedLanguageId}
        defaultSelectedLanguageId={defaultSelectedLanguageId}
        languageMenuOpen={languageMenuOpen}
        defaultLanguageMenuOpen={defaultLanguageMenuOpen}
        searchPlaceholder={searchPlaceholder}
        searchShortcutLabel={searchShortcutLabel}
        onMenuClick={onMenuClick}
        onLanguageClick={onLanguageClick}
        onLanguageMenuOpenChange={onLanguageMenuOpenChange}
        onLanguageChange={onLanguageChange}
        rest={props}
      />
    );
  }


  if (type === '07') {
    const ctaTextColor = componentDisabled ? textBase.staticDarkQuaternary : textBase.staticWhite;
    const ctaBackground = componentDisabled ? palette.gray['3'] : palette.gray['13'];

    return (
      <header
        id={id}
        className={className}
        aria-disabled={componentDisabled || undefined}
        style={{
          ...commonRootStyle,
          minHeight: NAV_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingInline: spacing.scale['120'],
          paddingBlock: spacing.scale['16'],
          ...style,
        }}
        {...props}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.scale['32'],
            paddingInline: spacing.scale['16'],
            paddingBlock: spacing.scale['8'],
            borderStyle: 'solid',
            borderWidth: border.width['1'],
            borderColor: componentDisabled ? palette.gray['2'] : palette.gray['3'],
            borderRadius: radius.scale.xxl,
            backgroundColor: palette.base.white,
            boxShadow: shadows.elevation.lg.css,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: '1 0 0',
              alignItems: 'center',
            }}
          >
            <LogoMark />
          </div>

          <BaseCenterLinks
            links={resolvedMainLinks}
            interactionState={interactionState}
            componentDisabled={componentDisabled}
            onLinkClick={onLinkClick}
            justify="center"
          />

          <div
            style={{
              display: 'flex',
              flex: '1 0 0',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="button"
              disabled={componentDisabled}
              onClick={!componentDisabled ? onCtaClick : undefined}
              aria-disabled={componentDisabled || undefined}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderStyle: 'solid',
                borderWidth: border.width['0'],
                borderRadius: radius.scale.lg,
                backgroundColor: ctaBackground,
                color: ctaTextColor,
                paddingInline: spacing.scale['10'],
                paddingBlock: spacing.scale['6'],
                boxShadow: withFocusRing(shadows.elevation.xs.css, interactionState, componentDisabled),
                cursor: componentDisabled ? 'default' : 'pointer',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingInline: spacing.scale['4'],
                  paddingBlock: spacing.scale['0'],
                  whiteSpace: 'nowrap',
                  ...toTypographyStyle(typography.scale.captionL.medium),
                }}
              >
                {ctaLabel}
              </span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  if (type === '08') {
    const helpTextColor = componentDisabled ? textBase.staticDarkQuaternary : textBase.staticDarkSecondary;

    return (
      <header
        id={id}
        className={className}
        aria-disabled={componentDisabled || undefined}
        style={{
          ...commonRootStyle,
          minHeight: NAV_HEIGHT_DOUBLE,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: palette.base.white,
          ...style,
        }}
        {...props}
      >
        <div
          style={{
            width: '100%',
            minHeight: NAV_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.scale['32'],
            paddingLeft: spacing.scale['24'],
            paddingRight: spacing.scale['64'],
            paddingTop: spacing.scale['16'],
            paddingBottom: spacing.scale['16'],
            boxSizing: 'border-box',
          }}
        >
          <LogoMark />

          <div
            style={{
              display: 'flex',
              flex: '1 0 0',
              justifyContent: 'center',
              minWidth: spacing.scale['0'],
            }}
          >
            <SearchField
              placeholder={searchPlaceholder}
              shortcutLabel={searchShortcutLabel}
              interactionState={interactionState}
              disabled={componentDisabled}
            />
          </div>

          <span
            style={{
              width: spacing.scale['32'],
              height: spacing.scale['32'],
              borderRadius: radius.scale.full,
              overflow: 'hidden',
              flexShrink: 0,
              display: 'inline-flex',
            }}
          >
            <img
              src={avatarSrc ?? DEFAULT_AVATAR_SRC}
              alt=""
              aria-hidden="true"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </span>
        </div>

        <div
          style={{
            width: '100%',
            minHeight: NAV_HEIGHT - spacing.scale['16'],
            display: 'flex',
            alignItems: 'center',
            gap: spacing.scale['32'],
            paddingLeft: spacing.scale['24'],
            paddingRight: spacing.scale['64'],
            borderBottomStyle: 'solid',
            borderBottomWidth: border.width['1'],
            borderBottomColor: palette.gray['2'],
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: '1 0 0',
              alignItems: 'center',
              minWidth: spacing.scale['0'],
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing.scale['24'],
              }}
            >
              {resolvedBottomLinks.map((item) => (
                <NavigationBottomTabItem
                  key={item.id}
                  item={item}
                  active={item.id === resolvedActiveBottomLinkId}
                  interactionState={interactionState}
                  componentDisabled={componentDisabled}
                  onClick={onBottomLinkClick}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={componentDisabled}
            onClick={!componentDisabled ? () => onBottomLinkClick?.('help') : undefined}
            aria-disabled={componentDisabled || undefined}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.scale['6'],
              borderStyle: 'solid',
              borderWidth: border.width['0'],
              backgroundColor: palette.base.transparent,
              paddingInline: spacing.scale['0'],
              paddingBlock: spacing.scale['0'],
              color: helpTextColor,
              cursor: componentDisabled ? 'default' : 'pointer',
            }}
          >
            <span
              style={{
                whiteSpace: 'nowrap',
                textAlign: 'center',
                ...toTypographyStyle(typography.scale.captionL.medium),
              }}
            >
              {helpLabel}
            </span>
            <IconArrowDownSLine
              aria-hidden
              style={{ width: ICON_SIZE, height: ICON_SIZE, display: 'block' }}
            />
          </button>
        </div>
      </header>
    );
  }

  if (type === '05') {
    return (
      <header
        id={id}
        className={className}
        aria-disabled={componentDisabled || undefined}
        style={{
          ...commonRootStyle,
          minHeight: NAV_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale['32'],
          paddingLeft: spacing.scale['24'],
          paddingRight: spacing.scale['64'],
          paddingTop: spacing.scale['16'],
          paddingBottom: spacing.scale['16'],
          borderBottomStyle: 'solid',
          borderBottomWidth: border.width['1'],
          borderBottomColor: componentDisabled ? palette.gray['2'] : palette.gray['3'],
          backgroundColor: palette.base.white,
          boxSizing: 'border-box',
          ...style,
        }}
        {...props}
      >
        <div
          style={{
            display: 'flex',
            flex: '1 0 0',
            alignItems: 'center',
            minWidth: spacing.scale['0'],
          }}
        >
          <LogoMark />
        </div>

        <BaseCenterLinks
          links={resolvedMainLinks}
          interactionState={interactionState}
          componentDisabled={componentDisabled}
          onLinkClick={onLinkClick}
          justify="center"
        />

        <div
          style={{
            display: 'flex',
            flex: '1 0 0',
            minWidth: spacing.scale['0'],
            minHeight: spacing.scale['0'],
          }}
        />
      </header>
    );
  }

  if (type === '06') {
    return (
      <header
        id={id}
        className={className}
        aria-disabled={componentDisabled || undefined}
        style={{
          ...commonRootStyle,
          minHeight: NAV_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale['32'],
          paddingLeft: spacing.scale['24'],
          paddingRight: spacing.scale['64'],
          paddingTop: spacing.scale['16'],
          paddingBottom: spacing.scale['16'],
          borderBottomStyle: 'solid',
          borderBottomWidth: border.width['1'],
          borderBottomColor: componentDisabled ? palette.gray['2'] : palette.gray['3'],
          backgroundColor: palette.base.white,
          boxSizing: 'border-box',
          ...style,
        }}
        {...props}
      >
        <LogoMark />

        <div
          style={{
            display: 'flex',
            flex: '1 0 0',
            alignItems: 'center',
            gap: spacing.scale['24'],
            minWidth: spacing.scale['0'],
          }}
        >
          <SearchField
            placeholder={searchPlaceholder}
            shortcutLabel={searchShortcutLabel}
            interactionState={interactionState}
            disabled={componentDisabled}
          />

          {resolvedMainLinks.map((item) => (
            <NavigationMainItem
              key={item.id}
              item={item}
              interactionState={interactionState}
              componentDisabled={componentDisabled}
              onClick={onLinkClick}
            />
          ))}
        </div>
      </header>
    );
  }

  return (
    <header
      id={id}
      className={className}
      aria-disabled={componentDisabled || undefined}
      style={{
        ...commonRootStyle,
        minHeight: NAV_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.scale['32'],
        paddingLeft: spacing.scale['24'],
        paddingRight: spacing.scale['64'],
        paddingTop: spacing.scale['16'],
        paddingBottom: spacing.scale['16'],
        borderBottomStyle: 'solid',
        borderBottomWidth: border.width['1'],
        borderBottomColor: componentDisabled ? palette.gray['2'] : palette.gray['3'],
        backgroundColor: palette.base.white,
        boxSizing: 'border-box',
        ...style,
      }}
      {...props}
    >
      <LogoMark />

      <BaseCenterLinks
        links={resolvedMainLinks}
        interactionState={interactionState}
        componentDisabled={componentDisabled}
        onLinkClick={onLinkClick}
        justify="flex-start"
      />
    </header>
  );
}
