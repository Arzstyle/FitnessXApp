import React from 'react';
import { View, Text } from 'react-native'; // Untuk placeholder
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  RootStackParamList,
  AuthStackParamList,
  MainBottomTabParamList, // 
} from './types';

// Layar Root
import LoadingScreen from '../screens/OnBoarding/LoadingScreen';
import OnBoardingScreen from '../screens/OnBoarding/OnBoardingScreen';

// Layar Auth
import SignUpScreen from '../screens/Auth/SignUpScreen';
import CompleteProfileScreen from '../screens/Auth/CompleteProfile';
import SignInScreen from '../screens/Auth/SignInScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import BottomTabNavigator from './BottomNavigation';


// (BUAT STACK NAVIGATORS)
const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator: React.FC = () => (
  <AuthStack.Navigator
    initialRouteName="SignIn" 
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
  </AuthStack.Navigator>
);

// Komponen Navigasi Utama 
const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Loading" 
        screenOptions={{
          headerShown: false,
        }}>
        {/* Layar di Root Stack */}
        <RootStack.Screen name="Loading" component={LoadingScreen} />
        <RootStack.Screen name="OnBoarding" component={OnBoardingScreen} />

        {/* Stack Auth yang berisi semua layar Auth */}
        <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        
        {/* ('MainApp' sekarang menggunakan BottomTabNavigator) */}
        <RootStack.Screen name="MainApp" component={BottomTabNavigator} />

      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;