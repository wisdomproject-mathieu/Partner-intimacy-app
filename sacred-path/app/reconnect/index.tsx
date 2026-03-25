import { Redirect } from 'expo-router';

// The reconnect tab screen is in (tabs)/reconnect.tsx
// This handles deep links to /reconnect
export default function ReconnectIndex() {
  return <Redirect href="/(tabs)/reconnect" />;
}
