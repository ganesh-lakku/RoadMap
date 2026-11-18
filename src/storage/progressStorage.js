import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_STORAGE_KEY = '@DevRoadmap:progress';

/**
 * Normalizes difficulty/level string to standard levels: beginner, intermediate, advanced.
 * @param {string} levelStr
 * @returns {'beginner' | 'intermediate' | 'advanced' | null}
 */
const normalizeLevel = (levelStr) => {
  if (!levelStr || typeof levelStr !== 'string') return null;
  const lower = levelStr.toLowerCase().trim();
  if (
    lower.includes('begin') ||
    lower.includes('basic') ||
    lower.includes('start') ||
    lower.includes('foundat') ||
    lower.includes('intro')
  ) {
    return 'beginner';
  }
  if (
    lower.includes('inter') ||
    lower.includes('medium') ||
    lower.includes('core')
  ) {
    return 'intermediate';
  }
  if (
    lower.includes('adv') ||
    lower.includes('expert') ||
    lower.includes('master') ||
    lower.includes('pro')
  ) {
    return 'advanced';
  }
  return null;
};

/**
 * Creates level progress stats object with valueOf helper for numeric operations.
 * @param {number} total
 * @param {number} completed
 * @returns {{ total: number, completed: number, remaining: number, percentage: number, valueOf: () => number }}
 */
const createLevelStats = (total, completed) => {
  const safeTotal = Math.max(0, total || 0);
  const safeCompleted = Math.max(0, Math.min(safeTotal, completed || 0));
  const remaining = Math.max(0, safeTotal - safeCompleted);
  const percentage = safeTotal > 0 ? Math.round((safeCompleted / safeTotal) * 100) : 0;

  return {
    total: safeTotal,
    completed: safeCompleted,
    remaining,
    percentage,
    valueOf() {
      return percentage;
    },
  };
};

/**
 * Extracts and categorizes topic IDs from roadmap data.
 * Supports various roadmap JSON layouts (levels array, sections array, direct level keys, etc.)
 * @param {object|array} roadmapData
 * @returns {{ beginner: string[], intermediate: string[], advanced: string[], other: string[] }}
 */
const extractTopicsFromRoadmap = (roadmapData) => {
  const result = {
    beginner: [],
    intermediate: [],
    advanced: [],
    other: [],
  };

  if (!roadmapData || typeof roadmapData !== 'object') {
    return result;
  }

  const seenIds = new Set();

  const getTopicId = (topic) => {
    if (!topic) return null;
    if (typeof topic === 'string' || typeof topic === 'number') {
      return String(topic);
    }
    return topic.id || topic.topicId || topic._id || topic.slug || topic.key || null;
  };

  const addTopic = (topic, fallbackLevel) => {
    const id = getTopicId(topic);
    if (!id || seenIds.has(id)) return;
    seenIds.add(id);

    const explicitLevel =
      typeof topic === 'object' && topic !== null
        ? topic.level || topic.difficulty || topic.tier || topic.stage
        : null;

    const matchedLevel =
      normalizeLevel(explicitLevel) || normalizeLevel(fallbackLevel) || 'other';

    if (result[matchedLevel]) {
      result[matchedLevel].push(id);
    } else {
      result.other.push(id);
    }
  };

  const processSection = (section, levelHint) => {
    if (!section) return;
    const currentLevel =
      normalizeLevel(section.level || section.difficulty) || levelHint;

    if (Array.isArray(section.topics)) {
      section.topics.forEach((t) => addTopic(t, currentLevel));
    } else if (Array.isArray(section.items)) {
      section.items.forEach((t) => addTopic(t, currentLevel));
    }
  };

  // 1. Roadmap has levels array or object
  if (Array.isArray(roadmapData.levels)) {
    roadmapData.levels.forEach((lvl) => {
      const levelHint = normalizeLevel(
        lvl.id || lvl.level || lvl.name || lvl.title,
      );
      if (Array.isArray(lvl.sections)) {
        lvl.sections.forEach((s) => processSection(s, levelHint));
      } else if (Array.isArray(lvl.topics)) {
        lvl.topics.forEach((t) => addTopic(t, levelHint));
      }
    });
  } else if (roadmapData.levels && typeof roadmapData.levels === 'object') {
    Object.entries(roadmapData.levels).forEach(([key, lvlVal]) => {
      const levelHint =
        normalizeLevel(key) ||
        normalizeLevel(lvlVal?.id || lvlVal?.level || lvlVal?.name || lvlVal?.title);

      if (Array.isArray(lvlVal)) {
        lvlVal.forEach((item) => {
          if (item?.topics || item?.items) {
            processSection(item, levelHint);
          } else {
            addTopic(item, levelHint);
          }
        });
      } else if (lvlVal && typeof lvlVal === 'object') {
        if (Array.isArray(lvlVal.sections)) {
          lvlVal.sections.forEach((s) => processSection(s, levelHint));
        } else if (Array.isArray(lvlVal.topics)) {
          lvlVal.topics.forEach((t) => addTopic(t, levelHint));
        }
      }
    });
  }

  // 2. Direct keys beginner, intermediate, advanced
  ['beginner', 'intermediate', 'advanced'].forEach((lvlKey) => {
    const list = roadmapData[lvlKey];
    if (Array.isArray(list)) {
      list.forEach((item) => {
        if (item && (item.topics || item.items)) {
          processSection(item, lvlKey);
        } else {
          addTopic(item, lvlKey);
        }
      });
    }
  });

  // 3. Sections array on root
  if (Array.isArray(roadmapData.sections)) {
    roadmapData.sections.forEach((sec) => processSection(sec, sec.level));
  }

  // 4. Topics array on root
  if (Array.isArray(roadmapData.topics)) {
    roadmapData.topics.forEach((t) => addTopic(t, t.level));
  }

  // 5. Array of levels or sections directly
  if (Array.isArray(roadmapData)) {
    roadmapData.forEach((item) => {
      const levelHint = normalizeLevel(
        item?.id || item?.level || item?.name || item?.title,
      );
      if (Array.isArray(item?.sections)) {
        item.sections.forEach((s) => {
          const secLevel = normalizeLevel(s?.level) || levelHint;
          processSection(s, secLevel);
        });
      } else if (Array.isArray(item?.topics)) {
        item.topics.forEach((t) => addTopic(t, levelHint));
      } else {
        addTopic(item, levelHint);
      }
    });
  }

  return result;
};

