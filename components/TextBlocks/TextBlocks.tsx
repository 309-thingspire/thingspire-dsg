import React from 'react';

import { colors, radius, spacing, typography } from '../../style-tokens';

import type {
  TextBlocksDotColor,
  TextBlocksItem,
  TextBlocksProps,
} from './TextBlocks.types';

const palette = colors.primitive.palette;

const DOT_COLOR_MAP: Record<TextBlocksDotColor, string> = {
  purple: palette.purple['8'],
  blue: palette.blue['8'],
  green: palette.green['8'],
  orange: palette.orange['8'],
  red: palette.red['8'],
  gray: palette.gray['9'],
};

const DOT_SIZE = spacing.scale['10'];

const titleTypography = typography.scale.captionL.medium;
const labelTypography = typography.scale.bodyL.medium;

const titleStyle: React.CSSProperties = {
  fontFamily: titleTypography.fontFamily,
  fontSize: titleTypography.fontSize,
  fontWeight: titleTypography.fontWeight,
  lineHeight: `${titleTypography.lineHeight}px`,
  letterSpacing: `${titleTypography.letterSpacing}px`,
  color: palette.gray['9a'],
  margin: 0,
  flex: '1 0 0',
  minWidth: 0,
};

const labelStyle: React.CSSProperties = {
  fontFamily: labelTypography.fontFamily,
  fontSize: labelTypography.fontSize,
  fontWeight: labelTypography.fontWeight,
  lineHeight: `${labelTypography.lineHeight}px`,
  letterSpacing: `${labelTypography.letterSpacing}px`,
  color: palette.gray['13'],
  margin: 0,
  width: '100%',
};

const DEFAULT_BLOCKS: TextBlocksItem[] = [
  { id: 'block-1', title: 'Title 01', label: 'Label 01' },
  { id: 'block-2', title: 'Title 02', label: 'Label 02' },
  { id: 'block-3', title: 'Title 03', label: 'Label 03' },
  { id: 'block-4', title: 'Title 04', label: 'Label 04' },
  { id: 'block-5', title: 'Title 05', label: 'Label 05' },
];

function Dot({ color }: { color: TextBlocksDotColor }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: radius.scale.full,
        backgroundColor: DOT_COLOR_MAP[color],
        flexShrink: 0,
        display: 'inline-block',
      }}
    />
  );
}

export function TextBlocks({
  blocks = DEFAULT_BLOCKS,
  width = spacing.scale['800'],
  className,
  style,
}: TextBlocksProps) {
  return (
    <div
      className={className}
      style={{
        width,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'stretch',
        gap: spacing.scale['4'],
        overflow: 'hidden',
        borderRadius: radius.scale.lg,
        ...style,
      }}
    >
      {blocks.map((block, index) => {
        const dotColor = block.dotColor ?? 'purple';
        const showDot = block.showDot ?? true;
        return (
          <div
            key={block.id ?? `block-${index}`}
            style={{
              flex: '1 0 0',
              minWidth: 0,
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: spacing.scale['16'],
              backgroundColor: palette.gray['1'],
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.scale['4'],
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.scale['6'],
                  width: '100%',
                }}
              >
                {showDot ? <Dot color={dotColor} /> : null}
                <p style={titleStyle}>{block.title}</p>
              </div>
              <p style={labelStyle}>{block.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TextBlocks;
