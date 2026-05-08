import { defineConfig } from 'tsup'

/* Library build for `@309-thingspire/dsg`.
 *
 * Three entry points map to the package's exports:
 *   .         → dist/index.{js,d.ts}    (component barrel, 44 components)
 *   ./icons   → dist/icons.{js,d.ts}    (2,278 icon components)
 *   ./tokens  → dist/tokens.{js,d.ts}   (raw design tokens)
 *
 * ESM-only — Next 16, Vite 5+, modern React-DOM toolchains all consume ESM.
 * If a CJS consumer ever needs the package, switch to format: ['esm','cjs'].
 *
 * `banner: { js: '"use client"' }` makes the bundle compatible with the
 * Next.js App Router's React Server Components: every component is treated
 * as a client component (none of these have server-only logic).
 *
 * sideEffects: false at the package.json level + tree-shaking here means
 * importing `IconArrowRight` ships only that single icon's bytes.
 */
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    icons: 'src/icons.ts',
    tokens: 'src/tokens.ts',
  },
  format: ['esm'],
  dts: { resolve: false },
  tsconfig: 'tsconfig.build.json',
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  splitting: true,
  banner: { js: '"use client";' },
})
