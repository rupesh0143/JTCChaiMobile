import React, {
  useEffect,
  useState,
} from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {useAppSelector} from '../hooks/useAppSelector';

import SplashScreen from '../screens/SplashScreen';

import LoginScreen from '../screens/auth/LoginScreen';

import SignUpScreen from '../screens/auth/SignUpScreen';

import MainTabNavigator from './MainTabNavigator';

import CheckoutScreen from '../screens/checkout/CheckoutScreen';

const Stack =
  createNativeStackNavigator();

const RootNavigator = () => {
  const [isLoading, setIsLoading] =
    useState(true);

  const {isAuthenticated} =
    useAppSelector(
      state => state.auth,
    );

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

    return () =>
      clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Login"
            component={
              LoginScreen
            }
          />

          <Stack.Screen
            name="SignUp"
            component={
              SignUpScreen
            }
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="MainTabs"
            component={
              MainTabNavigator
            }
          />

          <Stack.Screen
            name="Checkout"
            component={
              CheckoutScreen
            }
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;