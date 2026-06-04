#!/usr/bin/env node
/**
 * generate-theme-modes.mjs
 *
 * Reads the Tokens Studio export (Primitives + Theme/Light + Theme/Dark),
 * fully resolves the alias chain to flat 8-digit hex values, converts the
 * kebab-case token names to the camelCase shape used by style-tokens.ts, and
 * injects two new branches into `colors.semantic.theme`:
 *
 *     colors.semantic.theme.light.{semantic,text,background,border,icon}
 *     colors.semantic.theme.dark .{semantic,text,background,border,icon}
 *
 * The existing `colors.semantic.theme.*` keys are left untouched so current
 * imports keep working. Re-running is idempotent: an existing light/dark pair
 * is replaced in place.
 *
 * Usage:
 *   node scripts/generate-theme-modes.mjs [tokensDir] [targetFile]
 *   node scripts/generate-theme-modes.mjs assets/token/tokens style-tokens.ts
 */
import fs from 'node:fs'
import path from 'node:path'

const TOKENS_DIR = process.argv[2] ?? 'assets/token/tokens'
const TARGET = process.argv[3] ?? 'style-tokens.ts'

const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'))
const prim = readJSON(path.join(TOKENS_DIR, 'Primitives/Value.json'))
const themeFiles = {
  light: readJSON(path.join(TOKENS_DIR, 'Theme/Light.json')),
  dark: readJSON(path.join(TOKENS_DIR, 'Theme/Dark.json')),
}

const isLeaf = (o) =>
  o && typeof o === 'object' && 'value' in o && 'type' in o && typeof o.value !== 'object'

// Flatten a token tree into { 'dotted.original.path': rawValue } using the
// original (kebab) names, matching the way alias references are written.
function flatten(node, prefix, out) {
  if (!node || typeof node !== 'object') return out
  if (isLeaf(node)) {
    out[prefix] = node.value
    return out
  }
  for (const [k, v] of Object.entries(node)) {
    flatten(v, prefix ? `${prefix}.${k}` : k, out)
  }
  return out
}

function makeResolver(raw) {
  const res = (key, depth = 0) => {
    if (depth > 40) throw new Error(`alias cycle at ${key}`)
    const v = raw[key]
    if (v === undefined) throw new Error(`missing alias target: ${key}`)
    if (typeof v === 'string' && v.startsWith('{') && v.endsWith('}')) {
      return res(v.slice(1, -1), depth + 1)
    }
    return v
  }
  return res
}

const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())
function normHex(hex) {
  let h = String(hex).toLowerCase()
  if (/^#[0-9a-f]{6}$/.test(h)) h += 'ff' // opaque colors → 8-digit, matching style-tokens.ts
  return h
}

// Build a resolved, camelCased nested object for one theme mode.
function buildMode(theme) {
  const raw = {}
  flatten(prim, '', raw) // colors.*, numbers.*
  flatten(theme, '', raw) // semantic.*, text.*, background.*, border.*, icon.*
  const res = makeResolver(raw)
  const out = {}
  const walk = (node, trail) => {
    if (isLeaf(node)) {
      let cur = out
      for (let i = 0; i < trail.length - 1; i++) {
        const key = camel(trail[i])
        cur[key] = cur[key] ?? {}
        cur = cur[key]
      }
      cur[camel(trail.at(-1))] = normHex(res(trail.join('.')))
      return
    }
    for (const [k, v] of Object.entries(node)) walk(v, [...trail, k])
  }
  walk(theme, [])
  // Keep a stable, style-tokens-friendly group order.
  const ORDER = ['semantic', 'text', 'background', 'border', 'icon']
  const ordered = {}
  for (const k of ORDER) if (k in out) ordered[k] = out[k]
  for (const k of Object.keys(out)) if (!(k in ordered)) ordered[k] = out[k]
  return ordered
}

// Serialize a plain object to a style-tokens.ts-style literal. Closing brace
// sits at `indent`; entries are indented at `indent + 2`.
function serialize(obj, indent) {
  const pad = ' '.repeat(indent)
  const padIn = ' '.repeat(indent + 2)
  const entries = Object.entries(obj)
  const lines = ['{']
  entries.forEach(([k, v], i) => {
    const comma = i < entries.length - 1 ? ',' : ''
    if (v && typeof v === 'object') {
      lines.push(`${padIn}"${k}": ${serialize(v, indent + 2)}${comma}`)
    } else {
      lines.push(`${padIn}"${k}": "${v}"${comma}`)
    }
  })
  lines.push(`${pad}}`)
  return lines.join('\n')
}

const modes = Object.fromEntries(
  Object.entries(themeFiles).map(([name, theme]) => [name, buildMode(theme)]),
)

// ── Inject into the target style-tokens.ts ──────────────────────────────────
const text = fs.readFileSync(TARGET, 'utf8')
const lines = text.split('\n')

// Locate `colors.semantic.theme` — the first `"theme": {` at 4-space indent.
const themeStart = lines.findIndex((l) => /^ {4}"theme": \{/.test(l))
if (themeStart === -1) throw new Error('could not find colors.semantic.theme in ' + TARGET)

// Brace-count to the matching close.
let depth = 0
let themeEnd = -1
for (let i = themeStart; i < lines.length; i++) {
  for (const ch of lines[i]) {
    if (ch === '{') depth++
    else if (ch === '}') depth--
  }
  if (depth === 0) {
    themeEnd = i
    break
  }
}
if (themeEnd === -1) throw new Error('unbalanced braces after theme')

// Drop any previously-injected light/dark blocks (idempotent re-run).
const cleaned = []
let skipDepth = null
for (let i = 0; i <= themeEnd; i++) {
  if (skipDepth === null && i > themeStart && i < themeEnd && /^ {6}"(light|dark)": \{/.test(lines[i])) {
    skipDepth = 0
    for (const ch of lines[i]) {
      if (ch === '{') skipDepth++
      else if (ch === '}') skipDepth--
    }
    if (skipDepth === 0) skipDepth = null // single-line (shouldn't happen)
    continue
  }
  if (skipDepth !== null) {
    for (const ch of lines[i]) {
      if (ch === '{') skipDepth++
      else if (ch === '}') skipDepth--
    }
    if (skipDepth === 0) skipDepth = null
    continue
  }
  cleaned.push(lines[i])
}

// `cleaned` now ends with the theme closing brace. The line before it is the
// last surviving property's close; ensure it carries a trailing comma.
const closeIdx = cleaned.length - 1
const lastContent = closeIdx - 1
if (!cleaned[lastContent].trimEnd().endsWith(',')) {
  cleaned[lastContent] = cleaned[lastContent].replace(/\s*$/, '') + ','
}

const block = [
  `      "light": ${serialize(modes.light, 6)},`,
  `      "dark": ${serialize(modes.dark, 6)}`,
]

const out = [...cleaned.slice(0, closeIdx), ...block, cleaned[closeIdx], ...lines.slice(themeEnd + 1)]
fs.writeFileSync(TARGET, out.join('\n'))

const count = (o) => Object.values(o).reduce((n, v) => n + (v && typeof v === 'object' ? count(v) : 1), 0)
console.log(
  `Injected theme.light (${count(modes.light)} tokens) and theme.dark (${count(modes.dark)} tokens) into ${TARGET}`,
)
