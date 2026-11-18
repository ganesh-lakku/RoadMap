import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ROADMAP_DATA, getRoadmapData } from '../data/roadmapData';
import {
  STORAGE_KEYS,
  GITHUB_API_BASE,
  ROADMAP_REPO_OWNER,
  ROADMAP_REPO_NAME,
  API_TIMEOUT,
  getAllTechnologies,
  getTechnologyById,
} from '../constants';
import { generateTopicId } from '../utils/helpers';

/**
 * RoadmapService
 * Handles loading, caching, API syncing, and querying roadmaps and topics.
 */
class RoadmapService {
  /**
   * Fetches the roadmap for a specific technology.
   * Checks local cache first, attempts remote fetch if desired/fresh,
   * and falls back to bundled curated data.
   *
   * @param {string} techId
   * @param {boolean} [forceRefresh=false]
   * @returns {Promise<object>}
   */
  async getRoadmap(techId, forceRefresh = false) {
    if (!techId) return null;
    const normalizedTechId = techId.toLowerCase().trim();

    try {
      // 1. Check cache if not forcing refresh
      if (!forceRefresh) {
        const cached = await this.getCachedRoadmap(normalizedTechId);
        if (cached) {
          return cached;
        }
      }

      // 2. Fall back to bundled data
      const bundledData = getRoadmapData(normalizedTechId);
      if (bundledData) {
        // Cache for faster subsequent reads
        await this.setCachedRoadmap(normalizedTechId, bundledData);
        return bundledData;
      }

      // 3. Optional attempt to fetch from community/remote repository
      const remoteData = await this.fetchRemoteRoadmap(normalizedTechId);
      if (remoteData) {
        await this.setCachedRoadmap(normalizedTechId, remoteData);
        return remoteData;
      }
    } catch (error) {
      console.warn(`[RoadmapService] Error retrieving roadmap for ${techId}:`, error);
      // Ensure we at least return bundled data if available
      const fallback = getRoadmapData(normalizedTechId);
      if (fallback) return fallback;
    }

    return getRoadmapData(normalizedTechId) || null;
  }

  /**
   * Read cached roadmap from AsyncStorage
   * @param {string} techId
   * @returns {Promise<object|null>}
   */
  async getCachedRoadmap(techId) {
    try {
      const raw = await AsyncStorage.getItem(`${STORAGE_KEYS.CACHED_ROADMAPS}_${techId}`);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('[RoadmapService] Cache read error:', e);
    }
    return null;
  }

  /**
   * Write cached roadmap to AsyncStorage
   * @param {string} techId
   * @param {object} data
   */
  async setCachedRoadmap(techId, data) {
    try {
      await AsyncStorage.setItem(
        `${STORAGE_KEYS.CACHED_ROADMAPS}_${techId}`,
        JSON.stringify(data)
      );
    } catch (e) {
      console.warn('[RoadmapService] Cache write error:', e);
    }
  }

  /**
   * Attempts to fetch roadmap metadata from GitHub API or community endpoint
   * @param {string} techId
   * @returns {Promise<object|null>}
   */
  async fetchRemoteRoadmap(techId) {
    try {
      const url = `${GITHUB_API_BASE}/repos/${ROADMAP_REPO_OWNER}/${ROADMAP_REPO_NAME}/contents/roadmaps/${techId}.json`;
      const response = await axios.get(url, {
        timeout: API_TIMEOUT,
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (response.data && response.data.content) {
        // GitHub API returns base64 content
        const decoded = atob(response.data.content.replace(/\s/g, ''));
        return JSON.parse(decoded);
      }
    } catch (e) {
      // GitHub API rate limits or file not existing are expected; fallback quietly
    }
    return null;
  }

  /**
   * Retrieves all topics under a technology as a flat list
   * @param {string} techId
   * @param {string} [levelFilter] - Optional: 'beginner', 'intermediate', 'advanced'
   * @returns {Promise<Array<object>>}
   */
  async getTopicsForTech(techId, levelFilter = null) {
    const roadmap = await this.getRoadmap(techId);
    if (!roadmap || !roadmap.levels) return [];

    const topics = [];
    const targetLevels = levelFilter
      ? [levelFilter.toLowerCase()]
      : Object.keys(roadmap.levels);

    targetLevels.forEach((lvl) => {
      const sections = roadmap.levels[lvl] || [];
      sections.forEach((section, sectionIdx) => {
        (section.topics || []).forEach((topic, topicIdx) => {
          topics.push({
            ...topic,
            techId,
            level: lvl,
            sectionId: section.id,
            sectionTitle: section.title,
            sectionIndex: sectionIdx,
            topicIndex: topicIdx,
            computedId: topic.id || generateTopicId(techId, lvl, sectionIdx, topicIdx),
          });
        });
      });
    });

    return topics;
  }

  /**
   * Retrieves specific topic details by techId and topicId
   * @param {string} techId
   * @param {string} topicId
   * @returns {Promise<object|null>}
   */
  async getTopicDetails(techId, topicId) {
    if (!techId || !topicId) return null;
    const topics = await this.getTopicsForTech(techId);
    return (
      topics.find(
        (t) =>
          t.id === topicId ||
          t.computedId === topicId ||
          t.title.toLowerCase() === topicId.toLowerCase()
      ) || null
    );
  }

  /**
   * Global search across all technologies and topics
   * @param {string} query
   * @returns {Promise<Array<object>>}
   */
  async searchAllTopics(query) {
    if (!query || !query.trim()) return [];
    const lowerQuery = query.toLowerCase().trim();
    const allTechs = getAllTechnologies();
    const results = [];

    for (const tech of allTechs) {
      const topics = await this.getTopicsForTech(tech.id);
      topics.forEach((topic) => {
        const matchesTitle = topic.title.toLowerCase().includes(lowerQuery);
        const matchesDesc = (topic.description || '').toLowerCase().includes(lowerQuery);
        const matchesDetails = (topic.details || '').toLowerCase().includes(lowerQuery);
        const matchesSubtopics = (topic.subtopics || []).some((st) =>
          st.toLowerCase().includes(lowerQuery)
        );

        if (matchesTitle || matchesDesc || matchesDetails || matchesSubtopics) {
          results.push({
            ...topic,
            technologyName: tech.name,
            technologyColor: tech.color,
          });
        }
      });
    }

    return results;
  }
}

export const roadmapService = new RoadmapService();
export default roadmapService;
