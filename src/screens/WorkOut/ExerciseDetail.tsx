import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { WorkOutStackNavigationProp } from '../../navigation/types';
import GradientButton from '../../components/Gradient/GradientButton';

// Tipe untuk props navigasi
type Props = {
  navigation: WorkOutStackNavigationProp<'ExerciseDetail'>;
  route: { params: { exerciseId: string } }; // Menerima ID Latihan
};

// Data dummy
const steps = [
  { id: '1', title: 'Spread Your Arms' },
  { id: '2', title: 'Rest at The Toe' },
  { id: '3', title: 'Adjust Foot Movement' },
  { id: '4', title: 'Clapping Both Hands' },
];

const ExerciseDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { exerciseId } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header Kustom --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="close-outline" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-horizontal" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>
      
      {/* Konten ditaruh di ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* --- Video/Image Placeholder --- */}
        <View style={styles.videoPlaceholder}>
          <Text style={styles.placeholderText}>Video Latihan (Jumping Jack)</Text>
          <View style={styles.playButton}>
            <Icon name="play" size={20} color={COLORS.white} />
          </View>
        </View>
        
        <Text style={styles.title}>Jumping Jack</Text>
        <Text style={styles.subtitle}>Easy | 390 Calories Burn</Text>

        {/* --- Descriptions --- */}
        <Text style={styles.sectionTitle}>Descriptions</Text>
        <Text style={styles.descriptionText}>
          A jumping jack, also known as a star jump, is a physical jumping exercise...
          <Text style={styles.readMore}> Read More</Text>
        </Text>

        {/* --- How To Do It --- */}
        <Text style={styles.sectionTitle}>How To Do It</Text>
        {steps.map((step) => (
          <View key={step.id} style={styles.stepItem}>
            {/* TODO: Ganti dengan Step/Timeline Indicator kustom */}
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{step.id}</Text>
            </View>
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepSubtitle}>Step description...</Text>
            </View>
          </View>
        ))}

        {/* --- Custom Repetitions --- */}
        <Text style={styles.sectionTitle}>Custom Repetitions</Text>
        {/* TODO: Implementasikan + / - counter */}
        <View style={styles.repItem}>
          <Text style={styles.repText}>30 times</Text>
        </View>

        {/* Padding Bawah */}
        <View style={{ height: 100 }} /> 
        
      </ScrollView>
      
      {/* Tombol Save (Mengambang) */}
      <View style={styles.saveButtonContainer}>
        <GradientButton text="Save" onPress={() => navigation.goBack()} />
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
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: (StatusBar.currentHeight || 0) + 10,
    backgroundColor: COLORS.white,
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
  // Video
  videoPlaceholder: {
    height: 180,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeholderText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.textGray,
  },
  playButton: {
    position: 'absolute',
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  // Teks Judul
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
  // Section
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
    lineHeight: 20,
  },
  readMore: {
    color: COLORS.gradientStart,
    fontFamily: 'Poppins-SemiBold',
  },
  // Steps
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.gradientStart,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: COLORS.white,
    fontFamily: 'Poppins-SemiBold',
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.textBlack,
  },
  stepSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  // Reps
  repItem: {
    padding: 20,
    backgroundColor: COLORS.background,
    borderRadius: 15,
    alignItems: 'center',
  },
  repText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.textBlack,
  },
  // Tombol Save
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
  },
});

export default ExerciseDetailScreen;