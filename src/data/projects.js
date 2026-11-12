import { profile } from './profile.js'

// Project cards, in display order. Each project links to its GitHub repository
// and to its GitHub Pages site (https://<user>.github.io/<repo>/).
// Set `featured: true` to make a card span the full width of the grid.
// Command-line projects can't run on GitHub Pages, so they set `terminalDemo`
// (a key from terminalDemos.js) and their Live Demo opens a simulated terminal.
const projectList = [
  {
    name: 'MERN Book Search Engine',
    repo: 'C21-MERN-Book-Search-Engine',
    emoji: '📚',
    label: 'MERN · GraphQL · Apollo',
    description:
      'Search millions of books via Google Books API. Refactored from REST to GraphQL with Apollo Server. Full auth with JWT.',
    tech: ['React', 'GraphQL', 'MongoDB', 'Apollo'],
  },
  {
    name: 'E-Commerce Back End',
    repo: '13-ORM-E-Commerce-Back-End',
    emoji: '🛒',
    label: 'Express · Sequelize · MySQL',
    description:
      'RESTful API for an e-commerce platform. Full CRUD on Products, Categories, and Tags with Sequelize ORM and MySQL.',
    tech: ['Node.js', 'Express', 'Sequelize', 'MySQL'],
  },
  {
    name: 'Employee Tracker',
    repo: 'Employee-Tracker',
    terminalDemo: 'employee-tracker',
    emoji: '👥',
    label: 'Node.js · PostgreSQL · CLI',
    description:
      'Command-line CMS for managing employees, roles, and departments. Runs on Node.js, Inquirer, and PostgreSQL with complex SQL joins.',
    tech: ['Node.js', 'PostgreSQL', 'Inquirer'],
  },
  {
    name: 'Weather Dashboard',
    repo: 'Weather-Dashboard',
    emoji: '🌦️',
    label: 'Vanilla JS · OpenWeatherMap',
    description:
      '5-day weather forecast for any city. Uses OpenWeatherMap API with chained fetch calls and localStorage for search history persistence.',
    tech: ['JavaScript', 'Bootstrap', 'OpenWeatherMap API'],
  },
  {
    name: 'React Portfolio',
    repo: 'C20',
    emoji: '⚛️',
    label: 'React · React Router · Netlify',
    description:
      'Single-page application portfolio built in React with React Router. Dedicated pages for About, Projects, Contact, and Resume. Deployed to Netlify.',
    tech: ['React', 'React Router', 'Netlify'],
    featured: true,
  },
  {
    name: 'MVC Tech Blog',
    repo: 'Model-View-Controller-MVC-Tech-Blog',
    emoji: '📰',
    label: 'Handlebars · PostgreSQL · MVC',
    description:
      'CMS-style tech blog with Handlebars templates, PostgreSQL + Sequelize, bcrypt auth, express-session, and full CRUD from a personal dashboard.',
    tech: ['Handlebars', 'Sequelize', 'PostgreSQL', 'bcrypt'],
  },
  {
    name: 'NoSQL Social Network API',
    repo: 'NoSQL-Social-Network-API',
    emoji: '🌐',
    label: 'Express · MongoDB · Mongoose',
    description:
      "RESTful social network back end with MongoDB and Mongoose. Users post thoughts, react to friends' posts, and manage friend lists.",
    tech: ['Express', 'MongoDB', 'Mongoose'],
  },
  {
    name: 'SVG Logo Maker',
    repo: 'SVG-Logo-Maker',
    terminalDemo: 'svg-logo',
    emoji: '🔷',
    label: 'Node.js · OOP · Jest',
    description:
      'Node.js CLI that generates a custom 300×200 SVG logo from prompted text, colors, and shape. Three OOP shape classes with a full Jest test suite.',
    tech: ['Node.js', 'Inquirer', 'Jest', 'SVG'],
  },
  {
    name: 'Express.js Note Taker',
    repo: 'Express.js-Note-Taker',
    emoji: '🗒️',
    label: 'Express · Node.js · REST',
    description:
      'Full-stack note-taking app with an Express back end. Notes are saved, retrieved, and deleted via a JSON flat-file database. Live on Render.',
    tech: ['Node.js', 'Express', 'fs module'],
  },
  {
    name: 'Task Board',
    repo: 'Third-Party-APIs-Task-Board',
    emoji: '📋',
    label: 'jQuery · Day.js · localStorage',
    description:
      'Kanban board with jQuery and Day.js. Create tasks with deadlines, drag them between columns, and watch cards turn yellow or red as deadlines near or pass.',
    tech: ['jQuery', 'jQuery UI', 'Day.js', 'Bootstrap'],
  },
  {
    name: 'README Generator',
    repo: 'Readme-Generator',
    terminalDemo: 'readme-gen',
    emoji: '📄',
    label: 'Node.js · CLI · Markdown',
    description:
      'Node.js CLI that generates a professional README.md from Inquirer prompts — including a license badge, table of contents, and Questions section with GitHub link.',
    tech: ['Node.js', 'Inquirer'],
  },
  {
    name: 'Employee Payroll Tracker',
    repo: 'JavaScript-Employee-Payroll-Tracker',
    emoji: '💰',
    label: 'Vanilla JS · DOM · Math.random',
    description:
      'Browser-based payroll manager using vanilla JS. Adds employees via prompts, sorts by last name, and logs average salary and a random pick to the console.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
  },
  {
    name: 'Personal Blog',
    repo: 'Personal-Blog',
    emoji: '📝',
    label: 'Vanilla JS · localStorage',
    description:
      'Two-page blog app in vanilla JS. Submit posts on the landing page; view them on the blog page. Dark/light toggle and full localStorage persistence.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
  },
  {
    name: 'Advanced CSS Portfolio',
    repo: 'Advanced-CSS',
    emoji: '🎨',
    label: 'CSS · Flexbox · Responsive',
    description:
      'Responsive portfolio page built from scratch with Flexbox, media queries, and CSS custom properties. Featured-first project layout.',
    tech: ['HTML5', 'CSS3', 'Flexbox'],
  },
  {
    name: 'Horiseon Accessibility Refactor',
    repo: 'Code-Refactoring-Marketing-Agency',
    emoji: '♿',
    label: 'Semantic HTML · Accessibility',
    description:
      'Accessibility-focused refactor of a marketing agency landing page. Replaced div soup with semantic HTML5, added alt text, fixed heading hierarchy.',
    tech: ['HTML5', 'CSS3'],
  },
  {
    name: 'Mini Landing Page',
    repo: 'Mini-Project-Landing-Page',
    emoji: '🚀',
    label: 'HTML · CSS · Landing Page',
    description:
      'Polished marketing landing page with a fixed nav bar, hero section, features grid, and contact form — built in pure HTML and CSS with zero dependencies.',
    tech: ['HTML5', 'CSS3'],
  },
  {
    name: 'Matching a Hex Value — Regex Tutorial',
    repo: 'Matching-a-Hex-Value',
    emoji: '🔍',
    label: 'Regex · Documentation',
    description:
      'Gist-style tutorial breaking down /^#?([a-f0-9]{6}|[a-f0-9]{3})$/. Covers anchors, quantifiers, grouping, alternation, and bracket expressions.',
    tech: ['Markdown', 'Regex'],
  },
]

export const projects = projectList.map((project) => ({
  ...project,
  repoUrl: `${profile.github.url}/${project.repo}`,
  liveUrl: `${profile.github.pagesUrl}/${project.repo}/`,
}))
