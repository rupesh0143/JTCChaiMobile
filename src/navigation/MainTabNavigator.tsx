import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/home/HomeScreen';

import ProductsScreen from '../screens/products/ProductsScreen';

import CartScreen from '../screens/cart/CartScreen';

import {useAppSelector} from '../hooks/useAppSelector';

const Tab =
  createBottomTabNavigator();

export default function MainTabNavigator() {
  const {totalItems} =
    useAppSelector(
      state => state.cart,
    );

  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }) => ({
        headerShown: false,

        tabBarStyle:
          styles.tabBarContainer,

        tabBarActiveTintColor:
          '#8C6D4A',

        tabBarInactiveTintColor:
          '#A19E9B',

        tabBarLabelStyle:
          styles.tabLabelStyle,

        tabBarHideOnKeyboard: true,

        tabBarIcon: ({
          focused,
          color,
          size,
        }) => {
          let iconName =
            '';

          if (
            route.name === 'Home'
          ) {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (
            route.name ===
            'Products'
          ) {
            iconName = focused
              ? 'leaf'
              : 'leaf-outline';
          } else if (
            route.name === 'Cart'
          ) {
            iconName = focused
              ? 'cart'
              : 'cart-outline';
          }

          return (
            <View>
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />

              {route.name ===
                'Cart' &&
                totalItems >
                  0 && (
                  <View
                    style={
                      styles.badge
                    }>
                    <Text
                      style={
                        styles.badgeText
                      }>
                      {totalItems}
                    </Text>
                  </View>
                )}
            </View>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Products"
        component={
          ProductsScreen
        }
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
      />
    </Tab.Navigator>
  );
}

const styles =
  StyleSheet.create({
    tabBarContainer: {
      backgroundColor:
        '#FFFFFF',

      borderTopWidth: 1,

      borderTopColor:
        '#E8E5E0',

      height: 68,

      paddingBottom: 8,

      paddingTop: 8,
    },

    tabLabelStyle: {
      fontSize: 12,

      fontWeight: '600',
    },

    badge: {
      position: 'absolute',

      right: -10,
      top: -6,

      backgroundColor:
        '#D32F2F',

      minWidth: 18,
      height: 18,

      borderRadius: 9,

      justifyContent:
        'center',

      alignItems: 'center',

      paddingHorizontal: 4,
    },

    badgeText: {
      color: '#fff',

      fontSize: 10,

      fontWeight: '700',
    },
  });