/**
 * Returns full progress object from AsyncStorage.
 * Storage shape: { [techId]: { completed: [topicId, ...], bookmarked: [topicId, ...], lastVisited: { topicId, level, sectionIndex, timestamp } } }
 * @returns {Promise<object>} Full progress object or {}
 */
export const getProgress = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!jsonValue) return {};
    const parsed = JSON.parse(jsonValue);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch (error) {
    console.error('Error reading progress from storage:', error);
    return {};
  }
};

/**
 * Saves full progress object to AsyncStorage.
 * @param {object} progress
 * @returns {Promise<boolean>} Success indicator
 */
export const saveProgress = async (progress) => {
  try {
    const dataToSave =
      progress && typeof progress === 'object' ? progress : {};
    await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(dataToSave));
    return true;
  } catch (error) {
    console.error('Error saving progress to storage:', error);
    return false;
  }
};

/**
 * Helper to ensure a tech entry exists with proper arrays.
 * @param {object} progress
 * @param {string} techId
 */
const ensureTechStructure = (progress, techId) => {
  if (!progress[techId]) {
    progress[techId] = {
      completed: [],
      bookmarked: [],
      lastVisited: null,
    };
  }
  if (!Array.isArray(progress[techId].completed)) {
    progress[techId].completed = [];
  }
  if (!Array.isArray(progress[techId].bookmarked)) {
    progress[techId].bookmarked = [];
  }
};

/**
 * Adds topicId to completed array for a given tech.
 * @param {string} techId
 * @param {string} topicId
 * @returns {Promise<boolean>} Success indicator
 */
export const markTopicCompleted = async (techId, topicId) => {
  try {
    if (!techId || !topicId) return false;
    const progress = await getProgress();
    ensureTechStructure(progress, techId);

    const alreadyDone = Object.values(progress).some(
      (item) => Array.isArray(item?.completed) && item.completed.includes(topicId),
    );
    if (!alreadyDone) {
      progress[techId].completed.push(topicId);
      await saveProgress(progress);
    }
    return true;
  } catch (error) {
    console.error(`Error marking topic "${topicId}" completed for tech "${techId}":`, error);
    return false;
  }
};

/**
 * Removes topicId from completed array for a given tech.
 * @param {string} techId
 * @param {string} topicId
 * @returns {Promise<boolean>} Success indicator
 */
export const markTopicIncomplete = async (techId, topicId) => {
  try {
    if (!techId || !topicId) return false;
    const progress = await getProgress();
    let changed = false;
    Object.values(progress).forEach((item) => {
      if (Array.isArray(item?.completed) && item.completed.includes(topicId)) {
        item.completed = item.completed.filter((id) => id !== topicId);
        changed = true;
      }
    });
    if (changed) await saveProgress(progress);
    return true;
  } catch (error) {
    console.error(`Error marking topic "${topicId}" incomplete for tech "${techId}":`, error);
    return false;
  }
};

