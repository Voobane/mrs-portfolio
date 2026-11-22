// Education cards, shown in this order (oldest first).
//   credential – diploma or certificate, shown just before the score
//   score      – grade or certification, highlighted on the right
//   scoreType  – 'grade' (graduation-cap icon) or 'certification' (badge icon)
//   notes      – optional bullet points under the card

export const education = [
  {
    school: 'Broad Run High School',
    date: 'June 2010',
    credential: 'High School Diploma',
    notes: [
      'Senior year: attended CS Monroe Technology Center every other day for the Digital 3D Modeling and Design program.',
      'Volunteered with SkillsUSA. My teammate and I won 1st place at the Regional/District competition.',
      'Advanced to the state competition and placed 4th.',
    ],
  },
  {
    school: 'CS Monroe Technology Center',
    program: 'Computer Systems Technologies',
    date: 'June 2011',
    credential: 'Certificate of Completion',
    score: 'CompTIA A+ Certified',
    scoreType: 'certification',
  },
  {
    school: 'George Washington University',
    program: 'Full Stack Web Development Boot Camp (Fully Remote)',
    date: 'November 2024',
    credential: 'Certificate of Completion',
    score: '97.53%',
    scoreType: 'grade',
    notes: ['Highest grade in the class.'],
  },
]
