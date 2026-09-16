type SectionTitleProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionTitleProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-brand-cyan">{eyebrow}</p>
      ) : null}

      <h2 className="text-3xl font-bold tracking-tight text-brand-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 text-base leading-7 text-brand-gray sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
