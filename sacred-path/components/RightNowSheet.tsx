import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import { rightNowPractices, rightNowMoods } from '@/data/practices';
import { colors, typography, radii, tradColors } from '@/theme';
import type { TraditionId } from '@/theme';

export function RightNowSheet() {
  const [visible, setVisible] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [practice, setPractice] = useState<{
    tradition: string;
    title: string;
    description: string;
    duration: string;
  } | null>(null);

  function pickMood(moodId: string) {
    const list = rightNowPractices[moodId];
    if (!list) return;
    const p = list[Math.floor(Math.random() * list.length)];
    setSelectedMood(moodId);
    setPractice(p);
  }

  function reset() {
    setSelectedMood(null);
    setPractice(null);
  }

  function close() {
    setVisible(false);
    reset();
  }

  return (
    <>
      <Pressable style={styles.trigger} onPress={() => setVisible(true)}>
        <Text style={styles.triggerIcon}>{'\u25B6'}</Text>
        <Text style={styles.triggerText}>Right Now</Text>
      </Pressable>

      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={close}
      >
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Right Now</Text>
          <Text style={styles.sheetSub}>
            What do you need tonight?
          </Text>

          {!practice ? (
            <View style={styles.moodGrid}>
              {rightNowMoods.map((mood) => (
                <Pressable
                  key={mood.id}
                  style={styles.moodCard}
                  onPress={() => pickMood(mood.id)}
                >
                  <Text style={styles.moodIcon}>{mood.icon}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                  <Text style={styles.moodDesc}>{mood.description}</Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <ScrollView style={styles.resultContainer}>
              <View style={styles.resultCard}>
                <Text style={styles.resultMeta}>
                  {practice.tradition} · {practice.duration}
                </Text>
                <Text style={styles.resultTitle}>{practice.title}</Text>
                <Text style={styles.resultDesc}>{practice.description}</Text>
              </View>
              <Pressable style={styles.anotherBtn} onPress={reset}>
                <Text style={styles.anotherText}>Try another</Text>
              </Pressable>
            </ScrollView>
          )}

          <Pressable style={styles.closeBtn} onPress={close}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(200,146,74,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(200,146,74,0.22)',
    borderRadius: radii.sm,
    marginHorizontal: 16,
    marginTop: 16,
  },
  triggerIcon: {
    fontSize: 10,
    color: colors.gold,
  },
  triggerText: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.gold,
    fontWeight: '500',
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.ink,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(200,140,90,0.3)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontFamily: typography.heading,
    fontSize: 24,
    color: colors.cream,
    marginBottom: 8,
  },
  sheetSub: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 24,
    marginBottom: 28,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moodCard: {
    width: '47%',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: 18,
    alignItems: 'center',
    gap: 6,
  },
  moodIcon: {
    fontSize: 28,
  },
  moodLabel: {
    fontFamily: typography.heading,
    fontSize: 16,
    color: colors.cream,
  },
  moodDesc: {
    fontSize: 11,
    color: colors.dim,
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
  },
  resultCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 24,
  },
  resultMeta: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.gold,
    marginBottom: 12,
  },
  resultTitle: {
    fontFamily: typography.heading,
    fontSize: 22,
    color: colors.cream,
    marginBottom: 12,
  },
  resultDesc: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 26,
  },
  anotherBtn: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(200,140,90,0.2)',
    borderRadius: radii.sm,
  },
  anotherText: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  closeBtn: {
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  closeText: {
    fontSize: 13,
    color: colors.dim,
    letterSpacing: 0.5,
  },
});
