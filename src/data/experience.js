export const experience = [
  {
    id: 'intern',
    role: 'Software Developer Intern',
    focus: 'Full Stack Development',
    company: 'COMPANY_NAME',
    duration: '3 months',
    project: { name: 'Rentellor', url: 'https://rentellor.com/' },
    summary:
      'I worked as a Full stack Developer on Rentellor, a live production application: building REST endpoints in Node.js and Express, then integrating them into the React frontend. Everything I shipped went through review with a senior engineer.',
    work: [
      'Designed and built REST APIs with Node.js and Express.js, covering request validation, error handling and consistent response shapes.',
      'Integrated backend endpoints into the React.js frontend, including the loading, empty and error states each one needed.',
      'Implemented database-driven features end to end — from query through to the rendered interface.',
      'Reduced response payloads to the fields the interface actually renders, cutting transfer size on list-heavy screens.',
      'Added debounced search inputs to stop redundant network calls firing on every keystroke.',
      'Used AbortController to cancel superseded requests, removing a race condition where slower responses overwrote newer results.',
      'Worked within an established review process, and learned to write code that reads clearly to the next person in the file.',
    ],
    metrics: [
      { value: '3', unit: 'months', label: 'Duration', countTo: 3 },
      { value: 'Full stack', label: 'Scope' },
      { value: 'REST APIs', label: 'Delivered' },
      { value: 'Performance', label: 'Focus area' },
    ],
  },
]
