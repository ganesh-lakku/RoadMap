import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../hooks/useTheme';
import Icon from '../components/common/Icon';

// Screens
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import CategorySelectionScreen from '../screens/CategorySelection/CategorySelectionScreen';
import TechnologySelectionScreen from '../screens/TechnologySelection/TechnologySelectionScreen';
import RoadmapScreen from '../screens/Roadmap/RoadmapScreen';
import TopicDetailsScreen from '../screens/TopicDetails/TopicDetailsScreen';
import ProgressScreen from '../screens/Progress/ProgressScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';

const ONBOARDING_KEY = '@DevRoadmap:onboarding_done';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Roadmaps Stack
const RoadmapsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="CategorySelection" component={CategorySelectionScreen} />
      <Stack.Screen name="TechnologySelection" component={TechnologySelectionScreen} />
      <Stack.Screen name="Roadmap" component={RoadmapScreen} />
      <Stack.Screen name="TopicDetails" component={TopicDetailsScreen} />
    </Stack.Navigator>
  );
};

// Progress Stack
const ProgressStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProgressMain"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="ProgressMain" component={ProgressScreen} />
      <Stack.Screen name="Roadmap" component={RoadmapScreen} />
      <Stack.Screen name="TopicDetails" component={TopicDetailsScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
export const AppNavigator = () => {
  const { colors, isDark } = useTheme();

  // null = still checking storage, true = show welcome, false = go to app
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(ONBOARDING_KEY)
      .then((v) => active && setShowOnboarding(v !== 'true'))
      .catch(() => active && setShowOnboarding(true));
    return () => {
      active = false;
    };
  }, []);

  const handleStart = async () => {
    setShowOnboarding(false);
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    } catch (e) {
      console.warn('Error saving onboarding state:', e);
    }
  };

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  if (showOnboarding === null) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  if (showOnboarding) {
    return <OnboardingScreen onStart={handleStart} />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.tabBarActive || colors.primary,
          tabBarInactiveTintColor: colors.tabBarInactive || colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.tabBarBg || colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            elevation: 8,
            height: 60,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName = 'map-outline';

            if (route.name === 'RoadmapsTab') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'ProgressTab') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }

            return <Icon name={iconName} size={size || 22} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="RoadmapsTab"
          component={RoadmapsStack}
          options={{
            tabBarLabel: 'Roadmaps',
          }}
        />
        <Tab.Screen
          name="ProgressTab"
          component={ProgressStack}
          options={{
            tabBarLabel: 'Progress',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
