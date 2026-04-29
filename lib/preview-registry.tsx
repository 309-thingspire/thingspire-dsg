'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

const Loading = () => (
  <div style={{ color: 'hsl(var(--muted-foreground))', fontSize: 13 }}>Loading preview…</div>
)

const PREVIEWS: Record<string, ComponentType> = {
  accordion: dynamic(() => import('@/components/Accordion/Accordion.preview'), { loading: Loading }),
  badge: dynamic(() => import('@/components/Badge/Badge.preview'), { loading: Loading }),
  banner: dynamic(() => import('@/components/Banner/Banner.preview'), { loading: Loading }),
  breadcrumbs: dynamic(() => import('@/components/Breadcrumbs/Breadcrumbs.preview'), { loading: Loading }),
  button: dynamic(() => import('@/components/Button/Button.preview'), { loading: Loading }),
  'button-group': dynamic(() => import('@/components/ButtonGroup/ButtonGroup.preview'), { loading: Loading }),
  calendar: dynamic(() => import('@/components/Calendar/Calendar.preview'), { loading: Loading }),
  checkbox: dynamic(() => import('@/components/Checkbox/Checkbox.preview'), { loading: Loading }),
  'checkbox-label': dynamic(() => import('@/components/CheckboxLabel/CheckboxLabel.preview'), { loading: Loading }),
  dropdown: dynamic(() => import('@/components/Dropdown/Dropdown.preview'), { loading: Loading }),
  'feature-card': dynamic(() => import('@/components/FeatureCard/FeatureCard.preview'), { loading: Loading }),
  icons: dynamic(() => import('@/components/IconLibrary/IconLibrary.preview'), { loading: Loading }),
  input: dynamic(() => import('@/components/Input/Input.preview'), { loading: Loading }),
  'navigation-bar': dynamic(() => import('@/components/NavigationBar/NavigationBar.preview'), { loading: Loading }),
  pagination: dynamic(() => import('@/components/Pagenation/Pagenation.preview'), { loading: Loading }),
  'progress-bar': dynamic(() => import('@/components/ProgressBar/ProgressBar.preview'), { loading: Loading }),
  'progress-circle': dynamic(() => import('@/components/ProgressCircle/ProgressCircle.preview'), { loading: Loading }),
  'quantity-stepper': dynamic(() => import('@/components/QuantityStepper/QuantityStepper.preview'), { loading: Loading }),
  radio: dynamic(() => import('@/components/Radio/Radio.preview'), { loading: Loading }),
  'radio-label': dynamic(() => import('@/components/RadioLabel/RadioLabel.preview'), { loading: Loading }),
  'search-input': dynamic(() => import('@/components/SearchInput/SearchInput.preview'), { loading: Loading }),
  'select-input': dynamic(() => import('@/components/SelectInput/SelectInput.preview'), { loading: Loading }),
  'table-cell': dynamic(() => import('@/components/TableCell/TableCell.preview'), { loading: Loading }),
  'table-header': dynamic(() => import('@/components/TableHeader/TableHeader.preview'), { loading: Loading }),
  'tab-menu': dynamic(() => import('@/components/TabMenu/TabMenu.preview'), { loading: Loading }),
  'task-card': dynamic(() => import('@/components/TaskCard/TaskCard.preview'), { loading: Loading }),
  toggle: dynamic(() => import('@/components/Toggle/Toggle.preview'), { loading: Loading }),
  tooltip: dynamic(() => import('@/components/Tooltip/Tooltip.preview'), { loading: Loading }),
}

export function getPreviewComponent(slug: string): ComponentType | undefined {
  return PREVIEWS[slug]
}
