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

// Data dummy untuk 'Exercises'
const exercises = [
  { id: '1', name: 'Warm Up', duration: '05:00' },
  { id: '2', name: 'Jumping Jack', duration: '12x' },
  { id: '3', name: 'Skipping', duration: '15x' },
  { id: '4.a', name: 'Squats', duration: '20x' },
  { id: '4.b', name: 'Arm Raises', duration: '00:53' },
  { id: '4.c', name: 'Rest and Drink', duration: '02:00' },
];

const WorkOutDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { workoutType } = route.params; // Mengambil data dari layar sebelumnya

  // Fungsi untuk navigasi
  const goToExerciseDetail = (exerciseId: string) => {
    // Sesuai alur Anda: Kirim ID latihan ke layar tutorial
    navigation.navigate('ExerciseDetail', { exerciseId: exerciseId });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* --- Header Image --- */}
      <View style={styles.headerImageContainer}>
        {/* TODO: Ganti dengan gambar dinamis berdasarkan workoutType */}
        <Image 
          source={require('../../assets/images/workout-skipping.png')} // Contoh
          style={styles.headerImage} 
        />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="chevron-back-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* --- Konten Putih (Sheet) --- */}
      <View style={styles.sheetContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* --- Judul --- */}
          <Text style={styles.title}>{workoutType} Workout</Text>
          <Text style={styles.subtitle}>8 Exercises | 32mins | 320 Calories Burn</Text>

          {/* --- Pilihan (Schedule & Difficulty) --- */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionItem}>
              <Icon name="calendar-outline" size={20} color={COLORS.gradientStart} />
              <Text style={styles.optionText}>Schedule Workout</Text>
              <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}>
              <Icon name="analytics-outline" size={20} color={COLORS.gradientStart} />
              <Text style={styles.optionText}>Difficulty</Text>
              <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
            </TouchableOpacity>
          </View>

          {/* --- Daftar Latihan (Exercises) --- */}
          <Text style={styles.sectionTitle}>Exercises</Text>
          
          {exercises.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.exerciseItem}
              onPress={() => goToExerciseDetail(item.id)}
            >
              {/* TODO: Ganti dengan gambar latihan */}
              <View style={styles.exerciseImagePlaceholder} /> 
              <View style={styles.exerciseTextContainer}>
                <Text style={styles.exerciseTitle}>{item.name}</Text>
                <Text style={styles.exerciseSubtitle}>{item.duration}</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
            </TouchableOpacity>
          ))}

          {/* Padding Bawah agar tidak tertutup Tab Bar */}
          <View style={{ height: 120 }} /> 

        </ScrollView>
        
        {/* Tombol Start Workout (Mengambang di atas ScrollView) */}
        <View style={styles.startButtonContainer}>
          <GradientButton text="Start Workout" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

// (STYLES)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // Header Image
  headerImageContainer: {
    height: '40%',
    backgroundColor: COLORS.gradientStart,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: (StatusBar.currentHeight || 0) + 10,
    left: 15,
  },
  // Konten Sheet Putih
  sheetContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    height: '60%',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  // Judul
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: COLORS.textBlack,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textGray,
    marginBottom: 20,
  },
  // Opsi
  optionsContainer: {
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.background,
    borderRadius: 15,
    marginBottom: 10,
  },
  optionText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textBlack,
    marginLeft: 10,
  },
  // Daftar Latihan
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
    marginBottom: 15,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  exerciseImagePlaceholder: {
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
  // Tombol Start
  startButtonContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
    // (PENTING) Agar tidak tertutup Tab Bar
    paddingBottom: 110, 
  },
});

export default WorkOutDetailScreen;