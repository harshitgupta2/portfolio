/** Tiny className joiner — avoids pulling in clsx for six characters of logic. */
export const cn = (...parts) => parts.filter(Boolean).join(' ')
