import { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
  Pressable,
} from 'react-native';
import { swipeWisdom } from '@/data/practices';
import { colors, typography, radii, tradColors } from '@/theme';
import type { TraditionId } from '@/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;

export function WisdomCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={swipeWisdom}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(_, i) => String(i)}
        snapToInterval={CARD_WIDTH + 12}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const tradKey = item.tradition.toLowerCase() as TraditionId;
          const tradColor = tradColors[tradKey]?.light || colors.gold;

          return (
            <View style={[styles.card, { width: CARD_WIDTH }]}>
              <Text style={[styles.source, { color: tradColor }]}>
                {item.src}
              </Text>
              <Text style={styles.quote}>
                {'\u201C'}{item.quote}{'\u201D'}
              </Text>
              <Text style={[styles.tradition, { color: tradColor }]}>
                {item.tradition}
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.nav}>
        <Pressable
          onPress={() => {
            const prev = Math.max(0, activeIndex - 1);
            flatListRef.current?.scrollToIndex({ index: prev, animated: true });
          }}
        >
          <Text style={styles.arrow}>{'\u2190'}</Text>
        </Pressable>
        <Text style={styles.counter}>
          {activeIndex + 1} / {swipeWisdom.length}
        </Text>
        <Pressable
          onPress={() => {
            const next = Math.min(swipeWisdom.length - 1, activeIndex + 1);
            flatListRef.current?.scrollToIndex({ index: next, animated: true });
          }}
        >
          <Text style={styles.arrow}>{'\u2192'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 23,
  },
  source: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 11,
  },
  quote: {
    fontFamily: typography.heading,
    fontStyle: 'italic',
    fontSize: 16,
    color: colors.cream,
    lineHeight: 27,
    marginBottom: 14,
  },
  tradition: {
    fontSize: 11,
    letterSpacing: 0.8,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingTop: 12,
  },
  arrow: {
    fontSize: 18,
    color: colors.dim,
    padding: 8,
  },
  counter: {
    fontSize: 11,
    letterSpacing: 1,
    color: colors.dim,
  },
});
