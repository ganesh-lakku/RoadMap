/**
 * DevRoadmap - Technology Icons and Colors
 * Maps technology identifiers to Ionicons icon names and brand colors.
 */

export const DEFAULT_TECH_ICON = {
  icon: 'code-outline',
  color: '#6C63FF',
};

export const TECH_ICONS_MAP = {
  // Frontend Web Technologies
  javascript: {
    icon: 'logo-javascript',
    color: '#F7DF1E',
  },
  typescript: {
    icon: 'code-slash-outline',
    color: '#3178C6',
  },
  reactjs: {
    icon: 'logo-react',
    color: '#61DAFB',
  },
  react: {
    icon: 'logo-react',
    color: '#61DAFB',
  },
  nextjs: {
    icon: 'layers-outline',
    color: '#000000',
  },
  next: {
    icon: 'layers-outline',
    color: '#000000',
  },
  vuejs: {
    icon: 'logo-vue',
    color: '#4FC08D',
  },
  vue: {
    icon: 'logo-vue',
    color: '#4FC08D',
  },
  angular: {
    icon: 'logo-angular',
    color: '#DD0031',
  },

  // Frontend Mobile Technologies - Cross-platform
  react_native: {
    icon: 'logo-react',
    color: '#61DAFB',
  },
  reactnative: {
    icon: 'logo-react',
    color: '#61DAFB',
  },
  flutter: {
    icon: 'phone-portrait-outline',
    color: '#02569B',
  },

  // Frontend Mobile Technologies - Android
  kotlin: {
    icon: 'code-working-outline',
    color: '#7F52FF',
  },
  android_dev: {
    icon: 'logo-android',
    color: '#3DDC84',
  },
  android: {
    icon: 'logo-android',
    color: '#3DDC84',
  },

  // Frontend Mobile Technologies - iOS
  swift: {
    icon: 'logo-apple',
    color: '#F05138',
  },
  ios_dev: {
    icon: 'phone-portrait-outline',
    color: '#007AFF',
  },
  ios: {
    icon: 'logo-apple',
    color: '#007AFF',
  },

  // Additional web / tool technologies
  html: {
    icon: 'logo-html5',
    color: '#E34F26',
  },
  html5: {
    icon: 'logo-html5',
    color: '#E34F26',
  },
  css: {
    icon: 'logo-css3',
    color: '#1572B6',
  },
  css3: {
    icon: 'logo-css3',
    color: '#1572B6',
  },
  nodejs: {
    icon: 'logo-nodejs',
    color: '#339933',
  },
  node: {
    icon: 'logo-nodejs',
    color: '#339933',
  },
  git: {
    icon: 'git-branch-outline',
    color: '#F05032',
  },
  github: {
    icon: 'logo-github',
    color: '#181717',
  },
  python: {
    icon: 'logo-python',
    color: '#3776AB',
  },
};

/**
 * Returns the icon name and brand color for a given technology ID.
 * @param {string} techId - Technology identifier (e.g. 'reactjs', 'flutter', 'kotlin')
 * @returns {{ icon: string, color: string }}
 */
export const getTechIcon = (techId) => {
  if (!techId) {
    return DEFAULT_TECH_ICON;
  }
  const normalizedId = String(techId).toLowerCase().trim();
  return TECH_ICONS_MAP[normalizedId] || DEFAULT_TECH_ICON;
};

/**
 * Returns the brand color hex string for a given technology ID.
 * @param {string} techId - Technology identifier
 * @returns {string}
 */
export const getTechColor = (techId) => {
  return getTechIcon(techId).color;
};

export default {
  DEFAULT_TECH_ICON,
  TECH_ICONS_MAP,
  getTechIcon,
  getTechColor,
};
