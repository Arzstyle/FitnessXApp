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
import GradientButton from '../../components/Gradient/GradientButton';

// Tipe untuk props navigasi
type Props = {
  navigation: WorkOutStackNavigationProp<'WorkOutDetail'>;
  route: { params: { workoutType: string } }; // Menerima tipe
};

// Data dummy untuk 'You'll Need'
const equipment = [
  { id: '1', name: 'Barbel', image: require('../../assets/images/equipment-barbel.png') },
  { id: '2', name: 'Skipping Rope', image: require('../../assets/images/equipment-rope.png') },
  { id: '3', name: 'Bottle 1 Litre', image: require('../../assets/images/equipment-bottle.png') },
];

// Data dummy untuk 'Exercises'
const exercises = [
  { id: '1', name: 'Warm Up', duration: '05:00', image: require('../../assets/images/exercise-warmup.png') },
  { id: '2', name: 'Jumping Jack', duration: '12x', image: require('../../assets/images/exercise-jumping-jack.png') },
  { id: '3', name: 'Skipping', duration: '15x', image: require('../../assets/images/exercise-skipping.png') },
  { id: '4.a', name: 'Squats', duration: '20x', image: require('../../assets/images/exercise-squats.png') },
  { id: '4.b', name: 'Arm Raises', duration: '00:53', image: require('../../assets/images/exercise-arm-raises.png') },
  { id: '4.c', name: 'Rest and Drink', duration: '02:00', image: require('../../assets/images/exercise-rest.png') },
];

const WorkOutDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { workoutType } = route.params; // Mengambil data dari layar sebelumnya

  // Fungsi untuk navigasi 
  const goToExerciseDetail = (exerciseId: string) => {
    navigation.navigate('ExerciseDetail', { exerciseId: exerciseId, exerciseName: 'Jumping Jack' }); // (Contoh)
  };

  // Fungsi untuk navigasi 
  const goToSchedule = () => {
    navigation.navigate('WorkOutSchedule');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* --- Header Image --- */}
      <View style={styles.headerImageContainer}>
        <Image 
          source={require('../../assets/images/workout-skipping.png')} // Contoh
          style={styles.headerImage} 
        />
        <View style={styles.headerOverlay} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.headerButton, styles.headerButtonLeft]}>
          <Icon name="chevron-back-outline" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerButton, styles.headerButtonRight]}>
          <Icon name="ellipsis-horizontal" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>

      {/* --- Konten Putih (Sheet) (Desain Baru) --- */}
      <View style={styles.sheetContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* --- Judul (Desain Baru) --- */}
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.title}>{workoutType} Workout</Text>
              <Text style={styles.subtitle}>8 Exercises | 32mins | 320 Calories Burn</Text>
            </View>
            <TouchableOpacity style={styles.heartButton}>
              <Icon name="heart-outline" size={20} color={COLORS.danger} />
            </TouchableOpacity>
          </View>

          {/* --- Pilihan (Schedule & Difficulty) (Desain Baru) --- */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionItem}
              // (LOGIC YANG BENAR ADA DI SINI)
              onPress={goToSchedule}
            >
              <Icon name="calendar-outline" size={20} color={COLORS.gradientStart} />
              <Text style={styles.optionText}>Schedule Workout</Text>
              <Text style={styles.optionValue}>5/27, 06:00 AM</Text>
              <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
            </TouchableOpacity>
            
            <View style={styles.optionDivider} />

            <TouchableOpacity style={styles.optionItem}>
              <Icon name="analytics-outline" size={20} color={COLORS.gradientStart} />
              <Text style={styles.optionText}>Difficulty</Text>
              <Text style={styles.optionValue}>Beginner</Text>
              <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
            </TouchableOpacity>
          </View>

          {/* --- You'll Need (BAGIAN BARU SESUAI FIGMA) --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>You'll Need</Text>
            <Text style={styles.sectionSubtitle}>5 Items</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.equipmentScroll}>
            {equipment.map((item) => (
              <View key={item.id} style={styles.equipmentItem}>
                <Image source={item.image} style={styles.equipmentImage} />
                <Text style={styles.equipmentName}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>

          {/* --- Daftar Latihan (Exercises) --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <Text style={styles.sectionSubtitle}>3 Sets</Text>
          </View>
          
          {/* (PERBAIKAN: Judul 'Set 1') */}
          <Text style={styles.setText}>Set 1</Text>

          {exercises.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.exerciseItem}
              // (LOGIC YANG BENAR ADA DI SINI)
              onPress={() => goToExerciseDetail(item.id)}
            >
              {/* (PERBAIKAN: Gambar Latihan) */}
              <Image 
                source={item.image} 
                style={styles.exerciseImage} 
              /> 
              <View style={styles.exerciseTextContainer}>
                <Text style={styles.exerciseTitle}>{item.name}</Text>
                <Text style={styles.exerciseSubtitle}>{item.duration}</Text>
              </View>
              <Icon name="chevron-forward-outline" size={24} color={COLORS.textGray} />
            </TouchableOpacity>
          ))}
          
          {/* (Padding Bawah untuk memberi ruang dari tombol 'Start' yang mengambang) */}
          <View style={{ height: 100 }} /> 

        </ScrollView>
        
        {/* Tombol Start Workout (Mengambang) (Desain Baru) */}
        <View style={styles.startButtonContainer}>
          <GradientButton text="Start Workout" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // Header Image
  headerImageContainer: {
    height: 350, // Dibuat tinggi tetap
    backgroundColor: COLORS.gradientStart,
    position: 'relative', 
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Overlay tipis
  },
  headerButton: {
    width: 35, 
    height: 35, 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: (StatusBar.currentHeight || 20) + 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 18, // Lingkaran
  },
  headerButtonLeft: {
    left: 20,
  },
  headerButtonRight: {
    right: 20,
  },
  // Konten Sheet Putih
  sheetContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30, 
    marginTop: -100, 
  },
  scrollContainer: {
    paddingTop: 20,

  },
  // Judul
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22, // Sedikit lebih kecil
    color: COLORS.textBlack,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12, // Sedikit lebih kecil
    color: COLORS.textGray,
    marginTop: 2,
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.1)', // Latar merah transparan
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Opsi
  optionsContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: 'rgba(197, 139, 242, 0.1)', // Latar ungu muda
    borderRadius: 15,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  optionDivider: {
    height: 1,
    backgroundColor: COLORS.background, 
    marginHorizontal: 15,
  },
  optionText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textBlack,
    marginLeft: 10,
  },
  optionValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
    marginRight: 10,
  },
  // Section Header 
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
  },
  sectionSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  // You'll Need
  equipmentScroll: {
    paddingLeft: 20, // Mulai dari padding
    marginBottom: 20,
  },
  equipmentItem: {
    width: 100,
    alignItems: 'center',
    marginRight: 15,
  },
  equipmentImage: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.background,
    borderRadius: 15,
    marginBottom: 5,
  },
  equipmentName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textBlack,
  },
  // Daftar Latihan
  setText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.textBlack,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  firstExerciseItem: {
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    marginRight: 15,
  },
  exerciseTextContainer: {
    flex: 1,
  },
  exerciseTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.textBlack,
  },
  exerciseSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  // Tombol Start (Floating)
  startButtonContainer: {
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30, 
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default WorkOutDetailScreen;