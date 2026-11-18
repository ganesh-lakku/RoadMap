import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { getTechnologyById } from '../../constants';
import {
  isTopicCompleted,
  toggleTopicCompletion,
  isTopicBookmarked,
  toggleBookmark,
} from '../../storage/progressStorage';
import Header from '../../components/common/Header';
import LevelBadge from '../../components/common/LevelBadge';
import Icon from '../../components/common/Icon';

export const TopicDetailsScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const { topic, techId, techName } = route.params || {};

  const topicId = topic?.computedId || topic?.id;
  const techInfo = getTechnologyById(techId);
  const brandColor = techInfo?.color || colors.primary;

  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [checkedSubtopics, setCheckedSubtopics] = useState({});

  useEffect(() => {
    checkStatus();
  }, [topicId]);

  const checkStatus = async () => {
    if (!topicId) return;
    try {
      const isComp = await isTopicCompleted(techId, topicId);
      const isBook = await isTopicBookmarked(techId, topicId);
      setCompleted(isComp);
      setBookmarked(isBook);
    } catch (e) {
      console.warn('Error checking topic status:', e);
    }
  };

  const handleToggleCompleted = async () => {
    if (!topicId) return;
    try {
      const newState = await toggleTopicCompletion(techId, topicId);
      setCompleted(newState);
    } catch (e) {
      console.warn('Error toggling topic completion:', e);
    }
  };

  const handleToggleBookmark = async () => {
    if (!topicId) return;
    try {
      const newState = await toggleBookmark(techId, topicId);
      setBookmarked(newState);
    } catch (e) {
      console.warn('Error toggling bookmark:', e);
    }
  };

  const toggleSubtopic = (index) => {
    setCheckedSubtopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openResource = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Unable to open link', `Could not open: ${url}`);
      }
    } catch (err) {
      Alert.alert('Link Error', 'An error occurred while opening this resource.');
    }
  };

  const subtopics = topic?.subtopics || [];
  const resources = topic?.resources || [];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={techName || 'Topic Details'}
        showBack={true}
        rightAction={
          <TouchableOpacity
            style={[
              styles.headerAction,
              { backgroundColor: isDark ? '#252542' : '#F1F3F5' },
            ]}
            onPress={handleToggleBookmark}
            activeOpacity={0.7}
          >
            <Icon
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={bookmarked ? '#FFB703' : colors.text}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Topic Title & Badges */}
        <View style={styles.topSection}>
          <View style={styles.badgesRow}>
            {topic?.level && <LevelBadge level={topic.level} />}
            <View
              style={[
                styles.techBadge,
                { backgroundColor: `${brandColor}18`, borderColor: `${brandColor}40` },
              ]}
            >
              <Text style={[styles.techBadgeText, { color: brandColor }]}>
                {techName || 'RoadMap'}
              </Text>
            </View>
          </View>

          <Text style={[styles.topicTitle, { color: colors.text }]}>
            {topic?.title}
          </Text>

          {topic?.description ? (
            <Text style={[styles.topicDescription, { color: colors.textSecondary }]}>
              {topic.description}
            </Text>
          ) : null}
        </View>

        {/* Detailed Concept / Explanation */}
        {topic?.details && (
          <View
            style={[
              styles.sectionCard,
              {
                backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                borderColor: isDark ? '#2E2E52' : '#E9ECEF',
              },
            ]}
          >
            <View style={styles.sectionHeaderRow}>
              <Icon name="information-circle-outline" size={18} color={colors.primary} />
              <Text style={[styles.sectionHeading, { color: colors.text }]}>
                Concept Overview
              </Text>
            </View>
            <Text style={[styles.detailsText, { color: colors.text }]}>
              {topic.details}
            </Text>
          </View>
        )}

        {/* Checklist / Key Subtopics */}
        {subtopics.length > 0 && (
          <View
            style={[
              styles.sectionCard,
              {
                backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                borderColor: isDark ? '#2E2E52' : '#E9ECEF',
              },
            ]}
          >
            <View style={styles.sectionHeaderRow}>
              <Icon name="checkmark-circle-outline" size={18} color={colors.success} />
              <Text style={[styles.sectionHeading, { color: colors.text }]}>
                Key Learning Objectives
              </Text>
            </View>

            <View style={styles.subtopicsList}>
              {subtopics.map((sub, idx) => {
                const isChecked = checkedSubtopics[idx] || completed;
                return (
                  <TouchableOpacity
                    key={`sub-${idx}`}
                    style={styles.subtopicRow}
                    onPress={() => toggleSubtopic(idx)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.subCheckbox,
                        {
                          borderColor: isChecked ? colors.success : colors.border,
                          backgroundColor: isChecked ? colors.success : 'transparent',
                        },
                      ]}
                    >
                      {isChecked && <Icon name="checkmark" size={12} color="#FFFFFF" />}
                    </View>
                    <Text
                      style={[
                        styles.subtopicText,
                        {
                          color: isChecked ? colors.textSecondary : colors.text,
                          textDecorationLine: isChecked ? 'line-through' : 'none',
                        },
                      ]}
                    >
                      {sub}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Recommended Resources */}
        {resources.length > 0 && (
          <View
            style={[
              styles.sectionCard,
              {
                backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                borderColor: isDark ? '#2E2E52' : '#E9ECEF',
              },
            ]}
          >
            <View style={styles.sectionHeaderRow}>
              <Icon name="book-outline" size={18} color={brandColor} />
              <Text style={[styles.sectionHeading, { color: colors.text }]}>
                Recommended Resources
              </Text>
            </View>

            <View style={styles.resourcesList}>
              {resources.map((res, idx) => (
                <TouchableOpacity
                  key={`res-${idx}`}
                  style={[
                    styles.resourceItem,
                    {
                      backgroundColor: isDark ? '#242445' : '#F8F9FA',
                      borderColor: isDark ? '#33335A' : '#E9ECEF',
                    },
                  ]}
                  onPress={() => openResource(res.url)}
                  activeOpacity={0.7}
                >
                  <View style={styles.resourceLeft}>
                    <Icon
                      name={res.type === 'video' ? 'play-circle-outline' : 'open-outline'}
                      size={18}
                      color={brandColor}
                    />
                    <View style={styles.resourceTextWrap}>
                      <Text style={[styles.resourceTitle, { color: colors.text }]}>
                        {res.title}
                      </Text>
                      <Text style={[styles.resourceUrl, { color: colors.textSecondary }]} numberOfLines={1}>
                        {res.url}
                      </Text>
                    </View>
                  </View>
                  <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Bottom Complete Action */}
      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: Math.max(insets.bottom, 14),
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.completeButton,
            {
              backgroundColor: completed ? colors.success : brandColor,
            },
          ]}
          onPress={handleToggleCompleted}
          activeOpacity={0.85}
        >
          <Icon
            name={completed ? 'checkmark-circle' : 'checkmark'}
            size={20}
            color="#FFFFFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.completeButtonText}>
            {completed ? 'Topic Completed ✓' : 'Mark as Complete'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  topSection: {
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  techBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  techBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  topicTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  topicDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
  },
  detailsText: {
    fontSize: 14,
    lineHeight: 22,
  },
  subtopicsList: {
    gap: 10,
  },
  subtopicRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  subtopicText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  resourcesList: {
    gap: 10,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  resourceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    gap: 10,
  },
  resourceTextWrap: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  resourceUrl: {
    fontSize: 11,
    marginTop: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 14,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default TopicDetailsScreen;
