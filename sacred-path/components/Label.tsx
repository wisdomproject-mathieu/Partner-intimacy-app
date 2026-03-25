import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors } from '@/theme';

interface LabelProps {
  children: string;
  style?: TextStyle;
}

export function Label({ children, style }: LabelProps) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.gold,
    marginBottom: 6,
  },
});
