import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { weatherMoods, weatherMessages } from '@/data/practices';
import { useAuthStore } from '@/store/authStore';
import { useWeatherStore, subscribeToWeather } from '@/store/weatherStore';
import { colors, typography, radii } from '@/theme';

export default function WeatherScreen() {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const { myMood, partnerMood, submitMood } = useWeatherStore();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Subscribe to real-time weather updates
  useEffect(() => {
    if (!profile?.coupleCode || !profile?.partnerId) return;
    const unsub = subscribeToWeather(
      profile.coupleCode,
      profile.uid,
      profile.partnerId
    );
    return () => unsub();
  }, [profile?.coupleCode, profile?.uid, profile?.partnerId]);

  const today = new Date().toISOString().split('T')[0];
  const myTodayMood = myMood?.date === today ? myMood : null;
  const partnerTodayMood = partnerMood?.date === today ? partnerMood : null;

  // Compute combined result
  const combinedKey =
    myTodayMood && partnerTodayMood
      ? `${myTodayMood.mood}+${partnerTodayMood.mood}`
      : null;
  const result = combinedKey ? weatherMessages[combinedKey] : null;

  async function handlePickMood(mood: (typeof weatherMoods)[number]) {
    if (!profile?.coupleCode || !profile?.uid) return;
    setSelectedMood(mood.id);
    await submitMood(profile.coupleCode, profile.uid, mood);
  }

  const isPaired = profile?.partnerId != null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>{'\u2190'} Back</Text>
        </Pressable>

        <Text style={styles.pill}>NEW FEATURE</Text>
        <Text style={styles.title}>Intimacy Weather</Text>
        <Text style={styles.subtitle}>
          Each of you picks your inner state today — privately. Then see each
          other's. One glance, no explanation needed.
        </Text>

        {!isPaired ? (
          <View style={styles.unpaired}>
            <Text style={styles.unpairedIcon}>🔗</Text>
            <Text style={styles.unpairedTitle}>Connect with your partner</Text>
            <Text style={styles.unpairedDesc}>
              Pair with your partner using a couple code to share your Intimacy
              Weather in real time.
            </Text>
            <Pressable
              style={styles.pairBtn}
              onPress={() => router.push('/auth' as any)}
            >
              <Text style={styles.pairBtnText}>Set Up Pairing</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {/* Your mood picker */}
            {!result && (
              <View style={styles.section}>
                <Text style={styles.partnerLabel}>You</Text>
                <View style={styles.moodRow}>
                  {weatherMoods.map((mood) => {
                    const isSelected =
                      myTodayMood?.mood === mood.id ||
                      selectedMood === mood.id;
                    return (
                      <Pressable
                        key={mood.id}
                        style={[
                          styles.moodBtn,
                          isSelected && styles.moodBtnSelected,
                        ]}
                        onPress={() => handlePickMood(mood)}
                        disabled={myTodayMood != null}
                      >
                        <Text style={styles.moodIcon}>{mood.icon}</Text>
                        <Text
                          style={[
                            styles.moodLabel,
                            isSelected && styles.moodLabelSelected,
                          ]}
                        >
                          {mood.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                {myTodayMood && !partnerTodayMood && (
                  <View style={styles.waiting}>
                    <Text style={styles.waitingText}>
                      Waiting for your partner to check in...
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Partner mood (shown when both have submitted) */}
            {result && (
              <View style={styles.resultCard}>
                <Text style={styles.resultIcons}>
                  {myTodayMood?.icon} + {partnerTodayMood?.icon}
                </Text>
                <Text style={styles.resultMsg}>{result.msg}</Text>
                <View style={styles.hintBox}>
                  <Text style={styles.hintLabel}>TONIGHT</Text>
                  <Text style={styles.hintText}>{result.hint}</Text>
                </View>
                <Pressable
                  style={styles.resetBtn}
                  onPress={() => {
                    setSelectedMood(null);
                  }}
                >
                  <Text style={styles.resetText}>Check in again tomorrow</Text>
                </Pressable>
              </View>
            )}
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
    paddingHorizontal: 20,
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
  pill: {
    fontSize: 9,
    letterSpacing: 1.2,
    color: colors.roseLight,
    backgroundColor: 'rgba(192,65,95,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(192,65,95,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    marginBottom: 12,
  },
  title: {
    fontFamily: typography.heading,
    fontSize: 26,
    color: colors.cream,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 24,
    marginBottom: 28,
  },
  section: {
    marginBottom: 24,
  },
  partnerLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.muted,
    marginBottom: 12,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  moodBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    gap: 6,
  },
  moodBtnSelected: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(200,146,74,0.1)',
  },
  moodIcon: {
    fontSize: 22,
  },
  moodLabel: {
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.muted,
  },
  moodLabelSelected: {
    color: colors.gold,
  },
  waiting: {
    marginTop: 24,
    padding: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    alignItems: 'center',
  },
  waitingText: {
    fontFamily: typography.heading,
    fontStyle: 'italic',
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 28,
    alignItems: 'center',
  },
  resultIcons: {
    fontSize: 32,
    marginBottom: 20,
  },
  resultMsg: {
    fontFamily: typography.heading,
    fontStyle: 'italic',
    fontSize: 17,
    color: colors.cream,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 24,
  },
  hintBox: {
    width: '100%',
    backgroundColor: 'rgba(200,146,74,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(200,146,74,0.14)',
    borderRadius: radii.md,
    padding: 16,
    marginBottom: 20,
  },
  hintLabel: {
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.gold,
    marginBottom: 6,
  },
  hintText: {
    fontFamily: typography.heading,
    fontStyle: 'italic',
    fontSize: 14,
    color: colors.muted,
    lineHeight: 22,
  },
  resetBtn: {
    paddingVertical: 8,
  },
  resetText: {
    fontSize: 12,
    color: colors.dim,
    letterSpacing: 0.5,
  },
  unpaired: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 28,
    alignItems: 'center',
  },
  unpairedIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  unpairedTitle: {
    fontFamily: typography.heading,
    fontSize: 18,
    color: colors.cream,
    marginBottom: 8,
  },
  unpairedDesc: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  pairBtn: {
    backgroundColor: colors.gold,
    paddingVertical: 11,
    paddingHorizontal: 24,
    borderRadius: radii.sm,
  },
  pairBtnText: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.ink,
    fontWeight: '600',
  },
});
