import React from 'react';

import { colors, radius, spacing, typography } from '../../style-tokens';

import type {
  TextRowsDotColor,
  TextRowsItem,
  TextRowsProps,
} from './TextRows.types';

const palette = colors.primitive.palette;

const DOT_COLOR_MAP: Record<TextRowsDotColor, string> = {
  purple: palette.purple['8'],
  blue: palette.blue['8'],
  green: palette.green['8'],
  orange: palette.orange['8'],
  red: palette.red['8'],
  gray: palette.gray['9'],
};

const DOT_SIZE = spacing.scale['8'];

const headlineTypography = typography.scale.captionL.medium;
const titleTypography = typography.scale.captionL.regular;
const contentTypography = typography.scale.captionL.regular;

const headlineStyle: React.CSSProperties = {
  fontFamily: headlineTypography.fontFamily,
  fontSize: headlineTypography.fontSize,
  fontWeight: headlineTypography.fontWeight,
  lineHeight: `${headlineTypography.lineHeight}px`,
  letterSpacing: `${headlineTypography.letterSpacing}px`,
  color: palette.gray['9a'],
  margin: 0,
  width: '100%',
};

const titleStyle: React.CSSProperties = {
  fontFamily: titleTypography.fontFamily,
  fontSize: titleTypography.fontSize,
  fontWeight: titleTypography.fontWeight,
  lineHeight: `${titleTypography.lineHeight}px`,
  letterSpacing: `${titleTypography.letterSpacing}px`,
  color: palette.gray['13'],
  margin: 0,
  whiteSpace: 'nowrap',
};

const contentStyle: React.CSSProperties = {
  fontFamily: contentTypography.fontFamily,
  fontSize: contentTypography.fontSize,
  fontWeight: contentTypography.fontWeight,
  lineHeight: `${contentTypography.lineHeight}px`,
  letterSpacing: `${contentTypography.letterSpacing}px`,
  color: palette.gray['9a'],
  margin: 0,
  whiteSpace: 'nowrap',
};

const DEFAULT_ROWS: TextRowsItem[] = [
  { id: 'row-1', title: 'Title 01', content: 'Content 01' },
  { id: 'row-2', title: 'Title 02', content: 'Content 02' },
  { id: 'row-3', title: 'Title 03', content: 'Content 03' },
  { id: 'row-4', title: 'Title 04', content: 'Content 04' },
  { id: 'row-5', title: 'Title 05', content: 'Content 05' },
];

function Dot({ color }: { color: TextRowsDotColor }) {
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

function Divider() {
  return (
    <div
      aria-hidden="true"
      style={{
        flex: '1 0 0',
        minWidth: 0,
        height: 1,
        paddingInline: spacing.scale['12'],
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: 1,
          backgroundColor: palette.gray['2'],
        }}
      />
    </div>
  );
}

export function TextRows({
  rows = DEFAULT_ROWS,
  headline = 'Headline',
  showHeadline = true,
  showDot = true,
  showDivider = true,
  width = spacing.scale['400'] + spacing.scale['32'],
  className,
  style,
}: TextRowsProps) {
  return (
    <div
      className={className}
      style={{
        width,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing.scale['16'],
        ...style,
      }}
    >
      {showHeadline && headline ? <p style={headlineStyle}>{headline}</p> : null}

      {rows.map((row, index) => {
        const dotColor = row.dotColor ?? 'purple';
        return (
          <div
            key={row.id ?? `row-${index}`}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.scale['6'],
                flexShrink: 0,
              }}
            >
              {showDot ? <Dot color={dotColor} /> : null}
              <p style={titleStyle}>{row.title}</p>
            </div>

            {showDivider ? <Divider /> : null}

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                paddingBlock: spacing.scale['2'],
                flexShrink: 0,
              }}
            >
              <p style={contentStyle}>{row.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TextRows;
