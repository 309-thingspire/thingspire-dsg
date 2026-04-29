import React from 'react';

import { colors, radius, spacing, typography } from '../../style-tokens';
import { Button } from '../Button/Button';
import { IconAlertLine, IconCloseLine } from '../icons';
import { ProgressBar } from '../ProgressBar/ProgressBar';

import type { InfoCardProps } from './InfoCard.types';

const palette = colors.primitive.palette;

const SIDEBAR_WIDTH = spacing.primitive['256'] + spacing.scale['24'];
const PROGRESS_BAR_WIDTH = spacing.primitive['224'] + spacing.scale['24'];

const labelTypography = typography.scale.captionL.medium;
const captionTypography = typography.scale.captionL.regular;

const labelTextStyle: React.CSSProperties = {
  fontFamily: labelTypography.fontFamily,
  fontSize: labelTypography.fontSize,
  fontWeight: labelTypography.fontWeight,
  lineHeight: `${labelTypography.lineHeight}px`,
  letterSpacing: `${labelTypography.letterSpacing}px`,
  color: palette.gray['13'],
  margin: 0,
};

const captionTextStyle: React.CSSProperties = {
  fontFamily: captionTypography.fontFamily,
  fontSize: captionTypography.fontSize,
  fontWeight: captionTypography.fontWeight,
  lineHeight: `${captionTypography.lineHeight}px`,
  letterSpacing: `${captionTypography.letterSpacing}px`,
  color: palette.gray['9a'],
  margin: 0,
};

export function InfoCard({
  type = 'lg',
  label = 'Label',
  caption = 'A caption is the words printed underneath a picture or cartoon which explain what it is about.',
  leadIcon,
  primaryButtonLabel = 'Button',
  secondaryButtonLabel = 'Button',
  showCloseButton = true,
  progressLabel = 'Free trial',
  progressState = '15 days left',
  progressValue = 50,
  className,
  style,
  onPrimaryClick,
  onSecondaryClick,
  onClose,
}: InfoCardProps) {
  const isLg = type === 'lg';
  const surfaceColor = isLg ? palette.orange['1'] : palette.green['1'];

  return (
    <div
      className={className}
      style={{
        width: SIDEBAR_WIDTH,
        boxSizing: 'border-box',
        paddingInline: spacing.scale['16'],
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
          padding: isLg ? spacing.scale['16'] : undefined,
          paddingTop: isLg ? undefined : spacing.scale['12'],
          paddingBottom: isLg ? undefined : spacing.scale['16'],
          paddingInline: isLg ? undefined : spacing.scale['16'],
          backgroundColor: surfaceColor,
          borderRadius: radius.scale.lg,
          display: 'flex',
          flexDirection: 'column',
          gap: isLg ? spacing.scale['12'] : spacing.scale['16'],
        }}
      >
        {isLg ? (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.scale['6'],
                paddingBottom: spacing.scale['4'],
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing.scale['6'],
                  paddingRight: spacing.scale['36'],
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-flex',
                    paddingBlock: spacing.scale['2'],
                    flexShrink: 0,
                    color: palette.orange['8'],
                  }}
                >
                  {leadIcon ?? (
                    <IconAlertLine
                      aria-hidden
                      style={{ width: spacing.scale['16'], height: spacing.scale['16'], display: 'block' }}
                    />
                  )}
                </span>
                <p style={{ ...labelTextStyle, flex: '1 0 0', minWidth: 0 }}>{label}</p>
              </div>
              <p style={captionTextStyle}>{caption}</p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              shape="rounded"
              fullWidth
              onClick={onPrimaryClick}
              style={{ borderRadius: radius.scale.lg }}
            >
              {primaryButtonLabel}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              shape="rounded"
              fullWidth
              onClick={onSecondaryClick}
              style={{ borderRadius: radius.scale.lg }}
            >
              {secondaryButtonLabel}
            </Button>

            {showCloseButton ? (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: spacing.scale['12'],
                  right: spacing.scale['12'],
                  width: spacing.scale['16'],
                  height: spacing.scale['16'],
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: palette.gray['9a'],
                }}
              >
                <IconCloseLine
                  aria-hidden
                  style={{ width: spacing.scale['16'], height: spacing.scale['16'], display: 'block' }}
                />
              </button>
            ) : null}
          </>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.scale['8'],
                width: '100%',
              }}
            >
              <ProgressBar
                direction="vertical"
                target="default"
                size="md"
                color="green"
                progressValue={progressValue}
                label={progressLabel}
                showLabel
                showOptionalLabel={false}
                showProgressState
                showTailIcon={false}
                showHelper={false}
                valueText={progressState}
                width={PROGRESS_BAR_WIDTH}
                style={{ width: '100%' }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.scale['8'],
                width: '100%',
              }}
            >
              <Button
                variant="secondary"
                size="sm"
                shape="rounded"
                fullWidth
                onClick={onPrimaryClick}
                style={{ borderRadius: radius.scale.lg }}
              >
                {primaryButtonLabel === 'Button' ? 'Upgrade' : primaryButtonLabel}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                shape="rounded"
                fullWidth
                onClick={onSecondaryClick}
                style={{ borderRadius: radius.scale.lg }}
              >
                {secondaryButtonLabel === 'Button' ? 'Upgrade' : secondaryButtonLabel}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoCard;
