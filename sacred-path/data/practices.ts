import type { TraditionId } from '@/theme';

export interface SwipeWisdom {
  src: string;
  quote: string;
  tradition: string;
}

export interface DailyPractice {
  title: string;
  tradition: string;
  description: string;
  page: TraditionId;
}

export interface RightNowPractice {
  tradition: string;
  title: string;
  description: string;
  duration: string;
}

export interface WeatherMood {
  id: string;
  icon: string;
  label: string;
}

export interface WeatherMessage {
  msg: string;
  hint: string;
}

// ── Swipe Wisdom (Home carousel) ──

export const swipeWisdom: SwipeWisdom[] = [
  { src: "Osho — Tantra", quote: "The moment you accept yourself totally, something relaxes, and in that relaxation energy starts moving upward.", tradition: "Tantra" },
  { src: "Mantak Chia — Taoist Secrets", quote: "When you learn to conserve and circulate sexual energy rather than discharge it, you discover an inexhaustible source of vitality.", tradition: "Tao" },
  { src: "David Deida — Way of the Superior Man", quote: "The most loving thing you can do for your partner is to be fully present — not managing the moment, but inhabiting it completely.", tradition: "Deida" },
  { src: "Diana Richardson — Heart of Tantric Sex", quote: "The goal is not ecstasy. It is presence. Ecstasy may arise, but it is never the target.", tradition: "Richardson" },
  { src: "Vijnanabhairava Tantra", quote: "When two people merge in sacred embrace, the mind dissolves into the heart, and breath dissolves into the infinite. This is samadhi dressed as lovemaking.", tradition: "Tantra" },
  { src: "Lao Tzu — Tao Te Ching", quote: "To the mind that is still, the whole universe surrenders. And to two bodies that are still together, the whole universe opens like a flower.", tradition: "Tao" },
  { src: "David Deida — Intimate Communion", quote: "If you are waiting for your partner to change before you open your heart fully, you are living in a prison of your own making.", tradition: "Deida" },
  { src: "Diana Richardson — Slow Sex", quote: "After years of conventional sex, many couples have become strangers in bed. Slow sex is the practice of seeing your partner again, as if for the very first time.", tradition: "Richardson" },
];

// ── Daily Practices (rotated by dayOfYear) ──

export const dailyPractices: DailyPractice[] = [
  { title: "Yab-Yum", tradition: "Tantra", description: "Sit face to face, legs wrapped around each other. Synchronize your breath for 10 minutes. No agenda. Only presence.", page: "tantra" },
  { title: "Valley Orgasm", tradition: "Tao", description: "Rise to 70% arousal, then pause completely. Draw energy up the spine. Rest in the plateau together. Repeat 3 times.", page: "tao" },
  { title: "Eye Gazing", tradition: "Deida", description: "Sit facing each other. Maintain soft eye contact for 5 minutes without looking away. Let yourself be fully seen.", page: "deida" },
  { title: "Soft Middle Union", tradition: "Richardson", description: "Lie still in connection for 15 minutes. No movement, no goal. Let the stillness itself be the practice.", page: "richardson" },
  { title: "Sacred Arrival", tradition: "Tantra", description: "Spend 5 minutes apart setting a private intention. Then stand at your door together and cross the threshold hand in hand.", page: "tantra" },
  { title: "Jade Garden", tradition: "Tao", description: "Move slowly, circularly, like water finding its level. Build warmth gradually over 20 minutes. No rush to peak.", page: "tao" },
  { title: "Presence Hold", tradition: "Deida", description: "Hold your partner from behind, lips near the nape of their neck. Breathe warmth there for 5 full minutes. Say nothing.", page: "deida" },
  { title: "Scissors of Stillness", tradition: "Richardson", description: "Lie on your sides, bodies interlaced. Neither partner exerts effort. Let energy move by itself in the space of rest.", page: "richardson" },
  { title: "Heart Opening", tradition: "Tantra", description: "In Yab-Yum, place your right hand over your partner's heart. Speak one appreciation — specific, felt, true. Then hold in silence.", page: "tantra" },
  { title: "Microcosmic Orbit", tradition: "Tao", description: "Visualize golden energy rising up both spines on the inhale, cascading down the front on the exhale. Shared circuit.", page: "tao" },
  { title: "Tantric Awakening", tradition: "Tantra", description: "Body first, heart second, spirit third. 8 minutes of pure physical sensation, then 10 minutes of heart presence, then flow.", page: "tantra" },
  { title: "Taoist Cultivation", tradition: "Tao", description: "Sit back-to-back, hands on your lower belly. Breathe into your dantian for 10 minutes before coming together.", page: "tao" },
  { title: "Kneeling Mastery", tradition: "Tantra", description: "Both kneel, spine aligned, chest to back. Active partner wraps arms around receptive partner. Breathe in unison for 8 minutes.", page: "tantra" },
  { title: "Awakening the Inner Rod", tradition: "Richardson", description: "Men: lie alone and bring full attention to the perineum for 10 minutes. This single practice transforms your presence.", page: "richardson" },
  { title: "SkyDancing Breath", tradition: "Anand", description: "Sit facing each other. Breathe in unison — mouth to mouth, eyes open. With each exhale, imagine golden light spiraling up both spines. 10 minutes.", page: "anand" },
];

