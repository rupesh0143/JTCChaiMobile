import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabNavigator from './MainTabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      screenOptions={{ 
        headerShown: false, // Disables standard default fallback action bar lines
        drawerActiveTintColor: '#8C6D4A',
        drawerInactiveTintColor: '#261F1A',
        drawerStyle: {
          backgroundColor: '#FDFBF9',
          width: 260,
        }
      }}
    >
      <Drawer.Screen 
        name="MainApp" 
        component={MainTabNavigator} 
        options={{ drawerLabel: 'Dashboard Home' }} 
      />
    </Drawer.Navigator>
  );
}