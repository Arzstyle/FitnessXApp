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
import { HomeStackNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient'; 

type Props = {
  navigation: HomeStackNavigationProp<'ActivityTracker'>;
};

const barChartData = [
  { day: 'Sun', height: 40 },
  { day: 'Mon', height: 80 },
  { day: 'Tue', height: 60 },
  { day: 'Wed', height: 75 },
  { day: 'Thu', height: 90 },
  { day: 'Fri', height: 30 },
  { day: 'Sat', height: 70 },
];

const ActivityTrackerScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header Kustom --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="chevron-back-outline" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Activity Tracker</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-horizontal" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* --- Today Target (PERBAIKAN DESAIN) --- */}
        <LinearGradient
          colors={['#E1D3FF', '#C58BF2']} // Gradien ungu muda
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.targetCard}
        >
          <View style={styles.targetHeader}>
            <Text style={styles.sectionTitleFigma}>Today Target</Text>
            <TouchableOpacity style={styles.addButtonFigma}>
              <Icon name="add" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.targetMetricsContainer}>
            {/* --- Metric Box (Desain Baru) --- */}
            <View style={styles.metricBox}>
              <Image 
                source={require('../../assets/images/dummy-water.png')} // Ganti dengan ikon Anda
                style={styles.metricIconFigma} 
              />
              <View>
                <Text style={styles.metricValue}>8L</Text>
                <Text style={styles.metricLabel}>Water Intake</Text>
              </View>
            </View>
            {/* --- Metric Box (Desain Baru) --- */}
            <View style={styles.metricBox}>
              <Image 
                source={require('../../assets/images/dummy-steps.png')} // Ganti dengan ikon Anda
                style={styles.metricIconFigma} 
              />
              <View>
                <Text style={styles.metricValue}>2400</Text>
                <Text style={styles.metricLabel}>Foot Steps</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* --- Activity Progress (PERBAIKAN DESAIN) --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Activity Progress</Text>
          <TouchableOpacity style={styles.dropdownButton}>
            <Text style={styles.dropdownText}>Weekly</Text>
            <Icon name="chevron-down-outline" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        {/* Placeholder untuk Grafik Batang (PERBAIKAN DESAIN) */}
        <View style={styles.barChartContainer}>
          {barChartData.map((item, index) => (
            <View key={index} style={styles.barItem}>
              <View style={styles.barWrapper}>
                <LinearGradient
                  colors={['#C58BF2', '#EEA4CE']}
                  style={[styles.bar, { height: `${item.height}%` }]}
                />
              </View>
              <Text style={styles.barLabel}>{item.day}</Text>
            </View>
          ))}
        </View>

        {/* --- Latest Activity --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        
        {/* List Aktivitas (PERBAIKAN DESAIN) */}
        <View style={styles.activityListContainer}>
          <View style={styles.activityItem}>
            <Image 
              source={require('../../assets/images/dummy-avatar1.png')} 
              style={styles.activityIcon} 
            />
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityName}>Drinking 300ml Water</Text>
              <Text style={styles.activityTime}>About 3 minutes ago</Text>
            </View>
            <TouchableOpacity>
              <Icon name="ellipsis-vertical" size={20} color={COLORS.textGray} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.activityItem}>
            <Image 
              source={require('../../assets/images/dummy-avatar2.png')} 
              style={styles.activityIcon} 
            />
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityName}>Eat Snack (fitbar)</Text>
              <Text style={styles.activityTime}>About 10 minutes ago</Text>
            </View>
            <TouchableOpacity>
              <Icon name="ellipsis-vertical" size={20} color={COLORS.textGray} />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // Header Kustom
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: StatusBar.currentHeight || 20, 
    backgroundColor: COLORS.white, 
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
  // ScrollView
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Padding bawah (tidak 40)
  },
  targetCard: {
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  targetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitleFigma: { 
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: COLORS.textBlack, 
  },
  addButtonFigma: {
    width: 30,
    height: 30,
    borderRadius: 10, 
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  // --- DESAIN BARU: Target Metrics ---
  targetMetricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBox: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginHorizontal: 5,
    // Shadow
    shadowColor: '#C58BF2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  metricIconFigma: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  metricValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.gradientStart,
  },
  metricLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  
  // --- DESAIN BARU: Activity Progress ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10, 
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
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
  
  // --- Bar Chart Placeholder ---
  barChartContainer: {
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    width: 20,
    height: '100%', 
    backgroundColor: COLORS.background, 
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end', 
  },
  bar: {
    width: '100%',
    borderRadius: 10,
  },
  barLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 5,
  },
  
  seeMore: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  
  // --- DESAIN BARU: Latest Activity ---
  activityListContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 10,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  activityIcon: {
    width: 50, 
    height: 50, 
    borderRadius: 25,
    marginRight: 15,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.textBlack,
  },
  activityTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  placeholderText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.textGray,
    fontSize: 12,
  },
});

export default ActivityTrackerScreen;