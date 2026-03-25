import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import firestore from '@react-native-firebase/firestore';
import { useAuthStore } from '@/store/authStore';
import { colors, typography, radii } from '@/theme';

interface ThreadEntry {
  id: string;
  text: string;
  authorName: string;
  date: string;
  createdAt: any;
}

export default function ThreadScreen() {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const [entries, setEntries] = useState<ThreadEntry[]>([]);
  const [text, setText] = useState('');
  const isPaired = profile?.coupleCode != null;

  useEffect(() => {
    if (!profile?.coupleCode) return;
    const unsub = firestore()
      .collection('couples')
      .doc(profile.coupleCode)
      .collection('thread')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot((snap) => {
        const items: ThreadEntry[] = [];
        snap.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as ThreadEntry);
        });
        setEntries(items);
      });
    return () => unsub();
  }, [profile?.coupleCode]);

  const submit = useCallback(async () => {
    if (!text.trim() || !profile?.coupleCode || !profile?.name) return;
    const entry = {
      text: text.trim(),
      authorName: profile.name,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    await firestore()
      .collection('couples')
      .doc(profile.coupleCode)
      .collection('thread')
      .add(entry);
    setText('');
  }, [text, profile]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backText}>{'\u2190'} Back</Text>
          </Pressable>
        </View>

        <Text style={styles.title}>The Thread</Text>
        <Text style={styles.subtitle}>
          Leave one small gratitude, appreciation or tender thought. Let them
          accumulate like a golden thread between you.
        </Text>

        {!isPaired ? (
          <View style={styles.unpaired}>
            <Text style={styles.unpairedText}>
              Connect with your partner to share The Thread.
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={entries}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
              ListEmptyComponent={
                <Text style={styles.empty}>
                  No entries yet. Be the first to add a thread.
                </Text>
              }
              renderItem={({ item }) => (
                <View style={styles.entry}>
                  <Text style={styles.entryText}>"{item.text}"</Text>
                  <Text style={styles.entryMeta}>
                    {item.authorName} · {item.date}
                  </Text>
                </View>
              )}
            />

            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="One small thing you appreciate..."
                placeholderTextColor={colors.dim}
                multiline
              />
              <Pressable
                style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
                onPress={submit}
                disabled={!text.trim()}
              >
                <Text style={styles.sendText}>Add</Text>
              </Pressable>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.ink,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 13,
    color: colors.dim,
  },
  title: {
    fontFamily: typography.heading,
    fontSize: 26,
    color: colors.cream,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 20,
    gap: 12,
  },
  entry: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: 16,
  },
  entryText: {
    fontFamily: typography.heading,
    fontStyle: 'italic',
    fontSize: 15,
    color: colors.cream,
    lineHeight: 24,
    marginBottom: 8,
  },
  entryMeta: {
    fontSize: 11,
    color: colors.dim,
  },
  empty: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 14,
    color: colors.dim,
    paddingVertical: 40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    color: colors.text,
    fontFamily: typography.heading,
    fontStyle: 'italic',
    fontSize: 15,
    padding: 12,
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: colors.gold,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: radii.sm,
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
  sendText: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.ink,
    fontWeight: '600',
  },
  unpaired: {
    margin: 20,
    padding: 30,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    alignItems: 'center',
  },
  unpairedText: {
    fontStyle: 'italic',
    fontSize: 14,
    color: colors.dim,
    textAlign: 'center',
  },
});
