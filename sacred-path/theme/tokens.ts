// Design tokens extracted from the Sacred Path web app
// Dark, warm, sacred — candlelight, not flashlight

export const colors = {
  ink: '#09040a',
  card: '#1e0f1a',
  surface: '#1c0e18',
  border: 'rgba(200,140,90,0.16)',
  borderLight: 'rgba(200,140,90,0.12)',

  gold: '#c8924a',
  goldLight: '#e4b87a',
  rose: '#c0415f',
  roseLight: '#e06e88',
  cream: '#f0e2d0',
  blue: '#9ab0e8',
  violet: '#c09ae0',
  violetBg: '#c8b0f0',

  text: '#e4cebb',
  muted: '#c4a882',
  dim: '#a07068',
} as const;

export const tradColors = {
  tantra: { primary: '#c0415f', light: '#e06e88', bg: 'rgba(192,65,95,0.14)', border: 'rgba(192,65,95,0.24)' },
  tao: { primary: '#c8924a', light: '#e4b87a', bg: 'rgba(200,146,74,0.12)', border: 'rgba(200,146,74,0.24)' },
  deida: { primary: '#9ab0e8', light: '#9ab0e8', bg: 'rgba(100,130,210,0.12)', border: 'rgba(100,130,210,0.22)' },
  richardson: { primary: '#c09ae0', light: '#c09ae0', bg: 'rgba(192,154,224,0.12)', border: 'rgba(192,154,224,0.22)' },
} as const;

export const gradients = {
  hero: ['#f0e2d0', '#e4b87a', '#e06e88'],
  tantra: ['#c0415f', '#e4b87a'],
  tao: ['#e4b87a', '#c8924a'],
  deida: ['#9ab0e8', '#c0415f'],
  richardson: ['#c09ae0', '#e4b87a'],
  goldButton: ['#c8924a', '#e4b87a'],
  roseButton: ['#c0415f', '#e06e88'],
} as const;

export const typography = {
  heading: 'Georgia',
  body: 'System',
  sizes: {
    hero: 28,
    h1: 24,
    h2: 20,
    h3: 17,
    body: 15,
    small: 13,
    caption: 11,
    micro: 10,
  },
  lineHeights: {
    tight: 1.3,
    normal: 1.6,
    relaxed: 1.78,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 11,
  lg: 13,
  xl: 20,
  full: 999,
} as const;

export type TraditionId = 'tantra' | 'tao' | 'deida' | 'richardson';
