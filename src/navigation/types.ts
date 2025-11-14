/**
 * src/navigation/types.ts
 * (VERSI FINAL LENGKAP - PERBAIKAN 'immersive content')
 *
 * (PERBAIKAN: 'CompleteProfile' sekarang menerima 'userId')
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// (IMPORT BARU: Dibutuhkan untuk route prop)
import { RouteProp } from '@react-navigation/native';

// (TIPE STACK UNTUK 'WORKOUT' - DARI LANGKAH SEBELUMNYA)
export type WorkOutStackParamList = {
  WorkOutDashboard: undefined;
  WorkOutDetail: { workoutType: string };
  ExerciseDetail: { exerciseId: string; exerciseName: string };
};
export type WorkOutStackNavigationProp<
  RouteName extends keyof WorkOutStackParamList
> = StackNavigationProp<WorkOutStackParamList, RouteName>;

// (TIPE STACK UNTUK 'SLEEP' - DARI LANGKAH SEBELUMNYA)
export type SleepStackParamList = {
  SleepDashboard: undefined;
  SleepSchedule: undefined;
  AddAlarm: undefined;
};
export type SleepStackNavigationProp<
  RouteName extends keyof SleepStackParamList
> = StackNavigationProp<SleepStackParamList, RouteName>;

// (TIPE STACK UNTUK 'HOME' - DARI LANGKAH SEBELUMNYA)
export type HomeStackParamList = {
  HomeDashboard: undefined;
  ActivityTracker: undefined;
  Notification: undefined;
};
export type HomeStackNavigationProp<
  RouteName extends keyof HomeStackParamList
> = StackNavigationProp<HomeStackParamList, RouteName>;


// (TIPE UNTUK TAB BAWAH - DARI LANGKAH SEBELUMNYA)
export type MainBottomTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  WorkOut: NavigatorScreenParams<WorkOutStackParamList>; // (Sudah diperbarui)
  Fitur: undefined;
  Sleep: NavigatorScreenParams<SleepStackParamList>; // (Sudah diperbarui)
  Profile: undefined;
};
export type MainBottomTabNavigationProp<
  RouteName extends keyof MainBottomTabParamList
> = BottomTabNavigationProp<MainBottomTabParamList, RouteName>;


// (TIPE UNTUK AUTH FLOW - INI PERBAIKANNYA)
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  // (PERBAIKAN: 'CompleteProfile' sekarang menerima 'userId')
  CompleteProfile: { userId: string }; 
  Welcome: { userName?: string };
};
export type AuthStackNavigationProp<
  RouteName extends keyof AuthStackParamList
> = StackNavigationProp<AuthStackParamList, RouteName>;

// (Tipe untuk Route Prop, agar 'CompleteProfile' bisa baca)
export type AuthStackRouteProp<
  RouteName extends keyof AuthStackParamList
> = RouteProp<AuthStackParamList, RouteName>;


// Tipe untuk navigasi utama (Top-Level) (Tidak Berubah)
export type RootStackParamList = {
  Loading: undefined;
  OnBoarding: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainApp: NavigatorScreenParams<MainBottomTabParamList>;
};
export type RootStackNavigationProp<
  RouteName extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, RouteName>;