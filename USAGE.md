# Thingspire UI — Usage Guide

Use the design library in your own project. The components ship as
copy-paste source (no runtime dependency on the library), pulled via
the `@thingspire/ui` CLI from the public registry at
[thingspire-dsg.vercel.app](https://thingspire-dsg.vercel.app).

---

## 1. What you get

- **38 React components** (atoms + molecules) — Button, Input,
  Checkbox, Dropdown, Calendar, Tooltip, Badge, Sidebar (+ atoms),
  Accordion, Pagination, ProgressBar/Circle, TableCell/Header,
  TabMenu, Toggle, FeatureCard, TaskCard, Banner, NavigationBar, …
- **2,278 icons** as tree-shakable React components
  (`@/components/icons` barrel)
- **Design tokens** (`styles/tokens.css`) — light/dark CSS variables
  matching Figma `carbonscope-Library v1.0`
- A small **CLI** (`npx @thingspire/ui …`) for fetching components
  on demand
- A **Registry API** (`/api/registry`) and a static JSON mirror
  (`/r/index.json`, `/r/<slug>.json`) for tooling

The components are framework-agnostic React: any **React 19** project
(Next.js, Vite, Remix, plain CRA-equivalent) works.

---

## 2. Prerequisites

| Requirement | Version |
| --- | --- |
| Node | ≥ 18 |
| React | ≥ 19 |
| TypeScript | optional but recommended |
| Tailwind | not required (the library ships pure CSS + inline styles) |

The CLI does not introduce a runtime dependency — it just copies
files. Once installed, you can edit them freely.

---

## 3. Quick start

```bash
# 1. From your project root, initialise a config file
npx @thingspire/ui@latest init

# 2. Add the components you want
npx @thingspire/ui@latest add button checkbox input

# 3. (Optional) install the full icon set
npx @thingspire/ui@latest add icons
```

After step 1 you'll have a `design-library.json` at the project root:

```json
{
  "registry": "https://thingspire-dsg.vercel.app/r",
  "componentsDir": "components",
  "tokensCss": "styles/tokens.css"
}
```

After step 2 each component lands at `components/<slug>/<slug>.tsx`
along with its types, preview, and docs files.

---

## 4. Wire up the design tokens

Components rely on a small set of CSS variables (background, border,
foreground, accent, …) defined in `styles/tokens.css`. The CLI copies
this file the first time you add any component. Import it once at the
top of your global stylesheet, app entry, or root layout:

```ts
// app/layout.tsx (Next.js App Router)
import '@/styles/tokens.css'
```

Or in a Vite / CRA app:

```ts
// src/main.tsx
import './styles/tokens.css'
```

The tokens file declares both light defaults and a `[data-theme="dark"]`
override (see §8 for theming).

---

## 5. Use a component

```tsx
import { Button } from '@/components/button/button'
import { IconArrowRightLine } from '@/components/icons'

export function Example() {
  return (
    <Button variant="primary" rightIcon={<IconArrowRightLine />}>
      Continue
    </Button>
  )
}
```

Common patterns:

```tsx
// Form field
import { Input } from '@/components/input/input'
<Input placeholder="Email" />

// Selection
import { Checkbox } from '@/components/checkbox/checkbox'
<Checkbox icon="check" type="default" size="md" />

// Feedback
import { Tooltip } from '@/components/tooltip/tooltip'
<Tooltip text="Saved" placement="topCenter" />

// Layout
import { Sidebar } from '@/components/sidebar/sidebar'
<Sidebar fill />
```

Every component ships with a `<Name>.docs.md` and a
`<Name>.preview.tsx` that demonstrates the full prop matrix — read
those for variant / size / state options.

---

## 6. Icon library

```tsx
import { IconCheckLine, IconArrowRightSLine, IconUserLine } from '@/components/icons'

<IconCheckLine />                                // 1em × 1em, currentColor
<IconCheckLine style={{ fontSize: 20 }} />        // size by font-size
<IconCheckLine width="24" height="24" />          // explicit pixels
<IconUserLine style={{ color: 'hsl(var(--accent))' }} />
```

Each icon is a standalone tree-shakable component — bundlers drop
the rest of the 2,278-icon set. Default rendering:

- `width="1em" height="1em"` so size follows the parent's font-size
- `fill="currentColor"` so colour follows the parent's `color`
- Spreads `{...props}` so you can pass `aria-label`, `className`,
  `style`, `onClick`, etc.

### Finding the right icon from a Figma design

When the design specifies an icon by name (Figma usually shows the
Remix Icon kebab-case slug like `arrow-right-line`), find the
matching component three ways:

```bash
# 1. CLI search
npx @thingspire/ui search arrow-right
#   IconArrowRightLine                  arrow-right-line
#   IconArrowRightFill                  arrow-right-fill
#   IconArrowRightCircleLine            arrow-right-circle-line
#   ...

# 2. Multiple terms narrow the result
npx @thingspire/ui search arrow s line   # chevron-shaped arrows

# 3. Live gallery (search + click to copy the component name)
open https://thingspire-dsg.vercel.app/components/icons
```

**Naming convention** — each filename in `assets/icons/` maps to a
PascalCase component prefixed with `Icon`:

| Figma / Remix slug | Component | Notes |
|---|---|---|
| `arrow-right-line` | `IconArrowRightLine` | full arrow |
| `arrow-right-s-line` | `IconArrowRightSLine` | chevron (the `-s-` is the chevron-shaped variant) |
| `arrow-down-fill` | `IconArrowDownFill` | filled instead of stroked |
| `check-line` | `IconCheckLine` | |
| `close-line` | `IconCloseLine` | also: `IconCloseCircleLine` |
| `user-3-line` | `IconUser3Line` | digits stay in place |
| `4k-fill` | `Icon4kFill` | leading digit OK because `Icon` prefix |

Common gotchas:

- **"chevron" doesn't exist as a name** — Remix calls them
  `arrow-*-s-line` (small/short arrow). `IconArrowDownSLine` is the
  down-chevron, etc.
- **`Hash` icon** is `IconHashtag` (single variant, no `-line`/`-fill`
  suffix).
- **Some icons only ship one variant** — search will show only what
  exists. If you need a `-fill` that doesn't exist, fall back to
  `-line` or pick a similar shape.

**Inline-SVG vs IconLibrary policy** — use IconLibrary for any
recognisable icon slot. Reserve inline SVG for shapes that are
component-specific structural decorations (a tooltip arrow tip, a
progress arc) and not reusable as standalone icons.

---

## 7. Component slots that take icons

```tsx
<Button leftIcon={<IconAddLine />}>Create</Button>
<Button rightIcon={<IconArrowRightLine />}>Next</Button>
<Button leftIcon={<IconSettingsLine />} type="iconOnly" aria-label="Settings" />

// Badge slot in Button (between children and right icon)
import { Badge } from '@/components/badge/badge'
<Button badge={<Badge color="red" size="xs">3</Badge>}>Inbox</Button>
```

---

## 8. Light / dark theme

Tokens.css already declares both palettes. Toggle the theme by
setting `data-theme` on `<html>`:

```html
<html data-theme="dark">
```

Quick toggle implementation:

```tsx
'use client'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const initial = stored === 'dark' || stored === 'light'
      ? stored
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(initial as 'light' | 'dark')
    document.documentElement.setAttribute('data-theme', initial)
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }
  return <button onClick={toggle}>{theme === 'dark' ? '☀️' : '🌙'}</button>
}
```

To prevent FOUC on first paint, run a tiny inline script in
`<head>` that reads localStorage / `prefers-color-scheme` and sets
the attribute before the body renders. (The showcase site does this
in `app/_components/theme-script.tsx` — copy that file if you want a
ready-made implementation.)

Your component-defined colors mostly use `currentColor` or theme
tokens already, so individual components will follow the theme without
extra wiring.

---

## 9. CLI reference

```bash
npx @thingspire/ui <command> [options]
```

| Command | What it does |
| --- | --- |
| `init` | Create `design-library.json` in the cwd |
| `add <slug…>` | Fetch component(s) from the registry into your project |
| `list` | Print every available slug + label, grouped by category |
| `search <query…>` | Find icons by name (Figma slug or `Icon*` form). Multiple terms narrow the result. |
| `help` | Show command help |

| Flag | Effect |
| --- | --- |
| `--registry <url>` | Override the registry URL for this invocation |
| `--overwrite` | Replace existing local files (default: skip on conflict) |

| Env var | Effect |
| --- | --- |
| `THINGSPIRE_UI_REGISTRY` | Override the registry URL globally |

Examples:

```bash
# Add several components at once
npx @thingspire/ui add button checkbox input dropdown

# Refresh after the source library updated
npx @thingspire/ui add button --overwrite

# Use a custom registry (e.g. preview deployment)
npx @thingspire/ui --registry https://thingspire-dsg-staging.vercel.app/r add button
```

---

## 10. Registry API

The registry is mirrored as static JSON for fast CDN delivery, and
the same shape is also served from a Next.js API route as a fallback:

| URL | Content |
| --- | --- |
| `/r/index.json` | Array of `{ slug, name, label, category, description }` |
| `/r/<slug>.json` | Full component bundle: `{ name, slug, files: [{ path, type, content }], dependencies, registryDependencies }` |
| `/api/registry` | Same as `/r/index.json` |
| `/api/registry/<slug>` | Same as `/r/<slug>.json` |

The icons entry (`/r/icons.json`) bundles the entire generated icon
library — IconLibrary metadata + every `components/icons/icon-*.tsx`
+ the barrel `index.ts` and `types.ts`. So `add icons` lands the
whole tree-shakable library in your project at once.

---

## 11. Updating components later

```bash
# Refresh the components you've already pulled
npx @thingspire/ui add button --overwrite
```

Because the components are plain source in your repo after
installation, you can also:

- Diff against the upstream version manually
  (`curl https://thingspire-dsg.vercel.app/r/button.json | jq …`)
- Lock to a specific deployment by setting
  `THINGSPIRE_UI_REGISTRY=https://thingspire-<hash>.vercel.app/r`
- Vendor the library into your own monorepo and skip the CLI

---

## 12. File layout after install

A typical project after `init` + `add` looks like:

```
your-project/
├── design-library.json
├── components/
│   ├── button/
│   │   ├── button.tsx
│   │   ├── button.types.ts
│   │   ├── button.preview.tsx
│   │   └── button.docs.md
│   ├── checkbox/
│   │   └── …
│   └── icons/                        # only if you ran `add icons`
│       ├── index.ts
│       ├── types.ts
│       └── icon-<kebab>.tsx × 2,278
└── styles/
    └── tokens.css
```

You can move folders around (e.g. into `src/components/`); just
update `componentsDir` / `tokensCss` in `design-library.json` to
match your new layout, and the CLI will install there next time.

---

## 13. Troubleshooting

**Icons render as black squares / no color**
The icon SVGs use `currentColor`. Make sure the parent element sets a
text `color`. Inside a `<Button>` slot the colour is already set;
elsewhere set it yourself.

**Components look right in light mode, broken in dark**
Confirm `tokens.css` is imported once at the app entry, and that
`data-theme="dark"` is set on `<html>` (not `<body>`).

**`npx @thingspire/ui add …` fails to fetch**
The registry URL might be down or your firewall blocks Vercel. Try a
direct curl:

```bash
curl -I https://thingspire-dsg.vercel.app/r/index.json
```

Or override with a self-hosted mirror via `--registry` /
`THINGSPIRE_UI_REGISTRY`.

**Type errors after add**
Components target React 19. If your project pins an older React, the
`SVGProps<SVGSVGElement>` type and the new JSX runtime may not
resolve. Upgrade to React 19, or relax `tsconfig.json` `lib` /
`types` to include the modern definitions.

---

## 14. Live reference

- Showcase: <https://thingspire-dsg.vercel.app>
- Per-component pages: <https://thingspire-dsg.vercel.app/components/button>, etc.
- Icon gallery: <https://thingspire-dsg.vercel.app/components/icons>
- GitHub: <https://github.com/309-thingspire/thingspire-dsg>

The component pages mirror the shadcn/ui docs format
(Installation → Usage → Examples → API Reference + On This Page),
and every component preview is interactive — flip variant, size,
state, lead/tail icons, badge — so you can try props before adding
the component to your project.
