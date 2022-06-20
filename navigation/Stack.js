import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import Detail from '../screens/Detail';
import { BLACK } from '../color';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? BLACK : '#fff',
        },
        headerTitleStyle: {
          color: isDark ? '#fff' : BLACK,
        },
      }}
    >
      <NativeStack.Screen name='Detail' component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
