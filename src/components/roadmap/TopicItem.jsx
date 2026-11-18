import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Icon from '../common/Icon';
import LevelBadge from '../common/LevelBadge';

export const TopicItem = ({
  topic,
  isCompleted = false,
  isBookmarked = false,
  onToggleComplete,
  onToggleBookmark,
  onPress,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
          borderColor: isCompleted
            ? colors.success
            : isDark
            ? '#2C2C4E'
            : '#E9ECEF',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Complete Checkbox */}
      <TouchableOpacity
        onPress={onToggleComplete}
        style={[
          styles.checkbox,
          {
            borderColor: isCompleted ? colors.success : colors.border,
            backgroundColor: isCompleted ? colors.success : 'transparent',
          },
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {isCompleted && <Icon name="checkmark" size={14} color="#FFFFFF" />}
      </TouchableOpacity>

      {/* Main Info */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              {
                color: isCompleted ? colors.textSecondary : colors.text,
                textDecorationLine: isCompleted ? 'line-through' : 'none',
              },
            ]}
            numberOfLines={1}
          >
            {topic.title}
          </Text>
        </View>

        {topic.description ? (
          <Text
            style={[styles.description, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {topic.description}
          </Text>
        ) : null}

        <View style={styles.footerRow}>
          {topic.level && <LevelBadge level={topic.level} size="small" />}

          {topic.subtopics && topic.subtopics.length > 0 && (
            <View style={styles.subtopicsCount}>
              <Icon name="layers-outline" size={12} color={colors.textSecondary} />
              <Text style={[styles.subtopicsText, { color: colors.textSecondary }]}>
                {topic.subtopics.length} topics
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Bookmark Action */}
      <TouchableOpacity
        onPress={onToggleBookmark}
        style={styles.bookmarkButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon
          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
          size={18}
          color={isBookmarked ? '#FFB703' : colors.textSecondary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subtopicsCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subtopicsText: {
    fontSize: 11,
    fontWeight: '500',
  },
  bookmarkButton: {
    padding: 4,
  },
});

export default TopicItem;
