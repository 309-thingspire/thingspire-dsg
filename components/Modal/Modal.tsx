import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, FormEvent, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { border, colors, radius, shadows, spacing, typography } from '../../style-tokens';
import { Button } from '../Button/Button';
import type { ButtonVariant } from '../Button/Button.types';
import {
  IconAppleFill,
  IconBankCard2Line,
  IconCloseLine,
  IconEyeLine,
  IconEyeOffLine,
  IconGoogleFill,
  IconLinkM,
  IconMailLine,
  IconTwitterFill,
  IconUser2Line,
} from '../icons';
import { Input } from '../Input/Input';
import { Pagination } from '../Pagination/Pagination';
import { TabMenu } from '../TabMenu/TabMenu';
import { TextContainer } from '../TextContainer/TextContainer';

import type {
  InfoModalProps,
  InviteFriendModalProps,
  LoginModalProps,
  ModalAction,
  ModalField,
  ModalInviteField,
  ModalInvitedFriend,
  ModalLinkAction,
  ModalPlanOption,
  ModalProps,
  PaymentModalProps,
  UpdateModalProps,
} from './Modal.types';

type TypographyToken = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
};

const textBase = colors.semantic.theme.text.base;
const textStatus = colors.semantic.theme.text.status;
const iconBase = colors.semantic.theme.icon.base;
const background = colors.semantic.theme.background;
const borderTheme = colors.semantic.theme.border;
const brand = colors.semantic.theme.semantic.brand;
const gradientSolid04 = colors.gradients.solid['04'];

const PANEL_WIDTH = spacing.scale['400'];
// Figma strokes the panel inside its 24px padding; a CSS border adds to it, so take the 1px back
// to keep the 352px content width and the Figma frame heights.
const PANEL_PADDING = spacing.scale['24'] - border.width['1'];
// Figma places the close button 16px from the panel's outer edge; CSS offsets start inside the 1px border.
const CLOSE_BUTTON_OFFSET = spacing.scale['16'] - border.width['1'];
const CLOSE_BUTTON_SIZE = spacing.scale['24'];
const CLOSE_ICON_SIZE = spacing.scale['14'];
// The close button reaches 16px into the content box; keep long headlines 8px clear of it.
const HEADLINE_CLOSE_CLEARANCE = spacing.scale['24'];
const BUTTON_ICON_SIZE = spacing.scale['16'];
const FIELD_ICON_SIZE = spacing.scale['20'];
const AVATAR_SIZE = spacing.scale['40'];
const AVATAR_ICON_SIZE = spacing.scale['20'];
// 280 and 312 fall between scale steps; same derivation as FeatureCard's slot.
const SLOT_PLACEHOLDER_HEIGHT = spacing.scale['288'] - spacing.scale['8'];
const UPDATE_IMAGE_HEIGHT = spacing.scale['320'] - spacing.scale['8'];
// Above page chrome such as NavigationBar (z-index 50).
const OVERLAY_Z_INDEX = 1000;
const DEFAULT_DOT_COUNT = 6;

// Figma sample content (node 2534:54220).
const DEFAULT_HEADLINE = 'Medium length headline';
const DEFAULT_DESCRIPTION = 'Design better and spend less time without restricting creative freedom.';
const DEFAULT_BUTTON_ACTION: ModalAction = { label: 'Button' };
const DEFAULT_PLANS: ModalPlanOption[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'annual', label: 'Annual', badge: 'Save 25%' },
];
const DEFAULT_SELECTED_PLAN_ID = 'annual';
const DEFAULT_CARD_FIELD: ModalField = { label: 'Card Details', placeholder: 'Card Number' };
const DEFAULT_EMAIL_FIELD: ModalField = { label: 'Email Address', placeholder: 'hello@craftwork.design' };
const DEFAULT_USERNAME_FIELD: ModalField = { placeholder: 'Email or username' };
const DEFAULT_PASSWORD_FIELD: ModalField = { placeholder: 'Password' };
const DEFAULT_INVITE_FIELD: ModalInviteField = { placeholder: 'Placeholder', buttonLabel: 'Button' };
const DEFAULT_INVITED_FRIENDS: ModalInvitedFriend[] = [
  { id: 'anna', name: 'Anna Green', email: 'anna@useblank.design', rewardLabel: '+ €10' },
  { id: 'george', name: 'George Jones', email: 'george@useblank.design', rewardLabel: '+ €10' },
  { id: 'dan', name: 'Dan Shepherd', email: 'dan@useblank.design', rewardLabel: '+ €10' },
];
const DEFAULT_SOCIAL_ACTIONS: ModalAction[] = [
  { label: 'Google', leftIcon: <ActionIcon><IconGoogleFill /></ActionIcon> },
  { label: 'Apple', leftIcon: <ActionIcon><IconAppleFill /></ActionIcon> },
];
const DEFAULT_SHARE_ACTIONS: ModalAction[] = [
  { label: 'Copy link', leftIcon: <ActionIcon><IconLinkM /></ActionIcon> },
  { label: 'Share link', rightIcon: <ActionIcon><IconTwitterFill /></ActionIcon> },
];

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

