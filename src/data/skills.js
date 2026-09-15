/**
 * `icon` maps to a key in src/components/TechIcon.jsx.
 * Add a skill here and it appears in the grid — no markup to touch.
 */
export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    note: 'What the user actually touches.',
    items: [
      { name: 'HTML', icon: 'html' },
      { name: 'CSS', icon: 'css' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React.js', icon: 'react' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    note: 'Where the data lives and the rules hold.',
    items: [
      { name: 'Node.js', icon: 'node' },
      { name: 'Express.js', icon: 'express' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'SQL', icon: 'sql' },
      { name: 'PostgreSQL', icon: 'postgres' },
    ],
  },
  {
    id: 'tools',
    title: 'DevOps & Tools',
    note: 'How the work gets versioned and shipped.',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'REST APIs', icon: 'api' },
    ],
  },
]
