import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography, radii, tradColors } from '@/theme';

const teachers = [
  {
    id: 'tantra',
    name: 'Tantra',
    type: 'Tradition',
    icon: '🔥',
    essence: 'Energy, breath, union — the oldest map of sacred sexuality.',
    colorKey: 'tantra' as const,
  },
  {
    id: 'tao',
    name: 'Tao',
    type: 'Tradition',
    icon: '☯️',
    essence: 'Conservation, circulation, patience — sexual alchemy that builds vitality.',
    colorKey: 'tao' as const,
  },
  {
    id: 'deida',
    name: 'David Deida',
    type: 'Teacher',
    icon: '⚡',
    essence: 'The living electricity between masculine and feminine. Depth, presence, polarity.',
    colorKey: 'deida' as const,
  },
  {
    id: 'richardson',
    name: 'Diana Richardson',
    type: 'Teacher',
    icon: '🌸',
    essence: 'Slowness, softness, awareness. A return to the body\'s own intelligence.',
    colorKey: 'richardson' as const,
  },
  {
    id: 'anand',
    name: 'Margot Anand',
    type: 'Teacher',
    icon: '✨',
    essence: 'Ecstasy as a spiritual path. SkyDancing Tantra — where pleasure, love, and awakening become one.',
    colorKey: 'anand' as const,
  },
];

export default function TeachersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>LINEAGE</Text>
        <Text style={styles.title}>Teachers</Text>
        <Text style={styles.subtitle}>
          Four voices, one invitation: return to the body, the breath, and each
          other.
        </Text>

        <View style={styles.list}>
          {teachers.map((t) => {
            const c = tradColors[t.colorKey];
            return (
              <Pressable
                key={t.id}
                style={styles.card}
                onPress={() => router.push(`/tradition/${t.id}` as any)}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>{t.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardType}>{t.type}</Text>
                    <Text style={[styles.cardName, { color: c.light }]}>
                      {t.name}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cardEssence}>{t.essence}</Text>
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
    maxWidth: 400,
    marginBottom: 28,
  },
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 22,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 30,
  },
  cardType: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.dim,
    marginBottom: 2,
  },
  cardName: {
    fontFamily: typography.heading,
    fontSize: 20,
  },
  cardEssence: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 22,
  },
});
