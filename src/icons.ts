// Icons subpath entry — re-exports the 2,278 tree-shakable icon components.
// Consumers: `import { IconArrowRight } from '@309-thingspire/dsg/icons'`.
//
// Tree shaking works because each icon is its own module under
// `components/icons/icon-*.tsx` and the barrel is a flat re-export.
export * from '../components/icons'
