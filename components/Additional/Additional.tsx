import React from 'react';

import { colors, radius, spacing, typography } from '../../style-tokens';
import { Button } from '../Button/Button';
import { TailIcon } from '../TailIcon/TailIcon';

import type { AdditionalProps } from './Additional.types';

const palette = colors.primitive.palette;

const SIDEBAR_WIDTH = spacing.primitive['256'] + spacing.scale['24'];

const captionTypography = typography.scale.captionM.regular;
const labelTypography = typography.scale.captionM.medium;

const captionTextStyle: React.CSSProperties = {
  fontFamily: captionTypography.fontFamily,
  fontSize: captionTypography.fontSize,
  fontWeight: captionTypography.fontWeight,
  lineHeight: `${captionTypography.lineHeight}px`,
  letterSpacing: `${captionTypography.letterSpacing}px`,
  color: palette.gray['9a'],
  margin: 0,
};

const labelTextStyle: React.CSSProperties = {
  fontFamily: labelTypography.fontFamily,
  fontSize: labelTypography.fontSize,
  fontWeight: labelTypography.fontWeight,
  lineHeight: `${labelTypography.lineHeight}px`,
  letterSpacing: `${labelTypography.letterSpacing}px`,
  color: palette.gray['9a'],
  margin: 0,
  whiteSpace: 'nowrap',
};

function Divider() {
  return (
    <div
      role="separator"
      aria-hidden="true"
      style={{
        width: '100%',
        height: 1,
        backgroundColor: palette.gray['2'],
      }}
    />
  );
}

export function Additional({
  type = 'divider',
  text,
  tailIcon = true,
  tailIconNode,
  buttons = ['Button', 'Button'],
  className,
  style,
  onTailIconClick,
  onLeftButtonClick,
  onRightButtonClick,
}: AdditionalProps) {
  const baseStyle: React.CSSProperties = {
    width: SIDEBAR_WIDTH,
    boxSizing: 'border-box',
    display: 'flex',
    ...style,
  };

  if (type === 'divider') {
    return (
      <div
        className={className}
        style={{
          ...baseStyle,
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingInline: spacing.scale['0'],
          paddingBlock: spacing.scale['4'],
        }}
      >
        <Divider />
      </div>
    );
  }

  if (type === 'caption') {
    return (
      <div
        className={className}
        style={{
          ...baseStyle,
          alignItems: 'flex-start',
          paddingInline: spacing.scale['16'],
          paddingBlock: spacing.scale['6'],
        }}
      >
        <p style={{ ...captionTextStyle, flex: '1 0 0', minWidth: 0 }}>
          {text ?? 'A caption is a brief description accompanying an illustration'}
        </p>
      </div>
    );
  }

  if (type === 'label') {
    return (
      <div
        className={className}
        style={{
          ...baseStyle,
          alignItems: 'center',
          paddingInline: spacing.scale['16'],
          paddingBlock: spacing.scale['6'],
        }}
      >
        <div
          style={{
            flex: '1 0 0',
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            paddingBlock: spacing.scale['2'],
          }}
        >
          <span style={labelTextStyle}>{text ?? 'Label'}</span>
        </div>
        {tailIcon ? (
          <TailIcon
            size="sm"
            icon={tailIconNode}
            interactive={Boolean(onTailIconClick)}
            onClick={onTailIconClick}
          />
        ) : null}
      </div>
    );
  }

  // buttonStack
  return (
    <div
      className={className}
      style={{
        ...baseStyle,
        alignItems: 'flex-start',
        gap: spacing.scale['8'],
        paddingInline: spacing.scale['16'],
        paddingBlock: spacing.scale['6'],
      }}
    >
      <Button
        variant="secondary"
        size="sm"
        shape="rounded"
        fullWidth
        onClick={onLeftButtonClick}
        style={{ flex: '1 0 0', minWidth: 0, borderRadius: radius.scale.lg }}
      >
        {buttons[0]}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        shape="rounded"
        fullWidth
        onClick={onRightButtonClick}
        style={{ flex: '1 0 0', minWidth: 0, borderRadius: radius.scale.lg }}
      >
        {buttons[1]}
      </Button>
    </div>
  );
}

export default Additional;
