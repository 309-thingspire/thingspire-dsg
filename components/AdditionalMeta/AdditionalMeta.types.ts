import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

export const ADDITIONAL_META_TYPE_OPTIONS = [
  'buttonGroupH',
  'buttonGroupV',
  'badgeContainer',
  'text',
  'divider',
  'input',
  'tabMenu',
  'avatar',
  'icon',
  'rating',
  'pagination',
  'empty',
] as const;

export type AdditionalMetaType = (typeof ADDITIONAL_META_TYPE_OPTIONS)[number];

export const BADGE_TONE_OPTIONS = ['green', 'orange', 'blue', 'red', 'purple', 'gray'] as const;
export type BadgeTone = (typeof BADGE_TONE_OPTIONS)[number];

export interface AdditionalMetaBadge {
  id?: string;
  label: ReactNode;
  tone?: BadgeTone;
}

export interface AdditionalMetaTab {
  id?: string;
  label: ReactNode;
  badge?: ReactNode;
}

export interface AdditionalMetaProps {
  type?: AdditionalMetaType;

  // buttonGroup
  primaryLabel?: ReactNode;
  secondaryLabel?: ReactNode;
  onPrimaryClick?: MouseEventHandler<HTMLButtonElement>;
  onSecondaryClick?: MouseEventHandler<HTMLButtonElement>;

  // badgeContainer
  badges?: AdditionalMetaBadge[];

  // text
  text?: ReactNode;

  // input
  placeholder?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;

  // tabMenu
  tabs?: AdditionalMetaTab[];
  activeTabId?: string;
  defaultActiveTabId?: string;
  onTabChange?: (id: string) => void;

  // avatar
  avatarSrc?: string;
  avatarFallback?: ReactNode;

  // icon
  icon?: ReactNode;

  // rating
  ratingValue?: ReactNode;

  // pagination
  pageDots?: number;
  activeDotIndex?: number;
  showDots?: boolean;
  onPrevPage?: MouseEventHandler<HTMLButtonElement>;
  onNextPage?: MouseEventHandler<HTMLButtonElement>;

  width?: number | string;
  className?: string;
  style?: CSSProperties;
}
