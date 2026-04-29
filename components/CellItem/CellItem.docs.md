# CellItem

사이드바 1줄 (행) 단위. Figma `Sidebar Items > _Cell item` 컴포넌트 세트의 18 variant 매트릭스를 단일 컴포넌트로 합성.

## Variants
- `type`: `default` (라벨/배지 포함) / `iconOnly`
- `state`: `default` / `hover` / `disabled`
- `active`: `boolean` (선택 상태 — 배경 강조)
- `target`: `default` / `indented` (들여쓰기, 좌측 가이드라인)

총 18종 (3 × 2 × 3 — iconOnly 는 indented 미정의).

## Token Usage

### Background
- `colors.primitive.palette.base.transparent`
- `colors.primitive.palette.base.white`
- `colors.primitive.palette.gray.1a`
- `colors.primitive.palette.gray.2a`

### Text
- `colors.primitive.palette.gray.13`
- `colors.primitive.palette.gray.9a`
- `colors.primitive.palette.gray.5a`

### Border
- `colors.primitive.palette.gray.1a`
- `colors.primitive.palette.gray.2a`

### Layout
- `spacing.scale.0`
- `spacing.scale.2`
- `spacing.scale.4`
- `spacing.scale.6`
- `spacing.scale.8`
- `spacing.scale.20`
- `spacing.scale.26`
- `spacing.scale.32`
- `spacing.scale.280`
- `radius.scale.lg`
- `radius.scale.xs`

### Typography
- `typography.scale.captionL.medium`
- `typography.scale.captionM.medium`

## Behavior
- `forceState` 로 상태 강제 (프리뷰)
- `state` prop > hover/focus 자동 추적
- 우선순위: `disabled > forceState > state > hovered > default`
- `target=indented` + `showLine=true` 시 좌측 hairline guide 표시
- iconOnly 는 280px 너비 무시, fit-content
