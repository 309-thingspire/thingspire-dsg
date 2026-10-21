import React, { useEffect, useId, useMemo, useState } from 'react';

import { border, colors, radius, shadows, spacing, typography } from '../../style-tokens';
import { IconArrowLeftSLine, IconArrowRightSLine } from '../icons';

import type {
  CalendarDayState,
  CalendarMonthChangePayload,
  CalendarProps,
  CalendarRangeDay,
  CalendarRangeSelection,
  CalendarType,
} from './Calendar.types';

type TypographyToken = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
};

type CalendarDayCell = {
  key: string;
  date: Date;
  inCurrentMonth: boolean;
};

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

const CALENDAR_WIDTH = spacing.scale['288'] - spacing.scale['4'];
const DATE_CELL_SIZE = spacing.scale['36'];
const DATE_CELL_INSET = spacing.scale['2'];
const RANGE_FILL_HEIGHT = spacing.scale['32'];
const RANGE_FILL_EDGE = spacing.scale['2'];
// The header chevron sits inside a 20×20 button. The icon glyph itself is
// smaller than the 20×20 wrapper — the generated 24-grid icon renders at
// ~16.7px optical inside the 20px box, matching the Figma icon-frame inset.
const HEADER_ICON_SIZE = spacing.scale['20'];

const DEFAULT_DATE_TIME = '10:39 PM';
const DEFAULT_RANGE_START_TIME = '10:39 PM';
const DEFAULT_RANGE_END_TIME = '09:12 AM';

const borderAction = colors.semantic.theme.border.action;
const borderSelect = colors.semantic.theme.border.select;

const palette = colors.primitive.palette;
const textBase = colors.semantic.theme.text.base;

function toTypographyStyle(token: TypographyToken) {
  return {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    lineHeight: `${token.lineHeight}px`,
    letterSpacing: `${token.letterSpacing}px`,
  };
}

function atStartOfDay(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function areSameDate(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) {
    return false;
  }

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function compareDate(a: Date, b: Date): number {
  const aTime = atStartOfDay(a).getTime();
  const bTime = atStartOfDay(b).getTime();

  if (aTime === bTime) {
    return 0;
  }

  return aTime < bTime ? -1 : 1;
}

function normalizeRange(range: CalendarRangeSelection): CalendarRangeSelection {
  if (!range.start || !range.end) {
    return range;
  }

  return compareDate(range.start, range.end) <= 0
    ? range
    : {
        start: range.end,
        end: range.start,
      };
}

function isWithinRange(date: Date, range: CalendarRangeSelection): boolean {
  if (!range.start || !range.end) {
    return false;
  }

  const target = atStartOfDay(date).getTime();
  const start = atStartOfDay(range.start).getTime();
  const end = atStartOfDay(range.end).getTime();

  return target >= start && target <= end;
}

function getRangeDayPosition(date: Date, range: CalendarRangeSelection): CalendarRangeDay {
  if (!range.start || !range.end) {
    return 'middle';
  }

  if (areSameDate(range.start, range.end)) {
    return 'first';
  }

  if (areSameDate(date, range.start)) {
    return 'first';
  }

  if (areSameDate(date, range.end)) {
    return 'last';
  }

  return 'middle';
}

function formatMonthLabel(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatDateInput(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear());

  return `${month}/${day}/${year}`;
}

// Reads MM/DD/YYYY (one- or two-digit month and day; `/`, `.` or `-`).
// Returns null for anything that isn't a real calendar date (e.g. 02/30/2026).
function parseDateInput(text: string): Date | null {
  const match = /^\s*(\d{1,2})\s*[/.-]\s*(\d{1,2})\s*[/.-]\s*(\d{4})\s*$/.exec(text);

  if (!match) {
    return null;
  }

  const month = Number(match[1]) - 1;
  const day = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month, day);

  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day ? date : null;
}

