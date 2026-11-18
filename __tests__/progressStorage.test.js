import {
  toggleTopicCompletion,
  isTopicCompleted,
  getCompletedTopicIds,
  toggleBookmark,
  isTopicBookmarked,
  resetAllProgress,
} from '../src/storage/progressStorage';

describe('ProgressStorage', () => {
  beforeEach(async () => {
    await resetAllProgress();
  });

  test('toggles topic completion on and off', async () => {
    const topicId = 'javascript_beginner_0_1';

    let completed = await isTopicCompleted(topicId);
    expect(completed).toBe(false);

    const firstToggle = await toggleTopicCompletion(topicId);
    expect(firstToggle).toBe(true);

    completed = await isTopicCompleted(topicId);
    expect(completed).toBe(true);

    const ids = await getCompletedTopicIds();
    expect(ids).toContain(topicId);

    const secondToggle = await toggleTopicCompletion(topicId);
    expect(secondToggle).toBe(false);

    completed = await isTopicCompleted(topicId);
    expect(completed).toBe(false);
  });

  test('toggles bookmarks correctly', async () => {
    const topicId = 'react_native_intermediate_0_0';

    let bookmarked = await isTopicBookmarked(topicId);
    expect(bookmarked).toBe(false);

    const firstToggle = await toggleBookmark(topicId);
    expect(firstToggle).toBe(true);

    bookmarked = await isTopicBookmarked(topicId);
    expect(bookmarked).toBe(true);

    const secondToggle = await toggleBookmark(topicId);
    expect(secondToggle).toBe(false);

    bookmarked = await isTopicBookmarked(topicId);
    expect(bookmarked).toBe(false);
  });
});

describe('completion flow with bare topic ids', () => {
  const s = require('../src/storage/progressStorage');
  beforeEach(async () => { await s.clearAllProgress(); });

  test('completing by topic id counts toward the right tech and can be undone', async () => {
    expect(await s.toggleTopicCompletion('js_vars_types')).toBe(true);
    expect((await s.getTechnologyProgress('javascript')).completed).toBe(1);
    expect((await s.getOverallProgress()).totalCompleted).toBe(1);
    expect(await s.toggleTopicCompletion('javascript', 'js_vars_types')).toBe(false);
    expect((await s.getTechnologyProgress('javascript')).completed).toBe(0);
  });
});