// Open (non-inline) modals, innermost last. Only the top one reacts to Esc / Tab.
const openModalStack: string[] = [];
let scrollLockCount = 0;
let savedBodyStyle: { overflow: string; paddingRight: string } | null = null;

function lockBodyScroll() {
  if (scrollLockCount === 0) {
    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    savedBodyStyle = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = 'hidden';
    // Keep the page from shifting sideways when the scrollbar disappears.
    if (scrollbarWidth > 0) {
      const currentPadding = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }
  }
  scrollLockCount += 1;
}

function unlockBodyScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0 && savedBodyStyle) {
    document.body.style.overflow = savedBodyStyle.overflow;
    document.body.style.paddingRight = savedBodyStyle.paddingRight;
    savedBodyStyle = null;
  }
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => element.getAttribute('aria-hidden') !== 'true' && element.getClientRects().length > 0,
  );
}

function isFocusVisible(element: HTMLElement): boolean {
  try {
    return element.matches(':focus-visible');
  } catch {
    return true;
  }
}

function textStyle(token: TypographyToken): CSSProperties {
  return {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    lineHeight: `${token.lineHeight}px`,
    letterSpacing: `${token.letterSpacing}px`,
    margin: spacing.scale['0'],
  };
}

const ellipsis: CSSProperties = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

function resolveDescription(description: ReactNode | null | undefined): ReactNode | null {
  if (description === undefined) return DEFAULT_DESCRIPTION;
  if (description === null || description === false || description === '') return null;
  return description;
}

function resolveAction(action: ModalAction | null | undefined, fallback: ModalAction): ModalAction | null {
  return action === undefined ? fallback : action;
}

function resolveActions(actions: ModalAction[] | null | undefined, fallback: ModalAction[]): ModalAction[] {
  if (actions === undefined) return fallback;
  return actions ?? [];
}

function clampIndex(index: number, count: number): number {
  return Math.min(Math.max(index, 0), Math.max(count - 1, 0));
}

// Form fields sit in a <form> so Enter runs the primary action (a submit button) and
// password managers recognise the fields. The page itself never submits.
function preventSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.scale['16'],
  width: '100%',
  margin: spacing.scale['0'],
};

function ActionIcon({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: BUTTON_ICON_SIZE,
        height: BUTTON_ICON_SIZE,
        flexShrink: 0,
        fontSize: BUTTON_ICON_SIZE,
        lineHeight: 1,
        color: iconBase.secondary,
      }}
    >
      {children}
    </span>
  );
}

function FieldIcon({ children, disabled = false }: { children: ReactNode; disabled?: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: FIELD_ICON_SIZE,
        height: FIELD_ICON_SIZE,
        flexShrink: 0,
        fontSize: FIELD_ICON_SIZE,
        lineHeight: 1,
        color: iconBase.tertiary,
        // Same dimming as Input's own icon slots.
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </span>
  );
}

function ModalActionButton({
  action,
  variant,
  fullWidth = false,
}: {
  action: ModalAction;
  variant: ButtonVariant;
  fullWidth?: boolean;
}) {
  const { label, ...buttonProps } = action;

  return (
    <Button {...buttonProps} variant={variant} size="sm" fullWidth={fullWidth}>
      {label}
    </Button>
  );
}

