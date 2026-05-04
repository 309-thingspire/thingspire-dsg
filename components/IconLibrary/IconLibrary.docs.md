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

## When to use IconLibrary vs. inline SVG

**Use IconLibrary** for any general-purpose icon slot:

- `<Button leftIcon={<IconArrowRightLine />}>` — call-to-action chevrons
- list bullets, badge prefixes, status indicators in cards
- anything a designer would call "an icon" in the abstract

**Inline SVG inside a component remains acceptable** for shapes that are
*structurally part of the component itself*:

- Tooltip arrow tip (geometry depends on width/height props)
- ProgressCircle progress arc (computed from value)
- TableHeader sort caret (designed against a custom 20×20 viewBox)
- Breadcrumbs separator (Figma-exported precise proportions)

These shapes aren't reusable icons — they exist only to render that
component's anatomy. Pulling them out to IconLibrary would force a
visual regression.

When you author a *new* component, prefer IconLibrary for any
recognisable icon ("plus", "check", "arrow", "user", etc.). Reserve
inline SVG for shapes you would not name.

## Installation via CLI

```bash
npx @309-thingspire/ui add icons
```

Pulls the full bundle (`IconLibrary.tsx`, `IconLibrary.types.ts`,
`IconLibrary.docs.md`, plus `components/icons/*.tsx` and the barrel
`index.ts` / `types.ts`). Importing only the names you use lets your
bundler tree-shake the rest.

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
