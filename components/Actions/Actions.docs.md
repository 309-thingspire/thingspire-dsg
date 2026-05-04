# Actions

Hero / 가입 영역의 CTA 액션 단위. Figma `Actions` 컴포넌트 세트.

## Variants
- `type`: `button` (primary + secondary 버튼) / `input` (이메일 입력 + 액션 버튼) / `tabs` (Monthly / Annual + Save 25% pill toggle)
- `device`: `desktop` (가로) / `mobile` (세로 full-width — tabs 는 항상 가로)
- 총 6 variants (3 × 2)

## Token Usage

### Background
- `colors.primitive.palette.base.white`
- `colors.primitive.palette.gray.1a`
- `colors.primitive.palette.gray.2`

### Border
- `colors.primitive.palette.gray.3`
- `colors.primitive.palette.purple.8` (input focus)
- `border.width.0` / `border.width.1`

### Text
- `colors.primitive.palette.gray.13` (active label)
- `colors.primitive.palette.gray.9a` (inactive tab label)
- `colors.primitive.palette.gray.7a` (input lead icon)

### Layout
- `spacing.scale.2`
- `spacing.scale.4`
- `spacing.scale.8`
- `spacing.scale.10`
- `spacing.scale.12`
- `spacing.scale.16`
- `spacing.scale.20`
- `spacing.scale.40`
- `spacing.scale.144`
- `spacing.scale.320`
- `spacing.scale.390`
- `radius.scale.lg`
- `radius.scale.md`
- `radius.scale.xl`

### Typography
- `typography.scale.captionL.medium`
- `typography.scale.captionL.regular`
- `typography.scale.bodyS.medium`

## Composition
- `Button` (primary / secondary, size=md, radius xl) 재사용
- Input 은 native `<input>` + `IconMailLine` + 자체 focus 상태
- Tabs 는 controlled / uncontrolled 모두 지원 (`activeTabId` / `defaultActiveTabId`)

## Behavior
- **button**: primary "Get started" + secondary "Try Blank free" (mobile = full-width 세로 stack)
- **input**: email field (focus 시 purple border + light focus ring) + primary action button. mobile 시 세로 stack, full-width
- **tabs**: 2-tab pill (default `monthly` / `annual` + `Save 25%` 배지). controlled `activeTabId` 또는 uncontrolled `defaultActiveTabId`
