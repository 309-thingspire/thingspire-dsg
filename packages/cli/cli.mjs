#!/usr/bin/env node
/* @thingspire/ui — Design Library CLI
 *
 * Commands:
 *   npx @thingspire/ui init               Initialise design-library.json in cwd
 *   npx @thingspire/ui add <slug...>      Add component(s) from the registry
 *   npx @thingspire/ui list               List available components
 *
 * Configuration is read from ./design-library.json:
 *   {
 *     "registry": "https://thingspire-dsg.vercel.app/r",
 *     "componentsDir": "components",
 *     "tokensCss": "styles/tokens.css"
 *   }
 *
 * Override registry per-invocation with --registry <url> or
 * THINGSPIRE_UI_REGISTRY env var.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'

const DEFAULT_REGISTRY = 'https://thingspire-dsg.vercel.app/r'
const CONFIG_FILE = 'design-library.json'

function parseArgs(argv) {
  const args = { positional: [], flags: {} }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        args.flags[key] = true
      } else {
        args.flags[key] = next
        i++
      }
    } else {
      args.positional.push(a)
    }
  }
  return args
}

async function loadConfig(cwd) {
  const cfgPath = path.join(cwd, CONFIG_FILE)
  try {
    const raw = await fs.readFile(cfgPath, 'utf-8')
    return { ...JSON.parse(raw), __path: cfgPath }
  } catch {
    return null
  }
}

async function writeConfig(cwd, config) {
  const cfgPath = path.join(cwd, CONFIG_FILE)
  await fs.writeFile(cfgPath, JSON.stringify(config, null, 2) + '\n', 'utf-8')
  return cfgPath
}

function getRegistry(flags, cfg) {
  return (
    flags.registry ||
    process.env.THINGSPIRE_UI_REGISTRY ||
    cfg?.registry ||
    DEFAULT_REGISTRY
  )
}

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${url}`)
  }
  return res.json()
}

async function fileExists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true })
}

async function cmdInit(cwd, _flags) {
  const existing = await loadConfig(cwd)
  if (existing) {
    console.log(`ℹ︎ ${CONFIG_FILE} already exists at ${existing.__path}`)
    return
  }
  const config = {
    registry: DEFAULT_REGISTRY,
    componentsDir: 'components',
    tokensCss: 'styles/tokens.css',
  }
  const cfgPath = await writeConfig(cwd, config)
  console.log(`✓ Created ${path.relative(cwd, cfgPath)}`)
  console.log()
  console.log('Next steps:')
  console.log('  1. (optional) edit registry URL or componentsDir.')
  console.log('  2. Run: npx @thingspire/ui add button')
}

async function cmdList(cwd, flags) {
  const cfg = await loadConfig(cwd)
  const registry = getRegistry(flags, cfg)
  const data = await fetchJson(`${registry}/index.json`).catch(async () => {
    return fetchJson(`${registry.replace(/\/r\/?$/, '')}/api/registry`)
  })
  const items = data.items ?? []
  console.log(`Registry: ${registry}`)
  console.log(`Components: ${items.length}\n`)
  const byCategory = {}
  for (const it of items) {
    ;(byCategory[it.category] ??= []).push(it)
  }
  for (const cat of Object.keys(byCategory)) {
    console.log(`▸ ${cat}`)
    for (const it of byCategory[cat]) {
      console.log(`    ${it.slug.padEnd(20)} ${it.label}`)
    }
  }
}

async function cmdAdd(cwd, flags, slugs) {
  if (slugs.length === 0) {
    console.error('❌ Specify at least one component slug.')
    console.error('   Usage: npx @thingspire/ui add <slug...>')
    process.exit(1)
  }
  const cfg = (await loadConfig(cwd)) ?? {
    registry: DEFAULT_REGISTRY,
    componentsDir: 'components',
    tokensCss: 'styles/tokens.css',
  }
  const registry = getRegistry(flags, cfg)
  const componentsDir = cfg.componentsDir ?? 'components'
  const overwrite = Boolean(flags.overwrite)

  for (const slug of slugs) {
    console.log(`\n▸ Fetching ${slug} from ${registry}`)
    let item
    try {
      item = await fetchJson(`${registry}/${slug}.json`)
    } catch (err) {
      try {
        const apiBase = registry.replace(/\/r\/?$/, '')
        item = await fetchJson(`${apiBase}/api/registry/${slug}`)
      } catch {
        console.error(`  ❌ Could not fetch ${slug}: ${err.message}`)
        continue
      }
    }

    let written = 0
    let skipped = 0
    for (const file of item.files ?? []) {
      const dest = path.join(cwd, file.path)
      await ensureDir(path.dirname(dest))
      if (!overwrite && (await fileExists(dest))) {
        console.log(`    skip (exists): ${path.relative(cwd, dest)}`)
        skipped++
        continue
      }
      await fs.writeFile(dest, file.content, 'utf-8')
      console.log(`    write: ${path.relative(cwd, dest)}`)
      written++
    }
    console.log(`  ✓ ${item.name}: ${written} written${skipped ? `, ${skipped} skipped` : ''}`)
  }

  console.log('\nDone.')
  if (slugs.length > 0) {
    console.log('Tip: pass --overwrite to replace existing files.')
  }
}

async function cmdSearch(cwd, flags, terms) {
  if (terms.length === 0) {
    console.error('❌ Provide a query, e.g. `npx @thingspire/ui search arrow`')
    process.exit(1)
  }
  const cfg = await loadConfig(cwd)
  const registry = getRegistry(flags, cfg)
  let data
  try {
    data = await fetchJson(`${registry}/icons-names.json`)
  } catch (err) {
    console.error(`❌ Could not fetch icon index: ${err.message}`)
    process.exit(1)
  }
  const items = Array.isArray(data.items) ? data.items : []
  const queries = terms.map((t) => t.toLowerCase())
  const matches = items.filter((item) => {
    const slugLower = item.slug.toLowerCase()
    const nameLower = item.componentName.toLowerCase()
    return queries.every((q) => slugLower.includes(q) || nameLower.includes(q))
  })
  if (matches.length === 0) {
    console.log(`No icons matched "${terms.join(' ')}".`)
    console.log('Browse the gallery at https://thingspire-dsg.vercel.app/components/icons')
    return
  }
  const limit = Number(flags.limit) || 50
  const shown = matches.slice(0, limit)
  console.log(
    `Found ${matches.length} icon${matches.length === 1 ? '' : 's'} matching "${terms.join(' ')}"${
      matches.length > limit ? ` (showing first ${limit})` : ''
    }:\n`,
  )
  for (const item of shown) {
    console.log(`  ${item.componentName.padEnd(36)} ${item.slug}`)
  }
  console.log(`\nImport: import { ${shown[0].componentName} } from '@/components/icons'`)
}

function printHelp() {
  console.log(`@thingspire/ui — Design Library CLI

Usage:
  npx @thingspire/ui <command> [options]

Commands:
  init                       Create design-library.json in the current directory
  add <slug...>              Copy component files from the registry into your project
  list                       List components available in the registry
  search <query…>            Find icons by name (matches both Figma kebab-case and Icon* component name)
  help                       Show this message

Options:
  --registry <url>           Override registry URL (default: ${DEFAULT_REGISTRY})
  --overwrite                When adding components, overwrite existing local files
  --limit <n>                Max results for \`search\` (default 50)

Environment:
  THINGSPIRE_UI_REGISTRY     Override registry URL globally

Examples:
  npx @thingspire/ui search arrow-right
  npx @thingspire/ui search chevron        # nothing — Remix uses arrow-*-s
  npx @thingspire/ui search arrow s line   # narrows to chevron-shaped arrows
`)
}

async function main() {
  const argv = process.argv.slice(2)
  const cwd = process.cwd()

  if (argv.length === 0 || argv[0] === 'help' || argv[0] === '--help' || argv[0] === '-h') {
    printHelp()
    return
  }

  const command = argv[0]
  const { positional, flags } = parseArgs(argv.slice(1))

  switch (command) {
    case 'init':
      return cmdInit(cwd, flags)
    case 'list':
    case 'ls':
      return cmdList(cwd, flags)
    case 'add':
      return cmdAdd(cwd, flags, positional)
    case 'search':
    case 'find':
      return cmdSearch(cwd, flags, positional)
    default:
      console.error(`Unknown command: ${command}`)
      printHelp()
      process.exit(1)
  }
}

main().catch((err) => {
  console.error('❌', err.message ?? err)
  process.exit(1)
})
