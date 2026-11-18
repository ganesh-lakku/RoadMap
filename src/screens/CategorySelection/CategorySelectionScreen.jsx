import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { CATEGORIES, TECHNOLOGIES } from '../../constants';
import Header from '../../components/common/Header';
import Icon from '../../components/common/Icon';

export const CategorySelectionScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Learning Tracks" showBack={true} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.introText, { color: colors.textSecondary }]}>
          Choose your development specialization to explore step-by-step career roadmaps.
        </Text>

        {CATEGORIES.map((cat) => {
          const techList = TECHNOLOGIES[cat.id] || [];
          const isWeb = cat.id === 'frontend_web';
          const themeColor = isWeb ? '#3B82F6' : '#8B5CF6';

          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? '#1C1C36' : '#FFFFFF',
                  borderColor: isDark ? '#2E2E52' : '#E9ECEF',
                },
              ]}
              onPress={() =>
                navigation.navigate('TechnologySelection', { categoryId: cat.id })
              }
              activeOpacity={0.75}
            >
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: `${themeColor}20`, borderColor: `${themeColor}40` },
                  ]}
                >
                  <Icon name={cat.icon} size={28} color={themeColor} />
                </View>

                <View style={styles.headerInfo}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>
                    {cat.name}
                  </Text>
                  <Text style={[styles.techCount, { color: themeColor }]}>
                    {techList.length} Technologies Included
                  </Text>
                </View>

                <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>

              <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
                {cat.description}
              </Text>

              {/* Technologies Pill Preview */}
              <View style={styles.pillsContainer}>
                {techList.slice(0, 4).map((tech) => (
                  <View
                    key={tech.id}
                    style={[
                      styles.pill,
                      {
                        backgroundColor: isDark ? '#262646' : '#F1F3F5',
                      },
                    ]}
                  >
                    <Text style={[styles.pillText, { color: colors.text }]}>
                      {tech.name}
                    </Text>
                  </View>
                ))}
                {techList.length > 4 && (
                  <View
                    style={[
                      styles.pill,
                      { backgroundColor: isDark ? '#262646' : '#F1F3F5' },
                    ]}
                  >
                    <Text style={[styles.pillText, { color: colors.textSecondary }]}>
                      +{techList.length - 4} more
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  introText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  headerInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  techCount: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default CategorySelectionScreen;
