import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

let IoniconsComponent = null;
try {
  IoniconsComponent = require('react-native-vector-icons/Ionicons').default;
} catch (e) {
  IoniconsComponent = null;
}

// Visual fallback mapping for icon names to clean unicode glyphs or text
const ICON_FALLBACK_MAP = {
  // Navigation / Actions
  'arrow-back': '←',
  'arrow-forward': '→',
  'chevron-forward': '›',
  'chevron-down': '˅',
  'chevron-up': '˄',
  'checkmark': '✓',
  'checkmark-circle': '✓',
  'checkmark-circle-outline': '○',
  'close': '✕',
  'close-circle': '✕',
  'search-outline': '🔍',
  'bookmark': '★',
  'bookmark-outline': '☆',
  'share-social-outline': '↗',
  'open-outline': '↗',
  'moon-outline': '🌙',
  'sunny-outline': '☀️',
  'stats-chart': '📊',
  'stats-chart-outline': '📊',
  'map': '🗺',
  'map-outline': '🗺',
  'compass-outline': '🧭',

  // Categories & Tech
  'globe-outline': '🌐',
  'phone-portrait-outline': '📱',
  'code-slash-outline': '</>',
  'code-outline': '<>',
  'code-working-outline': '{ }',
  'layers-outline': '≡',
  'logo-javascript': 'JS',
  'logo-react': '⚛',
  'logo-vue': 'V',
  'logo-angular': 'A',
  'logo-android': '🤖',
  'logo-apple': '🍎',
  'logo-html5': 'H5',
  'logo-css3': 'CSS',
  'logo-nodejs': 'Node',
  'logo-github': 'GH',
  'git-branch-outline': '⌥',
  'logo-python': 'Py',

  // Levels & Badges
  'school-outline': '🌱',
  'trending-up-outline': '📈',
  'rocket-outline': '🚀',
  'trophy-outline': '🏆',
  'book-outline': '📖',
  'information-circle-outline': 'ℹ',
  'bulb-outline': '💡',
};

/**
 * Universal Icon Component
 * Uses react-native-vector-icons/Ionicons when available,
 * with graceful fallback to styled typography symbols.
 */
export const Icon = ({ name, size = 20, color = '#6C63FF', style }) => {
  if (IoniconsComponent) {
    try {
      return <IoniconsComponent name={name} size={size} color={color} style={style} />;
    } catch (err) {
      // Fallback below
    }
  }

  const fallbackGlyph = ICON_FALLBACK_MAP[name] || '•';

  return (
    <View
      style={[
        styles.fallbackContainer,
        { width: size, height: size },
        style,
      ]}
    >
      <Text
        style={[
          styles.fallbackText,
          {
            fontSize: size * 0.75,
            lineHeight: size,
            color,
          },
        ]}
        numberOfLines={1}
      >
        {fallbackGlyph}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Icon;
