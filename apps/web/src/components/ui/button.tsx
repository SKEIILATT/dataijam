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
  primary:
    'theme-primary-action bg-linear-to-r from-brand-lime to-brand-yellow text-brand-navy hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-lime/30 active:translate-y-0 focus-visible:outline-brand-lime',
  accent: 'bg-brand-cyan text-brand-navy hover:bg-brand-lime focus-visible:outline-brand-cyan',
  secondary:
    'border border-brand-white/45 text-brand-white hover:border-brand-cyan hover:bg-brand-cyan/10 focus-visible:outline-brand-cyan',
  ghost: 'text-brand-white hover:text-brand-cyan focus-visible:outline-brand-cyan',
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
    className: `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50 ${
      variants[variant]
    } ${fullWidth ? 'w-full' : ''} ${className}`,
    ...props,
  } as Record<string, unknown>)
}
