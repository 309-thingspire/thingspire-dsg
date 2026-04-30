import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

export const ADDITIONAL_CONTENT_TYPE_OPTIONS = [
  'divider',
  'label',
  'caption',
  'button',
  'doubleButton',
  'searchInput',
  'tags',
  'segmented',
] as const;

export type AdditionalContentType = (typeof ADDITIONAL_CONTENT_TYPE_OPTIONS)[number];

export interface AdditionalContentSegmentedTab {
  id?: string;
  label: ReactNode;
  badge?: ReactNode;
}

export interface AdditionalContentProps {
  type?: AdditionalContentType;

  // label / caption / segmented item / generic
  text?: ReactNode;

  // search
  placeholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  // tags
  tags?: ReactNode[];

  // segmented
  segmentedTabs?: AdditionalContentSegmentedTab[];
  activeSegmentId?: string;
  defaultActiveSegmentId?: string;
  onSegmentChange?: (id: string) => void;

  // buttons
  buttonLabel?: ReactNode;
  doubleButtonIcon?: ReactNode;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onDoubleButtonIconClick?: MouseEventHandler<HTMLButtonElement>;

  width?: number | string;
  className?: string;
  style?: CSSProperties;
}
