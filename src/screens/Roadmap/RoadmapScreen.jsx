import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { getTechnologyById } from '../../constants';
import { roadmapService } from '../../services/roadmapService';
import {
  getCompletedTopicIds,
  toggleTopicCompletion,
  getBookmarkedTopicIds,
  toggleBookmark,
  getTechnologyProgress,
} from '../../storage/progressStorage';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import ProgressBar from '../../components/common/ProgressBar';
import SectionAccordion from '../../components/roadmap/SectionAccordion';
import Icon from '../../components/common/Icon';

const LEVEL_TABS = [
  { id: 'all', label: 'All Levels' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

export const RoadmapScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const { techId, techName } = route.params || {};

  const techInfo = getTechnologyById(techId);
  const brandColor = techInfo?.color || colors.primary;

  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);
  const [completedTopicIds, setCompletedTopicIds] = useState([]);
  const [bookmarkedTopicIds, setBookmarkedTopicIds] = useState([]);
  const [techStats, setTechStats] = useState(null);

  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [rm, completed, bookmarked, stats] = await Promise.all([
        roadmapService.getRoadmap(techId),
        getCompletedTopicIds(),
        getBookmarkedTopicIds(),
        getTechnologyProgress(techId),
      ]);

      setRoadmap(rm);
      setCompletedTopicIds(completed);
      setBookmarkedTopicIds(bookmarked);
      setTechStats(stats);
    } catch (e) {
      console.warn('Error loading roadmap data:', e);
    } finally {
      setLoading(false);
    }
  }, [techId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    loadData();
    return unsubscribe;
  }, [navigation, loadData]);

  const handleToggleComplete = async (topicId) => {
    try {
      await toggleTopicCompletion(techId, topicId);
      const updated = await getCompletedTopicIds();
      setCompletedTopicIds(updated);
      const updatedStats = await getTechnologyProgress(techId);
      setTechStats(updatedStats);
    } catch (e) {
      console.warn('Error toggling topic completion:', e);
    }
  };

  const handleToggleBookmark = async (topicId) => {
    try {
      await toggleBookmark(techId, topicId);
      const updated = await getBookmarkedTopicIds();
      setBookmarkedTopicIds(updated);
    } catch (e) {
      console.warn('Error toggling bookmark:', e);
    }
  };

  const handleSelectTopic = (topic) => {
    navigation.navigate('TopicDetails', {
      topic,
      techId,
      techName: techName || techInfo?.name || 'Roadmap',
    });
  };

  // Build filtered sections based on selectedLevel and searchQuery
  const getFilteredSections = () => {
    if (!roadmap || !roadmap.levels) return [];

    const activeLevels =
      selectedLevel === 'all'
        ? ['beginner', 'intermediate', 'advanced']
        : [selectedLevel];

    const result = [];
    const query = searchQuery.toLowerCase().trim();

    activeLevels.forEach((levelKey) => {
      const levelSections = roadmap.levels[levelKey] || [];

      levelSections.forEach((sec, secIdx) => {
        let matchingTopics = (sec.topics || []).map((t, topIdx) => ({
          ...t,
          level: levelKey,
          computedId: t.id || `${techId}_${levelKey}_${secIdx}_${topIdx}`,
        }));

        if (query) {
          matchingTopics = matchingTopics.filter((t) => {
            const inTitle = t.title.toLowerCase().includes(query);
            const inDesc = (t.description || '').toLowerCase().includes(query);
            const inSub = (t.subtopics || []).some((st) =>
              st.toLowerCase().includes(query)
            );
            return inTitle || inDesc || inSub;
          });
        }

        if (matchingTopics.length > 0) {
          result.push({
            ...sec,
            levelKey,
            topics: matchingTopics,
          });
        }
      });
    });

    return result;
  };

  const filteredSections = getFilteredSections();
  const percentage = techStats?.percentage || 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={techName || techInfo?.name || 'Roadmap'}
        subtitle={techInfo?.description}
        showBack={true}
      />

      {/* Progress & Stats Bar */}
      <View
        style={[
          styles.statsCard,
          {
            backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.statsRow}>
          <View style={styles.statsLeft}>
            <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>
              Overall Completion
            </Text>
            <Text style={[styles.statsPercent, { color: brandColor }]}>
              {Math.round(percentage)}%
            </Text>
          </View>

          <View style={styles.statsRight}>
            <Text style={[styles.statsCount, { color: colors.text }]}>
              {techStats?.completed || 0} / {techStats?.total || 0}
            </Text>
            <Text style={[styles.statsSubCount, { color: colors.textSecondary }]}>
              Topics Finished
            </Text>
          </View>
        </View>

        <ProgressBar progress={percentage} height={8} color={brandColor} style={styles.progressBar} />
      </View>

      {/* Controls: Search & Level Tabs */}
      <View style={styles.controlsContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Filter topics or concepts..."
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {LEVEL_TABS.map((tab) => {
            const active = selectedLevel === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabChip,
                  {
                    backgroundColor: active
                      ? brandColor
                      : isDark
                      ? '#22223F'
                      : '#E9ECEF',
                  },
                ]}
                onPress={() => setSelectedLevel(tab.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabChipText,
                    { color: active ? '#FFFFFF' : colors.text },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={brandColor} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading roadmap...
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 24 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {filteredSections.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="search-outline" size={36} color={colors.textSecondary} />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No topics found
              </Text>
              <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
                Try adjusting your search query or level filter.
              </Text>
            </View>
          ) : (
            filteredSections.map((sec, index) => (
              <SectionAccordion
                key={sec.id || `sec-${index}`}
                section={sec}
                completedTopicIds={completedTopicIds}
                bookmarkedTopicIds={bookmarkedTopicIds}
                onToggleComplete={handleToggleComplete}
                onToggleBookmark={handleToggleBookmark}
                onSelectTopic={handleSelectTopic}
              />
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsLeft: {},
  statsLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  statsPercent: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  statsRight: {
    alignItems: 'flex-end',
  },
  statsCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  statsSubCount: {
    fontSize: 12,
    marginTop: 2,
  },
  progressBar: {
    marginTop: 2,
  },
  controlsContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    paddingBottom: 4,
  },
  tabChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  tabChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
  },
  emptySub: {
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default RoadmapScreen;