// ── Right Now Practices (bottom sheet categories) ──

export const rightNowPractices: Record<string, RightNowPractice[]> = {
  breath: [
    { tradition: "Tantra", title: "Synchronized Breath", description: "Sit facing each other, foreheads touching. Breathe in unison for 5 minutes. Let everything else dissolve.", duration: "5 min" },
    { tradition: "Tao", title: "Dantian Breath", description: "Both place hands over the lower belly. Breathe deeply into this point. Build warmth before any touch.", duration: "5 min" },
    { tradition: "Richardson", title: "Body Scan Together", description: "Lie side by side. Scan slowly from crown to feet together. Release every held tension. Meet in complete softness.", duration: "7 min" },
  ],
  connect: [
    { tradition: "Tantra", title: "Eye Gazing", description: "Sit facing each other. Maintain soft eye contact for 5 full minutes. Let yourself be truly seen.", duration: "5 min" },
    { tradition: "Deida", title: "Heart Hold", description: "One partner holds the other from behind. Lips near the nape of the neck. Breathe warmth. Say nothing. 5 minutes.", duration: "5 min" },
    { tradition: "Richardson", title: "Sacred Spoon", description: "Lie on your sides, one behind the other. Simply rest in stillness. Energy moves by itself.", duration: "10 min" },
  ],
  practice: [
    { tradition: "Tantra", title: "Yab-Yum", description: "Sit in each other's lap, face to face. Synchronize breath. Build a shared energy circuit through all seven chakras.", duration: "15 min" },
    { tradition: "Tao", title: "Valley Orgasm", description: "Rise together to 70% arousal, pause, draw energy upward, rest in the plateau. Repeat 3 times.", duration: "20 min" },
    { tradition: "Richardson", title: "Soft Middle Union", description: "Enter in stillness and simply hold the connection. No movement, no goal. The stillness is the practice.", duration: "15 min" },
  ],
  deepen: [
    { tradition: "Tantra", title: "Sacred Arrival", description: "5 minutes apart, each setting a private intention. Then cross the threshold together. Let the intention guide the evening.", duration: "30 min" },
    { tradition: "Tantra", title: "Tantric Awakening", description: "Body first — 8 minutes pure sensation. Heart second — 10 minutes of appreciation and presence. Spirit last — let it emerge.", duration: "40 min" },
    { tradition: "Tao", title: "Taoist Cultivation", description: "Activate the dantian, harmonize chi, practice 4 valley cycles, close with a shared microcosmic orbit.", duration: "45 min" },
    { tradition: "Anand", title: "SkyDancing Ceremony", description: "Light a candle. Set a shared intention aloud. Breathe together in SkyDancing rhythm for 10 minutes, then let the energy guide you.", duration: "45 min" },
  ],
};

// ── Weather Moods ──

export const weatherMoods: WeatherMood[] = [
  { id: 'stormy', icon: '⛈️', label: 'Stormy' },
  { id: 'cloudy', icon: '☁️', label: 'Cloudy' },
  { id: 'warm', icon: '🌤️', label: 'Warm' },
  { id: 'electric', icon: '⚡', label: 'Electric' },
  { id: 'radiant', icon: '☀️', label: 'Radiant' },
];

// ── Weather Messages (keyed by "mood1+mood2") ──

