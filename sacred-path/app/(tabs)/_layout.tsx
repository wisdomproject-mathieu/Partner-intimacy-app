import { Tabs } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { colors, typography } from '@/theme';

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <Text style={[styles.icon, focused && styles.iconActive]}>{icon}</Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.dim,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon icon="✦" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="paths"
        options={{
          title: 'Paths',
          tabBarIcon: ({ focused }) => <TabIcon icon="◇" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="teachers"
        options={{
          title: 'Teachers',
          tabBarIcon: ({ focused }) => <TabIcon icon="❋" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="reconnect"
        options={{
          title: 'Reconnect',
          tabBarIcon: ({ focused }) => <TabIcon icon="∞" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(9,4,10,0.97)',
    borderTopColor: 'rgba(200,140,90,0.16)',
    borderTopWidth: 1,
    height: 68,
    paddingBottom: 8,
    paddingTop: 8,
  },
  label: {
    fontSize: 9,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontWeight: '300',
  },
  icon: {
    fontSize: 18,
    color: colors.dim,
  },
  iconActive: {
    color: colors.gold,
  },
});
