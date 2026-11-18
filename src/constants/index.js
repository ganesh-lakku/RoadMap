/**
 * DevRoadmap - App-wide Constants
 * Defines core application configuration, storage keys, categories, and technologies.
 */

export const APP_NAME = 'RoadMap';

export const APP_TAGLINE = 'Your Learning Journey Starts Here';

export const STORAGE_KEYS = {
  PROGRESS: '@DevRoadmap:progress',
  BOOKMARKS: '@DevRoadmap:bookmarks',
  LAST_VISITED: '@DevRoadmap:last_visited',
  SELECTED_CATEGORY: '@DevRoadmap:selected_category',
  SELECTED_TECH: '@DevRoadmap:selected_tech',
  THEME: '@DevRoadmap:theme',
  CACHED_ROADMAPS: '@DevRoadmap:cached_roadmaps',
};

export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const CATEGORIES = [
  {
    id: 'frontend_web',
    name: 'Frontend Web Development',
    icon: 'globe-outline',
    description: 'Build modern web applications with HTML, CSS, and JavaScript frameworks',
  },
  {
    id: 'frontend_mobile',
    name: 'Frontend Mobile Development',
    icon: 'phone-portrait-outline',
    description: 'Create native and cross-platform mobile applications',
  },
];

// Frontend Web Technologies
const FRONTEND_WEB_TECHNOLOGIES = [
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'logo-javascript',
    color: '#F7DF1E',
    description: 'The core programming language that powers interactive frontend web applications',
    category: 'frontend_web',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: 'code-slash-outline',
    color: '#3178C6',
    description: 'Typed JavaScript that provides better developer experience and scalable tooling',
    category: 'frontend_web',
  },
  {
    id: 'reactjs',
    name: 'React.js',
    icon: 'logo-react',
    color: '#61DAFB',
    description: 'Popular component-based JavaScript library for building responsive user interfaces',
    category: 'frontend_web',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: 'layers-outline',
    color: '#000000',
    description: 'Production-ready React framework for server-side rendering and static site generation',
    category: 'frontend_web',
  },
  {
    id: 'vuejs',
    name: 'Vue.js',
    icon: 'logo-vue',
    color: '#4FC08D',
    description: 'Approachable, performant, and versatile framework for building web user interfaces',
    category: 'frontend_web',
  },
  {
    id: 'angular',
    name: 'Angular',
    icon: 'logo-angular',
    color: '#DD0031',
    description: 'Enterprise-grade TypeScript-based web application platform and framework',
    category: 'frontend_web',
  },
];

// Cross-platform Mobile Technologies
const CROSS_PLATFORM_MOBILE = [
  {
    id: 'react_native',
    name: 'React Native',
    icon: 'logo-react',
    color: '#61DAFB',
    description: 'Build native iOS and Android apps using React and JavaScript',
    category: 'frontend_mobile',
    subcategory: 'cross_platform',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    icon: 'phone-portrait-outline',
    color: '#02569B',
    description: 'Google UI toolkit for compiling beautiful mobile apps natively',
    category: 'frontend_mobile',
    subcategory: 'cross_platform',
  },
];

// Platform Dependent: Android Technologies
const ANDROID_MOBILE = [
  {
    id: 'kotlin',
    name: 'Kotlin',
    icon: 'code-working-outline',
    color: '#7F52FF',
    description: 'Modern concise programming language for Android application engineering',
    category: 'frontend_mobile',
    subcategory: 'android',
    platformGroup: 'platform_dependent',
  },
  {
    id: 'android_dev',
    name: 'Android Development',
    icon: 'logo-android',
    color: '#3DDC84',
    description: 'Complete native Android SDK, Jetpack Compose, and architecture roadmap',
    category: 'frontend_mobile',
    subcategory: 'android',
    platformGroup: 'platform_dependent',
  },
];

// Platform Dependent: iOS Technologies
const IOS_MOBILE = [
  {
    id: 'swift',
    name: 'Swift',
    icon: 'logo-apple',
    color: '#F05138',
    description: 'Fast, modern, and safe programming language for native Apple platforms',
    category: 'frontend_mobile',
    subcategory: 'ios',
    platformGroup: 'platform_dependent',
  },
  {
    id: 'ios_dev',
    name: 'iOS Development',
    icon: 'phone-portrait-outline',
    color: '#007AFF',
    description: 'Native iOS engineering with SwiftUI, UIKit, and Apple developer tools',
    category: 'frontend_mobile',
    subcategory: 'ios',
    platformGroup: 'platform_dependent',
  },
];

// Subcategory structure for Mobile
export const MOBILE_SECTIONS = {
  cross_platform: CROSS_PLATFORM_MOBILE,
  platform_dependent: {
    android: ANDROID_MOBILE,
    ios: IOS_MOBILE,
  },
};

// All mobile technologies as an array, augmented with subcategory references
const FRONTEND_MOBILE_TECHNOLOGIES = [
  ...CROSS_PLATFORM_MOBILE,
  ...ANDROID_MOBILE,
  ...IOS_MOBILE,
];

// Attach subcategory properties to support both array mapping and nested access
FRONTEND_MOBILE_TECHNOLOGIES.cross_platform = CROSS_PLATFORM_MOBILE;
FRONTEND_MOBILE_TECHNOLOGIES.platform_dependent = {
  android: ANDROID_MOBILE,
  ios: IOS_MOBILE,
};

export const TECHNOLOGIES = {
  frontend_web: FRONTEND_WEB_TECHNOLOGIES,
  frontend_mobile: FRONTEND_MOBILE_TECHNOLOGIES,
};

export const GITHUB_API_BASE = 'https://api.github.com';
export const ROADMAP_REPO_OWNER = 'kamranahmedse';
export const ROADMAP_REPO_NAME = 'developer-roadmap';
export const API_TIMEOUT = 10000;

/**
 * Returns a flattened array of all technologies across all categories.
 */
export const getAllTechnologies = () => [
  ...FRONTEND_WEB_TECHNOLOGIES,
  ...FRONTEND_MOBILE_TECHNOLOGIES,
];

/**
 * Retrieves a technology by its unique id.
 */
export const getTechnologyById = (techId) => {
  if (!techId) return null;
  const normalizedId = String(techId).toLowerCase().trim();
  return getAllTechnologies().find(
    (tech) => tech.id.toLowerCase() === normalizedId
  ) || null;
};

export default {
  APP_NAME,
  APP_TAGLINE,
  STORAGE_KEYS,
  DIFFICULTY_LEVELS,
  CATEGORIES,
  TECHNOLOGIES,
  MOBILE_SECTIONS,
  GITHUB_API_BASE,
  ROADMAP_REPO_OWNER,
  ROADMAP_REPO_NAME,
  API_TIMEOUT,
  getAllTechnologies,
  getTechnologyById,
};