export const weatherMessages: Record<string, WeatherMessage> = {
  'radiant+radiant': { msg: "Both of you are radiant today. This is a rare gift — meet each other fully in it.", hint: "Tonight: Yab-Yum, candles, no agenda." },
  'stormy+stormy': { msg: "Two storms. Give each other space first — then come together slowly.", hint: "Tonight: Hold each other without speaking for 10 minutes." },
  'warm+warm': { msg: "Warm and steady. The best conditions for deep, unhurried practice.", hint: "Tonight: Scissors of Stillness — long, slow, nourishing." },
  'cloudy+cloudy': { msg: "Two quiet ones today. No need to perform presence — parallel stillness is its own intimacy.", hint: "Same room, no pressure. Let closeness happen without agenda." },
  'electric+electric': { msg: "Pure electricity between you. Channel it consciously — don't let it scatter.", hint: "Tonight: Valley Orgasm practice. This energy is fuel." },
  'stormy+radiant': { msg: "One storm, one sun. The sun doesn't fix the storm — it simply holds warmth nearby.", hint: "Let the stormy one be held tonight. No advice. Just presence." },
  'radiant+stormy': { msg: "One storm, one sun. The sun doesn't fix the storm — it simply holds warmth nearby.", hint: "Let the stormy one be held tonight. No advice. Just presence." },
  'stormy+cloudy': { msg: "Both carrying weight today. Neither needs to lighten the other — just be close.", hint: "Lie side by side. No talking required. Let the breathing slow together." },
  'cloudy+stormy': { msg: "Both carrying weight today. Neither needs to lighten the other — just be close.", hint: "Lie side by side. No talking required. Let the breathing slow together." },
  'stormy+warm': { msg: "One in turbulence, one holding steadiness. The warm one offers shelter — not solutions.", hint: "Let the stormy one speak first without interruption. Then hold." },
  'warm+stormy': { msg: "One in turbulence, one holding steadiness. The warm one offers shelter — not solutions.", hint: "Let the stormy one speak first without interruption. Then hold." },
  'stormy+electric': { msg: "Turbulence meets charge — this can ignite or overwhelm. Ground the electric one first.", hint: "10 minutes of still holding before anything else. Let the storm settle." },
  'electric+stormy': { msg: "Turbulence meets charge — this can ignite or overwhelm. Ground the electric one first.", hint: "10 minutes of still holding before anything else. Let the storm settle." },
  'cloudy+warm': { msg: "One is inward today. Meet them there gently before moving together.", hint: "Start with 5 minutes of back-to-back breathing before anything else." },
  'warm+cloudy': { msg: "One is inward today. Meet them there gently before moving together.", hint: "Start with 5 minutes of back-to-back breathing before anything else." },
  'cloudy+electric': { msg: "One has energy the other doesn't. Share it gently — don't flood the quiet one.", hint: "Let the electric one lead slowly. The cloudy one follows only what feels natural." },
  'electric+cloudy': { msg: "One has energy the other doesn't. Share it gently — don't flood the quiet one.", hint: "Let the electric one lead slowly. The cloudy one follows only what feels natural." },
  'cloudy+radiant': { msg: "Radiance offered to a quiet one. Let it be a gift, not a pressure to match.", hint: "The radiant one simply holds space. No expectation. Pure offering." },
  'radiant+cloudy': { msg: "Radiance offered to a quiet one. Let it be a gift, not a pressure to match.", hint: "The radiant one simply holds space. No expectation. Pure offering." },
  'warm+electric': { msg: "Warmth and charge — a beautifully creative pairing. Something intentional wants to emerge.", hint: "Choose one practice together before you begin. Let the direction be mutual." },
  'electric+warm': { msg: "Warmth and charge — a beautifully creative pairing. Something intentional wants to emerge.", hint: "Choose one practice together before you begin. Let the direction be mutual." },
  'warm+radiant': { msg: "Open, soft, and present — both of you. Let this evening take its own time.", hint: "No structure needed tonight. Follow the flow wherever it leads." },
  'radiant+warm': { msg: "Open, soft, and present — both of you. Let this evening take its own time.", hint: "No structure needed tonight. Follow the flow wherever it leads." },
  'electric+radiant': { msg: "High charge meets full openness. This is a night for something expansive.", hint: "Tonight: Firebird or Kundalini Breath practice. Let the energy move." },
  'radiant+electric': { msg: "High charge meets full openness. This is a night for something expansive.", hint: "Tonight: Firebird or Kundalini Breath practice. Let the energy move." },
};

