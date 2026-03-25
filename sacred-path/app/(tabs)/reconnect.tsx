import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography, radii } from '@/theme';

const doorways = [
  {
    id: 'weather',
    icon: '🌡️',
    title: 'Intimacy Weather',
    description: 'Name your emotional climate before touch and receive a gentler doorway back into each other.',
    route: '/reconnect/weather',
  },
  {
    id: 'thread',
    icon: '🧵',
    title: 'The Thread',
    description: 'Leave one small gratitude for tonight and let tenderness accumulate over time.',
    route: '/reconnect/thread',
  },
  {
    id: 'unsaid',
    icon: '🤫',
    title: 'The Unsaid',
    description: 'Write what feels unspoken first, privately, before it hardens into distance.',
    route: '/reconnect/unsaid',
  },
  {
    id: 'games',
    icon: '✨',
    title: 'Intimacy Games',
    description: 'A playful prompt to share through the day or start the evening with.',
    route: '/reconnect/games',
  },
] as const;

export default function ReconnectScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>FOR TWO</Text>
        <Text style={styles.title}>Reconnect</Text>
        <Text style={styles.subtitle}>
          Practical tools to help you return to each other tonight — through
          breath, honesty, touch, softness and embodied presence.
        </Text>

        <View style={styles.hubCard}>
          <Text style={styles.hubLabel}>RECONNECT TONIGHT</Text>
          <Text style={styles.hubTitle}>
            Choose one doorway back{'\n'}into each other — then let{'\n'}the rest disappear.
          </Text>

          <View style={styles.grid}>
            {doorways.map((d) => (
              <Pressable
                key={d.id}
                style={styles.doorway}
                onPress={() => router.push(d.route as any)}
              >
                <Text style={styles.doorwayIcon}>{d.icon}</Text>
                <Text style={styles.doorwayTitle}>{d.title}</Text>
                <Text style={styles.doorwayDesc}>{d.description}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.ink,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 10,
    letterSpacing: 2,
    color: colors.gold,
    marginBottom: 6,
  },
  title: {
    fontFamily: typography.heading,
    fontSize: 28,
    color: colors.cream,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 25,
    maxWidth: 400,
    marginBottom: 22,
  },
  hubCard: {
    backgroundColor: '#1c1008',
    borderWidth: 1,
    borderColor: 'rgba(200,146,74,0.22)',
    borderRadius: radii.lg,
    padding: 20,
  },
  hubLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: colors.gold,
    marginBottom: 12,
  },
  hubTitle: {
    fontFamily: typography.heading,
    fontSize: 18,
    color: colors.cream,
    lineHeight: 28,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  doorway: {
    width: '47%',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: 16,
  },
  doorwayIcon: {
    fontSize: 22,
    marginBottom: 8,
  },
  doorwayTitle: {
    fontFamily: typography.heading,
    fontSize: 15,
    color: colors.cream,
    marginBottom: 6,
  },
  doorwayDesc: {
    fontSize: 12,
    color: colors.muted,
    lineHeight: 18,
  },
});
