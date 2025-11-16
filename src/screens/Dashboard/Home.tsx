import React, { useState, useEffect } from 'react'; // (PERBAIKAN: Import state & effect)
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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeStackNavigationProp } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';



type Props = {
  navigation: HomeStackNavigationProp<'HomeDashboard'>;
};

// Data dummy untuk 'Latest Workout'
const latestWorkouts = [
  { id: '1', title: 'Fullbody Workout', calories: '180', time: '20', image: require('../../assets/images/dummy-avatar1.png') },
  { id: '2', title: 'Lowerbody Workout', calories: '200', time: '30', image: require('../../assets/images/dummy-avatar2.png') },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  // (STATE BARU: Untuk 'firstName' dari AsyncStorage)
  const [userName, setUserName] = useState('Guest');

  // (FUNGSI BARU: Ambil nama saat layar dibuka - TIDAK BERUBAH)
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Ambil 'userName' yang kita simpan saat Login
        const name = await AsyncStorage.getItem('userName');
        if (name) {
          setUserName(name);
        }
      } catch (e) {
        console.error('Failed to fetch user name from storage', e);
      }
    };
    fetchUserName();
  }, []); 
  


  const goToActivityTracker = () => {
    navigation.navigate('ActivityTracker');
  };

  const goToNotification = () => {
    navigation.navigate('Notification');
  };
  
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.notifButton} onPress={goToNotification}>
          <Icon name="notifications-outline" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>

      {/* --- Kartu BMI --- */}
      <LinearGradient
        colors={['#92A3FD', '#9DCEFF']} 
        style={styles.bmiCard}
      >
        <View style={styles.bmiTextContainer}>
          <Text style={styles.bmiTitle}>BMI (Body Mass Index)</Text>
          <Text style={styles.bmiSubtitle}>You have a normal weight</Text>
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>
        {/* Placeholder Lingkaran BMI Chart */}
        <View style={styles.bmiChartContainer}>
          <Image 
            source={require('../../assets/images/bmi-chart-dummy.png')}
            style={styles.bmiChartImage}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      {/* --- Today Target  --- */}
      <View style={styles.targetCard}>
        <Text style={styles.targetTitle}>Today Target</Text>
        <TouchableOpacity style={styles.checkButton}> 
          <Text style={styles.checkButtonText}>Check</Text>
        </TouchableOpacity>
      </View>

      {/* --- Activity Tracker Card --- */}
      <TouchableOpacity 
        style={styles.activityCard} 
        onPress={goToActivityTracker}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>Activity Tracker</Text>
        <View style={styles.chartPlaceholder}>
          <Image 
            source={require('../../assets/images/activity-tracker.png')} 
            style={styles.chartImage} 
            resizeMode="contain" 
          />
        </View>
      </TouchableOpacity>
      
      {/* --- Workout Progress --- */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Workout Progress</Text>
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>Weekly</Text>
          <Icon name="chevron-down-outline" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.chartPlaceholder}>
        <Image 
          source={require('../../assets/images/workout-progress.png')} 
          style={styles.chartImage} 
          resizeMode="contain" 
        />
      </View>
      
      {/* --- Latest Workout --- */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Latest Workout</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>
      
      {latestWorkouts.map((workout) => (
        <TouchableOpacity key={workout.id} style={styles.workoutItem}>
          <Image 
            source={workout.image}
            style={styles.workoutIcon}
          />
          <View style={styles.workoutTextContainer}>
            <Text style={styles.workoutTitle}>{workout.title}</Text>
            <Text style={styles.workoutSubtitle}>
              {workout.calories} Calories Burn | {workout.time} min
            </Text>
          </View>
          <TouchableOpacity style={styles.workoutArrowButton}>
            <Icon name="chevron-forward-outline" size={20} color={COLORS.gradientStart} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      <View style={{ height: 40 }} /> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: (StatusBar.currentHeight || 20) + 10,
    marginBottom: 20,
  },
  welcomeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textGray,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: COLORS.textBlack,
  },
  notifButton: {
    width: 35, 
    height: 35, 
    borderRadius: 18, 
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Kartu BMI
  bmiCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  bmiTextContainer: { 
    flex: 1,
  },
  bmiTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.white,
  },
  bmiSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.white,
    marginBottom: 10,
  },
  viewMoreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  viewMoreText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: COLORS.white, 
  },
  bmiChartContainer: { 
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bmiChartImage: { 
    width: '100%',
    height: '100%',
  },

  targetCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(197, 139, 242, 0.1)',
    borderRadius: 15,
    marginBottom: 20,
  },
  targetTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
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
    color: COLORS.gradientStart, // Teks ungu
  },
  // Kartu Activity
  activityCard: {
    backgroundColor: 'rgba(238, 164, 206, 0.1)', 
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    // Shadow
    shadowColor: '#EEA4CE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
  },
  chartPlaceholder: {
    height: 140, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background, 
    borderRadius: 15,
    marginTop: 10,
    overflow: 'hidden', 
  },
  chartImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  // Section Lain
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropdownButton: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(197, 139, 242, 0.2)', 
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  dropdownText: { 
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.gradientStart, 
    marginRight: 5,
  },
  seeMore: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  // Item Workout
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
  workoutIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  workoutTextContainer: {
    flex: 1,
  },
  workoutTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.textBlack,
  },
  workoutSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  workoutArrowButton: { 
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(197, 139, 242, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;