function ModalTextAction({ action, color }: { action: ModalLinkAction; color: string }) {
  const style: CSSProperties = {
    ...textStyle(typography.scale.captionL.medium),
    color,
    padding: spacing.scale['0'],
    borderStyle: 'none',
    borderWidth: border.width['0'],
    backgroundColor: background.button.ghost,
    textDecoration: 'none',
    cursor: 'pointer',
  };

  if (action.href) {
    return (
      <a href={action.href} onClick={action.onClick} style={style}>
        {action.label}
      </a>
    );
  }

  if (action.onClick) {
    return (
      <button type="button" onClick={action.onClick} style={style}>
        {action.label}
      </button>
    );
  }

  return <span style={{ ...style, cursor: 'inherit' }}>{action.label}</span>;
}

function ModalDivider({ label }: { label?: ReactNode }) {
  const line = (
    <span
      aria-hidden="true"
      style={{
        flex: '1 0 0',
        minWidth: spacing.scale['0'],
        height: border.width['1'],
        backgroundColor: borderTheme.base.divider,
      }}
    />
  );

  return (
    <div
      role={label ? undefined : 'separator'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.scale['8'],
        width: '100%',
        paddingBlock: spacing.scale['2'],
      }}
    >
      {line}
      {label ? (
        <>
          <span style={{ ...textStyle(typography.scale.captionM.medium), color: textBase.secondary, whiteSpace: 'nowrap' }}>
            {label}
          </span>
          {line}
        </>
      ) : null}
    </div>
  );
}

function ModalFieldInput({
  field,
  leadIcon,
  tailIcon,
  htmlType,
}: {
  field: ModalField;
  leadIcon?: ReactNode;
  tailIcon?: ReactNode;
  htmlType?: string;
}) {
  return (
    <Input
      type="default"
      size="xs"
      label={field.label}
      showLabel={Boolean(field.label)}
      optionalLabel=""
      showHelper={false}
      showFlag={false}
      showLeadDropdown={false}
      showLeadIcon={Boolean(leadIcon)}
      leadIcon={leadIcon ? <FieldIcon disabled={field.disabled}>{leadIcon}</FieldIcon> : undefined}
      showBadge={false}
      showTailIcon={Boolean(tailIcon)}
      tailIcon={tailIcon}
      showTailDropdown={false}
      placeholder={field.placeholder}
      value={field.value}
      defaultValue={field.defaultValue}
      onValueChange={field.onValueChange}
      disabled={field.disabled}
      inputAriaLabel={field.label ?? field.placeholder}
      htmlType={htmlType}
    />
  );
}

function PasswordVisibilityToggle({
  visible,
  disabled,
  showLabel,
  hideLabel,
  onToggle,
}: {
  visible: boolean;
  disabled?: boolean;
  showLabel: string;
  hideLabel: string;
  onToggle: () => void;
}) {
  const [focusVisible, setFocusVisible] = useState(false);

  return (
    <button
      type="button"
      aria-label={visible ? hideLabel : showLabel}
      disabled={disabled}
      onClick={onToggle}
      onFocus={(event) => setFocusVisible(isFocusVisible(event.currentTarget))}
      onBlur={() => setFocusVisible(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: FIELD_ICON_SIZE,
        height: FIELD_ICON_SIZE,
        flexShrink: 0,
        padding: spacing.scale['0'],
        margin: spacing.scale['0'],
        borderStyle: 'none',
        borderWidth: border.width['0'],
        borderRadius: radius.scale.xs,
        backgroundColor: background.button.ghost,
        color: iconBase.tertiary,
        fontSize: FIELD_ICON_SIZE,
        lineHeight: 1,
        boxShadow: focusVisible ? shadows.focusRing.light.css : 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        appearance: 'none',
      }}
    >
      {visible ? <IconEyeOffLine aria-hidden="true" /> : <IconEyeLine aria-hidden="true" />}
    </button>
  );
}

