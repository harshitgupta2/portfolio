import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiGit,
  SiGithub,
  SiPostgresql,
  SiExpress,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiDocker,
  SiMysql,
  SiSocketdotio,
  SiGooglegemini,
} from 'react-icons/si'
import { Braces } from 'lucide-react'
import { brandColor } from '../utils/brandColors'

const icons = {
  html: SiHtml5,
  css: SiCss,
  tailwind: SiTailwindcss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  node: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  sql: SiMysql,
  postgres: SiPostgresql,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
  socket: SiSocketdotio,
  gemini: SiGooglegemini,
  api: Braces,
}

/**
 * `colored` paints the mark in its official brand colour. Turn it off for
 * places where a row of full-saturation logos would compete with the copy.
 */
export default function TechIcon({ name, className = '', size = 26, colored = true }) {
  const Icon = icons[name] ?? Braces
  return (
    <Icon
      className={className}
      size={size}
      color={colored ? brandColor(name) : undefined}
      aria-hidden="true"
      focusable="false"
    />
  )
}
