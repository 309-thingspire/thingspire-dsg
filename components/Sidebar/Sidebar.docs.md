# Sidebar

전체 사이드바 영역. Figma `Sidebar` 컴포넌트 세트. Top / Middle / Bottom atom 의 합성 (molecule).

## Token Usage

### Background
- `colors.primitive.palette.base.white`
- `colors.primitive.palette.gray.1`

### Layout
- `spacing.scale.8`
- `spacing.scale.16`
- `spacing.scale.24`
- `spacing.scale.1024`
- `spacing.primitive.256`

## Variants
- `fill=false`: 흰색 배경 (default — 페이지 위에 떠있는 형태)
- `fill=true`: `gray.1` (#f7f7f8) 배경 — 페이지 사이드 패널처럼 채워진 형태

## Composition
- `Top` (showButtonStack=false, showLabel=false 강제 — User + Divider + Caption만)
- `Middle` (Teamspaces 등 cell 그룹)
- `Bottom` (InfoCard + cells block + User) — `flex: 1` 으로 하단 정렬

## Behavior
- 전체 너비 280px, 높이 1024px (`height` prop 으로 변경 가능)
- 각 섹션은 `showTop` / `showMiddle` / `showBottom` boolean 으로 토글
- 자식 props 는 `top` / `middle` / `bottom` 객체로 패스스루
