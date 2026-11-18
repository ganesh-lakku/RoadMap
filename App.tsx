import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/hooks/useTheme';
import { AppNavigator } from './src/navigation/AppNavigator';

function Root() {
  const { isDark, colors } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        {...(Platform.OS === 'android'
          ? { backgroundColor: colors.headerBg || colors.surface }
          : {})}
      />
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
