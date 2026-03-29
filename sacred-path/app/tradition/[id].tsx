import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, typography, radii, tradColors } from '@/theme';
import type { TraditionId } from '@/theme';
import { wisdom } from '@/data/wisdom';
import { teacherRituals } from '@/data/practices';

const traditions: Record<string, { name: string; type: string; icon: string; intro: string; pillars: string[] }> = {
  tantra: {
    name: 'Tantra',
    type: 'Tradition',
    icon: '🔥',
    intro: 'Tantra teaches that the body is a temple, breath is prayer, and lovemaking — approached with awareness — is the most direct path to spiritual union two people can walk together.',
    pillars: ['Energy (Shakti/Kundalini)', 'Breath (Pranayama)', 'Sacred Union (Maithuna)', 'Chakra Awakening'],
  },
  tao: {
    name: 'Tao',
    type: 'Tradition',
    icon: '☯️',
    intro: 'The Taoist bedroom arts teach couples to cultivate, conserve, and circulate sexual energy — transforming raw desire into lasting vitality, deeper bonding, and spiritual luminosity.',
    pillars: ['Conservation (Jing)', 'Circulation (Chi Kung)', 'Valley Orgasm', 'Dual Cultivation'],
  },
  deida: {
    name: 'David Deida',
    type: 'Teacher',
    icon: '⚡',
    intro: "Deida's work maps the living electricity between masculine and feminine essences — depth, presence, polarity, and the courage to love without holding back.",
    pillars: ['Masculine Presence', 'Feminine Radiance', 'Sexual Polarity', 'Heart-Open Living'],
  },
  richardson: {
    name: 'Diana Richardson',
    type: 'Teacher',
    icon: '🌸',
    intro: "Richardson invites couples to slow everything down, drop all goals, and discover the body's own electromagnetic intelligence — a quiet revolution in how we make love.",
    pillars: ['Slow Sex', 'Relaxation into Feeling', 'Cool Approach', 'Body Intelligence'],
  },
  anand: {
    name: 'Margot Anand',
    type: 'Teacher',
    icon: '✨',
    intro: "Margot Anand brought SkyDancing Tantra from the East to the West, teaching that ecstasy is not a distraction from the spiritual path — it is the path. Through conscious breath, sacred ceremony, and the full embrace of pleasure, couples discover that lovemaking can be a vehicle for deep awakening.",
    pillars: ['SkyDancing Tantra', 'Ecstatic States', 'Sexual Magic', 'Love & Awakening'],
  },
};

const WISDOM_KEY: Record<string, string> = {
  richardson: 'Richardson',
  deida: 'Deida',
  anand: 'Anand',
};

const TEACHER_IDS = new Set(['richardson', 'deida', 'anand']);

type TradColors = { primary: string; light: string; bg: string; border: string };

function LockedQuoteCard({ q, c }: { q: { id: number; work: string; quote: string }; c: TradColors }) {
  return (
    <View style={[styles.lockedQuoteWrapper, { borderColor: c.border }]}>
      <View style={styles.lockedQuoteGhost}>
        <Text style={styles.ghostWork}>{q.work}</Text>
        <Text style={styles.ghostText} numberOfLines={3}>"{q.quote}"</Text>
      </View>
      <View style={styles.lockedQuoteOverlay}>
        <Text style={styles.lockEmoji}>🔒</Text>
        <Text style={[styles.premiumLabel, { color: c.light }]}>Premium</Text>
        <Text style={styles.unlockHint}>Available with subscription</Text>
      </View>
    </View>
  );
}

function LockedRitualCard({ ritual, c }: { ritual: { icon: string; title: string }; c: TradColors }) {
  return (
    <View style={[styles.lockedRitualCard, { borderColor: c.border }]}>
      <View style={styles.ritualHeader}>
        <Text style={[styles.ritualIcon, { opacity: 0.38 }]}>{ritual.icon}</Text>
        <Text style={styles.lockedRitualTitle}>{ritual.title}</Text>
        <Text style={styles.lockEmojiSmall}>🔒</Text>
      </View>
      <View style={styles.lockedRitualBody}>
        <Text style={styles.lockedRitualHint}>Subscribe to unlock this ritual</Text>
      </View>
    </View>
  );
}

