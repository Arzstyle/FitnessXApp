/**
 * src/screens/Dashboard/ActivityTracker.tsx
 * (FILE BARU - Sesuai desain 'image_b81f6e.png')
 *
 * Layar detail yang dibuka dari Home.tsx.
 */

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
// (PERBAIKAN: Import Tipe Navigasi yang baru)
import { HomeStackNavigationProp } from '../../navigation/types';

// Tipe untuk props navigasi
type Props = {
  navigation: HomeStackNavigationProp<'ActivityTracker'>;
};

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
        
        {/* --- Today Target --- */}
        <View style={styles.targetCard}>
          <Text style={styles.sectionTitle}>Today Target</Text>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="add" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.targetMetricsContainer}>
          <View style={styles.metricBox}>
            {/* Icon air */}
            <View style={styles.metricIconContainer}>
              <Icon name="water" size={20} color={COLORS.gradientStart} />
            </View>
            <Text style={styles.metricValue}>8L</Text>
            <Text style={styles.metricLabel}>Water Intake</Text>
          </View>
          <View style={styles.metricBox}>
            {/* Icon langkah kaki */}
            <View style={styles.metricIconContainer}>
              <Icon name="footsteps" size={20} color={COLORS.gradientStart} />
            </View>
            <Text style={styles.metricValue}>2400</Text>
            <Text style={styles.metricLabel}>Foot Steps</Text>
          </View>
        </View>

        {/* --- Activity Progress --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Activity Progress</Text>
          <TouchableOpacity style={styles.dropdownButton}>
            <Text style={styles.dropdownText}>Weekly</Text>
            <Icon name="chevron-down-outline" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        {/* Placeholder untuk Grafik Batang (Bar Chart) */}
        <View style={styles.barChartPlaceholder}>
          <Text style={styles.placeholderText}>Grafik Batang Mingguan</Text>
        </View>

        {/* --- Latest Activity --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        
        {/* List Aktivitas */}
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}></View>
          <View style={styles.activityTextContainer}>
            <Text style={styles.activityName}>Drinking 300ml Water</Text>
            <Text style={styles.activityTime}>About 3 minutes ago</Text>
          </View>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" size={20} color={COLORS.textGray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}></View>
          <View style={styles.activityTextContainer}>
            <Text style={styles.activityName}>Eat Snack (fitbar)</Text>
            <Text style={styles.activityTime}>About 10 minutes ago</Text>
          </View>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" size={20} color={COLORS.textGray} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

// (STYLES)
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
    marginTop: StatusBar.currentHeight || 20, // Untuk Status Bar
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
    paddingBottom: 40,
  },
  // Target Card
  targetCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.background, // Abu-abu
    borderRadius: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.gradientStart,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Target Metrics
  targetMetricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  metricBox: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.gradientStart,
  },
  metricLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  // Activity Progress
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gradientStart,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  dropdownText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.white,
    marginRight: 5,
  },
  barChartPlaceholder: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 10,
  },
  placeholderText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.textGray,
    fontSize: 12,
  },
  seeMore: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  // Latest Activity
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
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
});

export default ActivityTrackerScreen;