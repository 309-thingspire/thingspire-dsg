# Pagination

## Purpose
`Pagination`은 Figma `Pagination` 컴포넌트(`Type=Arrows|Numbers|Buttons`, `Size=md|sm`)를 React + TypeScript로 구현한 페이지 네비게이션 컴포넌트입니다.

Single Source of Truth:
- `/Users/309agent/cursor/309-design-library/style-tokens.ts`

## Token Usage
아래 토큰만 사용합니다.

### Colors
- `colors.primitive.palette.base.transparent` (ghost 화살표 · 숫자 아이템 배경, primary 액션 버튼 보더)
- `colors.semantic.theme.background.button.tertiary` (arrows 화살표 버튼, active 숫자 아이템)
- `colors.semantic.theme.background.button.primary` (primary 액션 버튼)
- `colors.semantic.theme.background.surface.default` (secondary 액션 버튼)
- `colors.semantic.theme.background.surface.inverted` (active dot)
- `colors.semantic.theme.background.surface.neutralSubtle` (inactive dot)
- `colors.semantic.theme.border.action.normal` (secondary 액션 버튼 보더)
- `colors.semantic.theme.icon.base.secondary` (화살표 아이콘)
- `colors.semantic.theme.icon.base.quaternary` (disabled 화살표 아이콘)
- `colors.semantic.theme.text.base.primary`
- `colors.semantic.theme.text.base.secondary`
- `colors.semantic.theme.text.base.quaternary`
- `colors.semantic.theme.text.button.primary` (primary 액션 버튼)

### Typography
- `typography.scale.bodyS.medium`
- `typography.scale.captionL.medium`

### Spacing / Layout
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
- `spacing.scale.40`
- `spacing.scale.320`
- `spacing.scale.400`

### Radius / Border / Shadow
- `radius.scale.full`
- `radius.scale.xl`
- `radius.scale.lg`
- `border.width.0`
- `border.width.1`
- `shadows.focusRing.light.css`

### Icons
- `IconArrowLeftLine` / `IconArrowRightLine` (`arrow-left-line` / `arrow-right-line`, arrows · numbers 타입 공통)

## Props (접근성)
| Prop | Type | Default | 설명 |
|---|---|---|---|
| `prevAriaLabel` | `string` | `'Previous page'` | 이전 화살표 버튼의 접근성 이름 (arrows / numbers) |
| `nextAriaLabel` | `string` | `'Next page'` | 다음 화살표 버튼의 접근성 이름 (arrows / numbers) |

화살표 버튼은 아이콘만 있어 보이는 텍스트가 없습니다. 한국어 UI에서는 `prevAriaLabel="이전 페이지"`처럼 넘겨 주세요.

## Variants
- `type`: `arrows | numbers | buttons`
- `size`: `md | sm`
- `interactionState`: `default | hover | focus | disabled`

## Behavior
- 화살표 (Figma Arrows `2382:17325`, Numbers `2382:17329`)
  - 아이콘은 `arrow-left-line` / `arrow-right-line` (셰브론 `-s-line` 아님), md 20 / sm 16
  - 아이콘 색은 `icon.base.secondary`, disabled일 때 `icon.base.quaternary`
- `type=arrows`
  - 좌/우 아이콘 버튼(`background.button.tertiary`, `radius.scale.full`) + 중앙 dot indicator
- `type=numbers`
  - 좌/우 아이콘 버튼(ghost, size별 radius) + 숫자/ellipsis 아이템
  - active 아이템은 배경 강조(`background.button.tertiary`)
- `type=buttons`
  - 좌/우 액션 버튼 + 중앙 dot indicator
- `interactionState`
  - Figma Pagination 노드에서 hover/focus/disabled 시각 variant 축은 확인되지 않음
  - `focus`: 접근성 포커스 링 적용
  - `disabled`: 상호작용 차단 및 텍스트 대비 하향
- Transition logic
  - motion 토큰 정의가 없어 즉시 전환

## Accessibility Notes
- 루트에 `role="navigation"` + `aria-label="Pagination"` 적용
- 클릭 요소는 모두 네이티브 `<button type="button">` 사용
- 화살표 버튼은 `aria-label` 적용 (`prevAriaLabel` / `nextAriaLabel`, 기본값 `'Previous page'` / `'Next page'`)
- 숫자 active 항목은 `aria-current="page"` 적용
- 비활성 요소는 `disabled` + `aria-disabled` 적용

## Usage Examples
```tsx
import { Pagination } from './Pagination';

export function Example() {
  return (
    <>
      <Pagination type="arrows" size="md" />

      {/* 한국어 UI: 화살표 버튼 접근성 이름 지정 */}
      <Pagination type="arrows" size="sm" prevAriaLabel="이전 페이지" nextAriaLabel="다음 페이지" />

      <Pagination
        type="numbers"
        size="sm"
        numberItems={[
          { id: 'page-1', label: '1' },
          { id: 'more-left', label: '...', kind: 'more', disabled: true },
          { id: 'page-56', label: '56' },
          { id: 'page-57', label: '57', active: true },
          { id: 'page-58', label: '58' },
          { id: 'more-right', label: '...', kind: 'more', disabled: true },
          { id: 'page-100', label: '100' },
        ]}
      />

      <Pagination type="buttons" size="md" leftButtonLabel="Previous" rightButtonLabel="Next" />
    </>
  );
}
```

