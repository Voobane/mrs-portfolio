# Matt Stammler — Portfolio

Personal portfolio for Matt Stammler, Full Stack Developer. It's a single-page app with a light/dark theme, 17 project cards and a contact page.

**Live site:** https://matt-stammler-portfolio.onrender.com

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
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Projects.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── icons.jsx
│   │   └── terminal/              # Terminal demo popup for the CLI projects
│   ├── data/
│   │   ├── profile.js             # Contact links, skills, experience
│   │   ├── projects.js            # Project cards and their links
│   │   └── terminalDemos.js       # Scripted sessions for the terminal demos
│   ├── hooks/useTheme.js          # Light/dark theme state
│   ├── lib/
│   │   ├── resume.js              # "View CV" button logic
│   │   └── storage.js             # Safe localStorage helpers
│   ├── App.jsx                    # Page layout and view switching
│   ├── index.css                  # Tailwind setup + theme colors
│   └── main.jsx                   # Entry point
├── index.html
├── LICENSE
├── package.json
├── render.yaml                    # Render static-site settings
└── vite.config.js
```

To add or edit a project, change `src/data/projects.js`. No component code needs to change. Each project only needs its repository name (`repo`), and the GitHub and Live Demo links are built from it:

- GitHub: `https://github.com/Voobane/<repo>`
- Live Demo: `https://voobane.github.io/<repo>/`

For a Live Demo link to work, that repository must have GitHub Pages turned on.

Command-line projects can't run on GitHub Pages. For those, add `terminalDemo: '<key>'` to the project and define the session in `src/data/terminalDemos.js`. Its Live Demo button then opens the simulated terminal instead.

## Deploying to Render

`render.yaml` tells Render how to build and host the site as a free static site.

1. Push this project to the `mrs-portfolio` repository on GitHub.
2. In the [Render dashboard](https://dashboard.render.com/), choose **New → Blueprint**.
3. Connect your GitHub account if asked, pick this repository, and click **Apply**.
4. Render runs `npm install && npm run build` and publishes the `dist` folder. Every push to `main` redeploys automatically.

The site appears at `https://matt-stammler-portfolio.onrender.com` (or a similar address if that name is taken). You can add your own domain under the service's **Settings → Custom Domains**.

## Resume

Add your resume as `public/resume.pdf`, and the **View CV** button will open it. Until then, the button shows a "coming soon" message.

## Contact

- GitHub: [Voobane](https://github.com/Voobane)
- LinkedIn: [Matt Stammler](https://www.linkedin.com/in/matt-stammler-ab46b83a9)
- Email: voodoobane07@gmail.com

## License

[MIT](LICENSE)
