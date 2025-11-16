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

type Props = {
  navigation: WorkOutStackNavigationProp<'ExerciseDetail'>;
  route: { params: { exerciseId: string } };
};

// Data dummy
const steps = [
  { id: '1', title: 'Spread Your Arms', desc: 'To make the gestures feel more relaxed, stretch your arms as you start this movement. No bending of hands.' },
  { id: '2', title: 'Rest at The Toe', desc: 'The basis of this movement is jumping. Now, what needs to be considered is that you have to use the tips of your feet.' },
  { id: '3', title: 'Adjust Foot Movement', desc: 'Jumping Jack is not just an ordinary jump. But, you also have to pay close attention to leg movements.' },
  { id: '4.a', title: 'Clapping Both Hands', desc: 'This cannot be taken lightly. You see, without realizing it, the clapping of your hands helps you to keep your rhythm while doing the Jumping Jack.' },
];

const ExerciseDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { exerciseId } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header Kustom (Desain Baru) --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="close" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-horizontal" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>
      
      {/* Konten ditaruh di ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* --- Video/Image Placeholder (Desain Baru) --- */}
        <View style={styles.videoPlaceholder}>
          <Image 
            source={require('../../assets/images/workout-detail-dummy.png')}
            style={styles.videoImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.playButton}>
            <Icon name="play" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.title}>Jumping Jack</Text>
        <Text style={styles.subtitle}>Easy | 390 Calories Burn</Text>

        {/* --- Descriptions --- */}
        <Text style={styles.sectionTitle}>Descriptions</Text>
        <Text style={styles.descriptionText}>
          A jumping jack, also known as a star jump, is a physical jumping exercise...
          <Text style={styles.readMore}> Read More</Text>
        </Text>

        {/* --- How To Do It (Desain Baru) --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>How To Do It</Text>
          <Text style={styles.sectionSubtitle}>4 Steps</Text>
        </View>

        {steps.map((step, index) => (
          <View key={step.id} style={styles.stepItem}>
            {/* (Bagian Timeline: Garis & Bulatan) */}
            <View style={styles.stepTimeline}>
              <View style={styles.stepBullet}>
                <Text style={styles.stepNumberText}>0{index + 1}</Text>
              </View>
              {index < steps.length - 1 && <View style={styles.stepLine} />}
            </View>
            
            {/* (Bagian Teks) */}
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepSubtitle}>{step.desc}</Text>
            </View>
          </View>
        ))}

        {/* --- Custom Repetitions --- */}
        <Text style={styles.sectionTitle}>Custom Repetitions</Text>
        
        {/* Placeholder  */}
        <View style={styles.repContainer}>
          <View style={styles.repItem}>
            <Icon name="flame" size={16} color={COLORS.danger} style={styles.repIcon} />
            <Text style={styles.repLabel}>450 Calories Burn</Text>
            <Text style={styles.repValue}>29</Text>
          </View>
          <View style={[styles.repItem, styles.repItemActive]}>
            <Icon name="flame" size={16} color={COLORS.white} style={styles.repIcon} />
            <Text style={[styles.repLabel, styles.repLabelActive]}>450 Calories Burn</Text>
            <Text style={[styles.repValue, styles.repValueActive]}>30 times</Text>
          </View>
          <View style={styles.repItem}>
            <Icon name="flame" size={16} color={COLORS.danger} style={styles.repIcon} />
            <Text style={styles.repLabel}>450 Calories Burn</Text>
            <Text style={styles.repValue}>31</Text>
          </View>
        </View>

        {/* Padding Bawah untuk tombol floating */}
        <View style={{ height: 120 }} /> 
        
      </ScrollView>
      
      {/* Tombol Save (Mengambang) (Desain Baru) */}
      <View style={styles.saveButtonContainer}>
        <GradientButton text="Save" onPress={() => navigation.goBack()} />
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
    marginTop: (StatusBar.currentHeight || 0) + 10,
    backgroundColor: COLORS.white,
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
  // Video
  videoPlaceholder: {
    height: 200, 
    backgroundColor: COLORS.background,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden', 
  },
  videoImage: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    padding: 18,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
    marginTop: 15, 
  },
  sectionHeader: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  sectionSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
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
  stepTimeline: {
    width: 20,
    alignItems: 'center',
    marginRight: 15,
  },
  stepBullet: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(197, 139, 242, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepNumberText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: COLORS.gradientStart,
  },
  stepLine: {
    flex: 1,
    width: 2,
    backgroundColor: 'rgba(197, 139, 242, 0.3)', 
    borderStyle: 'dashed', 
    marginTop: -5,
    marginBottom: -5,
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
    marginTop: 3,
  },
  // Reps 
  repContainer: {
  },
  repItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.background,
    borderRadius: 15,
    marginBottom: 10,
  },
  repItemActive: {
    backgroundColor: 'rgba(197, 139, 242, 0.2)', 
  },
  repIcon: {
    marginRight: 10,
  },
  repLabel: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  repLabelActive: {
    color: COLORS.gradientStart,
    fontFamily: 'Poppins-SemiBold',
  },
  repValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: COLORS.textBlack,
  },
  repValueActive: {
    color: COLORS.gradientStart,
  },
  
  // Tombol Save (Floating)
  saveButtonContainer: {
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
  placeholderText: { 
    fontFamily: 'Poppins-Regular',
    color: COLORS.textGray,
  },
});

export default ExerciseDetailScreen;