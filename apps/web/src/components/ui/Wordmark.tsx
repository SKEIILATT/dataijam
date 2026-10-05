import wordmark from '@/assets/brand/wordmark.webp'
import wordmarkAccent from '@/assets/brand/wordmark-accent.webp'

type WordmarkProps = {
  className?: string
  imageClassName?: string
}

/** In light mode the letters turn navy; an overlay of only the colored "AI" pixels keeps them in color. */
export function Wordmark({ className = '', imageClassName = '' }: WordmarkProps) {
  return (
    <span className={`brand-wordmark ${className}`}>
      <img src={wordmark} alt="DatAIJam" className={`brand-wordmark__base ${imageClassName}`} />
      <img
        src={wordmarkAccent}
        alt=""
        aria-hidden="true"
        className={`brand-wordmark__accent ${imageClassName}`}
      />
    </span>
  )
}
