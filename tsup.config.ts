import { readFile, writeFile } from 'node:fs/promises'
import { defineConfig } from 'tsup'

/* Library build for `@309-thingspire/dsg`.
 *
 * Three entry points map to the package's exports:
 *   .         → dist/index.{js,d.ts}    (component barrel, 45 components)
 *   ./icons   → dist/icons.{js,d.ts}    (2,278 icon components)
 *   ./tokens  → dist/tokens.{js,d.ts}   (raw design tokens)
 *
 * ESM-only — Next 16, Vite 5+, modern React-DOM toolchains all consume ESM.
 * If a CJS consumer ever needs the package, switch to format: ['esm','cjs'].
 *
 * "use client" goes on dist/index.js only, so the Next.js App Router treats
 * the components as client components and Server Components can render them.
 * The icons, the tokens and the shared chunks have no hooks and stay server
 * modules, so Server Components can still read the tokens. It is added after
 * the build: `banner` can't do it, because the rollup pass behind
 * `treeshake: true` drops module-level directives.
 *
 * sideEffects: false at the package.json level + tree-shaking here means
 * importing `IconArrowRight` ships only that single icon's bytes.
 */
const USE_CLIENT = '"use client";'

// Prepends the directive to the component entry. The new first line moves
// every mapping down one line, so the source map gets a leading ";".
async function markComponentEntryAsClient() {
  const file = 'dist/index.js'
  const code = await readFile(file, 'utf8')
  if (code.startsWith(USE_CLIENT)) return
  await writeFile(file, `${USE_CLIENT}\n${code}`)
  const map = JSON.parse(await readFile(`${file}.map`, 'utf8'))
  map.mappings = `;${map.mappings}`
  await writeFile(`${file}.map`, JSON.stringify(map))
}

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
  onSuccess: markComponentEntryAsClient,
})
