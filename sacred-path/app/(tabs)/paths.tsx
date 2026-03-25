import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography, radii, tradColors } from '@/theme';

const paths = [
  {
    id: 'tantra',
    title: 'Tantra',
    subtitle: 'Energy, breath, union. The oldest map of sacred sexuality — from body to spirit.',
    colorKey: 'tantra' as const,
  },
  {
    id: 'tao',
    title: 'Tao',
    subtitle: 'Conservation, circulation, patience. The Taoist art of sexual alchemy.',
    colorKey: 'tao' as const,
  },
  {
    id: 'deida',
    title: 'David Deida',
    subtitle: 'Polarity, presence, depth. The electricity between masculine and feminine.',
    colorKey: 'deida' as const,
  },
  {
    id: 'richardson',
    title: 'Diana Richardson',
    subtitle: 'Slowness, softness, awareness. A return to the body\'s own intelligence.',
    colorKey: 'richardson' as const,
  },
];

export default function PathsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>ANCIENT WISDOM</Text>
        <Text style={styles.title}>Sacred Paths</Text>
        <Text style={styles.subtitle}>
          Two living traditions, thousands of years old. Each offers a complete
          map for the sacred life of a couple.
        </Text>

        <View style={styles.grid}>
          {paths.map((path) => {
            const c = tradColors[path.colorKey];
            return (
              <Pressable
                key={path.id}
                style={styles.card}
                onPress={() => router.push(`/tradition/${path.id}` as any)}
              >
                <Text style={[styles.cardTitle, { color: c.light }]}>
                  {path.title}
                </Text>
                <Text style={styles.cardDesc}>{path.subtitle}</Text>
                <Text style={styles.go}>Explore {'\u2192'}</Text>
              </Pressable>
            );
          })}
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
    maxWidth: 440,
    marginBottom: 28,
  },
  grid: {
    gap: 14,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 22,
  },
  cardTitle: {
    fontFamily: typography.heading,
    fontSize: 20,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 22,
    marginBottom: 12,
  },
  go: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.dim,
  },
});
