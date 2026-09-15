import aiResumeBuilder from '../assets/projects/ai-resume-builder.svg'
import watchParty from '../assets/projects/watch-party.svg'
import expenseTracker from '../assets/projects/expense-tracker.svg'
import quickshow from '../assets/projects/quickshow.svg'

/**
 * `liveUrl` placeholders stay as tokens until you have a real deployment.
 * A card only becomes a link once its token is replaced with a URL.
 *
 * Every card renders the same shape — 16:9 cover, description, three features,
 * stack, call to action — which is what keeps the grid aligned. Keep `features`
 * to at least three entries per project so no card comes up short.
 */
export const projects = [
  {
    id: 'ai-resume-builder',
    index: '01',
    title: 'AI Resume Builder',
    year: '2025',
    description:
      'An AI-powered platform that reads a job description, tells you where your resume falls short, and turns the gap into an interview prep plan.',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Gemini API'],
    features: [
      'Resume and job description analysis',
      'Resume-to-role matching score',
      'Skill gap identification',
      'Generated interview questions',
      'AI-built preparation plan',
    ],
    liveUrl: 'https://ai-resume-builder-silk-pi.vercel.app/',
    image: aiResumeBuilder,
    alt: 'A resume document with a beam of light passing through a prism and refracting into a set of skill-match bars.',
  },
  {
    id: 'youtube-watch-party',
    index: '02',
    title: 'YouTube Watch Party',
    year: '2025',
    description:
      'A real-time watch party where a room full of people stays on the same frame of the same video, with the host holding the controls.',
    stack: ['React.js', 'TypeScript', 'PostgreSQL', 'Socket.IO'],
    features: [
      'Create and join rooms',
      'Synchronised playback across clients',
      'Host and moderator controls',
      'Real-time room communication',
    ],
    liveUrl: 'https://watch-party-nine-lilac.vercel.app/',
    image: watchParty,
    alt: 'Four screens arranged on an orbit around a single glowing play sphere, each tied back to the centre.',
  },
  {
    id: 'expense-tracker',
    index: '03',
    title: 'Expense Tracker',
    year: '2024',
    description:
      'A small expense manager for the question everyone asks at the end of the month: where did it actually go?',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    features: [
      'Add and manage expenses',
      'Category breakdown',
      'Monthly spending summaries',
    ],
    liveUrl: null,
    image: expenseTracker,
    alt: 'Five stacks of coins at different heights forming a bar chart, one stack highlighted, with a payment card beside them.',
  },
  {
    id: 'quickshow',
    index: '04',
    title: 'QuickShow',
    year: '2024',
    description:
      'A movie booking platform: browse what is playing, pick a showtime, choose your seats, book the ticket.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    features: [
      'Browse movies and details',
      'Showtime selection',
      'Seat selection',
      'Ticket booking',
    ],
    liveUrl: null,
    image: quickshow,
    alt: 'A row of cinema seats lit by a projector beam, one seat highlighted, with a ticket floating above.',
  },
]
