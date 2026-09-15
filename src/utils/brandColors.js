/**
 * Official brand colours, keyed to the icon names used in src/data/skills.js.
 *
 * A few marks are monochrome by definition (Express, GitHub, Socket.IO). Those
 * map to the foreground colour so they read as intentional rather than missing.
 */
export const brandColors = {
  html: '#E34F26',
  css: '#663399',
  tailwind: '#38BDF8',
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  react: '#61DAFB',
  node: '#5FA04E',
  express: '#F2F1ED',
  mongodb: '#47A248',
  sql: '#4479A1',
  postgres: '#4169E1',
  git: '#F05032',
  github: '#F2F1ED',
  docker: '#2496ED',
  socket: '#F2F1ED',
  gemini: '#8E7CFF',
  api: '#5B76FF',
}

export const brandColor = (name) => brandColors[name] ?? '#5B76FF'

/** Same hue at low alpha — for tinted hover backgrounds and rings. */
export const brandTint = (name, alpha = 0.14) => {
  const hex = brandColor(name).replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
