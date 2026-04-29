import CopyButton from './copy-button'

type Props = {
  code: string
  language?: string
  copyable?: boolean
}

export default function CodeBlock({ code, language: _language, copyable = true }: Props) {
  return (
    <div className="code-block">
      <pre><code>{code}</code></pre>
      {copyable && <CopyButton text={code} />}
    </div>
  )
}
