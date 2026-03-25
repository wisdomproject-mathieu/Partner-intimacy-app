import { Stack } from 'expo-router';
import { colors } from '@/theme';

export default function ReconnectLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.ink },
      }}
    />
  );
}
