# Top

사이드바 상단 영역 합성. Figma `Sidebar Items > Top` 컴포넌트.

`User` + `Additional(divider)` + `Additional(caption)` + `Additional(buttonStack)` + `Additional(label)` 의 수직 스택.

## Token Usage
- `spacing.scale.24`
- `spacing.primitive.256`

(자식은 [components/User](../User/User.docs.md), [components/Additional](../Additional/Additional.docs.md) 토큰 위임)

## Behavior
- 각 섹션은 boolean prop 으로 토글
- 너비 280px (`spacing.primitive.256 + spacing.scale.24`)
