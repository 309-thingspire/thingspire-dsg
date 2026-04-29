# User

사이드바 사용자 행 (avatar + name + handle + tail icons). Figma `Sidebar Items > User` 컴포넌트.

> 일반적인 도메인 모델 "User" 와는 무관한 **사이드바 전용 atom**.

## Token Usage

### Background
- `colors.primitive.palette.base.transparent`
- `colors.primitive.palette.gray.1a`
- `colors.primitive.palette.purple.2`

### Text
- `colors.primitive.palette.gray.13`
- `colors.primitive.palette.gray.9a`
- `colors.primitive.palette.purple.11`

### Layout
- `spacing.scale.2`
- `spacing.scale.4`
- `spacing.scale.6`
- `spacing.scale.8`
- `spacing.scale.16`
- `spacing.scale.32`
- `spacing.scale.280`
- `radius.scale.lg`
- `radius.scale.xs`
- `radius.scale.full`

### Typography
- `typography.scale.captionL.medium`
- `typography.scale.captionM.medium`
- `typography.scale.captionM.regular`

## Behavior
- `avatarSrc` 미제공 시 fallback 원형 (`purple.2` 배경 + `user-line` 아이콘)
- hover 시 wrap 영역에 `gray.1a` 배경
- `tailIcons` 배열로 우측 아이콘 커스터마이즈 가능 (default: `bell-line`, `more-line`)
