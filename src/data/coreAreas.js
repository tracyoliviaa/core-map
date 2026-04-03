export const INITIAL_AREAS = [
  {
    id: 'body',
    name: 'Body',
    emoji: '💪',
    color: 'bg-red-500',
    description: 'Fitness & Ernährung',
    tasks: [
      { id: 'body-1', text: '10 Minuten Mobility-Übungen', completed: false },
      { id: 'body-2', text: 'Trinke 2 Liter Wasser heute', completed: false },
      { id: 'body-3', text: 'Probiere ein gesundes Rezept', completed: false }
    ],
    points: 0,
    streak: 0
  },
  {
    id: 'brain',
    name: 'Brain',
    emoji: '🧠',
    color: 'bg-blue-500',
    description: 'Wissen & Lernen',
    tasks: [
      { id: 'brain-1', text: 'Lies einen 5-Minuten-Artikel', completed: false },
      { id: 'brain-2', text: 'Lerne 5 neue Vokabeln', completed: false },
      { id: 'brain-3', text: 'Schaue ein Tutorial-Video', completed: false }
    ],
    points: 0,
    streak: 0
  },
  {
    id: 'mind',
    name: 'Mind',
    emoji: '💼',
    color: 'bg-purple-500',
    description: 'Business & Fokus',
    tasks: [
      { id: 'mind-1', text: 'Reflektiere: Was ist dein wichtigstes Ziel?', completed: false },
      { id: 'mind-2', text: 'Plane deine Top 3 Aufgaben für morgen', completed: false },
      { id: 'mind-3', text: 'Lies über ein Business-Modell', completed: false }
    ],
    points: 0,
    streak: 0
  },
  {
    id: 'skills',
    name: 'Skills',
    emoji: '🎯',
    color: 'bg-green-500',
    description: 'Fähigkeiten',
    tasks: [
      { id: 'skills-1', text: 'Übe eine Präsentationstechnik', completed: false },
      { id: 'skills-2', text: 'Führe ein schwieriges Gespräch', completed: false },
      { id: 'skills-3', text: 'Analysiere deine Kommunikation heute', completed: false }
    ],
    points: 0,
    streak: 0
  },
  {
    id: 'heart',
    name: 'Heart',
    emoji: '❤️',
    color: 'bg-pink-500',
    description: 'Soziales & Empathie',
    tasks: [
      { id: 'heart-1', text: 'Schreib jemandem eine nette Nachricht', completed: false },
      { id: 'heart-2', text: 'Höre aktiv zu, ohne zu unterbrechen', completed: false },
      { id: 'heart-3', text: 'Reflektiere: Wem möchtest du Danke sagen?', completed: false }
    ],
    points: 0,
    streak: 0
  },
  {
    id: 'soul',
    name: 'Soul',
    emoji: '🧘',
    color: 'bg-indigo-500',
    description: 'Entspannung & Sinn',
    tasks: [
      { id: 'soul-1', text: 'Meditiere 5 Minuten', completed: false },
      { id: 'soul-2', text: 'Schreibe in dein Journal', completed: false },
      { id: 'soul-3', text: 'Gehe 10 Minuten in die Natur', completed: false }
    ],
    points: 0,
    streak: 0
  }
];