'use client'

import { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'

const Loading = () => (
  <div style={{ color: 'hsl(var(--muted-foreground))', fontSize: 13 }}>Loading preview…</div>
)

// Server-rendered, code-split preview. Not next/dynamic: with the React bundled in
// Next 16.1, its lazy wrapper makes every useId inside a preview differ between
// server and client (facebook/react#35518, fixed in Next 16.2). A lazy component
// that is the only child of Suspense is not affected.
function lazyPreview(load: () => Promise<{ default: ComponentType }>): ComponentType {
  const LazyPreview = lazy(load)
  function Preview() {
    return (
      <Suspense fallback={<Loading />}>
        <LazyPreview />
      </Suspense>
    )
  }
  return Preview
}

const PREVIEWS: Record<string, ComponentType> = {
  accordion: lazyPreview(() => import('@/components/Accordion/Accordion.preview')),
  actions: lazyPreview(() => import('@/components/Actions/Actions.preview')),
  additional: lazyPreview(() => import('@/components/Additional/Additional.preview')),
  'additional-content': lazyPreview(() => import('@/components/AdditionalContent/AdditionalContent.preview')),
  'additional-meta': lazyPreview(() => import('@/components/AdditionalMeta/AdditionalMeta.preview')),
  badge: lazyPreview(() => import('@/components/Badge/Badge.preview')),
  banner: lazyPreview(() => import('@/components/Banner/Banner.preview')),
  bottom: lazyPreview(() => import('@/components/Bottom/Bottom.preview')),
  breadcrumbs: lazyPreview(() => import('@/components/Breadcrumbs/Breadcrumbs.preview')),
  button: lazyPreview(() => import('@/components/Button/Button.preview')),
  'button-group': lazyPreview(() => import('@/components/ButtonGroup/ButtonGroup.preview')),
  calendar: lazyPreview(() => import('@/components/Calendar/Calendar.preview')),
  cell: lazyPreview(() => import('@/components/Cell/Cell.preview')),
  'cell-item': lazyPreview(() => import('@/components/CellItem/CellItem.preview')),
  checkbox: lazyPreview(() => import('@/components/Checkbox/Checkbox.preview')),
  'checkbox-label': lazyPreview(() => import('@/components/CheckboxLabel/CheckboxLabel.preview')),
  dropdown: lazyPreview(() => import('@/components/Dropdown/Dropdown.preview')),
  'feature-card': lazyPreview(() => import('@/components/FeatureCard/FeatureCard.preview')),
  icons: lazyPreview(() => import('@/components/IconLibrary/IconLibrary.preview')),
  'info-card': lazyPreview(() => import('@/components/InfoCard/InfoCard.preview')),
  input: lazyPreview(() => import('@/components/Input/Input.preview')),
  middle: lazyPreview(() => import('@/components/Middle/Middle.preview')),
  modal: lazyPreview(() => import('@/components/Modal/Modal.preview')),
  'navigation-bar': lazyPreview(() => import('@/components/NavigationBar/NavigationBar.preview')),
  'page-header': lazyPreview(() => import('@/components/PageHeader/PageHeader.preview')),
  pagination: lazyPreview(() => import('@/components/Pagination/Pagination.preview')),
  'progress-bar': lazyPreview(() => import('@/components/ProgressBar/ProgressBar.preview')),
  'progress-circle': lazyPreview(() => import('@/components/ProgressCircle/ProgressCircle.preview')),
  'quantity-stepper': lazyPreview(() => import('@/components/QuantityStepper/QuantityStepper.preview')),
  radio: lazyPreview(() => import('@/components/Radio/Radio.preview')),
  'radio-label': lazyPreview(() => import('@/components/RadioLabel/RadioLabel.preview')),
  'search-input': lazyPreview(() => import('@/components/SearchInput/SearchInput.preview')),
  'select-input': lazyPreview(() => import('@/components/SelectInput/SelectInput.preview')),
  sidebar: lazyPreview(() => import('@/components/Sidebar/Sidebar.preview')),
  'table-cell': lazyPreview(() => import('@/components/TableCell/TableCell.preview')),
  'table-header': lazyPreview(() => import('@/components/TableHeader/TableHeader.preview')),
  'tab-menu': lazyPreview(() => import('@/components/TabMenu/TabMenu.preview')),
  'tail-icon': lazyPreview(() => import('@/components/TailIcon/TailIcon.preview')),
  'task-card': lazyPreview(() => import('@/components/TaskCard/TaskCard.preview')),
  'text-blocks': lazyPreview(() => import('@/components/TextBlocks/TextBlocks.preview')),
  'text-container': lazyPreview(() => import('@/components/TextContainer/TextContainer.preview')),
  'text-rows': lazyPreview(() => import('@/components/TextRows/TextRows.preview')),
  toggle: lazyPreview(() => import('@/components/Toggle/Toggle.preview')),
  tooltip: lazyPreview(() => import('@/components/Tooltip/Tooltip.preview')),
  top: lazyPreview(() => import('@/components/Top/Top.preview')),
  user: lazyPreview(() => import('@/components/User/User.preview')),
}

export function getPreviewComponent(slug: string): ComponentType | undefined {
  return PREVIEWS[slug]
}
