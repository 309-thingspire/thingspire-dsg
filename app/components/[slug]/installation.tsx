import CodeBlock from '@/app/_components/code-block'

export default function Installation({ slug }: { slug: string }) {
  const cmd = `npx @thingspire/ui@latest add ${slug}`
  return <CodeBlock code={cmd} language="bash" />
}
