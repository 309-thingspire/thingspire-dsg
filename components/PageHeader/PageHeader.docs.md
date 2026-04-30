# PageHeader

페이지 상단 헤더 (800 wide). Figma `Page Header` (6368:116556) — `_Top Page Header` (5896:60211) + `_Bottom Page Header` (5897:62817) 두 영역의 합성.

## Composition
- **Top** (gap 12): back arrow icon button + `headline` (H6/SemiBold) + `description` (BodyS/Regular) + actions (오른쪽 정렬, 2 buttons default `tertiary` + `primary`)
- **Bottom** (gap 12, gap 8 inside each side): 좌측 buttons (`secondary` × 2 default) + 우측 buttons (`ghost` + `secondary` default), 좌우는 각각 `flex: 1 0 0`
- 섹션 사이 gap 24

## Token Usage

### Background / Color
- `colors.primitive.palette.gray.13` (headline, back icon)
- `colors.primitive.palette.gray.9a` (description)

### Layout
- `spacing.scale.4`
- `spacing.scale.8`
- `spacing.scale.12`
- `spacing.scale.16`
- `spacing.scale.24`
- `spacing.scale.800`
- `radius.scale.lg`

### Typography
- `typography.scale.h6.semiBold` (headline)
- `typography.scale.bodyS.regular` (description)

## Composition deps
- `Button` (size=sm, shape=rounded, radius lg) 재사용
- `IconArrowLeftLine` (back), `IconAddLine` (default lead icon)

## Props
- `showTop` / `showBottom` — 섹션 토글
- `showBackButton`, `backIcon`, `onBackClick` — 좌측 back 아이콘
- `headline`, `description`, `showDescription` — 텍스트 (모두 `ReactNode`)
- `topActions: PageHeaderActionItem[]` — 우상단 buttons (default tertiary + primary)
- `bottomLeftActions` / `bottomRightActions: PageHeaderActionItem[]` — 하단 buttons
- 각 `PageHeaderActionItem`: `{ label, variant, leadIcon?, rightIcon?, disabled?, onClick? }` — `variant` 미지정 시 default 자동 매핑 (top: 마지막 primary 나머지 tertiary, bottom-left: secondary, bottom-right: 마지막 secondary 나머지 ghost)

## Behavior
- `topActions`/`bottomLeft`/`bottomRight` 배열 길이 자유 (0개부터 N개)
- 각 button 의 `leadIcon` 미지정 시 `IconAddLine` placeholder
- `onBackClick` 으로 back navigation 처리
