import React from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import type {
  TextContainerAlign,
  TextContainerProps,
  TextContainerSize,
} from './TextContainer.types';

type TypographyToken = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
};

const palette = colors.primitive.palette;

const HEADLINE_TYPOGRAPHY: Record<TextContainerSize, TypographyToken> = {
  lg: typography.scale.h5.semiBold,
  md: typography.scale.h6.semiBold,
  sm: typography.scale.bodyL.medium,
  xs: typography.scale.bodyM.medium,
  xxs: typography.scale.bodyS.medium,
  xxxs: typography.scale.captionL.medium,
  xxxxs: typography.scale.captionM.medium,
};

const DESCRIPTION_TYPOGRAPHY: Record<TextContainerSize, TypographyToken> = {
  lg: typography.scale.bodyS.regular,
  md: typography.scale.bodyS.regular,
  sm: typography.scale.bodyS.regular,
  xs: typography.scale.captionL.regular,
  xxs: typography.scale.captionL.regular,
  xxxs: typography.scale.captionL.regular,
  xxxxs: typography.scale.captionM.regular,
};

const CAPTION_TYPOGRAPHY: Record<TextContainerSize, TypographyToken> = {
  lg: typography.scale.captionL.medium,
  md: typography.scale.captionM.medium,
  sm: typography.scale.captionL.medium,
  xs: typography.scale.captionL.medium,
  xxs: typography.scale.captionM.medium,
  xxxs: typography.scale.captionM.medium,
  xxxxs: typography.scale.captionS.medium,
};

const GAP: Record<TextContainerSize, number> = {
  lg: spacing.scale['8'],
  md: spacing.scale['8'],
  sm: spacing.scale['4'],
  xs: spacing.scale['4'],
  xxs: spacing.scale['4'],
  xxxs: spacing.scale['4'],
  xxxxs: spacing.scale['4'],
};

const HEADLINE_COLOR = palette.gray['13'];
const DESCRIPTION_COLOR = palette.gray['9a'];
const CAPTION_COLOR = palette.gray['7a'];

function applyTypography(token: TypographyToken): React.CSSProperties {
  return {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    lineHeight: `${token.lineHeight}px`,
    letterSpacing: `${token.letterSpacing}px`,
    margin: 0,
  };
}

function getAlignmentStyles(align: TextContainerAlign): React.CSSProperties {
  if (align === 'center') {
    return {
      alignItems: 'center',
      textAlign: 'center',
    };
  }

  return {
    alignItems: 'flex-start',
    textAlign: 'left',
  };
}

export function TextContainer({
  size = 'lg',
  align = 'left',
  headline = 'Medium length headline',
  description = 'Design better and spend less time without restricting creative freedom.',
  caption = 'Caption',
  showDescription = true,
  showCaption = true,
  width = spacing.scale['400'],
  className,
  style,
}: TextContainerProps) {
  const headlineStyle = applyTypography(HEADLINE_TYPOGRAPHY[size]);
  const descriptionStyle = applyTypography(DESCRIPTION_TYPOGRAPHY[size]);
  const captionStyle = applyTypography(CAPTION_TYPOGRAPHY[size]);
  const alignment = getAlignmentStyles(align);

  return (
    <div
      className={className}
      style={{
        width,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: GAP[size],
        ...alignment,
        ...style,
      }}
    >
      <p style={{ ...headlineStyle, color: HEADLINE_COLOR, width: '100%' }}>
        {headline}
      </p>
      {showDescription && description ? (
        <p style={{ ...descriptionStyle, color: DESCRIPTION_COLOR, width: '100%' }}>
          {description}
        </p>
      ) : null}
      {showCaption && caption ? (
        <p style={{ ...captionStyle, color: CAPTION_COLOR, width: '100%' }}>
          {caption}
        </p>
      ) : null}
    </div>
  );
}

export default TextContainer;
