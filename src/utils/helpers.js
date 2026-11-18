/**
 * helpers.js
 * General utility functions for React Native Developer Learning Roadmap App
 */

/**
 * Truncates text with ellipsis if it exceeds maxLength
 * @param {string} text - The input string to truncate
 * @param {number} [maxLength=100] - Maximum allowed length
 * @returns {string} Truncated string with ellipsis or original text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength).trim()}...`;
};

/**
 * Creates unique topic ID
 * @param {string} techId - Technology identifier (e.g., 'reactjs')
 * @param {string} level - Difficulty level (e.g., 'beginner')
 * @param {number|string} sectionIndex - Index of the section
 * @param {number|string} topicIndex - Index of the topic
 * @returns {string} Formatted topic ID (e.g., 'reactjs_beginner_0_2')
 */
export const generateTopicId = (techId, level, sectionIndex, topicIndex) => {
  const safeTechId = (techId || '').toString().toLowerCase().trim().replace(/[\s-]+/g, '_');
  const safeLevel = (level || '').toString().toLowerCase().trim();
  const safeSection = sectionIndex !== undefined && sectionIndex !== null ? sectionIndex : 0;
  const safeTopic = topicIndex !== undefined && topicIndex !== null ? topicIndex : 0;
  return `${safeTechId}_${safeLevel}_${safeSection}_${safeTopic}`;
};

/**
 * Parses topic ID back to its components
 * @param {string} topicId - Formatted topic ID (e.g., 'reactjs_beginner_0_2')
 * @returns {{ techId: string, level: string, sectionIndex: number, topicIndex: number }}
 */
export const parseTopicId = (topicId) => {
  if (!topicId || typeof topicId !== 'string') {
    return { techId: '', level: '', sectionIndex: 0, topicIndex: 0 };
  }

  const parts = topicId.split('_');
  if (parts.length >= 4) {
    const topicIndex = parseInt(parts[parts.length - 1], 10);
    const sectionIndex = parseInt(parts[parts.length - 2], 10);
    const level = parts[parts.length - 3] || '';
    const techId = parts.slice(0, parts.length - 3).join('_');
    return {
      techId,
      level,
      sectionIndex: isNaN(sectionIndex) ? 0 : sectionIndex,
      topicIndex: isNaN(topicIndex) ? 0 : topicIndex,
    };
  }

  return {
    techId: parts[0] || '',
    level: parts[1] || '',
    sectionIndex: parseInt(parts[2], 10) || 0,
    topicIndex: parseInt(parts[3], 10) || 0,
  };
};

/**
 * Formats a numeric value as percentage string with 1 decimal place
 * @param {number|string} value - The percentage value (e.g. 75, 75.4)
 * @returns {string} Formatted percentage (e.g. '75.0%')
 */
export const formatPercentage = (value) => {
  const num = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(num)) {
    return '0.0%';
  }
  return `${num.toFixed(1)}%`;
};

/**
 * Returns human-readable time ago string
 * @param {number|string|Date} timestamp - Date or timestamp
 * @returns {string} Formatted time ago (e.g., '5 minutes ago', 'Just now')
 */
export const getTimeAgo = (timestamp) => {
  if (!timestamp) return '';

  let dateMs;
  if (timestamp instanceof Date) {
    dateMs = timestamp.getTime();
  } else if (typeof timestamp === 'number') {
    // If timestamp is in seconds, convert to milliseconds
    dateMs = timestamp < 1e11 ? timestamp * 1000 : timestamp;
  } else if (typeof timestamp === 'string') {
    dateMs = new Date(timestamp).getTime();
  } else {
    return '';
  }

  if (isNaN(dateMs)) return '';

  const now = Date.now();
  const diffInSeconds = Math.floor((now - dateMs) / 1000);

  if (diffInSeconds < 0 || diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
};

/**
 * Capitalizes the first letter of a string
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
export const capitalizeFirst = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Debounce utility function
 * @param {Function} func - Function to debounce
 * @param {number} [wait=300] - Delay in milliseconds
 * @returns {Function} Debounced function with cancel method
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  const debounced = function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
  debounced.cancel = () => {
    clearTimeout(timeout);
  };
  return debounced;
};

/**
 * Returns a time-based greeting string
 * @returns {string} 'Good morning', 'Good afternoon', 'Good evening', or 'Good night'
 */
export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return 'Good morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good afternoon';
  } else if (currentHour >= 17 && currentHour < 22) {
    return 'Good evening';
  }
  return 'Good night';
};

/**
 * Returns the color associated with a difficulty level
 * @param {string} level - Difficulty level ('beginner', 'intermediate', 'advanced', 'expert')
 * @param {object} [colors={}] - Active theme colors object
 * @returns {string} Hex or rgba color string
 */
