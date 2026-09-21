import { createElement } from 'react'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

type ButtonOwnProps<T extends ElementType> = {
  as?: T
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost'
  fullWidth?: boolean
}

type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>

const variants: Record<NonNullable<ButtonOwnProps<ElementType>['variant']>, string> = {
  primary: 'ds-button--primary',
  accent: 'ds-button--primary',
  secondary: 'ds-button--secondary',
  ghost: 'ds-button--ghost',
}

export function Button<T extends ElementType = 'button'>(allProps: ButtonProps<T>) {
  // Cast to a concrete element's props so destructuring defaults type-check;
  // ButtonProps<T> on the signature still gives callers the real per-`as` shape.
  const {
    as,
    variant = 'primary',
    fullWidth = false,
    className = '',
    type,
    ...props
  } = allProps as ButtonProps<'button'>
  const Component = as ?? 'button'

  // `T` is generic here, so TS can't narrow ComponentProps<T> for a plain
  // object literal; the props are still correct at the call site thanks to
  // ButtonProps<T>.
  return createElement(Component, {
    type: Component === 'button' ? (type ?? 'button') : undefined,
    className: `ds-button ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`,
    ...props,
  } as Record<string, unknown>)
}
