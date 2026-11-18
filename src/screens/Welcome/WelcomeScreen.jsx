import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { APP_NAME, APP_TAGLINE, CATEGORIES } from '../../constants';
import { getOverallProgress } from '../../storage/progressStorage';
import { getGreeting } from '../../utils/helpers';
import Icon from '../../components/common/Icon';
import ProgressBar from '../../components/common/ProgressBar';

export const WelcomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark, toggleTheme } = useTheme();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadStats();
    });
    loadStats();
    return unsubscribe;
  }, [navigation]);

  const loadStats = async () => {
    try {
      const p = await getOverallProgress();
      setStats(p);
    } catch (e) {
      console.warn('Error loading stats:', e);
    }
  };

  const completedCount = stats?.totalCompleted || 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 16),
            paddingBottom: insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar with Greeting & Theme Toggle */}
        <View style={styles.topBar}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              {getGreeting()} 👋
            </Text>
            <Text style={[styles.appName, { color: colors.text }]}>{APP_NAME}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.themeToggle,
              { backgroundColor: isDark ? '#23233E' : '#FFFFFF', borderColor: colors.border },
            ]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Icon
              name={isDark ? 'sunny-outline' : 'moon-outline'}
              size={20}
              color={isDark ? '#FFD166' : colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
            },
          ]}
        >
          <View style={styles.heroBadge}>
            <Icon name="rocket-outline" size={14} color="#FFFFFF" />
            <Text style={styles.heroBadgeText}>Interactive Roadmaps</Text>
          </View>

          <Text style={styles.heroTitle}>{APP_TAGLINE}</Text>
          <Text style={styles.heroSubtitle}>
            Master modern frontend web and mobile development with curated step-by-step
            learning paths, interactive checklists, and resource links.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => navigation.navigate('CategorySelection')}
            activeOpacity={0.85}
          >
            <Text style={[styles.heroButtonText, { color: colors.primary }]}>
              Explore Roadmaps
            </Text>
            <Icon name="arrow-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Learning Progress Summary (if any topics completed) */}
        {completedCount > 0 && (
          <TouchableOpacity
            style={[
              styles.progressBanner,
              {
                backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                borderColor: isDark ? '#2E2E52' : '#E9ECEF',
              },
            ]}
            onPress={() => navigation.navigate('ProgressTab')}
            activeOpacity={0.7}
          >
            <View style={styles.progressBannerHeader}>
              <View style={styles.progressIconWrap}>
                <Icon name="trophy-outline" size={20} color={colors.warning} />
              </View>
              <View style={styles.progressTextWrap}>
                <Text style={[styles.progressTitle, { color: colors.text }]}>
                  {completedCount} Topics Completed!
                </Text>
                <Text style={[styles.progressSub, { color: colors.textSecondary }]}>
                  Keep up the momentum. View detailed analytics.
                </Text>
              </View>
              <Icon name="chevron-forward" size={18} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        )}

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Choose a Track</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Select your target engineering specialty
          </Text>
        </View>

        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                {
                  backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                  borderColor: isDark ? '#2E2E52' : '#E9ECEF',
                },
              ]}
              onPress={() =>
                navigation.navigate('TechnologySelection', { categoryId: cat.id })
              }
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.categoryIconWrap,
                  {
                    backgroundColor:
                      cat.id === 'frontend_web' ? 'rgba(74, 144, 226, 0.15)' : 'rgba(108, 99, 255, 0.15)',
                  },
                ]}
              >
                <Icon
                  name={cat.icon}
                  size={26}
                  color={cat.id === 'frontend_web' ? '#4A90E2' : colors.primary}
                />
              </View>

              <Text style={[styles.categoryName, { color: colors.text }]}>
                {cat.name}
              </Text>
              <Text style={[styles.categoryDesc, { color: colors.textSecondary }]}>
                {cat.description}
              </Text>

              <View style={styles.categoryFooter}>
                <Text
                  style={[
                    styles.categoryAction,
                    {
                      color: cat.id === 'frontend_web' ? '#4A90E2' : colors.primary,
                    },
                  ]}
                >
                  View Technologies
                </Text>
                <Icon
                  name="chevron-forward"
                  size={16}
                  color={cat.id === 'frontend_web' ? '#4A90E2' : colors.primary}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features Highlights */}
        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: `${colors.success}22` }]}>
              <Icon name="checkmark-circle-outline" size={18} color={colors.success} />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                Progress Checklists
              </Text>
              <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
                Track topics and subtopics with persistent offline storage.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: `${colors.primary}22` }]}>
              <Icon name="school-outline" size={18} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                3 Difficulty Levels
              </Text>
              <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
                Structured progression from Beginner to Intermediate & Advanced.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: `${colors.warning}22` }]}>
              <Icon name="bookmark-outline" size={18} color={colors.warning} />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                Bookmarks & Resources
              </Text>
              <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
                Save complex concepts and access curated docs & guides.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  appName: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  themeToggle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    borderRadius: 20,
    padding: 22,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 6,
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 18,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 8,
  },
  heroButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  progressBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 183, 3, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  progressTextWrap: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  progressSub: {
    fontSize: 12,
    marginTop: 2,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  categoriesGrid: {
    gap: 12,
    marginBottom: 24,
  },
  categoryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
  },
  categoryIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  categoryDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  categoryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryAction: {
    fontSize: 13,
    fontWeight: '700',
  },
  featuresSection: {
    gap: 14,
    marginTop: 6,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  featureDesc: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default WelcomeScreen;