export const getLevelColor = (level, colors = {}) => {
  const normalizedLevel = (level || '').toLowerCase().trim();
  switch (normalizedLevel) {
    case 'beginner':
      return colors?.beginner || colors?.success || '#4CAF50';
    case 'intermediate':
      return colors?.intermediate || colors?.warning || '#FF9800';
    case 'advanced':
      return colors?.advanced || colors?.danger || colors?.error || '#F44336';
    case 'expert':
      return colors?.expert || colors?.purple || '#9C27B0';
    default:
      return colors?.primary || colors?.textSecondary || '#2196F3';
  }
};

/**
 * Returns the Ionicons icon name for a given difficulty level
 * @param {string} level - Difficulty level ('beginner', 'intermediate', 'advanced', 'expert')
 * @returns {string} Ionicons icon name
 */
export const getLevelIcon = (level) => {
  const normalizedLevel = (level || '').toLowerCase().trim();
  switch (normalizedLevel) {
    case 'beginner':
      return 'school-outline';
    case 'intermediate':
      return 'trending-up-outline';
    case 'advanced':
      return 'rocket-outline';
    case 'expert':
      return 'trophy-outline';
    default:
      return 'book-outline';
  }
};

/**
 * Filters topics by matching name or description against searchQuery
 * @param {Array} topics - List of topic objects or strings
 * @param {string} searchQuery - Search query string
 * @returns {Array} Filtered list of topics
 */
export const filterTopics = (topics, searchQuery) => {
  if (!Array.isArray(topics)) return [];
  if (!searchQuery || typeof searchQuery !== 'string' || !searchQuery.trim()) {
    return topics;
  }

  const query = searchQuery.toLowerCase().trim();

  return topics.filter((topic) => {
    if (!topic) return false;
    if (typeof topic === 'string') {
      return topic.toLowerCase().includes(query);
    }

    const nameMatch = typeof topic.name === 'string' && topic.name.toLowerCase().includes(query);
    const titleMatch = typeof topic.title === 'string' && topic.title.toLowerCase().includes(query);
    const descMatch = typeof topic.description === 'string' && topic.description.toLowerCase().includes(query);
    const detailsMatch = typeof topic.details === 'string' && topic.details.toLowerCase().includes(query);

    const subtopicsMatch =
      Array.isArray(topic.subtopics) &&
      topic.subtopics.some((sub) => {
        if (typeof sub === 'string') return sub.toLowerCase().includes(query);
        return typeof sub?.name === 'string' && sub.name.toLowerCase().includes(query);
      });

    return Boolean(nameMatch || titleMatch || descMatch || detailsMatch || subtopicsMatch);
  });
};

/**
 * Calculates overall progress and detailed statistics
 * @param {Array|object} progressData - Completed topic IDs (array, object map, or progress state)
 * @param {Array|object} roadmapData - Roadmap hierarchy or data
 * @returns {object} Progress statistics
 */
