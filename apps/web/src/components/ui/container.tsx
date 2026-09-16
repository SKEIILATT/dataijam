import type { ComponentPropsWithoutRef, ElementType } from 'react'

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentPropsWithoutRef<T>

export function Container<T extends ElementType = 'div'>({
  as,
  className = '',
  ...props
}: ContainerProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component
      className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}
      {...props}
    />
  )
}
