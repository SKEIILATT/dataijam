import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-brand-cyan text-brand-navy hover:bg-brand-lime focus-visible:outline-brand-cyan',
  secondary:
    'border border-brand-cyan text-brand-white hover:bg-brand-cyan hover:text-brand-navy focus-visible:outline-brand-cyan',
  ghost: 'text-brand-white hover:text-brand-cyan focus-visible:outline-brand-cyan',
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        variants[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    />
  )
}
