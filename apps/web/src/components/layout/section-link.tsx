import type { ComponentPropsWithoutRef } from 'react'
import { Link, useLocation } from 'react-router'

type SectionLinkProps = { href: `#${string}` } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>

/** A home-page section anchor that also works from other routes, without a full reload. */
export function SectionLink({ href, ...props }: SectionLinkProps) {
  const { pathname } = useLocation()
  if (pathname === '/') return <a href={href} {...props} />
  return <Link to={`/${href}`} {...props} />
}
