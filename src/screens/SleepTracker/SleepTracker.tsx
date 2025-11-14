/**
 * src/screens/Dashboard/SleepTracker.tsx
 * (VERSI FINAL LENGKAP - PERBAIKAN 'immersive content')
 *
 * (PERBAIKAN: Menambahkan import Switch & LinearGradient)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch, // (PERBAIKAN: Impor Switch)
} from 'react-native';
import { COLORS } from '../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { SleepStackNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient'; // (PERBAIKAN: Impor LinearGradient)

// Tipe untuk props navigasi
type Props = {
  navigation: SleepStackNavigationProp<'SleepDashboard'>;
};

const SleepTrackerScreen: React.FC<Props> = ({ navigation }) => {
  // Fungsi untuk navigasi
  const goToSleepSchedule = () => {
    navigation.navigate('SleepSchedule');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header Kustom --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="chevron-back-outline" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sleep Tracker</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-horizontal" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* --- Grafik Mingguan --- */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Grafik Garis Mingguan</Text>
        </View>

        {/* --- Last Night Sleep --- */}
        <LinearGradient
          colors={[COLORS.gradientStart, COLORS.gradientEnd]}
          style={styles.lastSleepCard}
        >
          <Text style={styles.lastSleepTitle}>Last Night Sleep</Text>
          <Text style={styles.lastSleepValue}>8h 20m</Text>
          {/* TODO: Tambahkan grafik gelombang mini di sini */}
        </LinearGradient>

        {/* --- Daily Sleep Schedule (Sesuai Alur Anda) --- */}
        <View style={styles.dailyScheduleCard}>
          <Text style={styles.sectionTitle}>Daily Sleep Schedule</Text>
          <TouchableOpacity onPress={goToSleepSchedule}>
            {/* Menggunakan tombol "Check" dari desain Home.tsx */}
            <View style={styles.checkButton}> 
              <Text style={styles.checkButtonText}>Check</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* --- Today Schedule --- */}
        <Text style={styles.sectionTitle}>Today Schedule</Text>
        
        {/* Item Jadwal (contoh) */}
        <View style={styles.scheduleItem}>
          <View style={styles.scheduleIcon}>
            <Icon name="bed-outline" size={20} color={COLORS.gradientStart} />
          </View>
          <View style={styles.scheduleTextContainer}>
            <Text style={styles.scheduleTitle}>Bedtime</Text>
            <Text style={styles.scheduleTime}>09:00 PM</Text>
          </View>
          <Switch trackColor={{ false: COLORS.background, true: COLORS.gradientStart }} thumbColor={COLORS.white} />
        </View>

        <View style={styles.scheduleItem}>
          <View style={styles.scheduleIcon}>
            <Icon name="alarm-outline" size={20} color={COLORS.gradientStart} />
          </View>
          <View style={styles.scheduleTextContainer}>
            <Text style={styles.scheduleTitle}>Alarm</Text>
            <Text style={styles.scheduleTime}>05:10 AM</Text>
          </View>
          <Switch trackColor={{ false: COLORS.background, true: COLORS.gradientStart }} thumbColor={COLORS.white} />
        </View>

        {/* Padding Bawah agar tidak tertutup Tab Bar */}
        <View style={{ height: 120 }} /> 

      </ScrollView>
    </View>
  );
};

// (STYLES)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: (StatusBar.currentHeight || 0) + 10,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Scroll
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // Chart
  chartPlaceholder: {
    height: 150,
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
  // Kartu Last Sleep
  lastSleepCard: {
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  lastSleepTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.white,
  },
  lastSleepValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: COLORS.white,
  },
  // Kartu Daily Schedule
  dailyScheduleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
  },
  checkButton: {
    backgroundColor: COLORS.gradientStart,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  checkButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: COLORS.white,
  },
  // Item Jadwal
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
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
  scheduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  scheduleTextContainer: {
    flex: 1,
  },
  scheduleTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.textBlack,
  },
  scheduleTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
});

export default SleepTrackerScreen;