function FriendAvatar({ src, alt }: { src?: string; alt?: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        flexShrink: 0,
        overflow: 'hidden',
        borderRadius: radius.scale.full,
        backgroundColor: background.badge.purple,
        color: colors.semantic.theme.text.accent.purple,
      }}
    >
      {src ? (
        <img src={src} alt={alt ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <IconUser2Line aria-hidden="true" width={AVATAR_ICON_SIZE} height={AVATAR_ICON_SIZE} style={{ display: 'block' }} />
      )}
    </span>
  );
}

function InvitedFriendRow({ friend }: { friend: ModalInvitedFriend }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: spacing.scale['12'], width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.scale['12'], flex: '1 0 0', minWidth: spacing.scale['0'] }}>
        <FriendAvatar src={friend.avatarSrc} alt={friend.avatarAlt} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.scale['1'],
            flex: '1 0 0',
            minWidth: spacing.scale['0'],
          }}
        >
          <span style={{ ...textStyle(typography.scale.captionL.regular), ...ellipsis, color: textBase.primary }}>
            {friend.name}
          </span>
          <span style={{ ...textStyle(typography.scale.captionL.regular), ...ellipsis, color: textBase.tertiary }}>
            {friend.email}
          </span>
        </div>
      </div>
      {friend.rewardLabel ? (
        <span style={{ ...textStyle(typography.scale.captionL.medium), color: textStatus.success, whiteSpace: 'nowrap' }}>
          {friend.rewardLabel}
        </span>
      ) : null}
    </li>
  );
}

function SlotPlaceholder() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: SLOT_PLACEHOLDER_HEIGHT,
        boxSizing: 'border-box',
        overflow: 'hidden',
        borderStyle: 'dashed',
        borderWidth: border.width['1'],
        borderColor: brand['8'],
        borderRadius: radius.scale.xl,
        backgroundColor: brand['2'],
      }}
    >
      <span style={{ ...textStyle(typography.scale.h6.medium), color: brand['11'], textAlign: 'center', whiteSpace: 'nowrap' }}>
        Slot
      </span>
    </div>
  );
}

function ModalCloseButton({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(event) => setFocusVisible(isFocusVisible(event.currentTarget))}
      onBlur={() => setFocusVisible(false)}
      style={{
        position: 'absolute',
        top: CLOSE_BUTTON_OFFSET,
        right: CLOSE_BUTTON_OFFSET,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: CLOSE_BUTTON_SIZE,
        height: CLOSE_BUTTON_SIZE,
        boxSizing: 'border-box',
        padding: spacing.scale['5'],
        margin: spacing.scale['0'],
        borderStyle: 'none',
        borderWidth: border.width['0'],
        borderRadius: radius.scale.full,
        backgroundColor: hovered ? background.button.tertiaryHover : background.button.tertiary,
        color: iconBase.secondary,
        boxShadow: focusVisible ? shadows.focusRing.light.css : 'none',
        cursor: 'pointer',
        outline: 'none',
        appearance: 'none',
      }}
    >
      <IconCloseLine aria-hidden="true" width={CLOSE_ICON_SIZE} height={CLOSE_ICON_SIZE} style={{ display: 'block' }} />
    </button>
  );
}

function ModalHeading({
  headline,
  description,
  headlineId,
  descriptionId,
  clearCloseButton,
}: {
  headline: ReactNode;
  description: ReactNode | null;
  headlineId: string;
  descriptionId: string;
  clearCloseButton: boolean;
}) {
  return (
    <TextContainer
      size="xs"
      align="left"
      width="100%"
      headline={
        <span
          id={headlineId}
          style={{ display: 'block', paddingRight: clearCloseButton ? HEADLINE_CLOSE_CLEARANCE : spacing.scale['0'] }}
        >
          {headline}
        </span>
      }
      description={description !== null ? <span id={descriptionId}>{description}</span> : undefined}
      showDescription={description !== null}
      showCaption={false}
    />
  );
}

function InfoBody({ primaryAction, secondaryAction }: InfoModalProps) {
  const primary = resolveAction(primaryAction, DEFAULT_BUTTON_ACTION);
  const secondary = resolveAction(secondaryAction, DEFAULT_BUTTON_ACTION);

  if (!primary && !secondary) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.scale['8'], width: '100%' }}>
      {primary ? <ModalActionButton action={primary} variant="primary" fullWidth /> : null}
      {secondary ? <ModalActionButton action={secondary} variant="secondary" fullWidth /> : null}
    </div>
  );
}

