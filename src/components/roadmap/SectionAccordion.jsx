import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Icon from '../common/Icon';
import TopicItem from './TopicItem';

export const SectionAccordion = ({
  section,
  completedTopicIds = [],
  bookmarkedTopicIds = [],
  onToggleComplete,
  onToggleBookmark,
  onSelectTopic,
  initiallyExpanded = true,
}) => {
  const { colors, isDark } = useTheme();
  const [expanded, setExpanded] = useState(initiallyExpanded);

  const topics = section.topics || [];
  const completedCount = topics.filter((t) =>
    completedTopicIds.includes(t.computedId || t.id)
  ).length;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#16162D' : '#F8F9FA',
          borderColor: isDark ? '#2B2B48' : '#E9ECEF',
        },
      ]}
    >
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Icon
            name={expanded ? 'chevron-down' : 'chevron-forward'}
            size={18}
            color={colors.primary}
            style={styles.chevron}
          />
          <View style={styles.titleWrapper}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {section.title}
            </Text>
            {section.description ? (
              <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
                {section.description}
              </Text>
            ) : null}
          </View>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                completedCount === topics.length && topics.length > 0
                  ? `${colors.success}22`
                  : isDark
                  ? '#23233E'
                  : '#E9ECEF',
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color:
                  completedCount === topics.length && topics.length > 0
                    ? colors.success
                    : colors.textSecondary,
              },
            ]}
          >
            {completedCount}/{topics.length}
          </Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.topicsList}>
          {topics.map((topic, index) => {
            const topicId = topic.computedId || topic.id;
            const isCompleted = completedTopicIds.includes(topicId);
            const isBookmarked = bookmarkedTopicIds.includes(topicId);

            return (
              <TopicItem
                key={topicId || `topic-${index}`}
                topic={topic}
                isCompleted={isCompleted}
                isBookmarked={isBookmarked}
                onToggleComplete={() => onToggleComplete(topicId)}
                onToggleBookmark={() => onToggleBookmark(topicId)}
                onPress={() => onSelectTopic(topic)}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  chevron: {
    marginRight: 8,
  },
  titleWrapper: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  sectionDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  topicsList: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});

export default SectionAccordion;
