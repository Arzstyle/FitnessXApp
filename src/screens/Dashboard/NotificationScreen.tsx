import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeStackNavigationProp } from '../../navigation/types';

// Tipe untuk props navigasi
type Props = {
  navigation: HomeStackNavigationProp<'Notification'>;
};

// Data dummy untuk notifikasi
const dummyNotifications = [
  { id: '1', title: 'Workout Reminder', message: 'Don\'t forget your leg day today!', time: '10m ago' },
  { id: '2', title: 'Water Intake', message: 'You\'ve reached 2L of water. Keep it up!', time: '1h ago' },
  { id: '3', title: 'New Follower', message: 'Stefani Wong started following you.', time: '3h ago' },
];

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header Kustom --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="chevron-back-outline" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={styles.headerButton} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {dummyNotifications.map((notif) => (
          <View key={notif.id} style={styles.notifItem}>
            <View style={styles.notifIcon}>
              <Icon name="notifications-outline" size={24} color={COLORS.gradientStart} />
            </View>
            <View style={styles.notifTextContainer}>
              <Text style={styles.notifTitle}>{notif.title}</Text>
              <Text style={styles.notifMessage}>{notif.message}</Text>
            </View>
            <Text style={styles.notifTime}>{notif.time}</Text>
          </View>
        ))}
        {/* Tampilan jika tidak ada notifikasi */}
        {dummyNotifications.length === 0 && (
          <View style={styles.emptyContainer}>
            <Icon name="notifications-off-outline" size={60} color={COLORS.textGray} />
            <Text style={styles.emptyText}>No notifications right now.</Text>
          </View>
        )}
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
    marginTop: StatusBar.currentHeight || 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
  },
  headerButton: {
    width: 40, // Samakan lebar agar 'space-between' bekerja
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start', // 'flex-start' untuk tombol kembali
  },
  // ScrollView
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  // Item Notifikasi
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  notifIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notifTextContainer: {
    flex: 1,
  },
  notifTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.textBlack,
  },
  notifMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  notifTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: COLORS.textGray,
    marginLeft: 10,
  },
  // Empty State
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textGray,
    marginTop: 10,
  },
});

export default NotificationScreen;