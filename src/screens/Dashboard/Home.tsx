/**
 * src/screens/Dashboard/Home.tsx
 * (VERSI FINAL LENGKAP - PERBAIKAN 'immersive content')
 *
 * (PERBAIKAN: Tombol lonceng sekarang mengarah ke 'Notification')
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS } from '../../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
// (PERBAIKAN: Import Tipe Navigasi yang baru)
import { HomeStackNavigationProp } from '../../navigation/types';

// Tipe untuk props navigasi
type Props = {
  // (PERBAIKAN: Tipe 'HomeDashboard' dari HomeStack)
  navigation: HomeStackNavigationProp<'HomeDashboard'>;
};

// Data dummy untuk 'Latest Workout'
const latestWorkouts = [
  { id: '1', title: 'Fullbody Workout', calories: '180', time: '20' },
  { id: '2', title: 'Lowerbody Workout', calories: '200', time: '30' },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  
  // (FUNGSI NAVIGASI)
  const goToActivityTracker = () => {
    // Sesuai alur Anda: Home -> ActivityTracker
    navigation.navigate('ActivityTracker');
  };

  const goToNotification = () => {
    // (PERBAIKAN: Arahkan ke 'Notification')
    navigation.navigate('Notification');
  };
  
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back,</Text>
          <Text style={styles.userName}>Stefani Wong</Text>
        </View>
        <TouchableOpacity style={styles.notifButton} onPress={goToNotification}>
          <Icon name="notifications-outline" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>

      {/* --- Kartu BMI (Contoh) --- */}
      <LinearGradient
        colors={['#C58BF2', '#EEA4CE']} // Warna dummy
        style={styles.bmiCard}
      >
        <Text style={styles.bmiTitle}>BMI (Body Mass Index)</Text>
        <Text style={styles.bmiSubtitle}>You have a normal weight</Text>
        <TouchableOpacity style={styles.viewMoreButton}>
          <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>
        {/* TODO: Tambahkan Lingkaran BMI Chart di sini */}
      </LinearGradient>

      {/* --- Activity Tracker Card (Sesuai Rencana) --- */}
      {/* (PERBAIKAN: Ganti nama 'Activity Status' -> 'Activity Tracker') */}
      <TouchableOpacity 
        style={styles.activityCard} 
        onPress={goToActivityTracker}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>Activity Tracker</Text>
        {/* TODO: Tambahkan Grafik Garis (Line Chart) di sini */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Grafik Denyut Jantung (Heart Rate)</Text>
        </View>
      </TouchableOpacity>
      
      {/* --- Workout Progress --- */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Workout Progress</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>
      {/* TODO: Tambahkan Grafik Progress (Bar Chart) di sini */}
      <View style={styles.chartPlaceholder}>
        <Text style={styles.placeholderText}>Grafik Progress Latihan (Mingguan)</Text>
      </View>
      
      {/* --- Latest Workout --- */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Latest Workout</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>
      
      {latestWorkouts.map((workout) => (
        <TouchableOpacity key={workout.id} style={styles.workoutItem}>
          <View style={styles.workoutIcon}></View>
          <View style={styles.workoutTextContainer}>
            <Text style={styles.workoutTitle}>{workout.title}</Text>
            <Text style={styles.workoutSubtitle}>
              {workout.calories} Calories Burn | {workout.time} min
            </Text>
          </View>
          <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
        </TouchableOpacity>
      ))}

      {/* Padding Bawah agar tidak tertutup Tab Bar */}
      <View style={{ height: 120 }} /> 
    </ScrollView>
  );
};

// (STYLES)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: (StatusBar.currentHeight || 20) + 10,
    marginBottom: 20,
  },
  welcomeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textGray,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: COLORS.textBlack,
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Kartu BMI
  bmiCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  bmiTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.white,
  },
  bmiSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.white,
    marginBottom: 10,
  },
  viewMoreButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  viewMoreText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: COLORS.gradientStart,
  },
  // Kartu Activity
  activityCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
  },
  chartPlaceholder: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  placeholderText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.textGray,
    fontSize: 12,
  },
  // Section Lain
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeMore: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  // Item Workout
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 10,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  workoutIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    marginRight: 15,
  },
  workoutTextContainer: {
    flex: 1,
  },
  workoutTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.textBlack,
  },
  workoutSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
});

export default HomeScreen;