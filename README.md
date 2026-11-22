This project is under construction.

# Matt Stammler — Portfolio

Personal portfolio for Matt Stammler, Full Stack Developer.

**Live site:** 'www.mrsportfolio.com'

## Tech Stack

- [React 18](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — build tool & dev server
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling

## Features

- **Light / dark theme** that follows the visitor's system setting and remembers their choice
- **Project cards** that link to each project's live GitHub Pages site and its source code
- **Terminal demos** for the command-line projects (Employee Tracker, SVG Logo Maker, README Generator), which run as simulated Node.js sessions in a popup
- **Contact form** that checks the required fields and opens the visitor's email app with the message filled in
- **Copy-to-clipboard** email button
- Fully responsive layout

## Getting Started

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

## Project Structure

```
├── public/
│   └── favicon.svg                # Put resume.pdf here to enable "View CV"
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── ComingSoonCard.jsx     # Placeholder card for upcoming projects
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── MobileMenu.jsx         # Slide-out menu on phones
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectGrid.jsx        # Grid of project cards
│   │   ├── Projects.jsx           # Professional + Personal sections on the home page
│   │   ├── ProjectsPage.jsx       # Full list of one category (/projects/<id>)
│   │   ├── SectionHeader.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── icons.jsx
│   │   └── terminal/              # Terminal demo popup for the CLI projects
│   ├── data/
│   │   ├── profile.js             # Contact links, skills, experience
│   │   ├── projects.js            # Professional and personal projects
│   │   └── terminalDemos.js       # Scripted sessions for the terminal demos
│   ├── hooks/useTheme.js          # Light/dark theme state
│   ├── lib/
│   │   ├── resume.js              # "View CV" button logic
│   │   ├── router.jsx             # Page addresses (/contact, /projects/…)
│   │   └── storage.js             # Safe localStorage helpers
│   ├── App.jsx                    # Pages and navigation
│   ├── index.css                  # Tailwind setup + theme colors
│   └── main.jsx                   # Entry point
├── index.html
├── LICENSE
├── package.json
├── render.yaml                    # Render static-site settings
└── vite.config.js
```

## Deploying to Render


## Resume

Add your resume as `public/resume.pdf`, and the **View CV** button will open it. Until then, the button shows a "coming soon" message.

## Contact

- GitHub: [Voobane](https://github.com/Voobane)
- LinkedIn: [Matt Stammler](https://www.linkedin.com/in/matt-stammler-ab46b83a9)
- Email: #### tbd onthis ######

## License

[MIT](LICENSE)
