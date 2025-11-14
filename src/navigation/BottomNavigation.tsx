/**
 * src/navigation/BottomTabNavigator.tsx
 * (VERSI FINAL LENGKAP - PERBAIKAN 'immersive content')
 *
 * (PERBAIKAN: Mengganti 'WorkOutPlaceholder' dengan 'WorkOutStackNavigator')
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constant/colors';
import { 
  MainBottomTabParamList, 
  HomeStackParamList,
  SleepStackParamList,
  WorkOutStackParamList // (IMPORT BARU)
} from './types';

// (IMPORT LAYAR 'HOME' STACK)
import HomeScreen from '../screens/Dashboard/Home';
import ActivityTrackerScreen from '../screens/Dashboard/ActivityTracker';
import NotificationScreen from '../screens/Dashboard/NotificationScreen';

// (IMPORT LAYAR 'SLEEP' STACK)
import SleepTrackerScreen from '../screens/SleepTracker/SleepTracker';
import SleepScheduleScreen from '../screens/SleepTracker/SleepSchedule';
import AddAlarmScreen from '../screens/SleepTracker/AddAlarm';

// (IMPORT LAYAR 'WORKOUT' STACK)
import WorkOutTrackerScreen from '../screens/WorkOut/WorkOutTracker';
import WorkOutDetailScreen from '../screens/WorkOut/WorkOutDetail';
import ExerciseDetailScreen from '../screens/WorkOut/ExerciseDetail';

// (IMPORT LAYAR 'PROFILE' STACK)
import ProfileScreen from '../screens/Dashboard/ProfileScreen';


// (STEP 1: BUAT STACK UNTUK 'HOME')
const HomeStack = createStackNavigator<HomeStackParamList>();
const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeDashboard" component={HomeScreen} />
      <HomeStack.Screen name="ActivityTracker" component={ActivityTrackerScreen} />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
    </HomeStack.Navigator>
  );
};

// (STEP 2: BUAT STACK UNTUK 'SLEEP')
const SleepStack = createStackNavigator<SleepStackParamList>();
const SleepStackNavigator: React.FC = () => {
  return (
    <SleepStack.Navigator screenOptions={{ headerShown: false }}>
      <SleepStack.Screen name="SleepDashboard" component={SleepTrackerScreen} />
      <SleepStack.Screen name="SleepSchedule" component={SleepScheduleScreen} />
      <SleepStack.Screen name="AddAlarm" component={AddAlarmScreen} />
    </SleepStack.Navigator>
  );
};

// (STEP 3: BUAT STACK UNTUK 'WORKOUT')
const WorkOutStack = createStackNavigator<WorkOutStackParamList>();
const WorkOutStackNavigator: React.FC = () => {
  return (
    <WorkOutStack.Navigator screenOptions={{ headerShown: false }}>
      <WorkOutStack.Screen name="WorkOutDashboard" component={WorkOutTrackerScreen} />
      <WorkOutStack.Screen name="WorkOutDetail" component={WorkOutDetailScreen} />
      <WorkOutStack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
    </WorkOutStack.Navigator>
  );
};


const Tab = createBottomTabNavigator<MainBottomTabParamList>();

// (STEP 4: BUAT TOMBOL "FITUR" MENGAMBANG)
const CustomTabBarButton: React.FC<{
  children: React.ReactNode;
  onPress?: (e?: any) => void;
}> = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={onPress}
    activeOpacity={0.9}
  >
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      style={styles.customButton}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
);

// (STEP 5: BUAT KOMPONEN BOTTOM TAB NAVIGATOR)
const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          const iconColor = focused ? COLORS.gradientStart : COLORS.textGray;
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'WorkOut') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Sleep') {
            iconName = focused ? 'moon' : 'moon-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      {/* Tab 'Home' (Stack) */}
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator} 
      />
      {/* (PERBAIKAN: Tab 'WorkOut' sekarang berisi Stack) */}
      <Tab.Screen 
        name="WorkOut" 
        component={WorkOutStackNavigator} // <-- Sudah diganti
      />

      {/* Tombol Fitur Mengambang */}
      <Tab.Screen
        name="Fitur"
        component={HomeStackNavigator} // Komponen dummy (tidak masalah)
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="add" size={30} color={COLORS.white} />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton onPress={props.onPress}>
              {props.children}
            </CustomTabBarButton>
          ),
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            console.log('Tombol Fitur (Bulat) Ditekan!');
          },
        }}
      />
      
      {/* Tab 'Sleep' (Stack) */}
      <Tab.Screen 
        name="Sleep" 
        component={SleepStackNavigator}
      />
      
      {/* Tab 'Profile' (Layar Asli) */}
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

// (STEP 6: STYLES)
const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 3, 
    backgroundColor: COLORS.white,
    borderRadius: 15,
    height: 80,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  customButtonContainer: {
    top: -30, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.gradientStart, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.gradientEnd,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default BottomTabNavigator;