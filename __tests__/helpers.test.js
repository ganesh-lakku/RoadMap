import {
  truncateText,
  generateTopicId,
  parseTopicId,
  formatPercentage,
  capitalizeFirst,
  getLevelColor,
  filterTopics,
} from '../src/utils/helpers';

describe('Helpers', () => {
  test('truncateText truncates correctly', () => {
    expect(truncateText('Hello world', 5)).toBe('Hello...');
    expect(truncateText('Short', 10)).toBe('Short');
    expect(truncateText('', 5)).toBe('');
  });

  test('generateTopicId and parseTopicId work symmetrically', () => {
    const id = generateTopicId('reactjs', 'beginner', 1, 2);
    expect(id).toBe('reactjs_beginner_1_2');

    const parsed = parseTopicId(id);
    expect(parsed.techId).toBe('reactjs');
    expect(parsed.level).toBe('beginner');
    expect(parsed.sectionIndex).toBe(1);
    expect(parsed.topicIndex).toBe(2);
  });

  test('formatPercentage formats decimal percentages', () => {
    expect(formatPercentage(45.67)).toBe('45.7%');
    expect(formatPercentage(100)).toBe('100.0%');
    expect(formatPercentage('invalid')).toBe('0.0%');
  });

  test('capitalizeFirst capitalizes input', () => {
    expect(capitalizeFirst('beginner')).toBe('Beginner');
    expect(capitalizeFirst('')).toBe('');
  });

  test('getLevelColor returns theme or default color', () => {
    const colors = { beginner: '#00FF00' };
    expect(getLevelColor('beginner', colors)).toBe('#00FF00');
  });

  test('filterTopics filters by name and description', () => {
    const topics = [
      { id: '1', title: 'JavaScript Promises', description: 'Async control' },
      { id: '2', title: 'React Hooks', description: 'State in components' },
    ];

    const results = filterTopics(topics, 'promises');
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('1');
  });
});
