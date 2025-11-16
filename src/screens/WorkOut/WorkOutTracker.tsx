/**
 * src/screens/Dashboard/WorkOutTrackerScreen.tsx
 * (PERBAIKAN: Desain di-rombak total sesuai Figma 'image_9e4f53.png')
 * (LOGIC: Memastikan navigasi ke 'WorkOutDetail' sudah benar)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Switch, 
} from 'react-native';
import { COLORS } from '../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { WorkOutStackNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';

// Tipe untuk props navigasi
type Props = {
  navigation: WorkOutStackNavigationProp<'WorkOutDashboard'>;
};

// Data dummy untuk 'What Do You Want to Train'
const workoutCategories = [
  { id: '1', type: 'Fullbody', title: 'Fullbody Workout', exercises: '11', time: '32', image: require('../../assets/images/workout-fullbody.png') },
  { id: '2', type: 'Lowerbody', title: 'Lowerbody Workout', exercises: '12', time: '40', image: require('../../assets/images/workout-lowerbody.png') },
  { id: '3', type: 'AB', title: 'AB Workout', exercises: '14', time: '20', image: require('../../assets/images/workout-abs.png') },
];

const WorkOutTrackerScreen: React.FC<Props> = ({ navigation }) => {
  // (STATE BARU: Untuk switch dummy)
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);

  // Fungsi untuk navigasi (INI LOGIC YANG BENAR)
  const goToWorkOutDetail = (workoutType: string) => {
    // (PERBAIKAN: Navigasi ke 'WorkOutDetail' BUKAN 'WorkOutSchedule')
    navigation.navigate('WorkOutDetail', { workoutType: workoutType });
  };

  return (
    <View style={styles.container}>
      {/* (PERBAIKAN: Status bar dibuat 'light-content' agar kontras di gradien) */}
      <StatusBar barStyle="light-content" />
      
      {/* --- Latar Belakang Gradien Biru --- */}
      <LinearGradient
        colors={['#89A1FF', '#C58BF2']} // Gradien biru ke ungu
        style={styles.blueBackground}
      >
        {/* --- Header Kustom --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <Icon name="chevron-back-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Workout Tracker</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="ellipsis-horizontal" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* --- Grafik Mingguan (Placeholder Gambar) --- */}
        <View style={styles.chartContainer}>
          <Image 
            source={require('../../assets/images/workout-chart-dummy.png')}
            style={styles.chartImage}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      {/* --- Konten Putih (Sheet) --- */}
      <View style={styles.sheetContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* (Handle 'Drag' di atas sheet) */}
          <View style={styles.sheetHandle} />

          {/* --- Daily Workout Schedule --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Workout Schedule</Text>
            <TouchableOpacity style={styles.checkButton}> 
              <Text style={styles.checkButtonText}>Check</Text>
            </TouchableOpacity>
          </View>

          {/* --- Upcoming Workout --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Workout</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          </View>

          {/* (PERBAIKAN DESAIN: Item Jadwal Sesuai Figma) */}
          <View style={styles.scheduleList}>
            <View style={styles.scheduleItem}>
              <Image 
                source={require('../../assets/images/dummy-avatar1.png')} 
                style={styles.scheduleIcon} 
              />
              <View style={styles.scheduleTextContainer}>
                <Text style={styles.scheduleTitle}>Fullbody Workout</Text>
                <Text style={styles.scheduleTime}>Today, 03:00pm</Text>
              </View>
              <Switch
                trackColor={{ false: COLORS.background, true: COLORS.gradientStart }}
                thumbColor={COLORS.white}
                onValueChange={setToggle1}
                value={toggle1}
              />
            </View>
            <View style={styles.scheduleItem}>
              <Image 
                source={require('../../assets/images/dummy-avatar2.png')} 
                style={styles.scheduleIcon} 
              />
              <View style={styles.scheduleTextContainer}>
                <Text style={styles.scheduleTitle}>Upperbody Workout</Text>
                <Text style={styles.scheduleTime}>June 05, 02:00pm</Text>
              </View>
              <Switch
                trackColor={{ false: COLORS.background, true: COLORS.gradientStart }}
                thumbColor={COLORS.white}
                onValueChange={setToggle2}
                value={toggle2}
              />
            </View>
          </View>


          {/* --- What Do You Want to Train --- */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>What Do You Want to Train</Text>

          {workoutCategories.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              // (PERBAIKAN DESAIN: Kartu Kategori Sesuai Figma)
              style={styles.categoryCard} 
              // (LOGIC YANG BENAR ADA DI SINI)
              onPress={() => goToWorkOutDetail(item.type)}
            >
              <View style={styles.categoryText}>
                <Text style={styles.categoryTitle}>{item.title}</Text>
                <Text style={styles.categorySubtitle}>{item.exercises} Exercises | {item.time}mins</Text>
                <TouchableOpacity style={styles.viewMoreButton}>
                  <Text style={styles.viewMoreText}>View more</Text>
                </TouchableOpacity>
              </View>
              {/* (PERBAIKAN: Gambar Ilustrasi) */}
              <Image 
                source={item.image} 
                style={styles.categoryImage} 
                resizeMode="contain" 
              /> 
            </TouchableOpacity>
          ))}
          
        </ScrollView>
      </View>
    </View>
  );
};

// (STYLES - Dirombak Sesuai Figma)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white, // Latar belakang dasar
  },
  // Latar Biru Gradien
  blueBackground: {
    height: 350, // Dibuat lebih tinggi
    paddingTop: (StatusBar.currentHeight || 20),
    paddingHorizontal: 15,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.white,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Chart di Latar Biru
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  chartImage: {
    width: '100%',
    height: 180, // Disesuaikan agar pas
  },
  // Konten Sheet Putih
  sheetContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30, // Radius lebih besar
    borderTopRightRadius: 30, // Radius lebih besar
    marginTop: -40, // Menumpuk lebih banyak
    paddingHorizontal: 20,
    paddingTop: 10, // Padding untuk handle
  },
  sheetHandle: {
    width: 50,
    height: 5,
    backgroundColor: COLORS.background, // Abu-abu
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  scrollContainer: {
    paddingBottom: 40, // Padding bawah agar scroll nyaman
  },
  // Section Header (Dipakai 3x)
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
  },
  seeMore: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  // Kartu Daily Schedule
  checkButton: {
    backgroundColor: 'rgba(197, 139, 242, 0.2)', // Ungu transparan
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  checkButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: COLORS.gradientStart, // Teks ungu
  },
  // Item Jadwal (Upcoming)
  scheduleList: {
    // (Container ini tidak ada di style lama)
  },
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
  },
  // Kartu Kategori Workout
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(197, 139, 242, 0.1)', // Latar ungu muda
    borderRadius: 20,
    marginBottom: 15,
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: COLORS.textBlack,
  },
  categorySubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
    marginVertical: 5,
  },
  viewMoreButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  viewMoreText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: COLORS.gradientStart,
  },
  categoryImage: {
    width: 90,
    height: 90,
  },
});

export default WorkOutTrackerScreen;