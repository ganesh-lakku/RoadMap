import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import Icon from './Icon';

export const Header = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  showThemeToggle = true,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors, isDark, toggleTheme } = useTheme();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 12),
          backgroundColor: colors.headerBg || colors.surface,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.contentRow}>
        <View style={styles.leftGroup}>
          {showBack && (
            <TouchableOpacity
              onPress={handleBack}
              style={[styles.iconButton, { backgroundColor: isDark ? '#252542' : '#F1F3F5' }]}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
          )}

          <View style={styles.titleContainer}>
            <Text
              style={[styles.title, { color: colors.headerText || colors.text }]}
              numberOfLines={1}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.rightGroup}>
          {rightAction}

          {showThemeToggle && (
            <TouchableOpacity
              onPress={toggleTheme}
              style={[
                styles.iconButton,
                { backgroundColor: isDark ? '#252542' : '#F1F3F5', marginLeft: 8 },
              ]}
              activeOpacity={0.7}
            >
              <Icon
                name={isDark ? 'sunny-outline' : 'moon-outline'}
                size={18}
                color={isDark ? '#FFD166' : colors.primary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 1,
    fontWeight: '500',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
