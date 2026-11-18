import { roadmapService } from '../src/services/roadmapService';

describe('RoadmapService', () => {
  test('loads bundled roadmap for react_native', async () => {
    const rm = await roadmapService.getRoadmap('react_native');
    expect(rm).toBeDefined();
    expect(rm.name).toBe('React Native');
    expect(rm.levels).toHaveProperty('beginner');
    expect(rm.levels).toHaveProperty('intermediate');
    expect(rm.levels).toHaveProperty('advanced');
  });

  test('retrieves flat list of topics with computed IDs', async () => {
    const topics = await roadmapService.getTopicsForTech('javascript', 'beginner');
    expect(topics.length).toBeGreaterThan(0);
    expect(topics[0]).toHaveProperty('computedId');
    expect(topics[0].level).toBe('beginner');
  });

  test('searches topics across all technologies', async () => {
    const results = await roadmapService.searchAllTopics('closure');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title.toLowerCase()).toContain('closure');
  });
});
