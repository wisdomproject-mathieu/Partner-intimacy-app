import type { TraditionId } from '@/theme';

export interface Tradition {
  id: TraditionId;
  name: string;
  type: 'tradition' | 'teacher';
  icon: string;
  essence: string;
  intro: string;
  pillars: string[];
  hubDescription: string;
}

export const traditions: Tradition[] = [
  {
    id: 'tantra',
    name: 'Tantra',
    type: 'tradition',
    icon: '🔥',
    essence: 'Energy, breath, union — the oldest map of sacred sexuality, from body to spirit.',
    intro: 'Tantra teaches that the body is a temple, breath is prayer, and lovemaking — approached with awareness — is the most direct path to spiritual union two people can walk together.',
    pillars: ['Energy (Shakti/Kundalini)', 'Breath (Pranayama)', 'Sacred Union (Maithuna)', 'Chakra Awakening'],
    hubDescription: 'The ancient science of sacred sexuality. Tantra teaches couples to transform desire into devotion through breath, energy, and conscious union.',
  },
  {
    id: 'tao',
    name: 'Tao',
    type: 'tradition',
    icon: '☯️',
    essence: 'Conservation, circulation, patience — sexual alchemy that builds vitality.',
    intro: 'The Taoist bedroom arts teach couples to cultivate, conserve, and circulate sexual energy — transforming raw desire into lasting vitality, deeper bonding, and spiritual luminosity.',
    pillars: ['Conservation (Jing)', 'Circulation (Chi Kung)', 'Valley Orgasm', 'Dual Cultivation'],
    hubDescription: 'The Taoist art of sexual alchemy. Conserve, circulate, and transform sexual energy into vitality, bonding, and spiritual luminosity.',
  },
  {
    id: 'deida',
    name: 'David Deida',
    type: 'teacher',
    icon: '⚡',
    essence: 'The electricity between masculine and feminine. Depth, presence, polarity. The courage to love without holding back anything.',
    intro: "Deida's work maps the living electricity between masculine and feminine essences — depth, presence, polarity, and the courage to love without holding back.",
    pillars: ['Masculine Presence', 'Feminine Radiance', 'Sexual Polarity', 'Heart-Open Living'],
    hubDescription: 'The living electricity between masculine and feminine. Depth, presence, polarity, and the courage to love without holding back.',
  },
  {
    id: 'richardson',
    name: 'Diana Richardson',
    type: 'teacher',
    icon: '🌸',
    essence: 'Slowness, softness, awareness. A return to the body\'s own intelligence.',
    intro: "Richardson invites couples to slow everything down, drop all goals, and discover the body's own electromagnetic intelligence — a quiet revolution in how we make love.",
    pillars: ['Slow Sex', 'Relaxation into Feeling', 'Cool Approach', 'Body Intelligence'],
    hubDescription: "A quiet revolution in how we make love. Slow down, drop all goals, and discover the body's own electromagnetic intelligence.",
  },
];
