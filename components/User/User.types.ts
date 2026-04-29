import type { CSSProperties, MouseEvent, MouseEventHandler, ReactNode } from 'react';

export interface UserProps {
  name?: string;
  handle?: string;
  avatarSrc?: string;
  avatarFallback?: ReactNode;
  showAvatar?: boolean;
  showCaption?: boolean;
  showLabel?: boolean;
  proBadge?: boolean;
  proBadgeLabel?: string;
  tailIcons?: Array<{ icon: ReactNode; onClick?: MouseEventHandler<HTMLButtonElement>; ariaLabel?: string }>;
  showTailIcon1?: boolean;
  showTailIcon2?: boolean;
  className?: string;
  style?: CSSProperties;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
}