// ── Ready-Made Messages ──

export const messages = [
  { text: "I keep thinking about what I want to do to you tonight. Come home soon.", tone: "tease" },
  { text: "I am thinking about the way you look when you are completely present with me. It is my favorite version of you.", tone: "sweet" },
  { text: "I have been setting an intention for tonight. You are at the center of it.", tone: "tease" },
  { text: "Tonight I want to take my time with you. Like we have all the world and nothing to rush toward.", tone: "sweet" },
  { text: "I was just reading about a practice I want to try with you. Curious?", tone: "tease" },
  { text: "Your presence at the end of the day is genuinely the thing I look forward to most.", tone: "sweet" },
];

// ── Intimacy Games ──

export const games = [
  "Two Truths and A Desire: each share two real desires and one fantasy. Your partner guesses which is the fantasy.",
  "Challenge: Tonight, express desire only through touch — no words at all. Discover how much you can say without language.",
  "Write down 3 experiences you would love to share together. Fold the papers. Exchange them. Read without judgment.",
  "The Desire Map: each draw a body silhouette and mark your favorite places to be touched. Exchange and explore.",
  "Take turns sending each other one sensual scene from your imagination. One paragraph each. Build the story together through the day.",
  "Ask each other: What is one thing I do that makes you feel most seen? Then listen without responding for 60 full seconds.",
];

// ── Right Now Mood Categories ──

export const rightNowMoods = [
  { id: 'breath', icon: '🌬️', label: 'Breathe', description: 'Start with breath' },
  { id: 'connect', icon: '👁️', label: 'Connect', description: 'Find each other' },
  { id: 'practice', icon: '🔥', label: 'Practice', description: 'Go deeper' },
  { id: 'deepen', icon: '🌊', label: 'Deepen', description: 'Full immersion' },
];

// ── Whispers (daily ritual prompts) ──

export const whispers = [
  { icon: '🕯️', title: 'The Sacred Arrival', text: "Sit facing each other in candlelight for five minutes. No words. Simply let your eyes soften and your breathing slow until you feel each other\u2019s presence fully.", src: 'Tantric threshold practice' },
  { icon: '🫀', title: 'Heart Breath', text: "Place your right hand on each other\u2019s heart. Breathe together slowly for ten rounds \u2014 your inhale meeting their exhale. Feel the warmth grow between your palms.", src: 'Diana Richardson \u2014 Heart connection' },
  { icon: '👁️', title: 'Eye Gazing', text: "Sit close. Hold each other\u2019s gaze for five full minutes without speaking. Let whatever arises \u2014 laughter, tears, love \u2014 simply move through you.", src: 'Tantric eye-gazing tradition' },
  { icon: '🌙', title: 'The Slow Touch', text: "One gives. One receives. Seven minutes of unhurried touch \u2014 no agenda, no destination. Then gently reverse. Let slowness be your teacher.", src: 'Tantric touch practice' },
  { icon: '🌊', title: 'Synchronized Breath', text: "Lie together in stillness. Match your breathing completely. Let your bodies soften into each other until you cannot tell where one breath ends and the other begins.", src: 'Taoist breath harmonization' },
  { icon: '💬', title: 'The Tender Thing', text: "Each of you speaks one sentence that begins: \u201CThe thing I most want you to know tonight is\u2026\u201D Then sit in silence together for two minutes and let it land.", src: 'Sacred speech practice' },
  { icon: '🌿', title: 'Gratitude Holding', text: "Hold each other in silence \u2014 one behind the other. The one being held receives without deflecting. The one holding gives without agenda. Stay for ten full minutes.", src: 'Osho \u2014 The Book of Secrets' },
  { icon: '🔥', title: 'The Conscious Kiss', text: "Begin with your foreheads touching. Breathe together for one full minute. Then let the kiss arise from that stillness \u2014 slowly, with full awareness, no rush toward anything.", src: 'Margot Anand \u2014 The Art of Sexual Ecstasy' },
  { icon: '✨', title: 'The Sacred Intention', text: "Sit facing each other. Each of you speaks one sacred intention for your time together \u2014 not a goal, but an offering. \u201CI bring my full heart to you tonight.\u201D Then bow to each other before you begin.", src: 'Margot Anand \u2014 SkyDancing Tantra ceremony' },
];

