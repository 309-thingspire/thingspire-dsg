# TextBlocks

가로로 나란히 배열된 텍스트 블록 (1~5개). Figma `Text Blocks` 컴포넌트.

각 block 은 `gray.1` 배경 + 16px padding + `flex: 1 0 0` 으로 동등 너비. block 내부에는 dot + title (caption) + label (body).

## Token Usage

### Background
- `colors.primitive.palette.gray.1`

### Dot color (default purple)
- `colors.primitive.palette.purple.8`
- `colors.primitive.palette.blue.8`
- `colors.primitive.palette.green.8`
- `colors.primitive.palette.orange.8`
- `colors.primitive.palette.red.8`
- `colors.primitive.palette.gray.9`

### Text
- `colors.primitive.palette.gray.13` (label)
- `colors.primitive.palette.gray.9a` (title)

### Layout
- `spacing.scale.4`
- `spacing.scale.6`
- `spacing.scale.10`
- `spacing.scale.16`
- `spacing.scale.800`
- `radius.scale.lg`
- `radius.scale.full`

### Typography
- `typography.scale.captionL.medium` (title)
- `typography.scale.bodyL.medium` (label)

## Props
- `blocks`: `TextBlocksItem[]` — `{ title, label, dotColor?, showDot?, id? }` 데이터 배열 (default 5개)
- `width`: 전체 너비 (default 800)
- `dotColor`: per-block dot 색상 (`purple` / `blue` / `green` / `orange` / `red` / `gray`)
- `showDot`: per-block dot 표시 토글

## Behavior
- block 개수는 배열 길이로 결정 (1~5 권장)
- `flex: 1 0 0` + `min-width: 0` 으로 모든 block 동등 너비 + ellipsis 가능
- 외곽 `overflow: hidden` + `radius lg` 로 끝 모서리 라운딩
- title/label 모두 `ReactNode` 라 인라인 마크업 자유 삽입
