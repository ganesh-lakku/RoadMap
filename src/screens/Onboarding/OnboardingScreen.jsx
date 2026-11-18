import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { APP_NAME } from '../../constants';
import Icon from '../../components/common/Icon';

const FEATURES = [
  { icon: 'map-outline', text: 'Curated roadmaps for web & mobile' },
  { icon: 'checkmark-circle-outline', text: 'Track every topic you complete' },
  { icon: 'bookmark-outline', text: 'Bookmark topics to revisit later' },
];

export const OnboardingScreen = ({ onStart }) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: Math.max(insets.top, 24),
          paddingBottom: Math.max(insets.bottom, 24),
        },
      ]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <View style={styles.center}>
        <View style={[styles.logo, { backgroundColor: colors.primary }]}>
          <Icon name="rocket-outline" size={48} color="#FFFFFF" />
        </View>

        <Text style={[styles.welcome, { color: colors.textSecondary }]}>Welcome to</Text>
        <Text style={[styles.title, { color: colors.text }]}>{APP_NAME}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your step-by-step guide to mastering modern development.
        </Text>

        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f.icon} style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: `${colors.primary}1A` }]}>
                <Icon name={f.icon} size={20} color={colors.primary} />
              </View>
              <Text style={[styles.featureText, { color: colors.text }]}>{f.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={onStart}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Start"
      >
        <Text style={styles.buttonText}>Start</Text>
        <Icon name="arrow-forward" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  welcome: { fontSize: 16, fontWeight: '500' },
  title: { fontSize: 36, fontWeight: '800', letterSpacing: -0.8, marginTop: 4 },
  subtitle: { fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 10, maxWidth: 300 },
  features: { marginTop: 36, alignSelf: 'stretch', gap: 14 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: { fontSize: 14, fontWeight: '600', flex: 1 },
  button: {
    height: 54,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});

export default OnboardingScreen;
