# TextContainer

Headline / description / caption 의 3-단 텍스트 블록. Figma `Text Container` 컴포넌트 세트.

## Variants
- `size`: `lg` / `md` / `sm` / `xs` / `xxs` / `xxxs` / `xxxxs` (7개 — headline 타이포 크기에 따라)
- `align`: `left` / `center`
- 총 14 variants

## Token Usage

### Text
- `colors.primitive.palette.gray.13` (headline)
- `colors.primitive.palette.gray.9a` (description)
- `colors.primitive.palette.gray.7a` (caption)
- `colors.primitive.palette.base.white`

### Layout
- `spacing.scale.4`
- `spacing.scale.8`
- `spacing.scale.400`

### Typography
- `typography.scale.h5.semiBold` (headline lg)
- `typography.scale.h6.semiBold` (headline md)
- `typography.scale.bodyL.medium` (headline sm)
- `typography.scale.bodyM.medium` (headline xs)
- `typography.scale.bodyS.medium` (headline xxs)
- `typography.scale.captionL.medium` (headline xxxs, caption lg/sm/xs)
- `typography.scale.captionM.medium` (headline xxxxs, caption md/xxs/xxxs)
- `typography.scale.captionS.medium` (caption xxxxs)
- `typography.scale.bodyS.regular` (description lg/md/sm)
- `typography.scale.captionL.regular` (description xs/xxs/xxxs)
- `typography.scale.captionM.regular` (description xxxxs)

## Headline / Description / Caption typography per size

| size | headline | description | caption | gap |
|---|---|---|---|---|
| lg | H5/SemiBold (30) | BodyS/Regular (16) | CaptionL/Medium (14) | 8 |
| md | H6/SemiBold (24) | BodyS/Regular (16) | CaptionM/Medium (12) | 8 |
| sm | BodyL/Medium (20) | BodyS/Regular (16) | CaptionL/Medium (14) | 4 |
| xs | BodyM/Medium (18) | CaptionL/Regular (14) | CaptionL/Medium (14) | 4 |
| xxs | BodyS/Medium (16) | CaptionL/Regular (14) | CaptionM/Medium (12) | 4 |
| xxxs | CaptionL/Medium (14) | CaptionL/Regular (14) | CaptionM/Medium (12) | 4 |
| xxxxs | CaptionM/Medium (12) | CaptionM/Regular (12) | CaptionS/Medium (10) | 4 |

## Behavior
- `showDescription` / `showCaption` boolean 으로 각 줄 토글
- `align='center'` 시 `text-align: center` + flex `align-items: center`
- 기본 너비 400px (`width` prop 으로 변경 가능)
- 모든 텍스트 노드는 `ReactNode` 라 인라인 마크업/링크 등 자유 삽입 가능
