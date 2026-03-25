import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  tradition?: 'tantra' | 'tao' | 'deida' | 'richardson';
}

export function Card({ children, style, tradition }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {tradition && <View style={[styles.accent, accentColors[tradition]]} />}
      {children}
    </View>
  );
}

const accentColors = {
  tantra: { backgroundColor: '#c0415f' },
  tao: { backgroundColor: '#c8924a' },
  deida: { backgroundColor: '#9ab0e8' },
  richardson: { backgroundColor: '#c09ae0' },
} as const;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 19,
    overflow: 'hidden',
  },
  accent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 3,
    height: '100%',
  },
});
