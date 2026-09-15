import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'
import { cn } from '../utils/cn'

const arrows = {
  right: <ArrowRight size={17} strokeWidth={1.8} className="arrow" aria-hidden="true" />,
  diagonal: (
    <ArrowUpRight size={17} strokeWidth={1.8} className="arrow arrow-diag" aria-hidden="true" />
  ),
}

/**
 * One button for the whole site.
 *
 * `href` may legitimately be null — that happens while a placeholder in
 * src/data/site.js has not been filled in. Rather than shipping a dead link,
 * the button renders inert and explains itself on hover.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'solid',
  arrow = 'right',
  external = false,
  download = false,
  unavailableLabel = 'Link not set yet',
  className = '',
  ...rest
}) {
  const ref = useMagnetic()
  const classes = cn('btn', variant === 'solid' ? 'btn-solid' : 'btn-ghost', className)
  const content = (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow ? arrows[arrow] : null}
    </>
  )

  if (href === null) {
    return (
      <span className={classes} aria-disabled="true" title={unavailableLabel} role="link">
        {content}
      </span>
    )
  }

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: '' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button ref={ref} type="button" onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  )
}
