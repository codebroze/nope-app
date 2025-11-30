export type Tone = {
  id: string
  label: string
  emoji: string
  color: string
  textColor: string
  borderColor: string
  desc: string
}

export const TONES: Tone[] = [
  {
    id: 'random',
    label: 'Random',
    emoji: '🎲',
    color: '#e0f2fe',
    textColor: '#0369a1',
    borderColor: '#bae6fd',
    desc: 'Surprise me'
  },
  {
    id: 'sarcastic',
    label: 'Spicy',
    emoji: '🌶️',
    color: '#fef3c7',
    textColor: '#d97706',
    borderColor: '#fde68a',
    desc: "Don't ask again"
  },
  {
    id: 'petty',
    label: 'Petty',
    emoji: '💅',
    color: '#fed7aa',
    textColor: '#ea580c',
    borderColor: '#fdba74',
    desc: 'Bless your heart'
  },
  {
    id: 'genz',
    label: 'Gen Z',
    emoji: '📱',
    color: '#e9d5ff',
    textColor: '#9333ea',
    borderColor: '#d8b4fe',
    desc: "It's a flop"
  },
  {
    id: 'dramatic',
    label: 'Drama',
    emoji: '✨',
    color: '#fce7f3',
    textColor: '#c026d3',
    borderColor: '#f3e8ff',
    desc: 'The audacity!'
  },
  {
    id: 'oldenglish',
    label: 'Victorian',
    emoji: '🎩',
    color: '#fef3c7',
    textColor: '#92400e',
    borderColor: '#fde68a',
    desc: 'Good day sir'
  },
  // Temporarily hiding ghost tone
  // {
  //   id: 'ghost',
  //   label: 'Ghost',
  //   emoji: '👻',
  //   color: '#f3f4f6',
  //   textColor: '#4b5563',
  //   borderColor: '#e5e7eb',
  //   desc: '*Silence*'
  // }
]

export const RESPONSES: Record<string, string[]> = {
  sarcastic: [
    'I plan on staring at a blank wall that day. Sounds more fun.',
    'My horoscope said to avoid bad ideas today.',
    "I would, but I don't want to.",
    "Let me check my schedule... Yep, says 'No' all day."
  ],
  petty: [
    'I love that confidence for you, but absolutely not.',
    'Oh, honey. No.',
    "Funny how you thought I'd say yes.",
    "I'd love to help, but I don't want to lie to you.",
    'Bless your heart for asking.'
  ],
  genz: [
    'Bestie, absolutely not. 💀',
    "It's giving rejection.",
    'Naur.',
    'I fear that is a flop. Left on read.',
    'Respectfully? No.'
  ],
  dramatic: [
    "You ask this of me? On the day of my cat's half-birthday?!",
    'My spirit weeps at the very thought!',
    'Heavens no! The stars have aligned against us!',
    'I would rather walk on Legos in the dark!'
  ],
  oldenglish: [
    'I bid thee a firm farewell on this matter.',
    'Nay, sir! A thousand times, nay!',
    'I find myself disinclined to acquiesce.',
    'Good day. I said, GOOD DAY.'
  ],
  ghost: [
    '...',
    '*Read 12:45 PM*',
    'who is this?',
    'Error 404: Interest not found.'
  ]
}