/**
 * Helper to resolve techId and topicId from arguments.
 * Handles both (techId, topicId) and (combinedTopicId).
 */
let topicTechIndex = null;
const findTechIdForTopic = (topicId) => {
  try {
    if (!topicTechIndex) {
      const { ROADMAP_DATA } = require('../data/roadmapData');
      topicTechIndex = {};
      Object.entries(ROADMAP_DATA).forEach(([id, tech]) => {
        Object.values(tech?.levels || {}).forEach((sections) => {
          (sections || []).forEach((sec) => {
            (sec.topics || []).forEach((t) => {
              if (t.id) topicTechIndex[t.id] = id;
            });
          });
        });
      });
    }
    return topicTechIndex[topicId] || null;
  } catch (e) {
    return null;
  }
};

const resolveTechAndTopic = (param1, param2) => {
  if (param1 && param2) {
    return { techId: String(param1).toLowerCase().trim(), topicId: String(param2) };
  }
  if (!param1) return { techId: '', topicId: '' };

  const str = String(param1);
  const known = findTechIdForTopic(str);
  if (known) return { techId: known, topicId: str };
  const parts = str.split('_');
  const techId = parts[0] ? parts[0].toLowerCase().trim() : '';
  return { techId, topicId: str };
};

/**
 * Toggles a topic's completion status.
 * @param {string} techIdOrTopicId
 * @param {string} [optionalTopicId]
 * @returns {Promise<boolean>} True if now completed, false if now incomplete
 */
export const toggleTopicCompletion = async (techIdOrTopicId, optionalTopicId) => {
  const { techId, topicId } = resolveTechAndTopic(techIdOrTopicId, optionalTopicId);
  if (!techId || !topicId) return false;

  const completed = await isTopicCompleted(techId, topicId);
  if (completed) {
    await markTopicIncomplete(techId, topicId);
    return false;
  } else {
    await markTopicCompleted(techId, topicId);
    return true;
  }
};

/**
 * Toggles bookmark status for a topic.
 * @param {string} techIdOrTopicId
 * @param {string} [optionalTopicId]
 * @returns {Promise<boolean>} True if now bookmarked, false if unbookmarked or on error
 */
export const toggleBookmark = async (techIdOrTopicId, optionalTopicId) => {
  try {
    const { techId, topicId } = resolveTechAndTopic(techIdOrTopicId, optionalTopicId);
    if (!techId || !topicId) return false;
    const progress = await getProgress();
    ensureTechStructure(progress, techId);

    const index = progress[techId].bookmarked.indexOf(topicId);
    let isNowBookmarked = false;

    if (index > -1) {
      progress[techId].bookmarked.splice(index, 1);
      isNowBookmarked = false;
    } else {
      progress[techId].bookmarked.push(topicId);
      isNowBookmarked = true;
    }

    await saveProgress(progress);
    return isNowBookmarked;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return false;
  }
};

/**
 * Returns array of bookmarked topic IDs for a given tech or across all techs.
 * @param {string} [techId]
 * @returns {Promise<string[]>}
 */
export const getBookmarks = async (techId) => {
  try {
    const progress = await getProgress();
    if (techId) {
      return Array.isArray(progress[techId]?.bookmarked)
        ? progress[techId].bookmarked
        : [];
    }

    const all = [];
    Object.values(progress).forEach((item) => {
      if (Array.isArray(item?.bookmarked)) {
        all.push(...item.bookmarked);
      }
    });
    return all;
  } catch (error) {
    console.error(`Error getting bookmarks for tech "${techId}":`, error);
    return [];
  }
};

export const getBookmarkedTopicIds = getBookmarks;

/**
 * Returns whether a topic is completed.
 * @param {string} techIdOrTopicId
 * @param {string} [optionalTopicId]
 * @returns {Promise<boolean>}
 */
