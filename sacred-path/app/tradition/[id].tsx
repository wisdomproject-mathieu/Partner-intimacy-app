import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, typography, radii, tradColors } from '@/theme';
import type { TraditionId } from '@/theme';

// Tradition metadata — will be expanded with full data from JSON files
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
};

export default function TraditionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const tradition = traditions[id || ''];
  const tradKey = (id || 'tantra') as TraditionId;
  const c = tradColors[tradKey] || tradColors.tantra;

  if (!tradition) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>Tradition not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>{'\u2190'} Back</Text>
        </Pressable>

        <Text style={styles.type}>{tradition.type}</Text>
        <Text style={[styles.title, { color: c.light }]}>
          {tradition.icon} {tradition.name}
        </Text>
        <Text style={styles.intro}>{tradition.intro}</Text>

        {/* Pillars */}
        <Text style={styles.sectionLabel}>CORE PILLARS</Text>
        <View style={styles.pillars}>
          {tradition.pillars.map((p, i) => (
            <View key={i} style={[styles.pillarCard, { borderColor: c.border }]}>
              <Text style={[styles.pillarNum, { color: c.primary }]}>{i + 1}</Text>
              <Text style={styles.pillarText}>{p}</Text>
            </View>
          ))}
        </View>

        {/* Placeholder for wisdom quotes and positions */}
        <View style={styles.divider} />
        <Text style={styles.sectionLabel}>WISDOM</Text>
        <Text style={styles.comingSoon}>
          Full wisdom quotes and guided positions coming in the next build.
        </Text>
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
    paddingBottom: 40,
  },
  back: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  backText: {
    fontSize: 13,
    color: colors.dim,
  },
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
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: colors.gold,
    marginBottom: 14,
  },
  pillars: {
    gap: 10,
    marginBottom: 28,
  },
  pillarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: 16,
  },
  pillarNum: {
    fontSize: 16,
    fontWeight: '600',
    width: 24,
    textAlign: 'center',
  },
  pillarText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(200,140,90,0.14)',
    marginVertical: 28,
  },
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
