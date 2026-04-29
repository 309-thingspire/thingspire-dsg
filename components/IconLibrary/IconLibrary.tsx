// IconLibrary — re-exports the generated icon set as the public surface.
// The 2,278 individual icon components live in `components/icons/`.
//
// Use one of the named exports directly for tree-shaking:
//   import { IconCheckLine, IconArrowRightLine } from '@/components/IconLibrary'
//   <IconCheckLine className="some-class" />
//
// Each icon renders an inline SVG with width/height = 1em and
// fill="currentColor" so it inherits the parent text color.
export type { IconProps } from '../icons/types'
export * from '../icons'
