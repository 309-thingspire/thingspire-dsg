# AdditionalMeta

컴팩트 메타 / 인디케이터 보조 영역. Figma `Additional` (node 2354:26657, 320 wide). `AdditionalContent` 와 다른 variant 컬렉션.

## Variants
- `buttonGroupH` — 2 small buttons (primary + secondary, sm 32 high) 가로
- `buttonGroupV` — 2 buttons full-width 세로 stack
- `badgeContainer` — colored pill 배지들 (`green`/`orange`/`blue`/`red`/`purple`/`gray`, full radius)
- `text` — multi-line BodyS/Regular gray.9a
- `divider` — 1px hairline (`gray.2`)
- `input` — single-line text input (radius lg)
- `tabMenu` — 2-tab pill toggle (gray.2a container, white selected with gray.3 border + xs shadow)
- `avatar` — 40px circle avatar (fallback `purple.2` + `IconUser2Line`)
- `icon` — 40px circle bubble (white + gray.2a border, lead icon centered)
- `rating` — `IconStarFill` + value text (CaptionL/Medium)
- `pagination` — prev / dots / next (32×32 gray.1a circles, dot indicator)
- `empty` — 24px empty placeholder

## Token Usage

### Background
- `colors.primitive.palette.base.white`
- `colors.primitive.palette.gray.13` (primary button)
- `colors.primitive.palette.gray.2` (divider, dot inactive)
- `colors.primitive.palette.gray.1a` (pagination buttons, tab badge)
- `colors.primitive.palette.gray.2a` (tabMenu container, icon border)
- `colors.primitive.palette.{green|orange|blue|red|purple|gray}.2` (badge backgrounds)

### Text
- `colors.primitive.palette.gray.13`
- `colors.primitive.palette.gray.9a`
- `colors.primitive.palette.{green|orange|blue|red|purple}.11`

### Layout
- `spacing.scale.2`
- `spacing.scale.4`
- `spacing.scale.6`
- `spacing.scale.8`
- `spacing.scale.10`
- `spacing.scale.16`
- `spacing.scale.20`
- `spacing.scale.24`
- `spacing.scale.32`
- `spacing.scale.40`
- `spacing.scale.320`
- `radius.scale.full`
- `radius.scale.lg`
- `radius.scale.md`
- `radius.scale.sm`

### Typography
- `typography.scale.captionL.medium`
- `typography.scale.captionL.regular`
- `typography.scale.captionM.medium`
- `typography.scale.bodyS.regular`

## Behavior
- Default `width` 320px
- `tabMenu` controlled (`activeTabId`) / uncontrolled (`defaultActiveTabId`)
- `pagination` 의 `pageDots` (default 6) + `activeDotIndex` (default 0)
- `badgeContainer` items 색상은 `tone` prop 으로 지정
- 모든 텍스트 prop 은 `ReactNode`
