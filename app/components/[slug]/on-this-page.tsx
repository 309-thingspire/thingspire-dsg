'use client'

import { useEffect, useState } from 'react'

type Item = { id: string; label: string }

export default function OnThisPage({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-10% 0px -65% 0px' },
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
  }

  return (
    <nav className="on-this-page" aria-label="On this page">
      <h4 className="on-this-page__title">On This Page</h4>
      <ul className="on-this-page__list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => onClick(e, item.id)}
              className={`on-this-page__link${active === item.id ? ' is-active' : ''}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
