import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { dailyPractices } from '@/data/practices';
import { colors, typography, radii, tradColors } from '@/theme';
import type { TraditionId } from '@/theme';

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export function DailyPracticeCard() {
  const router = useRouter();
  const practice = dailyPractices[getDayOfYear() % dailyPractices.length];
  const tradKey = practice.page as TraditionId;
  const tradColor = tradColors[tradKey]?.light || colors.gold;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>TODAY'S PRACTICE</Text>
        <Text style={[styles.tradition, { color: tradColor }]}>
          {practice.tradition}
        </Text>
      </View>
      <Text style={styles.title}>{practice.title}</Text>
      <Text style={styles.description}>{practice.description}</Text>
      <Pressable
        onPress={() => router.push(`/tradition/${practice.page}` as any)}
        style={styles.goButton}
      >
        <Text style={styles.goText}>Open full practice {'\u2192'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 22,
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
    letterSpacing: 2,
    color: colors.gold,
  },
  tradition: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: typography.heading,
    fontSize: 20,
    color: colors.cream,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 25,
    marginBottom: 16,
  },
  goButton: {
    paddingVertical: 4,
  },
  goText: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.dim,
  },
});
