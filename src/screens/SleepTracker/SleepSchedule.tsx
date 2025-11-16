import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Image, 
} from 'react-native';
import { COLORS } from '../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { SleepStackNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';


type Props = {
  navigation: SleepStackNavigationProp<'SleepSchedule'>;
};

// (DATA DUMMY BARU: Untuk kalender horizontal)
const dates = [
  { dayName: 'Tue', dayNum: '12' },
  { dayName: 'Wed', dayNum: '13' },
  { dayName: 'Thu', dayNum: '14', active: true },
  { dayName: 'Fri', dayNum: '15' },
  { dayName: 'Sat', dayNum: '16' },
  { dayName: 'Sun', dayNum: '17' },
];

const SleepScheduleScreen: React.FC<Props> = ({ navigation }) => {
  // (STATE BARU: Untuk switch dummy)
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);

  // (Rencana menyembunyikan Tab Bar saat layar ini dibuka)
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
  const goToAddAlarm = () => {
    navigation.navigate('AddAlarm');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header Kustom (Desain Baru) --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="chevron-back-outline" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sleep Schedule</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-horizontal" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* --- Kartu Ideal Hours (Desain Baru) --- */}
        <View style={styles.idealCard}>
          <View style={styles.idealTextContainer}>
            <Text style={styles.idealTitle}>Ideal Hours for Sleep</Text>
            <Text style={styles.idealValue}>8 Hours 30 Minutes</Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={require('../../assets/images/sleep-moon-dummy.png')}
            style={styles.idealImage}
            resizeMode="contain"
          />
        </View>

        {/* --- Your Schedule (Desain Baru Kalender) --- */}
        <Text style={styles.sectionTitle}>Your Schedule</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
          {dates.map((date) => (
            <TouchableOpacity key={date.dayNum} style={[styles.dateItem, date.active && styles.dateItemActive]}>
              <Text style={[styles.dateName, date.active && styles.dateNameActive]}>{date.dayName}</Text>
              <Text style={[styles.dateNum, date.active && styles.dateNumActive]}>{date.dayNum}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- Daftar Jadwal (Desain Baru) --- */}
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
            value={toggle1}
            onValueChange={setToggle1}
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
            value={toggle2}
            onValueChange={setToggle2}
          />
          <TouchableOpacity style={styles.ellipsisButton}>
            <Icon name="ellipsis-vertical" size={20} color={COLORS.textGray} />
          </TouchableOpacity>
        </View>

        {/* --- Progress Bar (Desain Baru) --- */}
        <View style={styles.progressCard}>
          <Text style={styles.progressText}>You will get 8 hours 10 minutes for tonight</Text>
          
          <View style={styles.progressBarBackground}>
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              style={styles.progressBarFill}
            />
          </View>

          {/* --- Tombol "+" (Desain Baru, di dalam kartu) --- */}
          <TouchableOpacity style={styles.addButton} onPress={goToAddAlarm}>
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              style={styles.addButtonGradient}
            >
              <Icon name="add" size={30} color={COLORS.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        {/* Padding Bawah */}
        <View style={{ height: 40 }} />

      </ScrollView>
    </View>
  );
};

// (STYLES - Dirombak Sesuai Figma)
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
    width: 35, // Dikecilkan
    height: 35, // Dikecilkan
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background, // Abu-abu
    borderRadius: 18, // Lingkaran
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
    backgroundColor: 'rgba(197, 139, 242, 0.1)', 
  },
  idealTextContainer: {
    flex: 1,
  },
  idealTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textBlack, 
  },
  idealValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.gradientStart, 
    marginVertical: 5,
  },
  learnMoreButton: {
    backgroundColor: COLORS.gradientStart, 
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
  idealImage: { 
    width: 100,
    height: 100,
  },
  // Kalender
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
    marginTop: 25,
    marginBottom: 15,
  },
  dateScroll: { 
    paddingLeft: 5,
    marginBottom: 15,
  },
  dateItem: { 
    width: 50, 
    height: 70, 
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: COLORS.background,
  },
  dateItemActive: {
    backgroundColor: COLORS.gradientStart,
  },
  dateName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  dateNameActive: {
    color: COLORS.white,
  },
  dateNum: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.textBlack,
    marginTop: 5,
  },
  dateNumActive: {
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
  // Progress Bar
  progressCard: {
    marginTop: 15,
    padding: 20,
    backgroundColor: 'rgba(197, 139, 242, 0.1)', 
    borderRadius: 20,
    position: 'relative', 
  },
  progressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textBlack,
    marginBottom: 10,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: COLORS.white, 
    borderRadius: 5,
  },
  progressBarFill: {
    height: '100%',
    width: '96%', 
    borderRadius: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: -25, 
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
  placeholderText: {},
  dailyScheduleCard: {},
  checkButton: {},
  checkButtonText: {},
});

export default SleepScheduleScreen;