// Reads a time the way people type it — "9:05 pm", "09:05PM", "21:05", "905pm",
// "2105", "오후 9:05" — and returns it as `hh:mm AM|PM`, or null if it isn't one.
function normalizeTimeInput(text: string): string | null {
  let value = text.trim();
  let meridiem: 'a' | 'p' | undefined;

  if (/^오전/.test(value) || /오전$/.test(value)) {
    meridiem = 'a';
    value = value.replace('오전', '').trim();
  } else if (/^오후/.test(value) || /오후$/.test(value)) {
    meridiem = 'p';
    value = value.replace('오후', '').trim();
  }

  const match = /^(\d{1,2})(?::?(\d{2}))?\s*(?:([ap])\.?\s*m?\.?)?$/i.exec(value);

  if (!match) {
    return null;
  }

  let hour = Number(match[1]);
  const minute = match[2] === undefined ? 0 : Number(match[2]);
  meridiem = meridiem ?? (match[3]?.toLowerCase() as 'a' | 'p' | undefined);

  if (minute > 59) {
    return null;
  }

  if (meridiem) {
    if (hour < 1 || hour > 12) {
      return null;
    }

    if (meridiem === 'p' && hour !== 12) {
      hour += 12;
    }

    if (meridiem === 'a' && hour === 12) {
      hour = 0;
    }
  } else if (hour > 23) {
    return null;
  }

  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const suffix = hour >= 12 ? 'PM' : 'AM';

  return `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${suffix}`;
}

function buildMonthGrid(year: number, month: number): CalendarDayCell[][] {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = firstDayOfMonth.getDay();
  const monthLength = new Date(year, month + 1, 0).getDate();
  const previousMonthLength = new Date(year, month, 0).getDate();

  const entries: CalendarDayCell[] = [];

  for (let index = 0; index < firstWeekday; index += 1) {
    const day = previousMonthLength - firstWeekday + index + 1;
    const date = new Date(year, month - 1, day);
    entries.push({
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date,
      inCurrentMonth: false,
    });
  }

  for (let day = 1; day <= monthLength; day += 1) {
    const date = new Date(year, month, day);
    entries.push({
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date,
      inCurrentMonth: true,
    });
  }

  while (entries.length % WEEKDAY_LABELS.length !== 0) {
    const offset = entries.length - (firstWeekday + monthLength) + 1;
    const date = new Date(year, month + 1, offset);
    entries.push({
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date,
      inCurrentMonth: false,
    });
  }

  const weeks: CalendarDayCell[][] = [];
  for (let start = 0; start < entries.length; start += WEEKDAY_LABELS.length) {
    weeks.push(entries.slice(start, start + WEEKDAY_LABELS.length));
  }

  return weeks;
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  const Icon = direction === 'left' ? IconArrowLeftSLine : IconArrowRightSLine;
  return (
    <Icon
      aria-hidden="true"
      style={{
        width: HEADER_ICON_SIZE,
        height: HEADER_ICON_SIZE,
        display: 'block',
        color: textBase.secondary,
      }}
    />
  );
}

type FooterFieldProps = {
  label: string;
  showLabel: boolean;
  /** The committed value, already formatted. */
  value: string;
  placeholder: string;
  inputMode: 'numeric' | 'text';
  /** Try to apply what was typed; return false to reject it (the field then reverts). */
  commit: (text: string) => boolean;
  /** Apply as soon as the text is a complete, valid value (dates), not only on Enter/blur. */
  commitWhileTyping?: boolean;
};

