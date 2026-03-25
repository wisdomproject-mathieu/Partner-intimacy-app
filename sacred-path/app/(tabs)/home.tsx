import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WisdomCarousel } from '@/components/WisdomCarousel';
import { DailyPracticeCard } from '@/components/DailyPracticeCard';
import { RightNowSheet } from '@/components/RightNowSheet';
import { colors, typography } from '@/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            <Text style={styles.logoAccent}>Sacred</Text> Path
          </Text>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Private. Beautiful. Yours.</Text>
          <Text style={styles.heroSub}>
            Daily wisdom and practices for couples seeking sacred intimacy.
          </Text>
        </View>

        {/* Right Now button */}
        <RightNowSheet />

        {/* Swipe Wisdom Carousel */}
        <WisdomCarousel />

        {/* Daily Practice */}
        <DailyPracticeCard />

        {/* Bottom spacer */}
        <View style={{ height: 32 }} />
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
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  logo: {
    fontFamily: typography.heading,
    fontSize: 19,
    color: colors.cream,
  },
  logoAccent: {
    color: colors.gold,
  },
  hero: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 4,
  },
  heroTitle: {
    fontFamily: typography.heading,
    fontSize: 28,
    color: colors.cream,
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 25,
    maxWidth: 320,
  },
});
