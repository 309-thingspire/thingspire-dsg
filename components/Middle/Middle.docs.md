# Middle

사이드바 중간 영역 합성. Figma `Sidebar Items > Middle` 컴포넌트.

각 block = `Additional(caption)` 헤더 + `CellItem` 다수. 데이터 주도 (`blocks` 배열).

## Token Usage
- `spacing.scale.16`
- `spacing.scale.24`
- `spacing.primitive.256`

## Behavior
- `blocks` 미제공 시 기본 1개 block ('Teamspaces' + 5 items)
- `onItemClick(blockId, itemId)` 콜백으로 행 클릭 처리