function FooterField({ label, showLabel, value, placeholder, inputMode, commit, commitWhileTyping = false }: FooterFieldProps) {
  const inputId = useId();
  const [draft, setDraft] = useState(value);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [invalid, setInvalid] = useState(false);

  // Follow the committed value unless the user is mid-edit.
  useEffect(() => {
    if (!focused) {
      setDraft(value);
      setInvalid(false);
    }
  }, [focused, value]);

  const tryCommit = (): boolean => {
    const text = draft.trim();

    if (text === '' || text === value) {
      return true;
    }

    return commit(text);
  };

  const handleBlur = () => {
    tryCommit();
    setFocused(false);
    setDraft(value);
    setInvalid(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (tryCommit()) {
        event.currentTarget.blur();
      } else {
        setInvalid(true);
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setDraft(value);
      setInvalid(false);
      event.currentTarget.blur();
    }
  };

  const fieldBorderColor = invalid
    ? borderSelect.destructive
    : focused
      ? borderAction.focusLight
      : hovered
        ? borderAction.hover
        : borderAction.normal;
  const fieldShadow = focused
    ? invalid
      ? shadows.focusRing.lightDestructive.css
      : shadows.focusRing.light.css
    : 'none';

  return (
    <div
      style={{
        display: 'flex',
        flex: '1 1 0',
        minWidth: spacing.scale['0'],
        minHeight: spacing.scale['0'],
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing.scale['8'],
      }}
    >
      {showLabel ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: spacing.scale['0'],
            padding: spacing.scale['0'],
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: spacing.scale['4'],
              paddingInline: spacing.scale['0'],
              paddingBlock: spacing.scale['2'],
            }}
          >
            <label
              htmlFor={inputId}
              style={{
                color: textBase.primary,
                ...toTypographyStyle(typography.scale.captionL.medium),
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </label>
          </div>
        </div>
      ) : null}

      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          gap: spacing.scale['0'],
        }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex',
            flex: '1 0 0',
            alignItems: 'center',
            gap: spacing.scale['0'],
            minWidth: spacing.scale['0'],
            minHeight: spacing.scale['0'],
            paddingInline: spacing.scale['8'],
            paddingBlock: spacing.scale['6'],
            borderStyle: 'solid',
            borderWidth: border.width['1'],
            borderColor: fieldBorderColor,
            borderRadius: radius.scale.lg,
            backgroundColor: colors.semantic.theme.background.surface.default,
            boxShadow: fieldShadow,
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: '1 0 0',
              alignItems: 'center',
              gap: spacing.scale['0'],
              minWidth: spacing.scale['0'],
              minHeight: spacing.scale['0'],
              paddingInline: spacing.scale['4'],
              paddingBlock: spacing.scale['0'],
            }}
          >
            <input
              id={inputId}
              type="text"
              inputMode={inputMode}
              autoComplete="off"
              spellCheck={false}
              aria-label={showLabel ? undefined : label}
              aria-invalid={invalid || undefined}
              value={draft}
              placeholder={placeholder}
              onFocus={() => setFocused(true)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onChange={(event) => {
                const next = event.target.value;
                setDraft(next);
                setInvalid(false);

                if (commitWhileTyping && next.trim() !== '' && next.trim() !== value) {
                  commit(next.trim());
                }
              }}
              style={{
                width: '100%',
                minWidth: spacing.scale['0'],
                padding: spacing.scale['0'],
                margin: spacing.scale['0'],
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: textBase.primary,
                ...toTypographyStyle(typography.scale.captionL.regular),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  label,
  appearance,
  onClick,
}: {
  label: string;
  appearance: 'primary' | 'secondary';
  onClick?: () => void;
}) {
  const isPrimary = appearance === 'primary';

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        flex: '1 0 0',
        height: spacing.scale['32'],
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.scale['2'],
        minWidth: spacing.scale['0'],
        minHeight: spacing.scale['0'],
        paddingInline: spacing.scale['10'],
        paddingBlock: spacing.scale['6'],
        borderStyle: 'solid',
        borderWidth: border.width['1'],
        borderColor: isPrimary ? colors.semantic.theme.background.button.primary : colors.semantic.theme.border.action.normal,
        borderRadius: radius.scale.lg,
        backgroundColor: isPrimary ? colors.semantic.theme.background.button.primary : colors.semantic.theme.background.surface.default,
        color: isPrimary ? colors.semantic.theme.text.button.primary : textBase.primary,
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingInline: spacing.scale['4'],
          paddingBlock: spacing.scale['0'],
          ...toTypographyStyle(typography.scale.captionL.medium),
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </button>
  );
}

type CalendarFooterProps = {
  type: CalendarType;
  showTimeSelection: boolean;
  selectedDate: Date | null;
  selectedRange: CalendarRangeSelection;
  dateTime: string;
  rangeStartTime: string;
  rangeEndTime: string;
  commitDate: (text: string) => boolean;
  commitRangeStart: (text: string) => boolean;
  commitRangeEnd: (text: string) => boolean;
  commitTime: (field: 'date' | 'start' | 'end', text: string) => boolean;
  onCancel?: () => void;
  onApply?: () => void;
};

