import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { getLevelColor, getLevelIcon, capitalizeFirst } from '../../utils/helpers';
import Icon from './Icon';

export const LevelBadge = ({ level, size = 'medium', style }) => {
  const { colors } = useTheme();
  const levelColor = getLevelColor(level, colors);
  const iconName = getLevelIcon(level);
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: `${levelColor}22`,
          borderColor: `${levelColor}55`,
          paddingVertical: isSmall ? 2 : 4,
          paddingHorizontal: isSmall ? 6 : 10,
        },
        style,
      ]}
    >
      <Icon
        name={iconName}
        size={isSmall ? 12 : 14}
        color={levelColor}
        style={{ marginRight: 4 }}
      />
      <Text
        style={[
          styles.text,
          {
            color: levelColor,
            fontSize: isSmall ? 10 : 12,
          },
        ]}
      >
        {capitalizeFirst(level || 'beginner')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

export default LevelBadge;
