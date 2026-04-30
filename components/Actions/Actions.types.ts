import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

export const ACTIONS_TYPE_OPTIONS = ['button', 'input', 'tabs'] as const;
export const ACTIONS_DEVICE_OPTIONS = ['desktop', 'mobile'] as const;

export type ActionsType = (typeof ACTIONS_TYPE_OPTIONS)[number];
export type ActionsDevice = (typeof ACTIONS_DEVICE_OPTIONS)[number];

export interface ActionsTabItem {
  id?: string;
  label: ReactNode;
  badge?: ReactNode;
}

export interface ActionsProps {
  type?: ActionsType;
  device?: ActionsDevice;

  // Button type
  primaryLabel?: ReactNode;
  secondaryLabel?: ReactNode;
  onPrimaryClick?: MouseEventHandler<HTMLButtonElement>;
  onSecondaryClick?: MouseEventHandler<HTMLButtonElement>;

  // Input type
  inputPlaceholder?: string;
  inputValue?: string;
  inputName?: string;
  inputType?: 'email' | 'text';
  inputLeadIcon?: ReactNode;
  showInputLeadIcon?: boolean;
  inputActionLabel?: ReactNode;
  onInputChange?: (value: string) => void;
  onInputAction?: MouseEventHandler<HTMLButtonElement>;

  // Tabs type
  tabs?: ActionsTabItem[];
  activeTabId?: string;
  defaultActiveTabId?: string;
  onTabChange?: (id: string) => void;

  className?: string;
  style?: CSSProperties;
}
