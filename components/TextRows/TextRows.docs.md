# TextRows

세로 stack 의 title-content 행. Figma `Text Rows` 컴포넌트.

각 row 는 `justify-between` 으로:
- 좌측: dot (8px, purple) + title (CaptionL/Regular, gray.13)
- 가운데: hairline divider (`flex: 1 0 0`, padding-x 12)
- 우측: content (CaptionL/Regular, gray.9a)

옵션으로 상단 headline (CaptionL/Medium, gray.9a) 표시 가능. dot/divider 도 토글 가능.

## Token Usage

### Background / Divider
- `colors.primitive.palette.gray.2` (divider line)

### Dot color
- `colors.primitive.palette.purple.8`
- `colors.primitive.palette.blue.8`
- `colors.primitive.palette.green.8`
- `colors.primitive.palette.orange.8`
- `colors.primitive.palette.red.8`
- `colors.primitive.palette.gray.9`

### Text
- `colors.primitive.palette.gray.13` (title)
- `colors.primitive.palette.gray.9a` (headline, content)

### Layout
- `spacing.scale.2`
- `spacing.scale.6`
- `spacing.scale.8`
- `spacing.scale.12`
- `spacing.scale.16`
- `spacing.scale.32`
- `spacing.scale.400`
- `radius.scale.full`

### Typography
- `typography.scale.captionL.medium` (headline)
- `typography.scale.captionL.regular` (title, content)

## Props
- `rows`: `TextRowsItem[]` — `{ title, content, dotColor?, id? }` (default 5 rows, supports up to 10)
- `headline`: `ReactNode` (default 'Headline')
- `showHeadline` / `showDot` / `showDivider`: boolean toggles
- `width`: 전체 너비 (default 432 = 400 + 32)

## Behavior
- title/content 는 `whiteSpace: nowrap` — 너무 길 경우 caller 가 줄바꿈/ellipsis 직접 처리
- 모든 텍스트 노드 `ReactNode` 라 인라인 마크업/링크 자유 삽입
