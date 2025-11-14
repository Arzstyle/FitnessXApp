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
import Icon from 'react-native-vector-icons/Ionicons';
import { WorkOutStackNavigationProp } from '../../navigation/types';

// Tipe untuk props navigasi
type Props = {
  navigation: WorkOutStackNavigationProp<'WorkOutDashboard'>;
};

// Data dummy untuk 'What Do You Want to Train'
const workoutCategories = [
  { id: '1', type: 'Fullbody', title: 'Fullbody Workout', exercises: '11', time: '32' },
  { id: '2', type: 'Lowerbody', title: 'Lowerbody Workout', exercises: '12', time: '40' },
  { id: '3', type: 'AB', title: 'AB Workout', exercises: '14', time: '20' },
];

const WorkOutTrackerScreen: React.FC<Props> = ({ navigation }) => {
  // Fungsi untuk navigasi
  const goToWorkOutDetail = (workoutType: string) => {
    // Sesuai alur Anda: Kirim tipe workout ke layar detail
    navigation.navigate('WorkOutDetail', { workoutType: workoutType });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
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

      {/* --- Latar Belakang Biru --- */}
      <View style={styles.blueBackground}>
        {/* --- Grafik Mingguan (Placeholder) --- */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>Grafik Garis Mingguan (Latar Biru)</Text>
        </View>
      </View>

      {/* --- Konten Putih (Sheet) --- */}
      <View style={styles.sheetContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* --- Daily Workout Schedule --- */}
          <View style={styles.dailyScheduleCard}>
            <Text style={styles.sectionTitle}>Daily Workout Schedule</Text>
            <TouchableOpacity>
              <View style={styles.checkButton}> 
                <Text style={styles.checkButtonText}>Check</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* --- Upcoming Workout --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Workout</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          </View>
          {/* TODO: Ganti dengan FlatList/map */}
          <View style={styles.scheduleItem}>
            {/* ... Item ... */}
          </View>

          {/* --- What Do You Want to Train --- */}
          <Text style={styles.sectionTitle}>What Do You Want to Train</Text>

          {workoutCategories.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.categoryCard} 
              onPress={() => goToWorkOutDetail(item.type)}
            >
              <View style={styles.categoryText}>
                <Text style={styles.categoryTitle}>{item.title}</Text>
                <Text style={styles.categorySubtitle}>{item.exercises} Exercises | {item.time}mins</Text>
                <TouchableOpacity style={styles.viewMoreButton}>
                  <Text style={styles.viewMoreText}>View more</Text>
                </TouchableOpacity>
              </View>
              {/* TODO: Ganti dengan Ilustrasi */}
              <View style={styles.categoryImagePlaceholder} /> 
            </TouchableOpacity>
          ))}
          
          {/* Padding Bawah agar tidak tertutup Tab Bar */}
          <View style={{ height: 120 }} /> 

        </ScrollView>
      </View>
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
    position: 'absolute', // Mengambang di atas
    top: (StatusBar.currentHeight || 0) + 10,
    left: 0,
    right: 0,
    zIndex: 10,
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
  // Latar Biru
  blueBackground: {
    height: '40%',
    backgroundColor: COLORS.gradientStart, // Menggunakan warna gradien
    paddingTop: (StatusBar.currentHeight || 0) + 60, // Di bawah header
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    color: COLORS.white,
    fontFamily: 'Poppins-Regular',
  },
  // Konten Sheet Putih
  sheetContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20, // Menumpuk di atas latar biru
    height: '60%',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  // Kartu Daily Schedule
  dailyScheduleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
    borderRadius: 15,
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
  // Item Jadwal (Placeholder)
  scheduleItem: {
    height: 60,
    backgroundColor: COLORS.background,
    borderRadius: 15,
    marginBottom: 20,
  },
  // Kartu Kategori Workout
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
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
  },
  viewMoreText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: COLORS.gradientStart,
  },
  categoryImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.white,
    borderRadius: 40,
  },
});

export default WorkOutTrackerScreen;