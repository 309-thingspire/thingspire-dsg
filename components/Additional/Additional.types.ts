import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

export const ADDITIONAL_TYPE_OPTIONS = ['divider', 'caption', 'buttonStack', 'label'] as const;
export type AdditionalType = (typeof ADDITIONAL_TYPE_OPTIONS)[number];

export interface AdditionalProps {
  type?: AdditionalType;
  text?: string;
  tailIcon?: boolean;
  tailIconNode?: ReactNode;
  buttons?: [string, string];
  className?: string;
  style?: CSSProperties;
  onLabelClick?: MouseEventHandler<HTMLDivElement>;
  onTailIconClick?: MouseEventHandler<HTMLButtonElement>;
  onLeftButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onRightButtonClick?: MouseEventHandler<HTMLButtonElement>;
}
