# Cell

`CellItem` 헤더 + 선택적 indented 자식 4개의 합성 단위. Figma `Sidebar Items > Cell` 컴포넌트 세트.

> 일반적인 표 셀(`TableCell`)과 무관한 **사이드바 행 그룹**.

## Variants
- `expandable`: `false` — 헤더 1개만
- `expandable`: `true` — 헤더 + 자식 4개 (controlled / uncontrolled 토글)

## Token Usage
- `spacing.scale.280`

(자식은 모두 `CellItem` 으로 위임 — 토큰은 [components/CellItem](../CellItem/CellItem.docs.md) 참고)

## Behavior
- `expanded` controlled prop 또는 `defaultExpanded` uncontrolled
- 헤더 클릭 시 확장 토글 + `onToggleExpanded` 호출
- 자식 행은 `target=indented`로 렌더, `showLine` 옵션으로 가이드 라인 표시 가능
