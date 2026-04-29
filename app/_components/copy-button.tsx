'use client'

import { useState } from 'react'

type Props = {
  text: string
  className?: string
  label?: string
}

export default function CopyButton({ text, className, label = 'Copy' }: Props) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* noop */
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={className ?? 'code-block__copy'}
      aria-label="Copy to clipboard"
    >
      {copied ? '✓ Copied' : label}
    </button>
  )
}
