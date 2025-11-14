/**
 * src/screens/Dashboard/SleepSchedule.tsx
 * (VERSI FINAL LENGKAP - PERBAIKAN 'immersive content')
 *
 * (PERBAIKAN: Menambahkan import Switch)
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
import LinearGradient from 'react-native-linear-gradient';

// Tipe untuk props navigasi
type Props = {
  navigation: SleepStackNavigationProp<'SleepSchedule'>;
};

const SleepScheduleScreen: React.FC<Props> = ({ navigation }) => {
  // Fungsi untuk navigasi
  const goToAddAlarm = () => {
    navigation.navigate('AddAlarm');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header Kustom --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="chevron-back-outline" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sleep Schedule</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-horizontal" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* --- Kartu Ideal Hours --- */}
        <LinearGradient
          colors={[COLORS.gradientStart, COLORS.gradientEnd]}
          style={styles.idealCard}
        >
          <View style={styles.idealTextContainer}>
            <Text style={styles.idealTitle}>Ideal Hours for Sleep</Text>
            <Text style={styles.idealValue}>8 Hours 30 Minutes</Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          {/* TODO: Tambahkan Ilustrasi Bulan Tidur di sini */}
        </LinearGradient>

        {/* --- Kalender (Placeholder) --- */}
        <Text style={styles.sectionTitle}>Your Schedule</Text>
        <View style={styles.calendarPlaceholder}>
          <Text style={styles.placeholderText}>Kalender Mingguan</Text>
        </View>

        {/* --- Daftar Jadwal (Sama seperti di SleepTracker) --- */}
        <View style={styles.scheduleItem}>
          <View style={styles.scheduleIcon}>
            <Icon name="bed-outline" size={20} color={COLORS.gradientStart} />
          </View>
          <View style={styles.scheduleTextContainer}>
            <Text style={styles.scheduleTitle}>Bedtime, 09:00 PM</Text>
            <Text style={styles.scheduleTime}>in 6 hours 22 minutes</Text>
          </View>
          <Switch trackColor={{ false: COLORS.background, true: COLORS.gradientStart }} thumbColor={COLORS.white} />
        </View>

        <View style={styles.scheduleItem}>
          <View style={styles.scheduleIcon}>
            <Icon name="alarm-outline" size={20} color={COLORS.gradientStart} />
          </View>
          <View style={styles.scheduleTextContainer}>
            <Text style={styles.scheduleTitle}>Alarm, 05:10 AM</Text>
            <Text style={styles.scheduleTime}>in 14 hours 30 minutes</Text>
          </View>
          <Switch trackColor={{ false: COLORS.background, true: COLORS.gradientStart }} thumbColor={COLORS.white} />
        </View>

        {/* --- Progress Bar --- */}
        <View style={styles.progressCard}>
          <Text style={styles.progressText}>You will get 8 hours 10 minutes for tonight</Text>
          {/* TODO: Implementasikan Progress Bar kustom */}
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
        </View>
        
        {/* Padding Bawah agar tidak tertutup Tab Bar */}
        <View style={{ height: 120 }} />

      </ScrollView>

      {/* --- Tombol "+" (Sesuai Alur Anda) --- */}
      <TouchableOpacity style={styles.addButton} onPress={goToAddAlarm}>
        <LinearGradient
          colors={[COLORS.gradientStart, COLORS.gradientEnd]}
          style={styles.addButtonGradient}
        >
          <Icon name="add" size={30} color={COLORS.white} />
        </LinearGradient>
      </TouchableOpacity>
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
  // Kartu Ideal
  idealCard: {
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    flexDirection: 'row',
  },
  idealTextContainer: {
    flex: 1,
  },
  idealTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.white,
  },
  idealValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.white,
    marginVertical: 5,
  },
  learnMoreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparan
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: COLORS.white,
  },
  // Kalender
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
    marginTop: 25,
    marginBottom: 15,
  },
  calendarPlaceholder: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
  placeholderText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.textGray,
    fontSize: 12,
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
  // Progress Bar
  progressCard: {
    marginTop: 15,
  },
  progressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textBlack,
    marginBottom: 10,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: COLORS.background,
    borderRadius: 5,
  },
  progressBarFill: {
    height: '100%',
    width: '80%', // Contoh
    backgroundColor: COLORS.gradientStart,
    borderRadius: 5,
  },
  // Tombol Add
  addButton: {
    position: 'absolute',
    bottom: 110, // Di atas Tab Bar
    right: 20,
  },
  addButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow
    elevation: 5,
    shadowColor: COLORS.gradientEnd,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default SleepScheduleScreen;