export const isTopicCompleted = async (techIdOrTopicId, optionalTopicId) => {
  try {
    const { techId, topicId } = resolveTechAndTopic(techIdOrTopicId, optionalTopicId);
    if (!techId || !topicId) return false;
    const progress = await getProgress();

    if (progress[techId]?.completed?.includes(topicId)) {
      return true;
    }

    // Also check all techs in case techId was prefixed differently
    for (const item of Object.values(progress)) {
      if (Array.isArray(item?.completed) && item.completed.includes(topicId)) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(`Error checking topic completed status:`, error);
    return false;
  }
};

/**
 * Returns whether a topic is bookmarked.
 * @param {string} techIdOrTopicId
 * @param {string} [optionalTopicId]
 * @returns {Promise<boolean>}
 */
export const isTopicBookmarked = async (techIdOrTopicId, optionalTopicId) => {
  try {
    const { techId, topicId } = resolveTechAndTopic(techIdOrTopicId, optionalTopicId);
    if (!techId || !topicId) return false;
    const progress = await getProgress();

    if (progress[techId]?.bookmarked?.includes(topicId)) {
      return true;
    }

    for (const item of Object.values(progress)) {
      if (Array.isArray(item?.bookmarked) && item.bookmarked.includes(topicId)) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(`Error checking topic bookmarked status:`, error);
    return false;
  }
};

/**
 * Returns array of completed topic IDs for a given tech or across all techs.
 * @param {string} [techId]
 * @returns {Promise<string[]>}
 */
export const getCompletedTopics = async (techId) => {
  try {
    const progress = await getProgress();
    if (techId) {
      return Array.isArray(progress[techId]?.completed)
        ? progress[techId].completed
        : [];
    }

    const all = [];
    Object.values(progress).forEach((item) => {
      if (Array.isArray(item?.completed)) {
        all.push(...item.completed);
      }
    });
    return all;
  } catch (error) {
    console.error(`Error getting completed topics for tech "${techId}":`, error);
    return [];
  }
};

export const getCompletedTopicIds = getCompletedTopics;

/**
 * Saves last visited position for a given tech.
 * @param {string} techId
 * @param {string} topicId
 * @param {string} level
 * @param {number} sectionIndex
 * @returns {Promise<object|null>} The saved last visited object or null on error
 */
export const saveLastVisited = async (techId, topicId, level, sectionIndex) => {
  try {
    if (!techId) return null;
    const progress = await getProgress();
    ensureTechStructure(progress, techId);

    const lastVisited = {
      topicId: topicId || null,
      level: level || null,
      sectionIndex: typeof sectionIndex === 'number' ? sectionIndex : 0,
      timestamp: Date.now(),
    };

    progress[techId].lastVisited = lastVisited;
    await saveProgress(progress);
    return lastVisited;
  } catch (error) {
    console.error(`Error saving last visited position for tech "${techId}":`, error);
    return null;
  }
};

/**
 * Returns last visited info for a tech.
 * @param {string} techId
 * @returns {Promise<{ topicId: string, level: string, sectionIndex: number, timestamp: number }|null>}
 */
export const getLastVisited = async (techId) => {
  try {
    if (!techId) return null;
    const progress = await getProgress();
    return progress[techId]?.lastVisited || null;
  } catch (error) {
    console.error(`Error getting last visited position for tech "${techId}":`, error);
    return null;
  }
};

/**
 * Calculates stats: { total, completed, remaining, percentage, beginnerProgress, intermediateProgress, advancedProgress }
 * @param {string} techId
 * @param {object|array} roadmapData
 * @returns {Promise<{
 *   total: number,
 *   completed: number,
 *   remaining: number,
 *   percentage: number,
 *   beginnerProgress: { total: number, completed: number, remaining: number, percentage: number },
 *   intermediateProgress: { total: number, completed: number, remaining: number, percentage: number },
 *   advancedProgress: { total: number, completed: number, remaining: number, percentage: number }
 * }>}
 */
export const getProgressStats = async (techId, roadmapData) => {
  try {
    const allCompleted = await getCompletedTopics();
    const completedSet = new Set(allCompleted);

    const extracted = extractTopicsFromRoadmap(roadmapData);

    const calcLevelStats = (topicIds) => {
      const total = topicIds.length;
      let completedCount = 0;
      for (let i = 0; i < topicIds.length; i++) {
        if (completedSet.has(topicIds[i])) {
          completedCount++;
        }
      }
      return createLevelStats(total, completedCount);
    };

    const beginnerProgress = calcLevelStats(extracted.beginner);
    const intermediateProgress = calcLevelStats(extracted.intermediate);
    const advancedProgress = calcLevelStats(extracted.advanced);

    const allTopicIds = [
      ...extracted.beginner,
      ...extracted.intermediate,
      ...extracted.advanced,
      ...extracted.other,
    ];

    let total = allTopicIds.length;
    let completed = 0;

    if (total > 0) {
      for (let i = 0; i < allTopicIds.length; i++) {
        if (completedSet.has(allTopicIds[i])) {
          completed++;
        }
      }
    } else {
      // Fallback if roadmapData is empty or not yet loaded: use completed list count
      const techCompleted = await getCompletedTopics(techId);
      total = techCompleted.length;
      completed = techCompleted.length;
    }

    const remaining = Math.max(0, total - completed);
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      remaining,
      percentage,
      beginnerProgress,
      intermediateProgress,
      advancedProgress,
    };
  } catch (error) {
    console.error(`Error calculating progress stats for tech "${techId}":`, error);
    return {
      total: 0,
      completed: 0,
      remaining: 0,
      percentage: 0,
      beginnerProgress: createLevelStats(0, 0),
      intermediateProgress: createLevelStats(0, 0),
      advancedProgress: createLevelStats(0, 0),
    };
  }
};

/**
 * Clears progress for a specific tech.
 * @param {string} techId
 * @returns {Promise<boolean>} Success indicator
 */
export const clearProgress = async (techId) => {
  try {
    if (!techId) return false;
    const progress = await getProgress();
    if (progress[techId]) {
      delete progress[techId];
      await saveProgress(progress);
    }
    return true;
  } catch (error) {
    console.error(`Error clearing progress for tech "${techId}":`, error);
    return false;
  }
};

/**
 * Clears all progress stored in AsyncStorage.
 * @returns {Promise<boolean>} Success indicator
 */
export const clearAllProgress = async () => {
  try {
    await AsyncStorage.removeItem(PROGRESS_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing all progress from storage:', error);
    return false;
  }
};

export const resetAllProgress = clearAllProgress;

/**
 * Calculates progress for a specific technology using bundled roadmap data.
 * @param {string} techId
 * @returns {Promise<{ total: number, completed: number, remaining: number, percentage: number }>}
 */
export const getTechnologyProgress = async (techId) => {
  try {
    const { ROADMAP_DATA } = require('../data/roadmapData');
    const roadmap = ROADMAP_DATA[techId];
    return await getProgressStats(techId, roadmap || {});
  } catch (e) {
    return { total: 0, completed: 0, remaining: 0, percentage: 0 };
  }
};

/**
 * Calculates overall progress across all technologies.
 * @returns {Promise<{
 *   totalTopics: number,
 *   totalCompleted: number,
 *   percentage: number,
 *   byLevel: { beginner: object, intermediate: object, advanced: object }
 * }>}
 */
export const getOverallProgress = async () => {
  try {
    const { ROADMAP_DATA } = require('../data/roadmapData');
    const completedIds = await getCompletedTopics();
    const completedSet = new Set(completedIds);

    let totalTopics = 0;
    const byLevel = {
      beginner: { total: 0, completed: 0, percentage: 0 },
      intermediate: { total: 0, completed: 0, percentage: 0 },
      advanced: { total: 0, completed: 0, percentage: 0 },
    };

    Object.values(ROADMAP_DATA).forEach((tech) => {
      ['beginner', 'intermediate', 'advanced'].forEach((lvl) => {
        const sections = tech?.levels?.[lvl] || [];
        sections.forEach((sec) => {
          (sec.topics || []).forEach((t) => {
            totalTopics++;
            byLevel[lvl].total++;
            const tId = t.id || t.computedId;
            if (completedSet.has(tId)) {
              byLevel[lvl].completed++;
            }
          });
        });
      });
    });

    ['beginner', 'intermediate', 'advanced'].forEach((lvl) => {
      byLevel[lvl].percentage =
        byLevel[lvl].total > 0
          ? Math.round((byLevel[lvl].completed / byLevel[lvl].total) * 100)
          : 0;
    });

    const totalCompleted =
      byLevel.beginner.completed +
      byLevel.intermediate.completed +
      byLevel.advanced.completed;
    const percentage =
      totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0;

    return {
      totalTopics,
      totalCompleted,
      percentage,
      byLevel,
    };
  } catch (e) {
    return {
      totalTopics: 0,
      totalCompleted: 0,
      percentage: 0,
      byLevel: {
        beginner: { total: 0, completed: 0, percentage: 0 },
        intermediate: { total: 0, completed: 0, percentage: 0 },
        advanced: { total: 0, completed: 0, percentage: 0 },
      },
    };
  }
};

const progressStorage = {
  getProgress,
  saveProgress,
  markTopicCompleted,
  markTopicIncomplete,
  toggleBookmark,
  getBookmarks,
  isTopicCompleted,
  isTopicBookmarked,
  getCompletedTopics,
  saveLastVisited,
  getLastVisited,
  getProgressStats,
  clearProgress,
  clearAllProgress,
};

export default progressStorage;