function PaymentBody({
  plans = DEFAULT_PLANS,
  selectedPlanId,
  defaultSelectedPlanId,
  onSelectedPlanIdChange,
  cardField,
  emailField,
  primaryAction,
}: PaymentModalProps) {
  const primary = resolveAction(primaryAction, DEFAULT_BUTTON_ACTION);
  const fallbackPlanId = plans === DEFAULT_PLANS ? DEFAULT_SELECTED_PLAN_ID : plans[0]?.id;

  return (
    <form noValidate onSubmit={preventSubmit} style={formStyle}>
      {plans.length > 0 ? (
        <TabMenu
          type="segmented"
          size="sm"
          items={plans}
          selectedId={selectedPlanId}
          defaultSelectedId={defaultSelectedPlanId ?? fallbackPlanId}
          onSelectedIdChange={onSelectedPlanIdChange}
          style={{ width: '100%' }}
        />
      ) : null}
      <ModalFieldInput field={{ ...DEFAULT_CARD_FIELD, ...cardField }} leadIcon={<IconBankCard2Line />} />
      <ModalFieldInput field={{ ...DEFAULT_EMAIL_FIELD, ...emailField }} leadIcon={<IconMailLine />} htmlType="email" />
      {primary ? <ModalActionButton action={{ htmlType: 'submit', ...primary }} variant="primary" fullWidth /> : null}
    </form>
  );
}

