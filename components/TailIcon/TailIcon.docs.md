# TailIcon

사이드바 행 / User / Additional 등에 부착되는 액션 아이콘 단위. Figma `Sidebar Items > Tail icon` 컴포넌트 세트.

## Token Usage

### Background
- `colors.primitive.palette.base.transparent`
- `colors.primitive.palette.gray.1a`

### Icon Tone
- `secondary`
- `quaternary`

### Size / Layout
- `spacing.scale.2`
- `spacing.scale.4`
- `radius.scale.xs`

## Variants
- `size`: `sm`(16) / `lg`(20)
- `state`: `default` / `hover` / `disabled`

## Behavior
- `forceState`로 상태 강제 가능 (프리뷰)
- `interactive` 또는 `onClick` 제공 시 `<button>` 렌더, 아니면 `<span>`
- hover 시 배경 `gray.1a` (rgba 10,15,41,0.04), disabled 시 quaternary 톤