export const calculateOverallProgress = (progressData, roadmapData) => {
  try {
    // 1. Collect completed topic IDs into a Set
    const completedSet = new Set();

    if (Array.isArray(progressData)) {
      progressData.forEach((item) => {
        if (typeof item === 'string') {
          completedSet.add(item);
        } else if (item && typeof item === 'object') {
          const id = item.id || item.topicId;
          if (id) completedSet.add(id);
        }
      });
    } else if (progressData && typeof progressData === 'object') {
      if (Array.isArray(progressData.completedTopics)) {
        progressData.completedTopics.forEach((id) => {
          if (typeof id === 'string') completedSet.add(id);
        });
      } else if (progressData.completedTopics && typeof progressData.completedTopics === 'object') {
        Object.entries(progressData.completedTopics).forEach(([id, val]) => {
          if (val === true || (val && val.completed === true)) {
            completedSet.add(id);
          }
        });
      } else {
        Object.entries(progressData).forEach(([key, val]) => {
          if (val === true || (val && val.completed === true)) {
            completedSet.add(key);
          }
        });
      }
    }

    // 2. Parse roadmapData to count total topics and calculate stats per tech / level
    let techList = [];
    if (Array.isArray(roadmapData)) {
      techList = roadmapData;
    } else if (roadmapData && typeof roadmapData === 'object') {
      if (Array.isArray(roadmapData.technologies)) {
        techList = roadmapData.technologies;
      } else if (roadmapData.id || roadmapData.levels || roadmapData.sections) {
        techList = [roadmapData];
      } else {
        techList = Object.values(roadmapData).filter((item) => item && typeof item === 'object');
      }
    }

    let totalTopics = 0;
    let completedTopicsCount = 0;
    const byTechnology = {};
    const byLevel = {
      beginner: { total: 0, completed: 0, percentage: 0 },
      intermediate: { total: 0, completed: 0, percentage: 0 },
      advanced: { total: 0, completed: 0, percentage: 0 },
    };

    techList.forEach((tech) => {
      const techId = (tech.id || tech.techId || tech.name || 'tech').toString().toLowerCase();
      if (!byTechnology[techId]) {
        byTechnology[techId] = {
          id: techId,
          name: tech.name || techId,
          total: 0,
          completed: 0,
          percentage: 0,
        };
      }

      const levels = tech.levels;
      if (levels && typeof levels === 'object') {
        const levelEntries = Array.isArray(levels)
          ? levels.map((l) => [l.level || l.id || 'general', l])
          : Object.entries(levels);

        levelEntries.forEach(([levelKey, levelData]) => {
          const normalizedLevel = levelKey.toLowerCase();
          if (!byLevel[normalizedLevel]) {
            byLevel[normalizedLevel] = { total: 0, completed: 0, percentage: 0 };
          }

          const sections = Array.isArray(levelData)
            ? levelData
            : Array.isArray(levelData?.sections)
            ? levelData.sections
            : [];

          sections.forEach((section, sectionIdx) => {
            const topics = Array.isArray(section?.topics)
              ? section.topics
              : Array.isArray(section?.items)
              ? section.items
              : [];

            topics.forEach((topic, topicIdx) => {
              totalTopics += 1;
              byTechnology[techId].total += 1;
              byLevel[normalizedLevel].total += 1;

              const topicId =
                topic && topic.id
                  ? topic.id
                  : generateTopicId(techId, normalizedLevel, sectionIdx, topicIdx);
              const isCompleted =
                completedSet.has(topicId) || (topic && topic.completed === true);

              if (isCompleted) {
                completedTopicsCount += 1;
                byTechnology[techId].completed += 1;
                byLevel[normalizedLevel].completed += 1;
              }
            });
          });
        });
      } else if (Array.isArray(tech.sections)) {
        tech.sections.forEach((section, sectionIdx) => {
          const sectionLevel = (section.level || 'beginner').toLowerCase();
          if (!byLevel[sectionLevel]) {
            byLevel[sectionLevel] = { total: 0, completed: 0, percentage: 0 };
          }

          const topics = Array.isArray(section.topics) ? section.topics : [];
          topics.forEach((topic, topicIdx) => {
            totalTopics += 1;
            byTechnology[techId].total += 1;
            byLevel[sectionLevel].total += 1;

            const topicId =
              topic && topic.id
                ? topic.id
                : generateTopicId(techId, sectionLevel, sectionIdx, topicIdx);
            const isCompleted =
              completedSet.has(topicId) || (topic && topic.completed === true);

            if (isCompleted) {
              completedTopicsCount += 1;
              byTechnology[techId].completed += 1;
              byLevel[sectionLevel].completed += 1;
            }
          });
        });
      }
    });

    // If roadmap data was not provided or empty, but progressData exists:
    if (totalTopics === 0 && completedSet.size > 0) {
      completedTopicsCount = completedSet.size;
      totalTopics = completedTopicsCount;
    }

    // Fallback if progressData already has numeric summary { total, completed }
    if (totalTopics === 0 && typeof progressData?.total === 'number') {
      totalTopics = progressData.total;
      completedTopicsCount =
        typeof progressData?.completed === 'number' ? progressData.completed : 0;
    }

    // Calculate percentages
    const percentage =
      totalTopics > 0
        ? parseFloat(((completedTopicsCount / totalTopics) * 100).toFixed(1))
        : 0.0;

    Object.keys(byTechnology).forEach((tId) => {
      const item = byTechnology[tId];
      item.percentage =
        item.total > 0 ? parseFloat(((item.completed / item.total) * 100).toFixed(1)) : 0.0;
      item.formattedPercentage = formatPercentage(item.percentage);
    });

    Object.keys(byLevel).forEach((lvl) => {
      const item = byLevel[lvl];
      item.percentage =
        item.total > 0 ? parseFloat(((item.completed / item.total) * 100).toFixed(1)) : 0.0;
      item.formattedPercentage = formatPercentage(item.percentage);
    });

    const remainingTopics = Math.max(0, totalTopics - completedTopicsCount);

    return {
      totalTopics,
      completedTopics: completedTopicsCount,
      remainingTopics,
      percentage,
      formattedPercentage: formatPercentage(percentage),
      isComplete: totalTopics > 0 && completedTopicsCount >= totalTopics,
      byTechnology,
      byLevel,
    };
  } catch (error) {
    console.error('Error calculating overall progress:', error);
    return {
      totalTopics: 0,
      completedTopics: 0,
      remainingTopics: 0,
      percentage: 0.0,
      formattedPercentage: '0.0%',
      isComplete: false,
      byTechnology: {},
      byLevel: {},
    };
  }
};

const helpers = {
  truncateText,
  generateTopicId,
  parseTopicId,
  formatPercentage,
  getTimeAgo,
  capitalizeFirst,
  debounce,
  getGreeting,
  getLevelColor,
  getLevelIcon,
  filterTopics,
  calculateOverallProgress,
};

export default helpers;
