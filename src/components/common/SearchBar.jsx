import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Icon from './Icon';

export const SearchBar = ({
  value = '',
  onChangeText,
  placeholder = 'Search topics or concepts...',
  onClear,
  style,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#1C1C36' : '#F1F3F5',
          borderColor: isDark ? '#2E2E52' : '#E9ECEF',
        },
        style,
      ]}
    >
      <Icon
        name="search-outline"
        size={18}
        color={colors.textSecondary}
        style={styles.searchIcon}
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="never"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            if (onClear) onClear();
            else if (onChangeText) onChangeText('');
          }}
          style={styles.clearButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon name="close-circle" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 2,
  },
});

export default SearchBar;
