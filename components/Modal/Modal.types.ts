import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

import type { ButtonProps } from '../Button/Button.types';

export const MODAL_TYPE_OPTIONS = ['info', 'payment', 'login', 'inviteFriend', 'update', 'slot'] as const;

export type ModalType = (typeof MODAL_TYPE_OPTIONS)[number];

/**
 * A button inside the modal. Rendered with the shared `Button` (size `sm`);
 * the variant is fixed by where the action sits (primary / secondary / tertiary).
 */
export interface ModalAction
  extends Omit<ButtonProps, 'children' | 'variant' | 'size' | 'type' | 'shape' | 'fullWidth' | 'forceState' | 'badge'> {
  label: ReactNode;
}

/** Text link (e.g. "Forgot password?"). `href` renders an `<a>`, `onClick` alone renders a `<button>`. */
export interface ModalLinkAction {
  label: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

/** One text field. Any key left out falls back to the Figma sample for that field. */
export interface ModalField {
  /** Label above the field. Payment shows one; Log in does not. */
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export interface ModalInviteField extends ModalField {
  buttonLabel?: string;
  onButtonClick?: () => void;
}

/** One option of the Payment plan toggle (segmented TabMenu). */
export interface ModalPlanOption {
  id: string;
  label: string;
  badge?: string;
}

export interface ModalInvitedFriend {
  id?: string;
  name: ReactNode;
  email: ReactNode;
  /** Without it the row shows the default avatar. */
  avatarSrc?: string;
  avatarAlt?: string;
  rewardLabel?: ReactNode;
}

export interface ModalBaseProps {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called with `false` from the close button, Esc and an overlay click. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Render only the dialog panel in place: no overlay, portal, focus trap or
   * scroll lock, and always visible. For docs, galleries, or your own overlay.
   */
  inline?: boolean;
  /** Close (X) button in the top-right corner. Figma: `Show Disclosure Button`. */
  showDisclosureButton?: boolean;
  /** Accessible name of the close button. */
  closeButtonLabel?: string;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  /** Where the overlay is portaled to. Defaults to `document.body`. */
  portalTarget?: HTMLElement | null;
  /** Max width of the panel. Defaults to 400 (Figma). */
  width?: number | string;
  id?: string;
  className?: string;
  /** Applied to the dialog panel. */
  style?: CSSProperties;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

interface ModalTextProps {
  /** Defaults to the Figma sample headline. */
  headline?: ReactNode;
  /** Defaults to the Figma sample text; `null` hides it. */
  description?: ReactNode | null;
}

export interface InfoModalProps extends ModalBaseProps, ModalTextProps {
  type?: 'info';
  /** `null` hides the button. */
  primaryAction?: ModalAction | null;
  /** `null` hides the button. */
  secondaryAction?: ModalAction | null;
}

export interface PaymentModalProps extends ModalBaseProps, ModalTextProps {
  type: 'payment';
  /** Plan toggle options. An empty array hides the toggle. */
  plans?: ModalPlanOption[];
  selectedPlanId?: string;
  defaultSelectedPlanId?: string;
  onSelectedPlanIdChange?: (id: string) => void;
  cardField?: ModalField;
  emailField?: ModalField;
  /** `null` hides the button. */
  primaryAction?: ModalAction | null;
}

export interface LoginModalProps extends ModalBaseProps, ModalTextProps {
  type: 'login';
  usernameField?: ModalField;
  /** Rendered as a password field with a show/hide toggle. */
  passwordField?: ModalField;
  /** `null` hides the button. */
  primaryAction?: ModalAction | null;
  /** Text in the divider above the social buttons. `null` hides the divider. */
  dividerLabel?: ReactNode | null;
  /** Secondary buttons in one row. `null` or `[]` hides the row. */
  socialActions?: ModalAction[] | null;
  /** `null` hides the link. */
  forgotPasswordAction?: ModalLinkAction | null;
  signUpPrompt?: ReactNode;
  /** `null` hides the sign-up line. */
  signUpAction?: ModalLinkAction | null;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}

export interface InviteFriendModalProps extends ModalBaseProps, ModalTextProps {
  type: 'inviteFriend';
  inviteField?: ModalInviteField;
  /** Defaults to `Invited friends [n]`. `null` hides the divider. */
  invitedFriendsLabel?: ReactNode | null;
  invitedFriends?: ModalInvitedFriend[];
  /** Tertiary buttons under the list. `null` or `[]` hides them and the divider above. */
  shareActions?: ModalAction[] | null;
}

export interface UpdateModalProps extends ModalBaseProps, ModalTextProps {
  type: 'update';
  /** Content of the 312px image area. The brand gradient shows behind it. */
  imageSlot?: ReactNode;
  showPagination?: boolean;
  dotCount?: number;
  /** Controlled page (0-based). */
  activeDotIndex?: number;
  defaultActiveDotIndex?: number;
  onActiveDotIndexChange?: (index: number) => void;
}

export interface SlotModalProps extends ModalBaseProps {
  type: 'slot';
  /** Modal content. Without it the Figma `Slot` placeholder shows. */
  children?: ReactNode;
}

export type ModalProps =
  | InfoModalProps
  | PaymentModalProps
  | LoginModalProps
  | InviteFriendModalProps
  | UpdateModalProps
  | SlotModalProps;
