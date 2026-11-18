import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { getAllTechnologies, getTechnologyById } from '../../constants';
import {
  getOverallProgress,
  getBookmarkedTopicIds,
  resetAllProgress,
  getTechnologyProgress,
} from '../../storage/progressStorage';
import { roadmapService } from '../../services/roadmapService';
import Header from '../../components/common/Header';
import ProgressBar from '../../components/common/ProgressBar';
import Icon from '../../components/common/Icon';
import LevelBadge from '../../components/common/LevelBadge';

export const ProgressScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bookmarks'
  const [stats, setStats] = useState(null);
  const [techBreakdowns, setTechBreakdowns] = useState([]);
  const [bookmarkedTopics, setBookmarkedTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const overall = await getOverallProgress();
      setStats(overall);

      // Load tech breakdowns
      const techs = getAllTechnologies();
      const techList = [];
      for (const t of techs) {
        const p = await getTechnologyProgress(t.id);
        techList.push({
          ...t,
          stats: p,
        });
      }
      setTechBreakdowns(techList);

      // Load bookmarked topics
      const bookmarkedIds = await getBookmarkedTopicIds();
      const bTopics = [];
      for (const id of bookmarkedIds) {
        // Find matching topic across techs
        for (const t of techs) {
          const found = await roadmapService.getTopicDetails(t.id, id);
          if (found) {
            bTopics.push({
              ...found,
              techName: t.name,
              techColor: t.color,
            });
            break;
          }
        }
      }
      setBookmarkedTopics(bTopics);
    } catch (e) {
      console.warn('Error loading progress stats:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    loadData();
    return unsubscribe;
  }, [navigation, loadData]);

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your completed topics and progress? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetAllProgress();
            await loadData();
          },
        },
      ]
    );
  };

  const completedCount = stats?.totalCompleted || 0;
  const byLevel = stats?.byLevel || {};

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Learning Progress"
        subtitle={`${completedCount} Topics Finished`}
        rightAction={
          <TouchableOpacity
            style={[
              styles.resetButton,
              { backgroundColor: isDark ? '#2B2B45' : '#F1F3F5' },
            ]}
            onPress={handleResetProgress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="close" size={16} color={colors.error} />
          </TouchableOpacity>
        }
      />

      {/* Segmented Tab Bar: Overview vs Bookmarks */}
      <View style={styles.segmentContainer}>
        <View
          style={[
            styles.segmentTrack,
            { backgroundColor: isDark ? '#1C1C36' : '#E9ECEF' },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.segmentItem,
              activeTab === 'overview' && {
                backgroundColor: colors.surface,
                shadowColor: colors.shadow,
              },
            ]}
            onPress={() => setActiveTab('overview')}
            activeOpacity={0.8}
          >
            <Icon
              name="stats-chart"
              size={15}
              color={activeTab === 'overview' ? colors.primary : colors.textSecondary}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.segmentText,
                {
                  color: activeTab === 'overview' ? colors.primary : colors.textSecondary,
                  fontWeight: activeTab === 'overview' ? '700' : '500',
                },
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentItem,
              activeTab === 'bookmarks' && {
                backgroundColor: colors.surface,
                shadowColor: colors.shadow,
              },
            ]}
            onPress={() => setActiveTab('bookmarks')}
            activeOpacity={0.8}
          >
            <Icon
              name="bookmark"
              size={15}
              color={activeTab === 'bookmarks' ? '#FFB703' : colors.textSecondary}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.segmentText,
                {
                  color: activeTab === 'bookmarks' ? '#FFB703' : colors.textSecondary,
                  fontWeight: activeTab === 'bookmarks' ? '700' : '500',
                },
              ]}
            >
              Bookmarks ({bookmarkedTopics.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'overview' ? (
          <>
            {/* Top Metric Cards */}
            <View style={styles.metricsRow}>
              <View
                style={[
                  styles.metricCard,
                  {
                    backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                    borderColor: isDark ? '#2E2E52' : '#E9ECEF',
                  },
                ]}
              >
                <Icon name="checkmark-circle" size={24} color={colors.success} />
                <Text style={[styles.metricVal, { color: colors.text }]}>
                  {completedCount}
                </Text>
                <Text style={[styles.metricLbl, { color: colors.textSecondary }]}>
                  Completed
                </Text>
              </View>

              <View
                style={[
                  styles.metricCard,
                  {
                    backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                    borderColor: isDark ? '#2E2E52' : '#E9ECEF',
                  },
                ]}
              >
                <Icon name="bookmark" size={24} color="#FFB703" />
                <Text style={[styles.metricVal, { color: colors.text }]}>
                  {bookmarkedTopics.length}
                </Text>
                <Text style={[styles.metricLbl, { color: colors.textSecondary }]}>
                  Bookmarked
                </Text>
              </View>

              <View
                style={[
                  styles.metricCard,
                  {
                    backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                    borderColor: isDark ? '#2E2E52' : '#E9ECEF',
                  },
                ]}
              >
                <Icon name="layers-outline" size={24} color={colors.primary} />
                <Text style={[styles.metricVal, { color: colors.text }]}>
                  {techBreakdowns.filter((t) => (t.stats?.completed || 0) > 0).length}
                </Text>
                <Text style={[styles.metricLbl, { color: colors.textSecondary }]}>
                  Active Techs
                </Text>
              </View>
            </View>

            {/* Level Breakdown Section */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                  borderColor: isDark ? '#2E2E52' : '#E9ECEF',
                },
              ]}
            >
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Difficulty Level Distribution
              </Text>

              {['beginner', 'intermediate', 'advanced'].map((lvl) => {
                const lvlStats = byLevel[lvl] || { completed: 0, total: 1, percentage: 0 };
                return (
                  <View key={lvl} style={styles.levelRow}>
                    <View style={styles.levelHeader}>
                      <LevelBadge level={lvl} size="small" />
                      <Text style={[styles.levelCount, { color: colors.text }]}>
                        {lvlStats.completed} completed
                      </Text>
                    </View>
                    <ProgressBar
                      progress={lvlStats.percentage}
                      height={6}
                      color={
                        lvl === 'beginner'
                          ? colors.beginner
                          : lvl === 'intermediate'
                          ? colors.intermediate
                          : colors.advanced
                      }
                      style={{ marginTop: 6 }}
                    />
                  </View>
                );
              })}
            </View>

            {/* Tech Breakdown Section */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionHeading, { color: colors.text }]}>
                Progress by Technology
              </Text>
            </View>

            {techBreakdowns.map((tech) => {
              const comp = tech.stats?.completed || 0;
              const tot = tech.stats?.total || 0;
              const pct = tech.stats?.percentage || 0;
              const brandColor = tech.color || colors.primary;

              return (
                <TouchableOpacity
                  key={tech.id}
                  style={[
                    styles.techRowCard,
                    {
                      backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                      borderColor: isDark ? '#2E2E52' : '#E9ECEF',
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate('Roadmap', {
                      techId: tech.id,
                      techName: tech.name,
                    })
                  }
                  activeOpacity={0.7}
                >
                  <View style={styles.techRowTop}>
                    <View style={styles.techRowLeft}>
                      <View
                        style={[
                          styles.techIconMini,
                          { backgroundColor: `${brandColor}20` },
                        ]}
                      >
                        <Icon name={tech.icon || 'code-outline'} size={18} color={brandColor} />
                      </View>
                      <Text style={[styles.techRowName, { color: colors.text }]}>
                        {tech.name}
                      </Text>
                    </View>

                    <Text style={[styles.techRowPct, { color: brandColor }]}>
                      {Math.round(pct)}%
                    </Text>
                  </View>

                  <ProgressBar
                    progress={pct}
                    height={6}
                    color={brandColor}
                    style={{ marginTop: 8 }}
                  />

                  <View style={styles.techRowBottom}>
                    <Text style={[styles.techCountText, { color: colors.textSecondary }]}>
                      {comp} of {tot} topics completed
                    </Text>
                    <Icon name="chevron-forward" size={14} color={colors.textSecondary} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          /* Bookmarks Tab */
          <View>
            {bookmarkedTopics.length === 0 ? (
              <View style={styles.emptyBookmarks}>
                <Icon name="bookmark-outline" size={40} color={colors.textSecondary} />
                <Text style={[styles.emptyBookmarksTitle, { color: colors.text }]}>
                  No bookmarks yet
                </Text>
                <Text style={[styles.emptyBookmarksSub, { color: colors.textSecondary }]}>
                  Tap the bookmark star on any topic to save it here for fast revision.
                </Text>
              </View>
            ) : (
              bookmarkedTopics.map((topic, idx) => (
                <TouchableOpacity
                  key={topic.id || `bm-${idx}`}
                  style={[
                    styles.bookmarkItem,
                    {
                      backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                      borderColor: isDark ? '#2E2E52' : '#E9ECEF',
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate('TopicDetails', {
                      topic,
                      techId: topic.techId,
                      techName: topic.techName,
                    })
                  }
                  activeOpacity={0.7}
                >
                  <View style={styles.bookmarkTop}>
                    <LevelBadge level={topic.level} size="small" />
                    <Text style={[styles.bookmarkTech, { color: topic.techColor || colors.primary }]}>
                      {topic.techName}
                    </Text>
                  </View>

                  <Text style={[styles.bookmarkTitle, { color: colors.text }]}>
                    {topic.title}
                  </Text>

                  {topic.description ? (
                    <Text
                      style={[styles.bookmarkDesc, { color: colors.textSecondary }]}
                      numberOfLines={2}
                    >
                      {topic.description}
                    </Text>
                  ) : null}
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resetButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  segmentTrack: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 3,
  },
  segmentItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  segmentText: {
    fontSize: 13,
  },
  content: {
    padding: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 6,
  },
  metricLbl: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  levelRow: {
    marginBottom: 12,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: 10,
    marginTop: 4,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
  },
  techRowCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  techRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  techRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  techIconMini: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  techRowName: {
    fontSize: 15,
    fontWeight: '700',
  },
  techRowPct: {
    fontSize: 14,
    fontWeight: '700',
  },
  techRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  techCountText: {
    fontSize: 12,
  },
  emptyBookmarks: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBookmarksTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 14,
  },
  emptyBookmarksSub: {
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  bookmarkItem: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  bookmarkTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bookmarkTech: {
    fontSize: 12,
    fontWeight: '700',
  },
  bookmarkTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  bookmarkDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default ProgressScreen;
