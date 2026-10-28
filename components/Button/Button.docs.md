# Button

## Purpose
`Button` 컴포넌트는 Figma MCP 추출 토큰(`309-design-tokens.tokens.json`, `tokens/Theme/Light.json`)을 기반으로 구현된 액션 트리거 컴포넌트입니다.

Single Source of Truth:
- `/Users/309agent/cursor/309-design-library/style-tokens.ts`

## Token Usage
아래 토큰만 사용합니다.

### Background
- `colors.semantic.theme.background.button.primary`
- `colors.semantic.theme.background.button.primaryHover`
- `colors.semantic.theme.background.button.primaryDisabled`
- `colors.semantic.theme.background.button.secondary`
- `colors.semantic.theme.background.button.secondaryHover`
- `colors.semantic.theme.background.button.secondaryDisabled`
- `colors.semantic.theme.background.button.tertiary`
- `colors.semantic.theme.background.button.tertiaryHover`
- `colors.semantic.theme.background.button.tertiaryDisabled`
- `colors.semantic.theme.background.button.ghost`
- `colors.semantic.theme.background.button.ghostHover`
- `colors.semantic.theme.background.button.ghostDisabled`
- `colors.semantic.theme.background.button.destructive`
- `colors.semantic.theme.background.button.destructiveHover`
- `colors.semantic.theme.background.button.destructiveDisabled`
- `colors.semantic.theme.background.button.destructiveSecondary`
- `colors.semantic.theme.background.button.destructiveSecondaryHover`
- `colors.semantic.theme.background.button.destructiveSecondaryDisabled`
- `colors.semantic.theme.background.button.destructiveTertiary`
- `colors.semantic.theme.background.button.destructiveTertiaryHover`
- `colors.semantic.theme.background.button.destructiveTertiaryDisabled`
- `colors.semantic.theme.background.button.destructiveGhost`
- `colors.semantic.theme.background.button.destructiveGhostHover`
- `colors.semantic.theme.background.button.destructiveGhostDisabled`

### Text
- `colors.semantic.theme.text.button.primary` (primary 텍스트 — 라임 위 잉크)
- `colors.semantic.theme.text.base.quaternary` (primary disabled 텍스트)
- `colors.semantic.theme.text.base.primary`
- `colors.semantic.theme.text.base.secondary`
- `colors.semantic.theme.text.base.staticWhite`
- `colors.semantic.theme.text.base.staticWhiteSecondary`
- `colors.semantic.theme.text.status.destructive`
- `colors.semantic.theme.text.status.destructiveSecondary`

### Border
- `border.color.theme.action.normal`
- `border.color.theme.action.hover`
- `border.color.theme.action.disabled`
- `border.color.theme.action.focus`
- `border.color.theme.action.destructive`
- `border.color.theme.action.destructiveHover`
- `border.color.theme.action.destructiveDisabled`
- `border.color.theme.action.focusDestructive`
- `border.width.1` (보더 굵기이자 padding 보정값 — 아래 Visual Validation 참고)

### Focus Ring / Shadow
- `shadows.focusRing.light.css`
- `shadows.focusRing.lightDestructive.css`

### Size / Layout
- `spacing.scale.24`
- `spacing.scale.32`
- `spacing.scale.40`
- `spacing.scale.48`
- `spacing.scale.20`
- `spacing.scale.14`
- `spacing.scale.12`
- `spacing.scale.10`
- `spacing.scale.8`
- `spacing.scale.6`
- `spacing.scale.5`
- `spacing.scale.4`
- `spacing.scale.2`
- `spacing.scale.0`
- `spacing.scale.16`
- `radius.scale.full`
- `radius.scale.xl`
- `radius.scale.lg`
- `radius.scale.md`

### Typography
- `typography.scale.captionM.medium`
- `typography.scale.captionL.medium`
- `typography.scale.bodyS.medium`
- `typography.scale.bodyL.medium`

## Variants
- `primary`
- `secondary`
- `tertiary`
- `ghost`
- `destructive`
- `destructiveSecondary`
- `destructiveTertiary`
- `destructiveGhost`

## Type
- `default`
- `iconOnly`

## Shape
- `rounded`
- `pill`

## Visual Validation
Figma 기준: carbonscope-Library `Button` 컴포넌트 세트(`977:47549`).

- Size 비교 (외곽 높이, 1px 보더 포함)
  - `xs`: `minHeight=spacing.scale.24`
  - `sm`: `minHeight=spacing.scale.32`
  - `md`: `minHeight=spacing.scale.40`
  - `lg`: `minHeight=spacing.scale.48`
