/**
 * src/navigation/AppNavigation.tsx
 * (VERSI FINAL LENGKAP - PERBAIKAN 'immersive content')
 *
 * File ini menyatukan semua alur:
 * 1. Root: Loading -> OnBoarding -> AuthStack
 * 2. AuthStack: SignIn / SignUp -> CompleteProfile -> Welcome
 * 3. MainApp: Tujuan akhir (BottomTabNavigator) setelah Welcome.
 *
 * (PERBAIKAN: TIDAK LAGI MENGGUNAKAN 'MainAppParamList')
 */

import React from 'react';
import { View, Text } from 'react-native'; // Untuk placeholder
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// (PERBAIKAN: Import tipe dari 'types.ts')
import {
  RootStackParamList,
  AuthStackParamList,
  MainBottomTabParamList, // <-- Import tipe yang benar
} from './types';

// (STEP 1: IMPORT SEMUA LAYAR)

// Layar Root
import LoadingScreen from '../screens/OnBoarding/LoadingScreen';
import OnBoardingScreen from '../screens/OnBoarding/OnBoardingScreen';

// Layar Auth
import SignUpScreen from '../screens/Auth/SignUpScreen';
import CompleteProfileScreen from '../screens/Auth/CompleteProfile';
import SignInScreen from '../screens/Auth/SignInScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';

// (PERBAIKAN: Import BottomTabNavigator sebagai 'MainApp' kita)
import BottomTabNavigator from './BottomNavigation';


// (STEP 2: BUAT STACK NAVIGATORS)
const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

// (STEP 3: BUAT KOMPONEN NAVIGATOR)

// Komponen untuk Auth Flow (Alur Ringkas)
const AuthStackNavigator: React.FC = () => (
  <AuthStack.Navigator
    // (PERBAIKAN: 'SignIn' adalah yang pertama, 'Splash' dihapus)
    initialRouteName="SignIn" 
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    {/* 'Goal' dan 'Splash' sudah dihapus */}
  </AuthStack.Navigator>
);

// Komponen Navigasi Utama (File ini)
const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Loading" // Mulai dari LoadingScreen
        screenOptions={{
          headerShown: false,
        }}>
        {/* Layar di Root Stack */}
        <RootStack.Screen name="Loading" component={LoadingScreen} />
        <RootStack.Screen name="OnBoarding" component={OnBoardingScreen} />

        {/* --- INI BAGIAN PENTING --- */}
        {/* Stack Auth yang berisi semua layar Auth */}
        <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        
        {/* (PERBAIKAN: 'MainApp' sekarang menggunakan BottomTabNavigator) */}
        <RootStack.Screen name="MainApp" component={BottomTabNavigator} />

      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;