# InfoCard

사이드바 하단의 안내/업그레이드 카드. Figma `Sidebar Items > Info Card` 컴포넌트 세트.

## Variants
- `type=lg`: warning surface (`orange.1`) — lead icon + label + caption + secondary 버튼 + ghost 버튼 + 우상단 close
- `type=sm`: success surface (`green.1`) — `ProgressBar` (vertical, green) + secondary 버튼 2개

## Token Usage

### Background
- `colors.primitive.palette.orange.1`
- `colors.primitive.palette.green.1`

### Text
- `colors.primitive.palette.gray.13`
- `colors.primitive.palette.gray.9a`

### Layout
- `spacing.scale.4`
- `spacing.scale.6`
- `spacing.scale.8`
- `spacing.scale.12`
- `spacing.scale.16`
- `spacing.scale.36`
- `spacing.scale.248`
- `spacing.scale.280`
- `radius.scale.lg`

### Typography
- `typography.scale.captionL.medium`
- `typography.scale.captionL.regular`

## Behavior
- `type=lg` 의 close 아이콘 클릭 시 `onClose`
- `type=sm` 의 ProgressBar 는 `progressValue` (0-100), `progressState` ('15 days left') 로 라벨 커스텀