function SubscriptionBanner({ c }: { c: TradColors }) {
  const benefits = [
    '43 wisdom quotes across all 5 teachers',
    'Sacred rituals for every tradition',
    'Guided positions & intimate sequences',
    '30-day couples awakening journey',
    'Semen retention & advanced practices',
    'Full SkyDancing Tantra curriculum',
  ];

  return (
    <View style={styles.subBanner}>
      <View style={styles.subTopAccent} />
      <View style={styles.subInner}>
        <View style={styles.subBadgeRow}>
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonBadgeText}>✦  COMING SOON</Text>
          </View>
        </View>

        <Text style={styles.subTitle}>Unlock the Full{'\n'}Sacred Path</Text>
        <Text style={styles.subSubtitle}>
          What you see here is only the beginning. The full app brings the complete teachings of every tradition — deep, guided, and beautifully woven for couples.
        </Text>

        <View style={styles.benefitsList}>
          {benefits.map((b, i) => (
            <View key={i} style={styles.benefitRow}>
              <Text style={[styles.benefitCheck, { color: c.light }]}>✓</Text>
              <Text style={styles.benefitText}>{b}</Text>
            </View>
          ))}
        </View>

        <Pressable style={[styles.subButton, { backgroundColor: c.primary }]}>
          <Text style={styles.subButtonText}>Join the Waitlist  →</Text>
        </Pressable>

        <Text style={styles.subFooter}>
          The full path is being woven.{'\n'}Be the first to walk it.
        </Text>
      </View>
    </View>
  );
}

