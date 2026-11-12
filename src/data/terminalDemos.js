// Simulated Node.js terminal sessions for the command-line projects.
// Keyed by the `terminalDemo` field in projects.js.
//
//   menu       – numbered menu; each handler prints `output`, asks a `prompt`
//                (answered by `followUp`), or `exit`s
//   svgFlow    – question-and-answer run that draws an SVG logo
//   readmeFlow – question-and-answer run that prints a README.md preview
//   cacheKey   – localStorage key that remembers a finished run

export const terminalDemos = {
  'employee-tracker': {
    name: 'Employee Tracker',
    cacheKey: 'demo_employee_tracker',
    intro: [
      { text: '$ node index.js', cls: 't-green' },
      { text: '' },
      { text: '╔═══════════════════════════════╗', cls: 't-blue' },
      { text: '║     Employee Tracker CMS      ║', cls: 't-blue' },
      { text: '╚═══════════════════════════════╝', cls: 't-blue' },
      { text: '' },
      { text: 'What would you like to do?', cls: '' }
    ],
    menu: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ],
    handlers: {
      'View all departments': { output: [
        { text: '┌──────────────────────────────────┐' },
        { text: '│  ID  │  Department                │' },
        { text: '├──────┼────────────────────────────┤' },
        { text: '│  1   │  Engineering               │' },
        { text: '│  2   │  Sales                     │' },
        { text: '│  3   │  Finance                   │' },
        { text: '│  4   │  Legal                     │' },
        { text: '└──────────────────────────────────┘' }
      ]},
      'View all roles': { output: [
        { text: '┌────┬─────────────────────┬─────────────┬────────────┐' },
        { text: '│ ID │ Job Title           │ Department  │ Salary     │' },
        { text: '├────┼─────────────────────┼─────────────┼────────────┤' },
        { text: '│ 1  │ Lead Engineer       │ Engineering │ $150,000   │' },
        { text: '│ 2  │ Software Engineer   │ Engineering │ $120,000   │' },
        { text: '│ 3  │ Sales Lead          │ Sales       │ $100,000   │' },
        { text: '│ 4  │ Salesperson         │ Sales       │ $80,000    │' },
        { text: '│ 5  │ Account Manager     │ Finance     │ $110,000   │' },
        { text: '└────┴─────────────────────┴─────────────┴────────────┘' }
      ]},
      'View all employees': { output: [
        { text: '┌────┬───────────┬────────────┬─────────────────────┬──────────────┐' },
        { text: '│ ID │ First     │ Last       │ Title               │ Manager      │' },
        { text: '├────┼───────────┼────────────┼─────────────────────┼──────────────┤' },
        { text: '│ 1  │ John      │ Doe        │ Lead Engineer       │ None         │' },
        { text: '│ 2  │ Mike      │ Chan       │ Software Engineer   │ John Doe     │' },
        { text: '│ 3  │ Ashley    │ Rodriguez  │ Sales Lead          │ None         │' },
        { text: '│ 4  │ Kevin     │ Tupik      │ Salesperson         │ Ashley R.    │' },
        { text: '└────┴───────────┴────────────┴─────────────────────┴──────────────┘' }
      ]},
      'Add a department': { prompt: 'Enter department name: ', followUp: (val) => `✓ Department "${val}" added successfully.` },
      'Add a role': { prompt: "Enter role title: ", followUp: (val) => `✓ Role "${val}" added successfully.` },
      'Add an employee': { prompt: "Enter employee first name: ", followUp: (val) => `✓ Employee "${val}" added successfully.` },
      'Update an employee role': { prompt: 'Enter employee name to update: ', followUp: (val) => `✓ ${val}'s role updated successfully.` },
      'Exit': { exit: true }
    }
  },
  'svg-logo': {
    name: 'SVG Logo Maker',
    cacheKey: 'demo_svg_logo',
    intro: [
      { text: '$ node index.js', cls: 't-green' },
      { text: '' },
      { text: 'SVG Logo Maker', cls: 't-blue' },
      { text: '──────────────', cls: 't-muted' },
      { text: '' },
      { text: 'Answer the prompts to generate your logo.', cls: '' },
      { text: '' },
      { text: '? Enter up to 3 characters for logo text:', cls: 't-yellow' }
    ],
    svgFlow: true
  },
  'readme-gen': {
    name: 'README Generator',
    cacheKey: 'demo_readme_gen',
    intro: [
      { text: '$ node index.js', cls: 't-green' },
      { text: '' },
      { text: 'README Generator', cls: 't-blue' },
      { text: '────────────────', cls: 't-muted' },
      { text: '' },
      { text: 'Answer the prompts — your README.md will be generated.', cls: '' },
      { text: '' },
      { text: '? What is your project title?', cls: 't-yellow' }
    ],
    readmeFlow: true
  }
}
