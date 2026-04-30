# AdditionalContent

FeatureCard / 콘텐츠 카드 안에 추가되는 보조 영역. Figma `Additional` (node 996:87220, 320 wide). 사이드바 atom `Additional` 과 다른 컨텍스트.

## Variants
- `divider` — 1px hairline (`gray.2`)
- `label` — 12px medium gray.9a
- `caption` — 12px regular gray.7a, 2-line max
- `button` — full-width primary (32 high), CaptionM/Medium 흰 텍스트, gray.13 배경
- `doubleButton` — gray tertiary 배경 button + small icon-only (24×24) more 버튼
- `searchInput` — search icon + placeholder
- `tags` — chip 4개 (white surface, gray.2a border, captionM medium)
- `segmented` — 2-tab pill toggle (gray.2a container, white selected with gray.3 border + xs shadow)

## Token Usage

### Background
- `colors.primitive.palette.base.white`
- `colors.primitive.palette.gray.13` (button)
- `colors.primitive.palette.gray.1a` (doubleButton, segmented badge)
- `colors.primitive.palette.gray.2a` (segmented container, tag border)

### Text
- `colors.primitive.palette.gray.13`
- `colors.primitive.palette.gray.9a`
- `colors.primitive.palette.gray.7a`
- `colors.primitive.palette.base.white`

### Layout
- `spacing.scale.0`
- `spacing.scale.2`
- `spacing.scale.4`
- `spacing.scale.6`
- `spacing.scale.8`
- `spacing.scale.12`
- `spacing.scale.14`
- `spacing.scale.16`
- `spacing.scale.24`
- `spacing.scale.320`
- `radius.scale.sm`
- `radius.scale.md`
- `radius.scale.lg`

### Typography
- `typography.scale.captionM.regular`
- `typography.scale.captionM.medium`
- `typography.scale.captionL.regular`
- `typography.scale.captionL.medium`

## Behavior
- Default `width` 320px (Figma 디자인 기준)
- segmented 는 controlled (`activeSegmentId`) / uncontrolled (`defaultActiveSegmentId`) 모두 지원
- search input 은 native `<input>` 으로 controlled / uncontrolled 모두 지원
- 모든 텍스트 prop 은 `ReactNode`