// ── Desire Card Options ──

export const desireCardOptions = [
  'A long, slow full-body massage \u2014 no agenda',
  'Yab Yum breathing together for 10 minutes',
  'Undress each other slowly, by candlelight',
  'Deep eye gazing for 5 uninterrupted minutes',
  'A bath or shower together',
  'Read a tantric passage aloud to each other',
  'Heart-to-heart breathing: foreheads touching',
  'One partner gives, one fully receives \u2014 then switch',
  'Blindfold exploration with soft touch only',
  'Hold each other in silence for 20 minutes',
  'Whisper one thing you truly love about their body',
  'Dance together to one full song \u2014 no phones',
  'Valley orgasm practice \u2014 no climax, only flow',
  'Conscious kiss \u2014 3 full minutes, unhurried',
  'Share one fantasy you\u2019ve never spoken aloud',
];

// ── Challenges ──

export interface Challenge {
  id: string;
  title: string;
  icon: string;
  days: number;
  subtitle: string;
  prompt: string;
}

export const challenges: Challenge[] = [
  { id: 'week', title: 'Week of Gratitude', icon: '🌱', days: 7, subtitle: '7 days \u00B7 One moment each day \u00B7 Both partners', prompt: 'What moment of love or beauty did you notice today?' },
  { id: 'month', title: 'Month of Gratitude', icon: '🌕', days: 30, subtitle: '30 days \u00B7 Deeper roots \u00B7 A complete love journal', prompt: 'One thing you are grateful for in your partner or relationship today...' },
  { id: 'presence', title: 'Week of Seeing', icon: '👁️', days: 7, subtitle: 'Notice one thing you\u2019ve never noticed before. Every day.', prompt: 'What did you notice about your partner today that you\u2019ve never noticed before?' },
  { id: 'touch', title: 'Week of Touch', icon: '🤲', days: 7, subtitle: 'One intentional touch each day. Log how it felt.', prompt: 'What intentional touch did you share today, and how did it feel?' },
];

// ── Semen Retention Teachings ──

export const semenRetention = {
  tantra: {
    tradition: 'Tantra',
    title: 'The Teaching of Semen Retention',
    summary: 'In classical Tantra, semen (called bindu or ojas) is understood as condensed vital energy. When retained and circulated, it nourishes the brain, the heart, and the entire subtle body. The man learns through breath and body awareness to bring sexual energy up the spine rather than expelling it.',
    tags: ['bindu', 'ojas', 'brahmacharya', 'whole-body orgasm', 'vitality'],
  },
  tao: {
    tradition: 'Tao',
    title: 'Taoist Semen Retention: The Art of Conserving Jing',
    summary: 'The ancient Taoist texts called semen jing \u2014 the densest, most precious form of vital essence. Mantak Chia modernised these teachings: the man learns to separate orgasm from ejaculation. Techniques include the Big Draw, the Microcosmic Orbit, and the Valley Orgasm.',
    tags: ['jing', 'big draw', 'microcosmic orbit', 'valley orgasm', 'longevity'],
  },
  deida: {
    tradition: 'Deida',
    title: 'David Deida & The Direction of Sexual Energy',
    summary: 'Deida approaches semen retention from a polarity perspective. Ejaculation represents the collapse of masculine charge. The fully evolved masculine learns to ravish without release \u2014 directing energy upward into the heart as love, and outward into the world as creative force and mission.',
    tags: ['masculine edge', 'polarity', 'directed energy', 'creative force', 'ravishment'],
  },
  richardson: {
    tradition: 'Richardson',
    title: 'Diana Richardson on Semen Retention',
    summary: 'When a man learns not to ejaculate every time he makes love, something profound shifts. He discovers that the energy he was spending in a moment of pleasure can instead nourish his body, deepen his love, and sustain his vitality for days afterward.',
    tags: ['semen retention', 'energy cultivation', 'vitality'],
  },
};

// ── 30-Day Journey (days 1-3 free, 4+ premium) ──

