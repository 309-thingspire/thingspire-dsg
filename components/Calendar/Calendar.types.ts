import type { HTMLAttributes } from 'react';

export type CalendarType = 'date' | 'dateRange';

export interface CalendarRangeSelection {
  start: Date | null;
  end: Date | null;
}

export interface CalendarMonthChangePayload {
  month: number;
  year: number;
}

export interface CalendarProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  type?: CalendarType;
  month?: number;
  year?: number;
  selectedDate?: Date | null;
  selectedRange?: CalendarRangeSelection;
  currentDate?: Date;
  showTimeSelection?: boolean;
  /**
   * Footer times, shown as `hh:mm AM`. They seed the editable Time fields
   * (defaults 10:39 PM / 10:39 PM / 09:12 AM); a new prop value replaces
   * whatever was typed. Listen with the matching `on…TimeChange`.
   */
  dateTime?: string;
  rangeStartTime?: string;
  rangeEndTime?: string;
  locale?: string;
  disabledDate?: (date: Date) => boolean;
  onSelectDate?: (date: Date) => void;
  onSelectRange?: (range: CalendarRangeSelection) => void;
  onMonthChange?: (payload: CalendarMonthChangePayload) => void;
  /** A time typed in the footer, normalized to `hh:mm AM|PM`. */
  onDateTimeChange?: (time: string) => void;
  onRangeStartTimeChange?: (time: string) => void;
  onRangeEndTimeChange?: (time: string) => void;
  onApply?: () => void;
  onCancel?: () => void;
}

export type CalendarDayState = 'default' | 'hover' | 'active' | 'disabled';

export type CalendarRangeDay = 'first' | 'middle' | 'last';
