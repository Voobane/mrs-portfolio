// Personal details, skills and experience shown on the site.

export const profile = {
  name: 'Matt Stammler',
  title: 'Full Stack Developer',
  email: 'voodoobane07@gmail.com',
  github: {
    handle: 'Voobane',
    url: 'https://github.com/Voobane',
    pagesUrl: 'https://voobane.github.io',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/matt-stammler-ab46b83a9',
  },
}

export const skillGroups = [
  {
    label: 'Languages & Markup',
    skills: ['JavaScript', 'HTML5', 'CSS3', 'SQL', 'Python'],
  },
  {
    label: 'Frontend',
    skills: ['React', 'React Router', 'Bootstrap', 'Tailwind CSS', 'Responsive Design', 'DOM APIs'],
  },
  {
    label: 'Backend',
    skills: [
      'Node.js',
      'Express',
      'GraphQL',
      'Apollo Server',
      'REST APIs',
      'JWT Auth',
      'bcrypt',
      'Handlebars',
      'Inquirer',
    ],
  },
  {
    label: 'Databases',
    skills: ['MongoDB', 'Mongoose', 'MySQL', 'PostgreSQL', 'Sequelize', 'IndexedDB'],
  },
  {
    label: 'Practices & Tools',
    skills: ['Git', 'GitHub', 'Vite', 'Webpack', 'npm', 'Jest', 'PWA', 'Agile', 'REST'],
  },
]

export const experience = [
  {
    icon: '⚛️',
    role: 'Frontend Developer',
    description:
      'Built React SPAs with component-based architecture and React Router. Deployed responsive, accessible UIs to Netlify from GitHub with continuous deployment.',
  },
  {
    icon: '🛠️',
    role: 'Backend Engineer',
    description:
      'Designed REST and GraphQL APIs with Node/Express and Apollo Server. Connected to MongoDB and PostgreSQL databases with Mongoose and Sequelize ORM.',
  },
  {
    icon: '🔩',
    role: 'Hardware Maker',
    description:
      'Built a custom CNC mill from scratch. Worked with Arduino, 3D printing, Fusion 360 CAD, and aluminum CNC machining. Precision problem-solving in physical systems.',
  },
  {
    icon: '🚀',
    role: 'Currently Learning',
    description:
      'Expanding into Python for backend development and data work. Exploring Render for cloud deployments, subdomains, and building portfolio-worthy live apps.',
  },
]
