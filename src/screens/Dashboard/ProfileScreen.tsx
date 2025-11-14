/**
 * src/screens/Dashboard/ProfileScreen.tsx
 * (PERBAIKAN: Mengintegrasikan API 'getUserProfile' & AsyncStorage)
 *
 * Layar tab 'Profile'.
 * (Kriteria #4, #6, #8)
 */

import React, { useState, useEffect } from 'react'; // (IMPORT BARU)
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator, // (IMPORT BARU)
  Alert, // (IMPORT BARU)
} from 'react-native';
import { COLORS } from '../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileMenuItem from '../../components/Dashboard/ProfileMenuItem';
import { MainBottomTabNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';

// (IMPORT BARU: Import fungsi API & AsyncStorage)
import { getUserProfile } from '../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

// (TIPE BARU: Tipe untuk data pengguna dari API)
type UserProfileData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string; // URL gambar
  program: string;
  height: string;
  weight: string;
  dateOfBirth: string; // Kita akan hitung umur dari sini nanti
};

// Tipe untuk props navigasi
type Props = {
  navigation: MainBottomTabNavigationProp<'Profile'>;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  // (STATE BARU: Gantikan data 'dummy')
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  
  // State dummy untuk <Switch>
  const [isNotifOn, setIsNotifOn] = useState(false);

  // (FUNGSI BARU: Hitung Umur - Kriteria #8 Inovasi)
  // Fungsi sederhana untuk menghitung umur dari tanggal lahir (YYYY-MM-DD)
  const getAge = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const birthDate = new Date(dateString);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return `${age}yo`; // Sesuai desain (cth: "22yo")
    } catch (e) {
      console.error("Error calculating age:", e);
      return 'N/A';
    }
  };


  // (FUNGSI BARU: Ambil data saat layar dibuka - Kriteria #4 & #6)
  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        // 1. Ambil 'userId' dari AsyncStorage (Kriteria #8)
        const userId = await AsyncStorage.getItem('userId');

        if (userId) {
          // 2. Panggil API (Kriteria #6)
          const response = await getUserProfile(userId);
          // 3. Simpan data asli ke state (Kriteria #4)
          setUserData(response.data);
        } else {
          // Seharusnya tidak terjadi jika alur login benar
          Alert.alert('Error', 'User ID not found. Please log in again.');
          // TODO: Navigasi paksa kembali ke Login
          // navigation.dispatch(
          //   CommonActions.reset({ index: 0, routes: [{ name: 'AuthStack' }] })
          // );
        }
      } catch (error: any) {
        console.error('Failed to fetch profile:', error);
        Alert.alert('Error', 'Failed to fetch profile data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []); // [] = Jalankan satu kali saat layar dibuka

  // (PERBAIKAN: Tampilkan loading)
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.gradientStart} />
      </View>
    );
  }

  // (PERBAIKAN: Tampilkan jika data gagal dimuat)
  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.program}>Failed to load profile data.</Text>
      </View>
    );
  }

  // (UI UTAMA: Sekarang menggunakan data asli)
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header Kustom --- */}
      <View style={styles.header}>
        <View style={styles.headerButton} /> 
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-horizontal" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* --- Info Profil (Data Asli) --- */}
        <View style={styles.profileInfoContainer}>
          <View style={styles.avatarContainer}>
            <Image
              // (PERBAIKAN: Gunakan 'avatar' dari API)
              source={{ uri: userData.avatar || 'https://placehold.co/60x60/92A3FD/FFFFFF?text=A' }} 
              style={styles.avatar}
            />
          </View>
          <View style={styles.nameContainer}>
            {/* (PERBAIKAN: Gunakan 'firstName' + 'lastName' dari API) */}
            <Text style={styles.name}>{userData.firstName} {userData.lastName}</Text>
            {/* (PERBAIKAN: Gunakan 'program' dari API) */}
            <Text style={styles.program}>{userData.program || 'Fitness Program'}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* --- Stat Box (Data Asli) --- */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            {/* (PERBAIKAN: Gunakan 'height' dari API) */}
            <Text style={styles.statValue}>{userData.height}cm</Text>
            <Text style={styles.statLabel}>Height</Text>
          </View>
          <View style={styles.statBox}>
            {/* (PERBAIKAN: Gunakan 'weight' dari API) */}
            <Text style={styles.statValue}>{userData.weight}kg</Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>
          <View style={styles.statBox}>
            {/* (PERBAIKAN: Gunakan 'age' dari API) */}
            <Text style={styles.statValue}>{getAge(userData.dateOfBirth)}</Text>
            <Text style={styles.statLabel}>Age</Text>
          </View>
        </View>

        {/* --- Kartu "Account" --- */}
        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>Account</Text>
          <ProfileMenuItem icon="person-outline" title="Personal Data" onPress={() => {}} />
          <ProfileMenuItem icon="ribbon-outline" title="Achievement" onPress={() => {}} />
          <ProfileMenuItem icon="analytics-outline" title="Activity History" onPress={() => {}} />
          <ProfileMenuItem icon="stats-chart-outline" title="Workout Progress" onPress={() => {}} />
        </View>

        {/* --- Kartu "Notification" --- */}
        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>Notification</Text>
          <ProfileMenuItem
            icon="notifications-outline"
            title="Pop-up Notification"
            isToggle={true}
            toggleValue={isNotifOn}
            onToggle={setIsNotifOn}
          />
        </View>

        {/* --- Kartu "Other" --- */}
        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>Other</Text>
          <ProfileMenuItem icon="mail-outline" title="Contact Us" onPress={() => {}} />
          <ProfileMenuItem icon="shield-checkmark-outline" title="Privacy Policy" onPress={() => {}} />
          <ProfileMenuItem icon="settings-outline" title="Settings" onPress={() => {}} />
        </View>

        {/* Padding Bawah agar tidak tertutup Tab Bar */}
        <View style={{ height: 120 }} />

      </ScrollView>
    </View>
  );
};

// (STYLES)
const styles = StyleSheet.create({
  // (STYLE BARU: Untuk Loading)
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
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
    marginTop: StatusBar.currentHeight || 20,
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
  // Scroll
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // Info Profil
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background,
    marginRight: 15,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: COLORS.textBlack,
  },
  program: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  editButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: COLORS.gradientStart, // Menggunakan warna solid
  },
  editButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: COLORS.white,
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
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
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.gradientStart,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  // Kartu Menu
  menuCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  menuTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: COLORS.textBlack,
    marginBottom: 10,
  },
});

export default ProfileScreen;