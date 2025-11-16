/**
 * src/screens/Dashboard/SleepTracker.tsx
 * (PERBAIKAN: Desain di-rombak total sesuai Figma 'image_a01e01.png')
 */

import React, { useState, useLayoutEffect } from 'react'; // (PERBAIKAN: Import state & effect)
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Image, // (PERBAIKAN: Impor Image)
} from 'react-native';
import { COLORS } from '../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { SleepStackNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';

// Tipe untuk props navigasi
type Props = {
  navigation: SleepStackNavigationProp<'SleepDashboard'>;
};

const SleepTrackerScreen: React.FC<Props> = ({ navigation }) => {
  // (STATE BARU: Untuk switch dummy)
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);

  // (PERBAIKAN: Sembunyikan Tab Bar saat layar ini dibuka)
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
    return () => {
      navigation.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
  }, [navigation]);

  // Fungsi untuk navigasi (TIDAK BERUBAH)
  const goToSleepSchedule = () => {
    navigation.navigate('SleepSchedule');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header Kustom (Desain Baru) --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="chevron-back-outline" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sleep Tracker</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-horizontal" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* --- Grafik Mingguan (Desain Baru) --- */}
        <View style={styles.chartContainer}>
          <Image 
            source={require('../../assets/images/sleep-chart-dummy.png')}
            style={styles.chartImage}
            resizeMode="contain"
          />
        </View>

        {/* --- Last Night Sleep (Desain Baru) --- */}
        <LinearGradient
          colors={[COLORS.gradientStart, COLORS.gradientEnd]}
          style={styles.lastSleepCard}
        >
          {/* (Ornamen Gelombang) */}
          <Image 
            source={require('../../assets/images/sleep-wave-dummy.png')}
            style={styles.waveImage}
            resizeMode="stretch"
          />
          <Text style={styles.lastSleepTitle}>Last Night Sleep</Text>
          <Text style={styles.lastSleepValue}>8h 20m</Text>
        </LinearGradient>

        {/* --- Daily Sleep Schedule (Desain Baru) --- */}
        <View style={styles.dailyScheduleCard}>
          <Text style={styles.sectionTitle}>Daily Sleep Schedule</Text>
          <TouchableOpacity onPress={goToSleepSchedule}>
            <View style={styles.checkButton}> 
              <Text style={styles.checkButtonText}>Check</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* --- Today Schedule (Desain Baru) --- */}
        <Text style={styles.sectionTitle}>Today Schedule</Text>
        
        {/* Item Jadwal (Desain Baru) */}
        <View style={styles.scheduleItem}>
          <Image 
            source={require('../../assets/images/dummy-sleep-bed.png')}
            style={styles.scheduleIcon}
          />
          <View style={styles.scheduleTextContainer}>
            <Text style={styles.scheduleTitle}>Bedtime, 09:00pm</Text>
            <Text style={styles.scheduleTime}>in 6hours 22minutes</Text>
          </View>
          <Switch 
            trackColor={{ false: COLORS.background, true: COLORS.gradientStart }} 
            thumbColor={COLORS.white}
            onValueChange={setToggle1}
            value={toggle1}
          />
          <TouchableOpacity style={styles.ellipsisButton}>
            <Icon name="ellipsis-vertical" size={20} color={COLORS.textGray} />
          </TouchableOpacity>
        </View>

        <View style={styles.scheduleItem}>
          <Image 
            source={require('../../assets/images/dummy-sleep-alarm.png')}
            style={styles.scheduleIcon}
          />
          <View style={styles.scheduleTextContainer}>
            <Text style={styles.scheduleTitle}>Alarm, 05:10am</Text>
            <Text style={styles.scheduleTime}>in 14hours 30minutes</Text>
          </View>
          <Switch 
            trackColor={{ false: COLORS.background, true: COLORS.gradientStart }} 
            thumbColor={COLORS.white}
            onValueChange={setToggle2}
            value={toggle2}
          />
          <TouchableOpacity style={styles.ellipsisButton}>
            <Icon name="ellipsis-vertical" size={20} color={COLORS.textGray} />
          </TouchableOpacity>
        </View>

        {/* Padding Bawah agar tidak tertutup Tab Bar */}
        <View style={{ height: 40 }} /> 

      </ScrollView>
    </View>
  );
};

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
    width: 35, 
    height: 35, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background, 
    borderRadius: 18, 
  },
  // Scroll
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // Chart
  chartContainer: { 
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white, 
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  chartImage: { 
    width: '100%',
    height: '100%',
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
    position: 'relative', 
  },
  waveImage: { // (BARU)
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 80, 
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
    backgroundColor: 'rgba(197, 139, 242, 0.1)', 
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
    backgroundColor: 'rgba(197, 139, 242, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  checkButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: COLORS.gradientStart, 
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
    width: 50,
    height: 50,
    borderRadius: 25,
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
    marginTop: 3, 
  },
  ellipsisButton: { 
    paddingLeft: 10, 
  },
});

export default SleepTrackerScreen;