# SelectInput

## Purpose
`SelectInput`은 Figma `Select Input` 컴포넌트(`Size`, `Target`, `Type`, `State`)를 코드로 반영한 선택 입력 컴포넌트입니다.

Single Source of Truth:
- `/Users/309agent/cursor/309-design-library/style-tokens.ts`

## Token Usage
아래 토큰만 사용합니다.

### Colors
- `colors.primitive.palette.base.white`
- `colors.primitive.palette.base.transparent`
- `colors.primitive.palette.gray.1`
- `colors.primitive.palette.gray.1a`
- `colors.primitive.palette.gray.2`
- `colors.primitive.palette.gray.2a`
- `colors.primitive.palette.gray.3`
- `colors.primitive.palette.gray.4`
- `colors.primitive.palette.blue.2`
- `colors.primitive.palette.blue.3`
- `colors.primitive.palette.blue.11`
- `colors.primitive.palette.orange.3`
- `colors.primitive.palette.orange.4`
- `colors.primitive.palette.red.2`
- `colors.primitive.palette.red.3`
- `colors.primitive.palette.red.4`
- `colors.primitive.palette.red.5`
- `colors.primitive.palette.red.6`
- `colors.primitive.palette.red.11`
- `colors.primitive.palette.purple.2`
- `colors.primitive.palette.purple.3`
- `colors.primitive.palette.purple.4`
- `colors.primitive.palette.purple.6`
- `colors.primitive.palette.purple.11`
- `colors.semantic.theme.text.base.staticDark`
- `colors.semantic.theme.text.base.staticDarkSecondary`
- `colors.semantic.theme.text.base.staticDarkTertiary`
- `colors.semantic.theme.text.base.staticDarkQuaternary`
- `colors.semantic.theme.text.status.destructive`

### Typography
- `typography.scale.captionL.regular`
- `typography.scale.captionL.medium`
- `typography.scale.captionM.regular`
- `typography.scale.captionM.medium`
- `typography.scale.captionS.medium`

### Spacing / Sizing
- `spacing.scale.0`
- `spacing.scale.2`
- `spacing.scale.4`
- `spacing.scale.6`
- `spacing.scale.8`
- `spacing.scale.10`
- `spacing.scale.12`
- `spacing.scale.16`
- `spacing.scale.20`
- `spacing.scale.40`
- `spacing.scale.48`
- `spacing.scale.24`
- `spacing.scale.144`
- `spacing.scale.320`
- `spacing.primitive.3`

### Radius / Border / Shadow
- `radius.scale.xs`
- `radius.scale.sm`
- `radius.scale.md`
- `radius.scale.lg`
- `radius.scale.xl`
- `radius.scale.full`
- `border.width.0`
- `border.width.1`
- `border.width.2`
- `shadows.elevation.xs.css`
- `shadows.elevation.lg.css`
- `shadows.focusRing.light.css`
- `shadows.focusRing.lightDestructive.css`

### Reused Component Token Usage
- Multi-select dropdown row의 체크 UI는 `Checkbox` 컴포넌트를 재사용합니다.
- `Checkbox` 내부의 토큰(`background`, `border`, `focusRing`)도 동일하게 적용됩니다.

## Variants
- `size`: `md | sm`
- `target`: `default | destructive`
- `type`: `default | multi-select | avatar`
- `state`: `default | hover | filled | focus | disabled`

## Behavior
- `state`를 전달하면 해당 시각 상태를 강제합니다.
- `state` 미전달 시 hover/focus/value 기반으로 자동 상태를 계산합니다.
- `focus` 상태에서는 Figma와 동일하게 dropdown panel이 열립니다.
- `type=default | avatar`: 단일 선택, 아이템 선택 시 패널 닫힘.
- `type=multi-select`: 다중 선택 토글, 패널 유지.
- `target=destructive`는 border/helper/filled text가 destructive 계열로 변경됩니다.
- 너비는 부모를 채웁니다(`width: 100%`, 최소 `spacing.scale.144`, 최대값 없음). 폭은 감싸는 요소에서 정합니다.
- 메뉴 패널은 최대 `spacing.scale.320` 높이에서 세로 스크롤됩니다. 네이티브 스크롤바는 숨기고(`scrollbar-width: none`) 직접 그린 thumb(4px, `background.surface.neutralSubtle`)가 스크롤 위치·비율을 따라갑니다 — 스크롤바는 하나만 보입니다. 내용이 넘치지 않으면 thumb는 표시되지 않습니다.
- 메뉴는 가로로 스크롤되지 않습니다(`overflow-x: hidden`). 긴 label과 supportText는 한 줄로 이어지고 끝이 말줄임표(…)로 잘립니다. 트리거에 표시되는 선택값도 같습니다.

## Accessibility Notes
- Trigger: `button` + `aria-haspopup="listbox"` + `aria-expanded` + `aria-controls`
- Dropdown: `role="listbox"`, multi-select 시 `aria-multiselectable`
- Option row: `role="option"` + `aria-selected`
- `disabled` 상태에서 trigger/option 상호작용을 차단합니다.

## Token Verification
- 모든 컬러, 타이포그래피, spacing, radius, border, shadow는 `style-tokens.ts` 경로 값만 참조합니다.
- 하드코딩된 컬러/간격 값 없이 토큰 매핑으로 구현했습니다.

## Usage Examples
```tsx
import { SelectInput } from './SelectInput';

export function Example() {
  return (
    <>
      <SelectInput
        type="default"
        size="md"
        target="default"
      />

      <SelectInput
        type="multi-select"
        size="md"
        target="destructive"
        state="focus"
        selectedIds={['option-2', 'option-3', 'option-6', 'option-1', 'option-7']}
      />

      <SelectInput
        type="avatar"
        size="sm"
        target="default"
        state="disabled"
      />
    </>
  );
}
```
