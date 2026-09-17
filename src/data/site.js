/**
 * Single source of truth for everything personal.
 *
 * Values left as ALL_CAPS tokens are placeholders. Nothing is invented for you:
 * any link still holding a token renders as an inert, visibly-unavailable chip
 * instead of a broken href. Fill these in and the UI wires itself up.
 */
export const site = {
  name: 'Harshit Gupta',
  role: 'Software Developer',
  secondaryRole: 'Full Stack Engineer',
  location: 'India',
  available: true,
  availabilityLabel: 'Available for opportunities',

  email: 'harshitgupta4426@gmail.com',
  linkedin: 'https://www.linkedin.com/in/harshitgupta26/',
  github: 'https://github.com/harshitgupta2',

  // Served from /public. Drop your resume.pdf there.
  resume: 'https://drive.google.com/file/d/18XKppYX_IIGyEgQ0brhQ8ry_PMSnufkx/view?usp=sharing',

  headline: 'Building digital experiences that solve real problems.',
  intro:
    'I build scalable, responsive web applications with modern frontend and backend tools — React on the front, Node and Express behind it, and a database that fits the problem.',
}

/** A value is a placeholder while it still looks like an ALL_CAPS token. */
export const isPlaceholder = (value) =>
  typeof value !== 'string' || /^[A-Z0-9_]+$/.test(value.trim()) || value.trim() === ''

/** Returns a usable href, or null when the value has not been filled in yet. */
export const toHref = (value, { mailto = false } = {}) => {
  if (isPlaceholder(value)) return null
  return mailto ? `mailto:${value}` : value
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
