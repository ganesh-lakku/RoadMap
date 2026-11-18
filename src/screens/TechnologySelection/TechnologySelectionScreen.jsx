import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { TECHNOLOGIES, CATEGORIES } from '../../constants';
import { getTechnologyProgress } from '../../storage/progressStorage';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import TechCard from '../../components/roadmap/TechCard';

export const TechnologySelectionScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const categoryId = route.params?.categoryId || 'frontend_web';

  const categoryInfo = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  const allTechs = TECHNOLOGIES[categoryId] || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProgress();
    });
    loadProgress();
    return unsubscribe;
  }, [categoryId, navigation]);

  const loadProgress = async () => {
    const map = {};
    for (const tech of allTechs) {
      try {
        const p = await getTechnologyProgress(tech.id);
        map[tech.id] = p?.percentage || 0;
      } catch (e) {
        map[tech.id] = 0;
      }
    }
    setProgressMap(map);
  };

  // Filter subcategories
  const isMobile = categoryId === 'frontend_mobile';
  const subcategoryFilters = isMobile
    ? [
        { id: 'all', label: 'All' },
        { id: 'cross_platform', label: 'Cross-Platform' },
        { id: 'android', label: 'Android' },
        { id: 'ios', label: 'iOS' },
      ]
    : [];

  const filteredTechs = allTechs.filter((tech) => {
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (isMobile && selectedSubcategory !== 'all') {
      return tech.subcategory === selectedSubcategory;
    }

    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={categoryInfo.name}
        subtitle={`${filteredTechs.length} Roadmaps`}
        showBack={true}
      />

      <View style={styles.topControls}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Filter technologies..."
        />

        {subcategoryFilters.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {subcategoryFilters.map((filter) => {
              const active = selectedSubcategory === filter.id;
              return (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: active
                        ? colors.primary
                        : isDark
                        ? '#22223F'
                        : '#E9ECEF',
                    },
                  ]}
                  onPress={() => setSelectedSubcategory(filter.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterText,
                      { color: active ? '#FFFFFF' : colors.text },
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {filteredTechs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No technologies found matching "{searchQuery}"
            </Text>
          </View>
        ) : (
          filteredTechs.map((tech) => (
            <TechCard
              key={tech.id}
              tech={tech}
              progress={progressMap[tech.id] || 0}
              onPress={() =>
                navigation.navigate('Roadmap', {
                  techId: tech.id,
                  techName: tech.name,
                })
              }
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topControls: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    paddingBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TechnologySelectionScreen;
