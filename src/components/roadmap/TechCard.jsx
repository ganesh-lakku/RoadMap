import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Icon from '../common/Icon';
import ProgressBar from '../common/ProgressBar';

export const TechCard = ({ tech, progress = 0, onPress }) => {
  const { colors, isDark } = useTheme();
  const brandColor = tech.color || colors.primary;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#1A1A32' : '#FFFFFF',
          borderColor: isDark ? '#2D2D4D' : '#E9ECEF',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.topRow}>
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: `${brandColor}18`,
              borderColor: `${brandColor}40`,
            },
          ]}
        >
          <Icon name={tech.icon || 'code-outline'} size={24} color={brandColor} />
        </View>

        <View style={styles.headerInfo}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {tech.name}
          </Text>
          {tech.subcategory && (
            <Text style={[styles.subtag, { color: brandColor }]}>
              {tech.subcategory.replace('_', ' ').toUpperCase()}
            </Text>
          )}
        </View>

        <View
          style={[
            styles.percentPill,
            {
              backgroundColor: progress === 100 ? `${colors.success}22` : `${brandColor}15`,
            },
          ]}
        >
          <Text
            style={[
              styles.percentText,
              { color: progress === 100 ? colors.success : brandColor },
            ]}
          >
            {Math.round(progress)}%
          </Text>
        </View>
      </View>

      <Text
        style={[styles.description, { color: colors.textSecondary }]}
        numberOfLines={2}
      >
        {tech.description}
      </Text>

      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} height={6} color={brandColor} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtag: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  percentPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  percentText: {
    fontSize: 12,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 2,
  },
});

export default TechCard;