export default function TraditionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const tradition = traditions[id || ''];
  const tradKey = (id || 'tantra') as TraditionId;
  const c = tradColors[tradKey] || tradColors.tantra;
  const isTeacher = TEACHER_IDS.has(id || '');

  const quotes = isTeacher
    ? wisdom.filter(q => q.tradition === WISDOM_KEY[id || ''])
    : [];
  const freeQuotes = quotes.slice(0, 3);
  const lockedQuotes = quotes.slice(3);

  const rituals = isTeacher ? (teacherRituals[id || ''] ?? []) : [];
  const freeRitual = rituals.find(r => r.free) ?? null;
  const lockedRituals = rituals.filter(r => !r.free);

  if (!tradition) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>Tradition not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>{'\u2190'} Back</Text>
        </Pressable>

        <Text style={styles.type}>{tradition.type}</Text>
        <Text style={[styles.title, { color: c.light }]}>
          {tradition.icon} {tradition.name}
        </Text>
        <Text style={styles.intro}>{tradition.intro}</Text>

        {/* Core Pillars */}
        <Text style={styles.sectionLabel}>CORE PILLARS</Text>
        <View style={styles.pillars}>
          {tradition.pillars.map((p, i) => (
            <View key={i} style={[styles.pillarCard, { borderColor: c.border }]}>
              <Text style={[styles.pillarNum, { color: c.primary }]}>{i + 1}</Text>
              <Text style={styles.pillarText}>{p}</Text>
            </View>
          ))}
        </View>

        {isTeacher ? (
          <>
            {/* ── Wisdom Quotes ── */}
            <View style={styles.divider} />
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionLabel}>WISDOM</Text>
              <Text style={styles.sectionMeta}>{freeQuotes.length} free · {lockedQuotes.length} premium</Text>
            </View>

            <View style={styles.quotesList}>
              {freeQuotes.map(q => (
                <View key={q.id} style={[styles.quoteCard, { borderColor: c.border }]}>
                  <Text style={[styles.quoteWork, { color: c.light }]}>{q.work}</Text>
                  <Text style={styles.quoteText}>"{q.quote}"</Text>
                  {q.insight && (
                    <Text style={styles.quoteInsight}>{q.insight}</Text>
                  )}
                </View>
              ))}

              {lockedQuotes.map(q => (
                <LockedQuoteCard key={q.id} q={q} c={c} />
              ))}
            </View>

            {/* ── Sacred Rituals ── */}
            <View style={styles.divider} />
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionLabel}>SACRED RITUALS</Text>
              <Text style={styles.sectionMeta}>1 free · {lockedRituals.length} premium</Text>
            </View>

            <View style={styles.ritualsList}>
              {freeRitual && (
                <View style={[styles.ritualCard, { borderColor: c.border }]}>
                  <View style={styles.ritualHeader}>
                    <Text style={styles.ritualIcon}>{freeRitual.icon}</Text>
                    <Text style={[styles.ritualTitle, { color: c.light }]}>{freeRitual.title}</Text>
                    <View style={[styles.freeBadge, { borderColor: c.border }]}>
                      <Text style={[styles.freeBadgeText, { color: c.light }]}>Free</Text>
                    </View>
                  </View>
                  <Text style={styles.ritualText}>{freeRitual.text}</Text>
                  <Text style={[styles.ritualSrc, { color: c.primary }]}>{freeRitual.src}</Text>
                </View>
              )}

              {lockedRituals.map((r, i) => (
                <LockedRitualCard key={i} ritual={r} c={c} />
              ))}
            </View>

            {/* ── Subscription Banner ── */}
            <View style={styles.divider} />
            <SubscriptionBanner c={c} />
          </>
        ) : (
          <>
            <View style={styles.divider} />
            <Text style={styles.sectionLabel}>WISDOM</Text>
            <Text style={styles.comingSoon}>
              Full wisdom quotes and guided positions coming in the next build.
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.ink,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 48,
  },
  back: { paddingVertical: 8, marginBottom: 8 },
  backText: { fontSize: 13, color: colors.dim },
  type: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.gold,
    marginBottom: 6,
  },
  title: {
    fontFamily: typography.heading,
    fontSize: 30,
    marginBottom: 16,
  },
  intro: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 27,
    marginBottom: 28,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: colors.gold,
  },
  sectionMeta: {
    fontSize: 10,
    color: colors.dim,
    letterSpacing: 0.5,
  },
  pillars: { gap: 10, marginBottom: 28 },
  pillarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: 16,
  },
  pillarNum: { fontSize: 16, fontWeight: '600', width: 24, textAlign: 'center' },
  pillarText: { fontSize: 14, color: colors.text, flex: 1 },
  divider: {
    height: 1,
    backgroundColor: 'rgba(200,140,90,0.14)',
    marginVertical: 28,
  },

  // ── Free Quotes ──
  quotesList: { gap: 14 },
  quoteCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: 20,
  },
  quoteWork: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  quoteText: {
    fontFamily: typography.heading,
    fontStyle: 'italic',
    fontSize: 15,
    color: colors.cream,
    lineHeight: 26,
    marginBottom: 12,
  },
  quoteInsight: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 22,
    borderTopWidth: 1,
    borderTopColor: 'rgba(200,140,90,0.12)',
    paddingTop: 12,
  },

  // ── Locked Quotes ──
  lockedQuoteWrapper: {
    borderRadius: radii.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  lockedQuoteGhost: {
    backgroundColor: colors.card,
    padding: 20,
    minHeight: 110,
  },
  ghostWork: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.muted,
    marginBottom: 10,
    opacity: 0.2,
  },
  ghostText: {
    fontFamily: typography.heading,
    fontStyle: 'italic',
    fontSize: 15,
    color: colors.cream,
    lineHeight: 26,
    opacity: 0.1,
  },
  lockedQuoteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(9,4,10,0.86)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  lockEmoji: { fontSize: 20, marginBottom: 2 },
  premiumLabel: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  unlockHint: {
    fontSize: 11,
    color: colors.dim,
    letterSpacing: 0.5,
  },

  // ── Free Ritual ──
  ritualsList: { gap: 14 },
  ritualCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: 20,
  },
  ritualHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  ritualIcon: { fontSize: 22 },
  ritualTitle: {
    fontFamily: typography.heading,
    fontSize: 17,
    flex: 1,
  },
  freeBadge: {
    borderWidth: 1,
    borderRadius: radii.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  freeBadgeText: {
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  ritualText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 25,
    marginBottom: 12,
  },
  ritualSrc: {
    fontSize: 11,
    letterSpacing: 0.4,
    fontStyle: 'italic',
  },

  // ── Locked Ritual ──
  lockedRitualCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: 20,
  },
  lockedRitualTitle: {
    fontFamily: typography.heading,
    fontSize: 17,
    color: colors.muted,
    flex: 1,
    opacity: 0.5,
  },
  lockEmojiSmall: { fontSize: 15 },
  lockedRitualBody: {
    backgroundColor: 'rgba(9,4,10,0.55)',
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: 'rgba(200,140,90,0.1)',
    paddingVertical: 18,
    alignItems: 'center',
  },
  lockedRitualHint: {
    fontSize: 12,
    color: colors.dim,
    fontStyle: 'italic',
    letterSpacing: 0.4,
  },

  // ── Subscription Banner ──
  subBanner: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(200,140,90,0.28)',
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  subTopAccent: {
    height: 3,
    backgroundColor: colors.gold,
    opacity: 0.7,
  },
  subInner: {
    padding: 24,
  },
  subBadgeRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  comingSoonBadge: {
    backgroundColor: 'rgba(200,140,90,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(200,140,90,0.42)',
    borderRadius: radii.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  comingSoonBadgeText: {
    fontSize: 10,
    letterSpacing: 2.5,
    color: colors.gold,
    fontWeight: '700',
  },
  subTitle: {
    fontFamily: typography.heading,
    fontSize: 24,
    color: colors.cream,
    lineHeight: 34,
    marginBottom: 12,
  },
  subSubtitle: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 23,
    marginBottom: 22,
  },
  benefitsList: { gap: 11, marginBottom: 26 },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  benefitCheck: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 1,
    width: 16,
  },
  benefitText: {
    fontSize: 13,
    color: colors.text,
    flex: 1,
    lineHeight: 21,
  },
  subButton: {
    borderRadius: radii.lg,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 18,
  },
  subButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.6,
  },
  subFooter: {
    fontSize: 12,
    color: colors.dim,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // ── Fallback ──
  comingSoon: {
    fontFamily: typography.heading,
    fontStyle: 'italic',
    fontSize: 14,
    color: colors.dim,
    textAlign: 'center',
    paddingVertical: 20,
  },
  notFound: {
    fontSize: 16,
    color: colors.dim,
    textAlign: 'center',
    marginTop: 100,
  },
});