export const journey = [
  { day: 1, tradition: 'Tantra', title: 'The Arrival', description: "Today you do nothing except arrive. Sit facing each other for 10 minutes. No agenda. No practice. Simply be present with the person in front of you. Notice what you usually skip past.", intention: 'I am here. You are here. This is enough.', free: true },
  { day: 2, tradition: 'Tao', title: 'The Breath', description: "Lie back to back. Breathe simultaneously for 10 minutes. Feel the warmth of the other spine against yours. Without touching more than this, you are already in one circuit.", intention: 'We breathe as one body, one energy, one life.', free: true },
  { day: 3, tradition: 'Deida', title: 'The Gaze', description: "5 minutes of unbroken eye contact. No smiling to ease the discomfort. No looking away. Let yourself be fully seen \u2014 including the parts you usually hide. This is the practice of real intimacy.", intention: 'I let you see me. I truly see you.', free: true },
  { day: 4, tradition: 'Richardson', title: 'The Touch', description: "One partner lies completely still while the other touches with full presence \u2014 not to arouse, but to truly feel. 10 minutes each side. The receiver does nothing. The giver gives everything.", intention: null, free: false },
  { day: 5, tradition: 'Tantra', title: 'Chakra Awakening', description: "Moving energy from root to crown together. A guided 20-minute journey through all seven energy centres, seated in Yab-Yum.", intention: null, free: false },
];

// ── Teacher Rituals (per-teacher, free + locked) ──

export interface TeacherRitual {
  icon: string;
  title: string;
  text: string;
  src: string;
  free: boolean;
}

export const teacherRituals: Record<string, TeacherRitual[]> = {
  richardson: [
    {
      icon: '🫀',
      title: 'Heart Breath',
      text: "Place your right hand on each other\u2019s heart. Breathe together slowly for ten rounds \u2014 your inhale meeting their exhale. Feel the warmth build between your palms. Stay until the outside world dissolves completely.",
      src: 'Diana Richardson \u2014 Heart of Tantric Sex',
      free: true,
    },
    {
      icon: '🌸',
      title: 'The Soft Entry Ceremony',
      text: "Lie together without urgency. The man enters softly, without erection required, and both partners rest in connection. No movement, no goal. Breathe slowly and let the body respond in its own time. Fifteen minutes of sacred stillness \u2014 and discover what the body knows when the mind stops directing.",
      src: 'Diana Richardson \u2014 Tantric Sex for Men',
      free: false,
    },
    {
      icon: '🌿',
      title: 'The Body Scan Prayer',
      text: "Take turns placing one hand on each part of your partner\u2019s body \u2014 crown, throat, heart, belly, hips. At each point, pause for one full breath and send wordless love into that place. No agenda. Move only when the breath naturally completes. This is prayer in its most intimate form.",
      src: 'Diana Richardson \u2014 Slow Sex',
      free: false,
    },
  ],
  deida: [
    {
      icon: '👁️',
      title: 'The Presence Hold',
      text: "Hold your partner from behind, lips near the nape of their neck. Breathe warmth there for five full minutes. Say nothing. Simply be present \u2014 not doing, not planning, not managing the moment. Let your depth speak through stillness alone.",
      src: 'David Deida \u2014 The Way of the Superior Man',
      free: true,
    },
    {
      icon: '⚡',
      title: 'The Edge Practice',
      text: "Sit alone in stillness and bring full awareness to your deepest resistances \u2014 the places you habitually close, defend, or manage. Then bring that same unguarded openness into the next intimate moment. Do not explain yourself. Do not soften the edges. Simply be present with nothing held back.",
      src: 'David Deida \u2014 Blue Truth',
      free: false,
    },
    {
      icon: '🔥',
      title: 'Sacred Semen Retention',
      text: "During lovemaking, approach the peak and pause completely. Root your awareness at the perineum. Draw the energy upward through the spine \u2014 heart, throat, crown \u2014 on a slow, deep inhale. Rest in the expanded fullness for a full breath before continuing. The energy that would have been released becomes love, presence, and creative force in the world.",
      src: 'David Deida \u2014 Intimate Communion',
      free: false,
    },
  ],
  anand: [
    {
      icon: '🔥',
      title: 'The Conscious Kiss',
      text: "Begin with your foreheads touching. Breathe together for one full minute. Then let the kiss arise from that stillness \u2014 slowly, with full awareness, no rush toward anything. Let the kiss be complete in itself. A doorway, not a beginning. Stay until you feel the whole body respond.",
      src: 'Margot Anand \u2014 The Art of Sexual Ecstasy',
      free: true,
    },
    {
      icon: '✨',
      title: 'The Sacred Intention',
      text: "Sit facing each other. Each speaks one sacred intention for your time together \u2014 not a goal, but an offering. \u201CI bring my full heart to you tonight.\u201D Then bow to each other before you begin. This simple ceremony transforms lovemaking into a conscious act of devotion. What you name, you create.",
      src: 'Margot Anand \u2014 SkyDancing Tantra ceremony',
      free: false,
    },
    {
      icon: '🌟',
      title: 'SkyDancing Breath',
      text: "Sit facing each other, foreheads almost touching. Breathe together \u2014 slowly, fully, mouth to mouth. With each inhale, imagine golden light rising up your spine. With each exhale, feel it cascade through your partner and return. After ten rounds, rest in stillness with your eyes open, truly seeing each other. Two people becoming one current of living light.",
      src: 'Margot Anand \u2014 The Art of Sexual Ecstasy',
      free: false,
    },
  ],
};

