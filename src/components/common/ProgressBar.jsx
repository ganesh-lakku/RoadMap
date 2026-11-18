import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export const ProgressBar = ({
  progress = 0, // 0 to 100
  height = 8,
  color,
  showLabel = false,
  labelPrefix = '',
  style,
}) => {
  const { colors } = useTheme();
  const clampedProgress = Math.min(100, Math.max(0, Number(progress) || 0));
  const animatedWidth = useRef(new Animated.Value(clampedProgress)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: clampedProgress,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [clampedProgress]);

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const barColor = color || colors.primary;

  return (
    <View style={[styles.wrapper, style]}>
      {showLabel && (
        <View style={styles.labelRow}>
          <Text style={[styles.labelText, { color: colors.textSecondary }]}>
            {labelPrefix}
          </Text>
          <Text style={[styles.percentText, { color: barColor }]}>
            {Math.round(clampedProgress)}%
          </Text>
        </View>
      )}
      <View
        style={[
          styles.track,
          {
            height,
            borderRadius: height / 2,
            backgroundColor: colors.progressBg || '#E2E8F0',
          },
        ]}
      >
        <Animated.View
          style={[
            styles.fill,
            {
              width: widthInterpolation,
              height,
              borderRadius: height / 2,
              backgroundColor: barColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '500',
  },
  percentText: {
    fontSize: 12,
    fontWeight: '700',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});

export default ProgressBar;
