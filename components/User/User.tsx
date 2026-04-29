import React, { useState } from 'react';

import { colors, radius, spacing, typography } from '../../style-tokens';
import { IconBellLine, IconMoreLine, IconUser2Line } from '../icons';
import { TailIcon } from '../TailIcon/TailIcon';

import type { UserProps } from './User.types';

const palette = colors.primitive.palette;

const SIDEBAR_WIDTH = spacing.primitive['256'] + spacing.scale['24'];
const AVATAR_SIZE = spacing.scale['32'];

const nameTypography = typography.scale.captionL.medium;
const captionTypography = typography.scale.captionM.regular;
const badgeTypography = typography.scale.captionM.medium;

function AvatarFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: radius.scale.full,
        backgroundColor: palette.purple['2'],
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: palette.purple['11'],
      }}
    >
      <IconUser2Line aria-hidden style={{ width: spacing.scale['20'], height: spacing.scale['20'] }} />
    </div>
  );
}

const ICON_PX = spacing.scale['20'];

const DEFAULT_TAIL_ICONS = [
  {
    icon: <IconBellLine aria-hidden style={{ width: ICON_PX, height: ICON_PX, display: 'block' }} />,
    ariaLabel: 'notifications',
  },
  {
    icon: <IconMoreLine aria-hidden style={{ width: ICON_PX, height: ICON_PX, display: 'block' }} />,
    ariaLabel: 'more',
  },
];

export function User({
  name = 'James',
  handle = '@james',
  avatarSrc,
  avatarFallback,
  showAvatar = true,
  showCaption = true,
  showLabel = true,
  proBadge = true,
  proBadgeLabel = 'Pro',
  tailIcons,
  showTailIcon1 = true,
  showTailIcon2 = true,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
}: UserProps) {
  const [hovered, setHovered] = useState(false);

  const resolvedTailIcons =
    tailIcons ??
    [
      showTailIcon1 ? DEFAULT_TAIL_ICONS[0] : null,
      showTailIcon2 ? DEFAULT_TAIL_ICONS[1] : null,
    ].filter(Boolean) as NonNullable<UserProps['tailIcons']>;

  return (
    <div
      className={className}
      onMouseEnter={(event) => {
        setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        onMouseLeave?.(event);
      }}
      style={{
        width: SIDEBAR_WIDTH,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: spacing.scale['4'],
        paddingLeft: spacing.scale['8'],
        paddingRight: spacing.scale['16'],
        paddingBlock: spacing.scale['6'],
        ...style,
      }}
    >
      <div
        style={{
          flex: '1 0 0',
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale['4'],
          paddingInline: spacing.scale['8'],
          paddingBlock: spacing.scale['4'],
          borderRadius: radius.scale.lg,
          backgroundColor: hovered ? palette.gray['1a'] : palette.base.transparent,
        }}
      >
        {showAvatar ? (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              paddingBlock: spacing.scale['2'],
            }}
          >
            <div
              style={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                borderRadius: radius.scale.full,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {avatarFallback ?? (avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <AvatarFallback />
              ))}
            </div>
          </div>
        ) : null}

        <div
          style={{
            flex: '1 0 0',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            paddingInline: spacing.scale['4'],
          }}
        >
          {showLabel ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.scale['8'] }}>
              <span
                style={{
                  fontFamily: nameTypography.fontFamily,
                  fontSize: nameTypography.fontSize,
                  fontWeight: nameTypography.fontWeight,
                  lineHeight: `${nameTypography.lineHeight}px`,
                  letterSpacing: `${nameTypography.letterSpacing}px`,
                  color: palette.gray['13'],
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </span>
              {proBadge ? (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingInline: spacing.scale['4'],
                    backgroundColor: palette.purple['2'],
                    borderRadius: radius.scale.xs,
                  }}
                >
                  <span
                    style={{
                      fontFamily: badgeTypography.fontFamily,
                      fontSize: badgeTypography.fontSize,
                      fontWeight: badgeTypography.fontWeight,
                      lineHeight: `${badgeTypography.lineHeight}px`,
                      letterSpacing: `${badgeTypography.letterSpacing}px`,
                      color: palette.purple['11'],
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {proBadgeLabel}
                  </span>
                </span>
              ) : null}
            </div>
          ) : null}
          {showCaption ? (
            <span
              style={{
                fontFamily: captionTypography.fontFamily,
                fontSize: captionTypography.fontSize,
                fontWeight: captionTypography.fontWeight,
                lineHeight: `${captionTypography.lineHeight}px`,
                letterSpacing: `${captionTypography.letterSpacing}px`,
                color: palette.gray['9a'],
                whiteSpace: 'nowrap',
              }}
            >
              {handle}
            </span>
          ) : null}
        </div>
      </div>

      {resolvedTailIcons.map((entry, index) => (
        <TailIcon
          key={`tail-${index}`}
          size="lg"
          icon={entry.icon}
          interactive={Boolean(entry.onClick)}
          onClick={entry.onClick}
        />
      ))}
    </div>
  );
}

export default User;
