# Icon Library

2,278 icons generated from `assets/icons/` (Remix Icon set, `-line` and
`-fill` variants).

## Usage

```tsx
import { IconCheckLine, IconArrowRightLine } from '@/components/IconLibrary'

<IconCheckLine />
<Button leftIcon={<IconArrowRightLine />}>Next</Button>
```

Each icon is a tree-shakable React component. Import only the names you
need; bundlers drop the rest.

## Sizing

Icons render at `1em × 1em`, so they inherit the parent's `font-size`. To
size explicitly:

```tsx
<IconCheckLine style={{ fontSize: 20 }} />
<IconCheckLine width="24" height="24" />
```

## Color

Icons use `fill="currentColor"`, so they pick up the parent text color
automatically — light/dark themes work without any extra wiring. To
override:

```tsx
<IconCheckLine style={{ color: 'hsl(var(--accent))' }} />
```

## Accessibility

Decorative icons (most cases) — pass `aria-hidden`:

```tsx
<IconArrowRightLine aria-hidden />
```

Meaningful icons — provide a label:

```tsx
<IconAlertLine role="img" aria-label="Warning" />
```

## Generator

The 2,278 components are produced by
`scripts/generate-icon-components.mjs` from the SVG source files. To
re-run after updating `assets/icons/`:

```bash
node scripts/generate-icon-components.mjs
```

The script:
- swaps the hardcoded `#14151A` fill to `currentColor`
- normalises kebab-case SVG attributes to JSX (`fill-rule` →
  `fillRule`, etc.)
- rewrites the root `<svg>` to `width="1em" height="1em"` and spreads
  `{...props}`
- writes the alphabetised barrel `index.ts`
