import { Text, StyleSheet, ViewStyle } from 'react-native';
import { tradColors, type TraditionId } from '@/theme';

interface TraditionTagProps {
  tradition: TraditionId;
  style?: ViewStyle;
}

export function TraditionTag({ tradition, style }: TraditionTagProps) {
  const c = tradColors[tradition];
  return (
    <Text
      style={[
        styles.tag,
        {
          backgroundColor: c.bg,
          color: c.light,
          borderColor: c.border,
        },
        style,
      ]}
    >
      {tradition.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  tag: {
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