// ── Date Night Ideas ──

export const dateNightIdeas = [
  { icon: '🕯️', text: 'Light candles, turn off all screens, and spend one hour speaking only about what you love about each other.', category: 'Presence' },
  { icon: '🛁', text: "Draw a bath together. Add oils, candles, music. Take turns washing each other\u2019s hair in silence.", category: 'Sensual ritual' },
  { icon: '🌙', text: "Lie outside under the sky tonight. Share one dream you\u2019ve never told anyone.", category: 'Intimacy' },
  { icon: '🍷', text: 'Cook a meal together barefoot, with music. No phones. Feed each other the first bite.', category: 'Nourishment' },
  { icon: '💌', text: "Each write your partner a letter. Not a text \u2014 a real letter. Read them aloud to each other.", category: 'Deep connection' },
  { icon: '💃', text: 'Clear the floor. Dance together for 20 minutes to songs that meant something to you when you fell in love.', category: 'Playful' },
  { icon: '🎭', text: "Take turns being blindfolded while the other offers three different sensory experiences \u2014 touch, taste, scent.", category: 'Sensory' },
  { icon: '🧘', text: 'Sit facing each other in yab-yum or simply cross-legged. Breathe together for 15 minutes without speaking.', category: 'Sacred practice' },
  { icon: '🌅', text: 'Set your alarm early and watch the sunrise together. Bring a blanket, hot drinks, nothing else.', category: 'Simplicity' },
  { icon: '📖', text: "Take turns reading each other poetry or passages that move you. No explaining \u2014 just let the words land.", category: 'Soul' },
  { icon: '🎨', text: 'Buy a single canvas. Paint something together with your hands, no brushes. Frame it afterward.', category: 'Creative' },
  { icon: '🌊', text: 'Go somewhere with water. Sit at the edge. Say nothing. Let the sound hold you both.', category: 'Nature' },
  { icon: '✨', text: "Revisit the place where you first fell for each other. Walk slowly. Notice what you feel in your body.", category: 'Memory' },
  { icon: '🫀', text: "Lie down and take turns placing your hand on each other\u2019s heart. Breathe together for five minutes like that.", category: 'Heart opening' },
  { icon: '🍓', text: 'Prepare a slow, intentional meal \u2014 just finger foods. Feed each other. Make it last an hour.', category: 'Sensual' },
  { icon: '🌿', text: 'Spend an afternoon in nature. No destination. Let your bodies slow to the pace of the land.', category: 'Grounding' },
  { icon: '🎵', text: 'Make a playlist of 10 songs that are yours as a couple. Play it from beginning to end, listening deeply.', category: 'Soundtrack' },
  { icon: '🌸', text: 'Give each other a 30-minute massage. No agenda, no reciprocation expected. Just give, then receive.', category: 'Touch' },
  { icon: '🔥', text: "Sit by candlelight and take turns completing the sentence: \u201CI feel closest to you when...\u201D", category: 'Vulnerability' },
  { icon: '🌌', text: "Turn off every light. Lie together in the dark and just breathe. Let whatever wants to be said, be said.", category: 'Stillness' },
];
