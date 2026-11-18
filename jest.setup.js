/* eslint-disable no-undef */
const mockStorage = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn((key, val) => {
    mockStorage[key] = val;
    return Promise.resolve(null);
  }),
  getItem: jest.fn((key) => Promise.resolve(mockStorage[key] || null)),
  removeItem: jest.fn((key) => {
    delete mockStorage[key];
    return Promise.resolve(null);
  }),
  clear: jest.fn(() => {
    Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
    return Promise.resolve(null);
  }),
  getAllKeys: jest.fn(() => Promise.resolve(Object.keys(mockStorage))),
  multiGet: jest.fn((keys) =>
    Promise.resolve(keys.map((k) => [k, mockStorage[k] || null]))
  ),
  multiSet: jest.fn((pairs) => {
    pairs.forEach(([k, v]) => {
      mockStorage[k] = v;
    });
    return Promise.resolve(null);
  }),
  multiRemove: jest.fn((keys) => {
    keys.forEach((k) => delete mockStorage[k]);
    return Promise.resolve(null);
  }),
}));

// Mock react-native-screens
jest.mock('react-native-screens', () => {
  const RealComponent = require('react-native').View;
  return {
    enableScreens: jest.fn(),
    enableFreeze: jest.fn(),
    screensEnabled: jest.fn(() => true),
    ScreenContainer: RealComponent,
    Screen: RealComponent,
    NativeScreen: RealComponent,
    NativeScreenContainer: RealComponent,
  };
});
