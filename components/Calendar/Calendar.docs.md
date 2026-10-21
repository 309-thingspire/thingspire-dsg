# Calendar

## Purpose
`Calendar`는 Figma `Calendar` 컴포넌트(`Type=Date | Date Range`)를 기준으로 날짜 선택과 기간 선택을 지원하는 컴포넌트입니다.

Single Source of Truth:
- `/Users/309agent/cursor/309-design-library/style-tokens.ts`

## Token Usage
아래 토큰만 사용합니다.

### Colors
- `colors.primitive.palette.base.white`
- `colors.primitive.palette.base.transparent`
- `colors.primitive.palette.gray.1a`
- `colors.primitive.palette.gray.3`
- `colors.primitive.palette.gray.13`
- `colors.semantic.theme.border.select.primary` (선택 셀 보더)
- `colors.semantic.theme.background.button.primary`
- `colors.semantic.theme.text.button.primary`
- `colors.semantic.theme.text.base.staticDark`
- `colors.semantic.theme.text.base.staticDarkSecondary`
- `colors.semantic.theme.text.base.staticDarkQuaternary`
- `colors.semantic.theme.text.brand` (오늘 날짜)

### Typography
- `typography.scale.captionL.medium`
- `typography.scale.captionL.regular`
- `typography.scale.captionM.regular`

### Spacing
- `spacing.scale.0`
- `spacing.scale.2`
- `spacing.scale.4`
- `spacing.scale.6`
- `spacing.scale.8`
- `spacing.scale.10`
- `spacing.scale.12`
- `spacing.scale.16`
- `spacing.scale.20`
- `spacing.scale.24`
- `spacing.scale.32`
- `spacing.scale.36`
- `spacing.scale.144`
- `spacing.scale.288`
- `spacing.scale.480`
- `spacing.primitive.4`

### Radius / Border / Shadow
- `radius.scale.0`
- `radius.scale.md`
- `radius.scale.lg`
- `radius.scale.xl`
- `border.width.0`
- `border.width.1`
- `shadows.elevation.xs.css`
- `shadows.elevation.lg.css`
- `shadows.focusRing.light.css`

## Variants
- `type`: `date | dateRange`
- 셀 상태 축(추출):
  - Date Item: `default | active | disabled`
  - Date Range Item: `default | hover | active | disabled`
  - Date Range Item 추가 축: `rangeDay(first|middle|last)`, `currentDate(true|false)`

## Behavior
- `type=date`
  - 단일 날짜 선택
  - 선택 셀은 보더(`border.select.primary`) + white 배경
- `type=dateRange`
  - 시작/종료 날짜 선택
  - 선택 구간 first/middle/last 형태로 채움/보더 처리
  - 종료일 미선택 상태에서 hover 시 preview range 렌더링
- 공통
  - 월 이동(이전/다음)
  - `disabledDate`와 월 외 날짜는 disabled 스타일 적용
  - Footer의 Cancel/Apply 액션 제공 (`onCancel` / `onApply`를 연결해야 동작)
- 선택값 제어
  - `selectedDate` / `selectedRange`를 넘기면 controlled: 상태로 들고 `onSelectDate` / `onSelectRange`에서 갱신해야 클릭이 반영됨 (고정값만 넘기면 선택이 바뀌지 않음)
  - 둘 다 생략하면 내부 상태로 선택 유지
  - `month` / `year`는 처음 열릴 달만 정함 — 월 이동은 항상 내부에서 동작
- Footer 입력
  - Date / Start / End 칸은 `MM/DD/YYYY`를 직접 입력 가능 (월·일 한 자리, `/` `.` `-` 허용). 완전한 날짜가 되는 즉시 선택에 반영되고 달력이 그 달로 이동, blur 시 `MM/DD/YYYY`로 정리
  - Time 칸은 `9:05 pm`, `21:05`, `2105`, `905pm`, `오후 9:05` 등을 받아 Enter/blur 시 `hh:mm AM|PM`으로 정리하고 `onDateTimeChange` / `onRangeStartTimeChange` / `onRangeEndTimeChange` 호출
  - `dateTime` / `rangeStartTime` / `rangeEndTime` prop은 초기값 — prop이 바뀌면 입력값을 대체
  - 잘못된 값(예: `02/30/2026`, `disabledDate`에 걸리는 날짜)은 Enter 시 destructive 보더로 표시하고 포커스 유지, blur 또는 Esc 시 이전 값으로 되돌림
  - 시작일보다 앞선 종료일을 입력하면 두 날짜를 맞바꿔 구간으로 정리 (`normalizeRange`)

## Accessibility Notes
- 날짜 셀과 네비게이션은 네이티브 `<button>` 사용
- disabled 날짜는 실제 `disabled` 속성 적용
- 키보드 포커스 시 `shadows.focusRing.light.css` 적용
- Footer 입력은 `<label for>`로 연결된 네이티브 `<input>` (라벨이 없는 Time 칸은 `aria-label` "Start time" / "End time"), 잘못된 값은 `aria-invalid`

## Usage Examples
```tsx
import { useState } from 'react';

import { Calendar } from './Calendar';
import type { CalendarRangeSelection } from './Calendar.types';

export function Example() {
  // Controlled: keep the selection in state and write it back.
  const [date, setDate] = useState<Date | null>(new Date(2024, 1, 2));
  const [time, setTime] = useState('10:39 PM');
  const [range, setRange] = useState<CalendarRangeSelection>({
    start: new Date(2024, 1, 2),
    end: new Date(2024, 1, 7),
  });

  return (
    <>
      <Calendar
        type="date"
        month={1}
        year={2024}
        selectedDate={date}
        onSelectDate={setDate}
        dateTime={time}
        onDateTimeChange={setTime}
        onCancel={() => setDate(null)}
        onApply={() => {
          // use date + time
        }}
      />

      <Calendar
        type="dateRange"
        month={1}
        year={2024}
        selectedRange={range}
        onSelectRange={setRange}
      />

      {/* Uncontrolled: the calendar keeps its own selection. */}
      <Calendar type="date" onSelectDate={(value) => console.log(value)} />
    </>
  );
}
```