const DATE_PLACEHOLDER = 'MM/DD/YYYY';
const TIME_PLACEHOLDER = 'hh:mm AM';

function CalendarFooter({
  type,
  showTimeSelection,
  selectedDate,
  selectedRange,
  dateTime,
  rangeStartTime,
  rangeEndTime,
  commitDate,
  commitRangeStart,
  commitRangeEnd,
  commitTime,
  onCancel,
  onApply,
}: CalendarFooterProps) {
  const dateValue = selectedDate ? formatDateInput(selectedDate) : '';
  const rangeStartValue = selectedRange.start ? formatDateInput(selectedRange.start) : '';
  const rangeEndValue = selectedRange.end ? formatDateInput(selectedRange.end) : '';

  const actions = (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing.scale['8'],
      }}
    >
      <ActionButton label="Cancel" appearance="secondary" onClick={onCancel} />
      <ActionButton label="Apply" appearance="primary" onClick={onApply} />
    </div>
  );

  if (type === 'date') {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: spacing.scale['16'],
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            gap: spacing.scale['8'],
          }}
        >
          <FooterField
            label="Date"
            showLabel
            value={dateValue}
            placeholder={DATE_PLACEHOLDER}
            inputMode="numeric"
            commit={commitDate}
            commitWhileTyping
          />
          {showTimeSelection ? (
            <FooterField
              label="Time"
              showLabel
              value={dateTime}
              placeholder={TIME_PLACEHOLDER}
              inputMode="text"
              commit={(text) => commitTime('date', text)}
            />
          ) : null}
        </div>

        {actions}
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing.scale['16'],
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: spacing.scale['8'],
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            gap: spacing.scale['8'],
          }}
        >
          <FooterField
            label="Start"
            showLabel
            value={rangeStartValue}
            placeholder={DATE_PLACEHOLDER}
            inputMode="numeric"
            commit={commitRangeStart}
            commitWhileTyping
          />
          {showTimeSelection ? (
            <FooterField
              label="Start time"
              showLabel={false}
              value={rangeStartTime}
              placeholder={TIME_PLACEHOLDER}
              inputMode="text"
              commit={(text) => commitTime('start', text)}
            />
          ) : null}
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            gap: spacing.scale['8'],
          }}
        >
          <FooterField
            label="End"
            showLabel
            value={rangeEndValue}
            placeholder={DATE_PLACEHOLDER}
            inputMode="numeric"
            commit={commitRangeEnd}
            commitWhileTyping
          />
          {showTimeSelection ? (
            <FooterField
              label="End time"
              showLabel={false}
              value={rangeEndTime}
              placeholder={TIME_PLACEHOLDER}
              inputMode="text"
              commit={(text) => commitTime('end', text)}
            />
          ) : null}
        </div>
      </div>

      {actions}
    </div>
  );
}

