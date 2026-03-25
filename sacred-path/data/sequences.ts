import type { TraditionId } from '@/theme';

export interface SequencePhase {
  name: string;
  duration: string;
  description: string;
}

export interface Sequence {
  id: string;
  tradition: TraditionId;
  name: string;
  level: string;
  duration: string;
  description: string;
  phases: SequencePhase[];
  tip: string;
}

export const sequences: Sequence[] = [
  // ── TANTRA (4) ──
  {
    id: "sacred-arrival",
    tradition: "tantra",
    name: "Sacred Arrival",
    level: "all levels",
    duration: "20-30 min",
    description: "The quality of how two people arrive together sets the entire tone of what follows. Most couples skip directly to action; this sequence teaches the art of the sacred threshold \u2014 the deliberate, conscious crossing from ordinary time into sacred time.",
    phases: [
      { name: "Separation", duration: "5 min", description: "Begin apart. Each partner takes 5 minutes alone \u2014 shower, breathe, set a private intention. What do you wish to offer tonight? What do you wish to receive? Write one word on paper if helpful." },
      { name: "Threshold", duration: "5 min", description: "Come together at the door to your space. Stand facing each other before entering. Make eye contact for one full minute without speaking. Only then, cross the threshold together, hand in hand." },
      { name: "Attunement", duration: "10 min", description: "Sit in Yab-Yum or back-to-back. Synchronize breath for a full 10 minutes. No agenda, no words. Just the sound of two people becoming one rhythm. This is the entire practice if that is all that happens." },
      { name: "Intention", duration: "3 min", description: "Each partner speaks their one-word intention aloud. Receive your partner\u2019s word as a gift. Then let all agenda dissolve. Whatever arises from this space is the sacred." },
    ],
    tip: "The tantric tradition says: how you begin is how you will go. The Sacred Arrival sequence transforms not just intimacy but the entire quality of presence two people carry together.",
  },
  {
    id: "tantric-awakening",
    tradition: "tantra",
    name: "Tantric Awakening",
    level: "intermediate",
    duration: "30-45 min",
    description: "A complete arc designed to awaken and circulate energy through all three levels described in Tantric teaching: physical, emotional-mental, and spiritual. Each phase intentionally activates a different dimension.",
    phases: [
      { name: "Body Awakening", duration: "8 min", description: "Begin with Kneeling Mastery or back-to-back breathing. Focus entirely on physical sensation \u2014 warmth, pulse, breath, skin. No meaning-making yet. Pure body awareness for the first 8 minutes." },
      { name: "Heart Opening", duration: "10 min", description: "Move into Yab-Yum. Place your right hand over your partner\u2019s heart. Speak one appreciation \u2014 specific and felt, not generic. Receive theirs. Then hold each other in complete silence as the words settle." },
      { name: "Energy Flow", duration: "15 min", description: "Let connection arise naturally from the heart space. Move into Firebird or The Mermaid \u2014 whatever the energy calls for. Maintain synchronized breathing throughout. This phase has no script, only presence." },
      { name: "Integration", duration: "8 min", description: "Come to complete stillness in any comfortable position together. Both close eyes. Feel the full circuit \u2014 body, heart, and something beyond both. Rest in what has been created between you." },
    ],
    tip: "This sequence works because it honors the order: body first, then heart, then spirit. Trying to skip to the spiritual without passing through the physical and emotional is the most common tantric mistake.",
  },
  {
    id: "deep-reconnection",
    tradition: "tantra",
    name: "Deep Reconnection",
    level: "beginners",
    duration: "15-22 min",
    description: "A tender heart-opening sequence for reconnecting after distance or time apart. Prioritizes emotional safety and genuine presence over intensity.",
    phases: [
      { name: "Opening", duration: "8 min", description: "Begin lying side by side, fully clothed. Place your right hand over your partner\u2019s heart. Breathe together slowly. Speak one true thing you appreciate about them." },
      { name: "Attunement", duration: "10 min", description: "Move into Yab-Yum. Synchronize your breathing completely. Let your foreheads rest together. Release every agenda." },
      { name: "Flow", duration: "15-20 min", description: "Transition naturally into slow, unhurried connection. No destination. No peak to chase. Focus entirely on sensation and your partner\u2019s breath." },
      { name: "Integration", duration: "5 min", description: "Return to complete stillness. Lie facing each other. Stay in silence for 2-3 minutes \u2014 eyes open, simply being witnessed." },
    ],
    tip: "Turn your phones to airplane mode before beginning. Let the world wait outside for this one hour.",
  },
  {
    id: "sunday-morning",
    tradition: "tantra",
    name: "Sunday Morning",
    level: "beginners",
    duration: "15-25 min",
    description: "A light, warm sequence for slow mornings. No pressure, no destination, just full presence and the simple pleasure of each other.",
    phases: [
      { name: "Wake-up Breath", duration: "3 min", description: "Before rising, face each other. Take 10 slow deep breaths together. Let your eyes be soft. Smile at each other like you mean it." },
      { name: "Gentle Awakening", duration: "5 min", description: "One partner offers a slow, full-body presence \u2014 unhurried, present. Simply the gift of being truly felt." },
      { name: "Shakti Play", duration: "8-12 min", description: "Practice the Shakti Wave lightly. Masculine holds steady warmth; feminine moves freely. End when it feels complete." },
    ],
    tip: "Keep it light. Make each other laugh. Sunday mornings should always feel like coming home.",
  },

  // ── TAO (1) ──
  {
    id: "taoist-cultivation",
    tradition: "tao",
    name: "Taoist Cultivation",
    level: "advanced",
    duration: "40-60 min",
    description: "A complete Taoist lovemaking session. Energy activation, chi harmonizing, valley orgasm cycles, and a shared microcosmic orbit meditation. Leave feeling replenished rather than depleted.",
    phases: [
      { name: "Dantian Activation", duration: "8 min", description: "Sit back-to-back. Each place both hands over your lower dantian (3 fingers below the navel). Breathe into this point for 10 minutes, building warmth there. You are stoking the furnace before adding the wood." },
      { name: "Chi Harmonizing", duration: "12 min", description: "Move into Jade Garden. Slow, circular, wavelike. Build heat gradually like coals, not like fire. Expand the warmth from the pelvic floor into the belly, then the chest." },
      { name: "Valley Cultivation", duration: "15-25 min", description: "Practice 4-6 valley orgasm cycles. Rise to 70-80% arousal, pause, circulate the energy upward through the spine and crown, rest in the plateau." },
      { name: "Microcosmic Orbit", duration: "5 min", description: "Lie together in stillness, bodies touching. Visualize golden energy rising up both your spines to the crown with each inhale, then cascading down the front of both bodies. You are one shared circuit." },
    ],
    tip: "The ancient Taoists measured sexual mastery not by intensity but by the vitality of the morning after. How do you feel when you wake?",
  },

  // ── DEIDA (1) ──
  {
    id: "fire-and-surrender",
    tradition: "deida",
    name: "Fire and Surrender",
    level: "intermediate",
    duration: "25-40 min",
    description: "The complete arc of Deida\u2019s polarity teaching lived in one session: from grounded masculine presence to full-spectrum union to soft integrated rest.",
    phases: [
      { name: "Grounding", duration: "5 min", description: "Masculine partner meditates alone in complete stillness. Feminine partner prepares the space \u2014 lighting, scent, her own presence and intention. Both are already practicing before the encounter begins." },
      { name: "Polarity Activation", duration: "8 min", description: "Practice the Gift of Full Desire. Speak truth. Receive truth. Let the authentic desire of both partners create the charge between you before any physical connection." },
      { name: "Edge of Surrender", duration: "10-15 min", description: "Move into Edge of Surrender. Masculine holds absolute presence; feminine expresses and eventually trusts. Stay in full-body presence throughout." },
      { name: "Return", duration: "5 min", description: "Slow gradually. Come together in held stillness \u2014 breathing together, hearts touching. Whisper one true thing to each other before sleeping." },
    ],
    tip: "The willingness to be moved, to be shaken, to be changed by love \u2014 this is the courage Deida asks of both partners.",
  },

  // ── RICHARDSON (5) ──
  {
    id: "soft-middle-union",
    tradition: "richardson",
    name: "Soft Middle Union",
    level: "beginners",
    duration: "10-18 min",
    description: "Man kneels upright at woman\u2019s pelvis while she reclines, a pillow gently raising her hips. The essence is soft entry \u2014 no demand for erection, no performance goal.",
    phases: [
      { name: "Settle", duration: "3 min", description: "Woman reclines, pillow under hips. Man kneels at her pelvis, upright. Both close eyes and scan the body from head to toe, consciously releasing tension. Jaw, shoulders, belly, anus." },
      { name: "Soft Entry", duration: "2 min", description: "Man guides himself gently inside \u2014 softness is welcome, even preferred. No thrust. No goal. Simply rest in the union and breathe slowly into the belly." },
      { name: "Stillness", duration: "8-10 min", description: "Hold the connection without movement. Man brings awareness to the perineum \u2014 the root of the penis \u2014 and consciously relaxes it. Woman breathes into her womb. Let energy awaken on its own." },
      { name: "Integration", duration: "3 min", description: "Separate slowly. Lie side by side, hands on lower belly. Rest in silence for at least 3 minutes before speaking." },
    ],
    tip: "Richardson\u2019s principle: the less you try to make something happen, the more happens. Resist the urge to move. The stillness is not empty \u2014 it is full.",
  },
  {
    id: "scissors-of-stillness",
    tradition: "richardson",
    name: "Scissors of Stillness",
    level: "all levels",
    duration: "12-20 min",
    description: "Both partners lie on their sides, bodies interlaced like scissors. No weight-bearing, no effort. Ideal for long periods of stillness, deep conversation, or meditative connection.",
    phases: [
      { name: "Enter the position", duration: "3 min", description: "Lie facing each other on your sides. One partner gently raises their upper leg; the other slides forward until connection is made. Adjust until both feel fully relaxed \u2014 no tension anywhere." },
      { name: "Body scan together", duration: "3 min", description: "Simultaneously scan from crown to feet. Wherever you find tension, breathe into it and let it go. The goal is two melted, fully relaxed bodies joined at the centre." },
      { name: "Presence practice", duration: "10-15 min", description: "Eyes softly closed or gazing. No movement unless completely spontaneous. Breathe slowly, feeling the warmth between you. When the mind wanders, return to breath and the point of contact." },
    ],
    tip: "This position is perfect for rediscovering each other after conflict or distance. The vulnerability of stillness is the bridge back to intimacy.",
  },
  {
    id: "front-rotation-flow",
    tradition: "richardson",
    name: "Front Rotation Flow",
    level: "intermediate",
    duration: "20-35 min",
    description: "A slow, breath-led rotation through five front-approach positions \u2014 seated, woman rising, middle union, scissors, and return to embrace \u2014 without ever breaking the connection.",
    phases: [
      { name: "Seated Face-to-Face", duration: "5 min", description: "Begin seated, facing each other. Establish breath synchrony. Enter softly and simply sit in the embrace. Spine long, shoulders dropped." },
      { name: "Woman Rising", duration: "4-5 min", description: "Woman slowly rises to a kneeling or seated position on top. No rocking \u2014 just presence in the new orientation. Feel how the angle shifts inner awareness." },
      { name: "Middle Union", duration: "5-8 min", description: "Woman reclines gently, man kneels upright. The classic Richardson stillness position. Pillow under woman\u2019s hips if desired. Hold in complete stillness." },
      { name: "Scissors Transition", duration: "3-5 min", description: "Roll gently to the side without separating. Legs interweave into scissors. Breathe, relax the entire body. This is the deepest rest position in the sequence." },
      { name: "Seated Embrace", duration: "3-5 min", description: "Return together to seated. Hold each other. Close with a long, slow exhale and a bow of gratitude toward each other." },
    ],
    tip: "Move between positions like water \u2014 slowly, without hurry. If connection softens at any point, stay in position. Richardson teaches that soft union is equally \u2014 or more \u2014 powerful.",
  },
  {
    id: "rear-rotation-flow",
    tradition: "richardson",
    name: "Rear Rotation Flow",
    level: "intermediate",
    duration: "20-35 min",
    description: "A sequence through four rear-approach positions \u2014 spooning, kneeling, lying, and seated \u2014 each offering a different quality of receptivity and depth.",
    phases: [
      { name: "Sacred Spoon", duration: "5-8 min", description: "Begin lying on sides, man behind woman. Enter softly from behind and rest in complete stillness. Man breathes into her upper back; woman breathes into her womb. No movement." },
      { name: "Kneeling Rear", duration: "5-7 min", description: "Man rises to kneeling behind woman. He places hands gently on her hips \u2014 not to move, but to feel. Breathe and rest in the new depth." },
      { name: "Lying Rear", duration: "5-8 min", description: "Both slowly lower to lying prone \u2014 man\u2019s full weight gently on woman\u2019s back. Maximum surface contact. Let the weight itself deepen the sense of union." },
      { name: "Seated Rear Embrace", duration: "5 min", description: "Rise together into seated. Woman leans back against man\u2019s chest. His arms wrap around her. Breathe together in silence. Feel the heart-to-back connection." },
    ],
    tip: "Richardson notes that rear positions often release deep emotional holding in women. Tears, laughter, or sighs of relief are welcome. Simply hold the presence \u2014 nothing needs to be fixed.",
  },
  {
    id: "awakening-inner-rod",
    tradition: "richardson",
    name: "Awakening the Inner Rod",
    level: "solo practice",
    duration: "15-20 min",
    description: "A foundational solo practice from Tantric Sex for Men. The perineum is the root of the penis and the seat of male sexual energy. Bringing sustained awareness here transforms a man\u2019s relationship to his sexuality entirely.",
    phases: [
      { name: "Lie in alignment", duration: "3 min", description: "Spine straight, head and neck in one line, legs slightly apart and uncrossed. A small pillow behind the knees. Hands resting palm-down on the groin, either side of the pubic bone." },
      { name: "Scan and release", duration: "3 min", description: "Begin a slow body scan from crown to feet. Release each area \u2014 especially jaw, solar plexus, belly, buttocks, and anus. Let each breath take you deeper into the floor of the body." },
      { name: "Perineum awareness", duration: "10 min", description: "Bring total attention to the perineum. Feel its warmth, its pulse, its life. Visualise the penis as a channel \u2014 a wand of light \u2014 that emanates from this root. Breathe golden warmth upward through it with each inhale." },
      { name: "Rest", duration: "3-5 min", description: "Let go of the visualisation. Simply rest in the body. Notice how the whole pelvic region feels different \u2014 warmer, more alive, more yours." },
    ],
    tip: "Practice this regularly for 2 weeks before doing Richardson\u2019s positions with a partner. The difference in quality of connection will be immediate and unmistakable.",
  },
];