- Padding 비교 (토큰 값 = 외곽선부터 잰 거리)
  - `type=default`: `xs(8,4)`, `sm(10,6)`, `md(12,10)`, `lg(16,12)` (`paddingX`,`paddingY`)
  - `type=iconOnly`: `xs(5)`, `sm(8)`, `md(10)`, `lg(14)` (all sides)
  - Figma는 1px stroke를 프레임 안쪽에 그려 레이아웃 공간을 차지하지 않습니다. CSS 보더는 공간을 차지하므로, 실제 CSS padding은 `토큰 − border.width.1`입니다. 그래서 외곽 크기가 Figma와 같습니다(예: sm icon-only = 32×32, sm + 아이콘 = 높이 32).
- Icon slot 비교
  - `xs`: `spacing.scale.14`, `sm`: `spacing.scale.16`, `md`: `spacing.scale.20`, `lg`: `spacing.scale.20` (default / iconOnly 공통)
  - 슬롯에 `fontSize=iconSize`를 지정해 `1em` 아이콘(`components/icons` 전체)이 슬롯 크기로 렌더링됩니다. width/height를 직접 지정한 아이콘은 그 크기를 유지합니다.
- Alignment 비교
  - `display:inline-flex`, `alignItems:center`, `justifyContent:center`
  - `shape=rounded`는 size별 radius(`md/lg/xl/xl`), `shape=pill`은 `radius.scale.full`
- 알려진 차이 (이번 범위 밖)
  - `lg` 라벨이 `typography.scale.bodyL.medium`(20/28)이라 라벨이 있는 lg 버튼은 높이 52입니다. Figma lg 라벨은 body-s(16/24)이고 높이 48입니다.
  - Figma 라벨 프레임의 좌우 padding 4(sm/md/lg)가 코드에 없어, 라벨이 있는 버튼은 Figma보다 8px 좁습니다.
  - Figma 아이콘 색은 `icon/base/secondary`이고, 코드 슬롯은 라벨 색을 그대로 씁니다.

## Behavior
- 상태: `default`, `hover`, `focus`, `disabled`
- 상태 우선순위: `disabled > forceState > focus > hover > default`
- Variant axes: `variant + type + shape + size`
- Focus ring:
  - 일반 variant: `shadows.focusRing.light.css`
  - destructive 계열: `shadows.focusRing.lightDestructive.css`
- Border (variant별)
  - `primary`: 보더 색 = 배경 색 (한 덩어리로 보이게)
  - `secondary`, `destructive`, `destructiveSecondary`: `border.color.theme.action.*` 토큰
  - `tertiary`, `destructiveTertiary`, `ghost`, `destructiveGhost`: default / hover / disabled에서 보더 없음(투명). Figma tertiary(`977:47366`, `977:47444`)도 stroke가 없습니다. 1px 보더 박스는 투명하게 남겨 모든 variant의 크기를 같게 유지합니다.
  - Focus: 모든 variant가 `focus` / `focusDestructive` 보더 + focus ring을 표시합니다(키보드 포커스 접근성 유지).
- Transition: 토큰에 duration/easing 정의가 없어 즉시 상태 전환으로 구현

## Behavioral Validation
- Interaction states
  - Hover: 배경/보더/텍스트를 `*Hover` 토큰으로 변경 (tertiary·ghost 계열은 보더 투명 유지)
  - Focus: 보더 `focus` 계열 토큰 + focus ring shadow 토큰 적용
  - Disabled: `*Disabled` 배경/보더/텍스트 토큰 고정 적용 (tertiary·ghost 계열은 보더 투명 유지)
- Transition logic
  - MCP 토큰에 motion duration/easing이 없어 transition 값을 추가하지 않음
- Accessibility behavior
  - 네이티브 button, `disabled` 속성, 키보드 focus 시각화, 장식 아이콘 `aria-hidden` 적용

## Accessibility Notes
- 네이티브 `<button>` 요소 사용
- `disabled` 속성으로 비활성 상태 전달
- 키보드 포커스 지원(`onFocus`, `onBlur` + focus visual)
- 장식 아이콘은 `aria-hidden="true"`

## Usage Examples
```tsx
import { Button } from './Button';
import { IconAddLine, IconLinkM } from '../icons';

export function Example() {
  return (
    <>
      <Button variant="primary" type="default" shape="rounded" size="md">Primary</Button>
      <Button variant="secondary" type="default" shape="pill" size="sm">Pill</Button>
      {/* 1em 아이콘은 크기를 지정하지 않아도 슬롯 크기(sm=16)로 맞춰집니다 */}
      <Button variant="tertiary" size="sm" leftIcon={<IconLinkM />}>Copy link</Button>
      <Button variant="destructiveGhost" type="iconOnly" shape="pill" size="xs" leftIcon={<IconAddLine />} aria-label="Add" />
      <Button variant="tertiary" type="default" shape="rounded" size="md" disabled>Disabled</Button>
    </>
  );
}
```
