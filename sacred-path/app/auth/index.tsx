import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createCoupleCode, joinCouple } from '@/lib/couple';
import { colors, typography, radii } from '@/theme';

type Mode = 'signin' | 'signup' | 'pair';

export default function AuthScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [coupleCode, setCoupleCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!email || !password) return;
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      router.back();
    } catch (e: any) {
      Alert.alert('Sign In Failed', e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp() {
    if (!email || !password || !name) return;
    setLoading(true);
    try {
      const cred = await auth().createUserWithEmailAndPassword(email, password);
      await firestore().collection('users').doc(cred.user.uid).set({
        name,
        email,
        coupleCode: null,
        partnerId: null,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setMode('pair');
    } catch (e: any) {
      Alert.alert('Sign Up Failed', e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCode() {
    const user = auth().currentUser;
    if (!user || !name) return;
    setLoading(true);
    try {
      const code = await createCoupleCode(user.uid, name);
      Alert.alert(
        'Your Couple Code',
        `Share this code with your partner: ${code}`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (e: any) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleJoinCode() {
    const user = auth().currentUser;
    if (!user || !coupleCode || !name) return;
    setLoading(true);
    try {
      await joinCouple(user.uid, name, coupleCode.toUpperCase());
      Alert.alert('Connected!', 'You and your partner are now linked.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (e: any) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => router.back()} style={styles.close}>
            <Text style={styles.closeText}>{'\u2715'}</Text>
          </Pressable>

          {mode === 'pair' ? (
            <>
              <Text style={styles.title}>Connect with Partner</Text>
              <Text style={styles.subtitle}>
                Create a couple code to share, or enter your partner's code to
                connect.
              </Text>

              <Pressable
                style={styles.primaryBtn}
                onPress={handleCreateCode}
                disabled={loading}
              >
                <Text style={styles.primaryBtnText}>Create Couple Code</Text>
              </Pressable>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <TextInput
                style={styles.input}
                value={coupleCode}
                onChangeText={setCoupleCode}
                placeholder="Enter partner's code"
                placeholderTextColor={colors.dim}
                autoCapitalize="characters"
                maxLength={6}
              />
              <Pressable
                style={styles.secondaryBtn}
                onPress={handleJoinCode}
                disabled={loading || coupleCode.length < 6}
              >
                <Text style={styles.secondaryBtnText}>Join Partner</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.title}>
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </Text>
              <Text style={styles.subtitle}>
                {mode === 'signin'
                  ? 'Sign in to sync with your partner.'
                  : 'Join Sacred Path to connect with your partner.'}
              </Text>

              {mode === 'signup' && (
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Your first name"
                  placeholderTextColor={colors.dim}
                  autoCapitalize="words"
                />
              )}
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor={colors.dim}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={colors.dim}
                secureTextEntry
              />

              <Pressable
                style={styles.primaryBtn}
                onPress={mode === 'signin' ? handleSignIn : handleSignUp}
                disabled={loading}
              >
                <Text style={styles.primaryBtnText}>
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.switchBtn}
                onPress={() =>
                  setMode(mode === 'signin' ? 'signup' : 'signin')
                }
              >
                <Text style={styles.switchText}>
                  {mode === 'signin'
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Sign In'}
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.ink,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  close: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 20,
  },
  closeText: {
    fontSize: 20,
    color: colors.dim,
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
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    color: colors.text,
    fontSize: 16,
    padding: 14,
    marginBottom: 14,
  },
  primaryBtn: {
    backgroundColor: colors.gold,
    paddingVertical: 14,
    borderRadius: radii.sm,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnText: {
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.ink,
    fontWeight: '600',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: 'rgba(200,140,90,0.2)',
    paddingVertical: 14,
    borderRadius: radii.sm,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryBtnText: {
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  switchBtn: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 13,
    color: colors.dim,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(200,140,90,0.14)',
  },
  dividerText: {
    fontSize: 12,
    color: colors.dim,
  },
});