export function Calendar({
  type = 'date',
  month,
  year,
  selectedDate,
  selectedRange,
  currentDate = new Date(),
  showTimeSelection = true,
  dateTime,
  rangeStartTime,
  rangeEndTime,
  locale = 'en-US',
  disabledDate,
  onSelectDate,
  onSelectRange,
  onMonthChange,
  onDateTimeChange,
  onRangeStartTimeChange,
  onRangeEndTimeChange,
  onApply,
  onCancel,
  className,
  style,
  ...props
}: CalendarProps) {
  const fallbackViewDate = useMemo(() => atStartOfDay(currentDate), [currentDate]);
  const [viewMonth, setViewMonth] = useState(month ?? fallbackViewDate.getMonth());
  const [viewYear, setViewYear] = useState(year ?? fallbackViewDate.getFullYear());

  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(selectedDate ?? null);
  const [internalSelectedRange, setInternalSelectedRange] = useState<CalendarRangeSelection>(
    selectedRange ?? {
      start: null,
      end: null,
    },
  );

  // Footer times: seeded from the props, editable in the footer, replaced
  // whenever a prop changes.
  const [times, setTimes] = useState({
    date: dateTime ?? DEFAULT_DATE_TIME,
    start: rangeStartTime ?? DEFAULT_RANGE_START_TIME,
    end: rangeEndTime ?? DEFAULT_RANGE_END_TIME,
  });

  useEffect(() => {
    if (dateTime !== undefined) {
      setTimes((previous) => ({ ...previous, date: dateTime }));
    }
  }, [dateTime]);

  useEffect(() => {
    if (rangeStartTime !== undefined) {
      setTimes((previous) => ({ ...previous, start: rangeStartTime }));
    }
  }, [rangeStartTime]);

  useEffect(() => {
    if (rangeEndTime !== undefined) {
      setTimes((previous) => ({ ...previous, end: rangeEndTime }));
    }
  }, [rangeEndTime]);

  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [focusedKey, setFocusedKey] = useState<string | null>(null);

  useEffect(() => {
    if (typeof month === 'number') {
      setViewMonth(month);
    }
  }, [month]);

  useEffect(() => {
    if (typeof year === 'number') {
      setViewYear(year);
    }
  }, [year]);

  useEffect(() => {
    if (selectedDate !== undefined) {
      setInternalSelectedDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedRange !== undefined) {
      setInternalSelectedRange(selectedRange);
    }
  }, [selectedRange]);

  const resolvedDate = selectedDate !== undefined ? selectedDate : internalSelectedDate;
  const resolvedRange = normalizeRange(selectedRange !== undefined ? selectedRange : internalSelectedRange);

  const rangePreview = useMemo(() => {
    if (type !== 'dateRange') {
      return null;
    }

    if (!resolvedRange.start || resolvedRange.end || !hoverDate) {
      return null;
    }

    return normalizeRange({
      start: resolvedRange.start,
      end: hoverDate,
    });
  }, [hoverDate, resolvedRange, type]);

  const displayedRange = useMemo(() => {
    if (rangePreview) {
      return rangePreview;
    }

    if (type === 'dateRange' && resolvedRange.start && !resolvedRange.end) {
      return {
        start: resolvedRange.start,
        end: resolvedRange.start,
      };
    }

    return resolvedRange;
  }, [rangePreview, resolvedRange, type]);
  const weeks = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewMonth, viewYear]);
  const monthLabel = useMemo(() => formatMonthLabel(new Date(viewYear, viewMonth, 1), locale), [locale, viewMonth, viewYear]);

  const handleMonthShift = (direction: 'prev' | 'next') => {
    const offset = direction === 'prev' ? -1 : 1;
    const shifted = new Date(viewYear, viewMonth + offset, 1);
    const payload: CalendarMonthChangePayload = {
      month: shifted.getMonth(),
      year: shifted.getFullYear(),
    };

    setViewMonth(payload.month);
    setViewYear(payload.year);
    onMonthChange?.(payload);
  };

  const commitDateSelection = (value: Date) => {
    if (selectedDate === undefined) {
      setInternalSelectedDate(value);
    }

    onSelectDate?.(value);
  };

  const commitRangeSelection = (value: CalendarRangeSelection) => {
    const normalized = normalizeRange(value);

    if (selectedRange === undefined) {
      setInternalSelectedRange(normalized);
    }

    onSelectRange?.(normalized);
  };

  const handleDateClick = (date: Date, isDisabled: boolean) => {
    if (isDisabled) {
      return;
    }

    const nextDate = atStartOfDay(date);

    if (type === 'date') {
      commitDateSelection(nextDate);
      return;
    }

    const range = normalizeRange(resolvedRange);

    if (!range.start || range.end) {
      commitRangeSelection({
        start: nextDate,
        end: null,
      });
      return;
    }

    if (compareDate(nextDate, range.start) < 0) {
      commitRangeSelection({
        start: nextDate,
        end: range.start,
      });
      return;
    }

    commitRangeSelection({
      start: range.start,
      end: nextDate,
    });
  };

  // Show the month a typed date falls in.
  const showMonthOf = (date: Date) => {
    if (date.getMonth() === viewMonth && date.getFullYear() === viewYear) {
      return;
    }

    setViewMonth(date.getMonth());
    setViewYear(date.getFullYear());
    onMonthChange?.({ month: date.getMonth(), year: date.getFullYear() });
  };

  const readTypedDate = (text: string): Date | null => {
    const date = parseDateInput(text);

    if (!date || disabledDate?.(date)) {
      return null;
    }

    return atStartOfDay(date);
  };

  const commitTypedDate = (text: string): boolean => {
    const date = readTypedDate(text);

    if (!date) {
      return false;
    }

    if (!areSameDate(date, resolvedDate)) {
      commitDateSelection(date);
    }

    showMonthOf(date);
    return true;
  };

  const commitTypedRangeStart = (text: string): boolean => {
    const date = readTypedDate(text);

    if (!date) {
      return false;
    }

    if (!areSameDate(date, resolvedRange.start)) {
      commitRangeSelection({ start: date, end: resolvedRange.end });
    }

    showMonthOf(date);
    return true;
  };

  const commitTypedRangeEnd = (text: string): boolean => {
    const date = readTypedDate(text);

    if (!date) {
      return false;
    }

    if (!areSameDate(date, resolvedRange.end)) {
      // No start yet: the typed day becomes a one-day range.
      commitRangeSelection({ start: resolvedRange.start ?? date, end: date });
    }

    showMonthOf(date);
    return true;
  };

  const commitTypedTime = (field: 'date' | 'start' | 'end', text: string): boolean => {
    const time = normalizeTimeInput(text);

    if (!time) {
      return false;
    }

    setTimes((previous) => ({ ...previous, [field]: time }));

    if (field === 'date') {
      onDateTimeChange?.(time);
    } else if (field === 'start') {
      onRangeStartTimeChange?.(time);
    } else {
      onRangeEndTimeChange?.(time);
    }

    return true;
  };

  return (
    <section
      className={className}
      style={{
        width: CALENDAR_WIDTH,
        maxWidth: spacing.scale['480'],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing.scale['12'],
        padding: spacing.scale['12'],
        borderStyle: 'solid',
        borderWidth: border.width['1'],
        borderColor: colors.semantic.theme.border.action.normal,
        borderRadius: radius.scale.xl,
        backgroundColor: colors.semantic.theme.background.surface.default,
        boxShadow: shadows.elevation.lg.css,
        boxSizing: 'border-box',
        ...style,
      }}
      {...props}
    >
      <header
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale['12'],
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: '1 0 0',
            minWidth: spacing.scale['0'],
            minHeight: spacing.scale['0'],
            alignItems: 'flex-start',
            gap: spacing.scale['0'],
            padding: spacing.scale['0'],
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: spacing.scale['4'],
              paddingInline: spacing.scale['0'],
              paddingBlock: spacing.scale['2'],
            }}
          >
            <span
              style={{
                color: textBase.primary,
                ...toTypographyStyle(typography.scale.captionL.medium),
                whiteSpace: 'nowrap',
              }}
            >
              {monthLabel}
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: spacing.scale['8'],
          }}
        >
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => handleMonthShift('prev')}
            style={{
              width: HEADER_ICON_SIZE,
              height: HEADER_ICON_SIZE,
              display: 'grid',
              placeItems: 'center',
              backgroundColor: palette.base.transparent,
              borderStyle: 'solid',
              borderWidth: border.width['0'],
              borderColor: palette.base.transparent,
              padding: spacing.scale['0'],
              margin: spacing.scale['0'],
              cursor: 'pointer',
            }}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => handleMonthShift('next')}
            style={{
              width: HEADER_ICON_SIZE,
              height: HEADER_ICON_SIZE,
              display: 'grid',
              placeItems: 'center',
              backgroundColor: palette.base.transparent,
              borderStyle: 'solid',
              borderWidth: border.width['0'],
              borderColor: palette.base.transparent,
              padding: spacing.scale['0'],
              margin: spacing.scale['0'],
              cursor: 'pointer',
            }}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </header>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: spacing.scale['4'],
        }}
        onMouseLeave={() => {
          if (type === 'dateRange') {
            setHoverDate(null);
          }
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: `repeat(${WEEKDAY_LABELS.length}, minmax(0, 1fr))`,
          }}
        >
          {WEEKDAY_LABELS.map((label, index) => (
            <div
              key={`${label}-${index}`}
              style={{
                display: 'flex',
                flex: '1 0 0',
                minWidth: spacing.scale['0'],
                minHeight: spacing.scale['0'],
                height: spacing.scale['32'],
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: radius.scale.md,
                backgroundColor: palette.base.transparent,
              }}
            >
              <span
                style={{
                  color: textBase.secondary,
                  ...toTypographyStyle(typography.scale.captionM.regular),
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {weeks.map((week) => (
            <div
              key={week.map((day) => day.key).join('|')}
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: `repeat(${WEEKDAY_LABELS.length}, minmax(0, 1fr))`,
              }}
            >
              {week.map((day) => {
                const outOfMonth = !day.inCurrentMonth;
                const disabledByRule = disabledDate?.(day.date) ?? false;
                const isDisabled = outOfMonth || disabledByRule;
                const isCurrentDate = areSameDate(day.date, currentDate);
                const dateKey = day.key;

                let state: CalendarDayState = 'default';
                let rangeDay: CalendarRangeDay = 'middle';

                if (type === 'date') {
                  if (areSameDate(day.date, resolvedDate)) {
                    state = 'active';
                  }
                } else {
                  const inRange = isWithinRange(day.date, displayedRange);
                  if (inRange) {
                    state = rangePreview ? 'hover' : 'active';
                    rangeDay = getRangeDayPosition(day.date, displayedRange);
                  }
                }

                if (isDisabled) {
                  state = 'disabled';
                }

                const isFocused = focusedKey === dateKey;
                const shouldRenderRangeFill = type === 'dateRange' && (state === 'hover' || state === 'active');
                const isRangeEdge = type === 'dateRange' && (rangeDay === 'first' || rangeDay === 'last');
                const isRangeMiddle = type === 'dateRange' && rangeDay === 'middle';

                const textColor = (() => {
                  if (state === 'disabled') {
                    return textBase.quaternary;
                  }

                  if (isCurrentDate) {
                    // Today: brand text (dark brand green in light, lime in dark).
                    return colors.semantic.theme.text.brand;
                  }

                  if (state === 'active' && type === 'date') {
                    return textBase.primary;
                  }

                  if (isRangeEdge && (state === 'active' || state === 'hover')) {
                    return textBase.primary;
                  }

                  return textBase.secondary;
                })();

                const innerBackgroundColor = (() => {
                  if (type === 'date' && state === 'active') {
                    return colors.semantic.theme.background.surface.default;
                  }

                  if (isRangeEdge && (state === 'active' || state === 'hover')) {
                    return colors.semantic.theme.background.surface.default;
                  }

                  return palette.base.transparent;
                })();

                const innerBorderWidth = (() => {
                  if (type === 'date' && state === 'active') {
                    return border.width['1'];
                  }

                  if (isRangeEdge && (state === 'active' || state === 'hover')) {
                    return border.width['1'];
                  }

                  return border.width['0'];
                })();

                const innerBorderColor = colors.semantic.theme.border.select.primary;

                const innerRadius = (() => {
                  if (type === 'date') {
                    return {
                      borderTopLeftRadius: radius.scale.md,
                      borderTopRightRadius: radius.scale.md,
                      borderBottomRightRadius: radius.scale.md,
                      borderBottomLeftRadius: radius.scale.md,
                    };
                  }

                  if (isRangeMiddle && (state === 'active' || state === 'hover')) {
                    return {
                      borderTopLeftRadius: radius.scale['0'],
                      borderTopRightRadius: radius.scale['0'],
                      borderBottomRightRadius: radius.scale['0'],
                      borderBottomLeftRadius: radius.scale['0'],
                    };
                  }

                  if (rangeDay === 'first' && (state === 'active' || state === 'hover')) {
                    return {
                      borderTopLeftRadius: radius.scale.md,
                      borderTopRightRadius: radius.scale['0'],
                      borderBottomRightRadius: radius.scale['0'],
                      borderBottomLeftRadius: radius.scale.md,
                    };
                  }

                  if (rangeDay === 'last' && (state === 'active' || state === 'hover')) {
                    return {
                      borderTopLeftRadius: radius.scale['0'],
                      borderTopRightRadius: radius.scale.md,
                      borderBottomRightRadius: radius.scale.md,
                      borderBottomLeftRadius: radius.scale['0'],
                    };
                  }

                  return {
                    borderTopLeftRadius: radius.scale.md,
                    borderTopRightRadius: radius.scale.md,
                    borderBottomRightRadius: radius.scale.md,
                    borderBottomLeftRadius: radius.scale.md,
                  };
                })();

                const fillStyle = (() => {
                  if (!shouldRenderRangeFill) {
                    return null;
                  }

                  if (rangeDay === 'first') {
                    return {
                      left: RANGE_FILL_EDGE,
                      right: spacing.scale['0'],
                      borderTopLeftRadius: radius.scale.md,
                      borderBottomLeftRadius: radius.scale.md,
                      borderTopRightRadius: radius.scale['0'],
                      borderBottomRightRadius: radius.scale['0'],
                    };
                  }

                  if (rangeDay === 'last') {
                    return {
                      left: spacing.scale['0'],
                      right: RANGE_FILL_EDGE,
                      borderTopLeftRadius: radius.scale['0'],
                      borderBottomLeftRadius: radius.scale['0'],
                      borderTopRightRadius: radius.scale.md,
                      borderBottomRightRadius: radius.scale.md,
                    };
                  }

                  return {
                    left: spacing.scale['0'],
                    right: spacing.scale['0'],
                    borderTopLeftRadius: radius.scale['0'],
                    borderBottomLeftRadius: radius.scale['0'],
                    borderTopRightRadius: radius.scale['0'],
                    borderBottomRightRadius: radius.scale['0'],
                  };
                })();

                return (
                  <button
                    key={dateKey}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleDateClick(day.date, isDisabled)}
                    onMouseEnter={() => {
                      if (type === 'dateRange' && resolvedRange.start && !resolvedRange.end && !isDisabled) {
                        setHoverDate(day.date);
                      }
                    }}
                    onFocus={() => setFocusedKey(dateKey)}
                    onBlur={() => setFocusedKey((previous) => (previous === dateKey ? null : previous))}
                    style={{
                      position: 'relative',
                      width: DATE_CELL_SIZE,
                      height: DATE_CELL_SIZE,
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      padding: DATE_CELL_INSET,
                      margin: spacing.scale['0'],
                      backgroundColor: palette.base.transparent,
                      borderStyle: 'solid',
                      borderWidth: border.width['0'],
                      borderColor: palette.base.transparent,
                      cursor: isDisabled ? 'default' : 'pointer',
                      boxShadow: isFocused ? shadows.focusRing.light.css : 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    {fillStyle ? (
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          top: `calc(50% - ${RANGE_FILL_HEIGHT / 2}px)`,
                          height: RANGE_FILL_HEIGHT,
                          backgroundColor: colors.semantic.theme.background.button.tertiary,
                          ...fillStyle,
                        }}
                      />
                    ) : null}

                    <span
                      style={{
                        position: 'relative',
                        display: 'flex',
                        flex: '1 0 0',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: spacing.scale['0'],
                        minHeight: spacing.scale['0'],
                        borderStyle: 'solid',
                        borderWidth: innerBorderWidth,
                        borderColor: innerBorderColor,
                        backgroundColor: innerBackgroundColor,
                        ...innerRadius,
                        boxSizing: 'border-box',
                      }}
                    >
                      <span
                        style={{
                          width: '100%',
                          color: textColor,
                          ...toTypographyStyle(typography.scale.captionL.regular),
                          textAlign: 'center',
                        }}
                      >
                        {day.date.getDate()}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <CalendarFooter
        type={type}
        showTimeSelection={showTimeSelection}
        selectedDate={resolvedDate}
        selectedRange={resolvedRange}
        dateTime={times.date}
        rangeStartTime={times.start}
        rangeEndTime={times.end}
        commitDate={commitTypedDate}
        commitRangeStart={commitTypedRangeStart}
        commitRangeEnd={commitTypedRangeEnd}
        commitTime={commitTypedTime}
        onCancel={onCancel}
        onApply={onApply}
      />
    </section>
  );
}
