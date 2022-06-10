import React from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// npm install @react-navigation/bottom-tabs
import { Ionicons } from '@expo/vector-icons';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { YELLOW, BLACK, DARK_GRAY, LIGHT_GRAY } from '../color';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === 'dark';
  console.log(isDark);

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK : '#fff',
      }}
      screenOptions={{
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: isDark ? BLACK : '#fff',
        },
        tabBarActiveTintColor: isDark ? YELLOW : BLACK,
        tabBarInactiveTintColor: isDark ? DARK_GRAY : LIGHT_GRAY,
        headerStyle: {
          backgroundColor: isDark ? BLACK : '#fff',
        },
        headerTitleStyle: {
          color: isDark ? '#fff' : BLACK,
        },
      }}
    >
      <Tab.Screen
        name='Movies'
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='film-outline' color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name='TV'
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='tv-outline' color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='search' color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