function LoginBody({
  usernameField,
  passwordField,
  primaryAction,
  dividerLabel,
  socialActions,
  forgotPasswordAction,
  signUpPrompt = "Don't have an account?",
  signUpAction,
  showPasswordLabel = 'Show password',
  hidePasswordLabel = 'Hide password',
}: LoginModalProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const password = { ...DEFAULT_PASSWORD_FIELD, ...passwordField };
  const primary = resolveAction(primaryAction, DEFAULT_BUTTON_ACTION);
  const divider = dividerLabel === undefined ? 'Or authorize with' : dividerLabel;
  const socials = resolveActions(socialActions, DEFAULT_SOCIAL_ACTIONS);
  const forgotPassword = forgotPasswordAction === undefined ? { label: 'Forgot password?' } : forgotPasswordAction;
  const signUp = signUpAction === undefined ? { label: 'Sign up' } : signUpAction;

  return (
    <>
      <form noValidate onSubmit={preventSubmit} style={formStyle}>
        <ModalFieldInput field={{ ...DEFAULT_USERNAME_FIELD, ...usernameField }} />
        <ModalFieldInput
          field={password}
          htmlType={passwordVisible ? 'text' : 'password'}
          tailIcon={
            <PasswordVisibilityToggle
              visible={passwordVisible}
              disabled={password.disabled}
              showLabel={showPasswordLabel}
              hideLabel={hidePasswordLabel}
              onToggle={() => setPasswordVisible((value) => !value)}
            />
          }
        />
        {primary ? <ModalActionButton action={{ htmlType: 'submit', ...primary }} variant="primary" fullWidth /> : null}
      </form>

      {divider !== null && divider !== false ? <ModalDivider label={divider} /> : null}

      {socials.length > 0 ? (
        <div style={{ display: 'flex', gap: spacing.scale['8'], width: '100%' }}>
          {socials.map((action, index) => (
            <div key={index} style={{ display: 'flex', flex: '1 0 0', minWidth: spacing.scale['0'] }}>
              <ModalActionButton action={action} variant="secondary" fullWidth />
            </div>
          ))}
        </div>
      ) : null}

      {forgotPassword || signUp ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.scale['8'], width: '100%' }}>
          {forgotPassword ? (
            <p style={{ ...textStyle(typography.scale.captionL.medium), color: textBase.primary }}>
              <ModalTextAction action={forgotPassword} color={textBase.primary} />
            </p>
          ) : null}
          {signUp ? (
            <p style={{ ...textStyle(typography.scale.captionL.medium), color: textBase.secondary }}>
              {signUpPrompt ? <>{signUpPrompt} </> : null}
              <ModalTextAction action={signUp} color={textBase.primary} />
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

function InviteFriendBody({
  inviteField,
  invitedFriendsLabel,
  invitedFriends = DEFAULT_INVITED_FRIENDS,
  shareActions,
}: InviteFriendModalProps) {
  const field = { ...DEFAULT_INVITE_FIELD, ...inviteField };
  const label = invitedFriendsLabel === undefined ? `Invited friends [${invitedFriends.length}]` : invitedFriendsLabel;
  const actions = resolveActions(shareActions, DEFAULT_SHARE_ACTIONS);
  const showLabel = label !== null && label !== false;

  return (
    <>
      <Input
        type="button"
        size="xs"
        label={field.label}
        showLabel={Boolean(field.label)}
        optionalLabel=""
        showHelper={false}
        showFlag={false}
        showLeadDropdown={false}
        showLeadIcon={false}
        showBadge={false}
        showTailIcon={false}
        showTailDropdown={false}
        placeholder={field.placeholder}
        value={field.value}
        defaultValue={field.defaultValue}
        onValueChange={field.onValueChange}
        disabled={field.disabled}
        buttonLabel={field.buttonLabel}
        onButtonClick={field.onButtonClick}
        inputAriaLabel={field.label ?? field.placeholder}
      />

      {showLabel || invitedFriends.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.scale['24'], width: '100%' }}>
          {showLabel ? <ModalDivider label={label} /> : null}
          {invitedFriends.length > 0 ? (
            <ul
              role="list"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.scale['24'],
                width: '100%',
                margin: spacing.scale['0'],
                padding: spacing.scale['0'],
                listStyle: 'none',
              }}
            >
              {invitedFriends.map((friend, index) => (
                <InvitedFriendRow key={friend.id ?? index} friend={friend} />
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {actions.length > 0 ? (
        <>
          <ModalDivider />
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: spacing.scale['8'], width: '100%' }}>
            {actions.map((action, index) => (
              <ModalActionButton key={index} action={action} variant="tertiary" />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

function UpdateBody({
  imageSlot,
  showPagination = true,
  dotCount = DEFAULT_DOT_COUNT,
  activeDotIndex,
  defaultActiveDotIndex = 0,
  onActiveDotIndexChange,
}: UpdateModalProps) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultActiveDotIndex);
  const currentIndex = clampIndex(activeDotIndex ?? uncontrolledIndex, dotCount);

  const goTo = (index: number) => {
    const next = clampIndex(index, dotCount);
    if (next === currentIndex) return;
    if (activeDotIndex === undefined) setUncontrolledIndex(next);
    onActiveDotIndexChange?.(next);
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          height: UPDATE_IMAGE_HEIGHT,
          flexShrink: 0,
          overflow: 'hidden',
          borderRadius: radius.scale.xxl,
          backgroundImage: gradientSolid04.css,
          backgroundColor: gradientSolid04.stops[0].color,
        }}
      >
        {imageSlot}
      </div>
      {showPagination ? (
        <Pagination
          type="arrows"
          size="sm"
          showDots
          dotCount={dotCount}
          activeDotIndex={currentIndex}
          onPrevClick={() => goTo(currentIndex - 1)}
          onNextClick={() => goTo(currentIndex + 1)}
          style={{ width: '100%' }}
        />
      ) : null}
    </>
  );
}

function ModalBody(props: ModalProps) {
  switch (props.type) {
    case 'payment':
      return <PaymentBody {...props} />;
    case 'login':
      return <LoginBody {...props} />;
    case 'inviteFriend':
      return <InviteFriendBody {...props} />;
    case 'update':
      return <UpdateBody {...props} />;
    case 'slot':
      return <>{props.children ?? <SlotPlaceholder />}</>;
    default:
      return <InfoBody {...props} />;
  }
}

export function Modal(props: ModalProps) {
  const {
    open,
    defaultOpen = false,
    onOpenChange,
    inline = false,
    showDisclosureButton = true,
    closeButtonLabel = 'Close',
    closeOnEscape = true,
    closeOnOverlayClick = true,
    portalTarget,
    width = PANEL_WIDTH,
    id,
    className,
    style,
  } = props;
  const ariaLabel = props['aria-label'];
  const ariaLabelledBy = props['aria-labelledby'];
  const ariaDescribedBy = props['aria-describedby'];

  const instanceId = useId();
  const headlineId = `${instanceId}-headline`;
  const descriptionId = `${instanceId}-description`;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const pointerDownOutsideRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const isActive = !inline && isOpen && mounted;

  const requestClose = useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Stack, scroll lock, initial focus on the panel, focus restore on close.
  useEffect(() => {
    if (!isActive) return undefined;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    openModalStack.push(instanceId);
    lockBodyScroll();
    panelRef.current?.focus({ preventScroll: true });

    return () => {
      const index = openModalStack.lastIndexOf(instanceId);
      if (index !== -1) openModalStack.splice(index, 1);
      unlockBodyScroll();
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, [isActive, instanceId]);

  // Esc closes; Tab / Shift+Tab stay inside the panel.
  useEffect(() => {
    if (!isActive) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (openModalStack[openModalStack.length - 1] !== instanceId) return;
      const panel = panelRef.current;
      if (!panel) return;

      if (event.key === 'Escape') {
        if (!closeOnEscape || event.defaultPrevented) return;
        event.preventDefault();
        requestClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusableElements(panel);
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || active === panel || !panel.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, closeOnEscape, requestClose, instanceId]);

  const type = props.type ?? 'info';
  const hasHeading = props.type !== 'slot';
  const headline = props.type !== 'slot' ? props.headline ?? DEFAULT_HEADLINE : null;
  const description = props.type !== 'slot' ? resolveDescription(props.description) : null;

  const labelledBy = ariaLabelledBy ?? (hasHeading && !ariaLabel ? headlineId : undefined);
  const describedBy = ariaDescribedBy ?? (hasHeading && description !== null ? descriptionId : undefined);

  const panel = (
    <div
      ref={panelRef}
      id={id}
      role="dialog"
      aria-modal={inline ? undefined : true}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      tabIndex={-1}
      data-modal-type={type}
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: spacing.scale['24'],
        width: '100%',
        maxWidth: width,
        boxSizing: 'border-box',
        padding: PANEL_PADDING,
        borderStyle: 'solid',
        borderWidth: border.width['1'],
        borderColor: borderTheme.action.normal,
        borderRadius: radius.scale.xxl,
        backgroundColor: background.surface.default,
        boxShadow: shadows.elevation.lg.css,
        color: textBase.primary,
        textAlign: 'left',
        outline: 'none',
        ...style,
      }}
    >
      {hasHeading ? (
        <ModalHeading
          headline={headline}
          description={description}
          headlineId={headlineId}
          descriptionId={descriptionId}
          clearCloseButton={showDisclosureButton}
        />
      ) : null}
      <ModalBody {...props} />
      {showDisclosureButton ? <ModalCloseButton label={closeButtonLabel} onClick={requestClose} /> : null}
    </div>
  );

  if (inline) return panel;
  if (!isOpen || !mounted) return null;

  // React events from a modal opened inside this one bubble here through the portal;
  // only targets inside this overlay's own DOM count.
  const isOwnBackdropTarget = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as Node;
    return event.currentTarget.contains(target) && !panelRef.current?.contains(target);
  };

  const handleOverlayMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    pointerDownOutsideRef.current = isOwnBackdropTarget(event);
  };

  const handleOverlayClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const startedOutside = pointerDownOutsideRef.current;
    pointerDownOutsideRef.current = false;
    // Ignore drags that start inside the panel (e.g. selecting text) and end on the overlay.
    if (!closeOnOverlayClick || !startedOutside || !isOwnBackdropTarget(event)) return;
    requestClose();
  };

  return createPortal(
    <div
      data-modal-overlay=""
      onMouseDown={handleOverlayMouseDown}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: spacing.scale['0'],
        zIndex: OVERLAY_Z_INDEX,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        backgroundColor: background.overlay.custom,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          boxSizing: 'border-box',
          padding: spacing.scale['24'],
        }}
      >
        {panel}
      </div>
    </div>,
    portalTarget ?? document.body,
  );
}

export default Modal;
