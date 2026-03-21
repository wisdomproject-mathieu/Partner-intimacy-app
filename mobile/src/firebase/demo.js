// Demo mode — active when Firebase env vars are not configured.
// Simulates auth, partner link, and a notes feed with fake data.
// Remove this file (and its import in main.js) once .env is filled in.

export const DEMO_MODE = !import.meta.env.VITE_FIREBASE_API_KEY

export const demoUser = {
  uid:         'demo-me',
  displayName: 'You',
  email:       'you@sacredpath.app',
  partnerId:   'demo-partner',
}

export const demoNotes = [
  {
    id: '1',
    fromUid:   'demo-partner',
    toUid:     'demo-me',
    text:      'You are the center of my universe. I love you so much.',
    glyph:     '☽',
    color:     'rose',
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    starred:   true,
  },
  {
    id: '2',
    fromUid:   'demo-partner',
    toUid:     'demo-me',
    text:      "Can't wait to see you tonight! Have fun at work ✦",
    glyph:     '✦',
    color:     'purple',
    createdAt: Date.now() - 1000 * 60 * 60 * 23,
    starred:   false,
  },
  {
    id: '3',
    fromUid:   'demo-partner',
    toUid:     'demo-me',
    text:      "I miss you so much, can't believe it's been so long! Have a safe flight tomorrow — I'll be waiting for you at the airport.",
    glyph:     '❧',
    color:     'gold',
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
    starred:   false,
  },
  {
    id: '4',
    fromUid:   'demo-me',
    toUid:     'demo-partner',
    text:      "I'm ready to watch the movie tonight! Let's order takeout and make some popcorn 🍿",
    glyph:     '⊹',
    color:     'teal',
    createdAt: Date.now() - 1000 * 60 * 30,
    starred:   false,
  },
  {
    id: '5',
    fromUid:   'demo-me',
    toUid:     'demo-partner',
    text:      'I love you!!!',
    glyph:     '♡',
    color:     'rose',
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    starred:   true,
  },
]
