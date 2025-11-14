/**
 * src/screens/LoadingScreen.tsx
 * Tampilan pertama yang dilihat pengguna, berisi logo dan tombol "Get Started".
 * (DIREFAKTOR: Menggunakan GradientButton component)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  // TouchableOpacity, // <-- Dihapus
  Dimensions,
  // LinearGradient, // <-- Dihapus
  StatusBar,
} from 'react-native';
import { COLORS } from '../../constant/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import GradientButton from '../../components/Gradient/GradientButton'; // <-- (STEP 1: IMPORT)

// ... (Dimensi dan Tipe tetap sama) ...
// Mengambil dimensi layar untuk UI responsif (Kriteria #2)
const { width, height } = Dimensions.get('window');

// Tipe untuk navigation prop
type LoadingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Loading'
>;

type Props = {
  navigation: LoadingScreenNavigationProp;
};

const LoadingScreen: React.FC<Props> = ({ navigation }) => {
  // Fungsi untuk menangani navigasi (Kriteria #3 & #5)
  const handleGetStarted = () => {
    navigation.navigate('OnBoarding');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Konten Utama: Logo dan Tagline */}
      <View style={styles.contentContainer}>
        <Text style={styles.logoText}>FitnestX</Text>
        <Text style={styles.taglineText}>Everybody Can Train</Text>
      </View>

      {/* Tombol Aksi: diletakkan di bagian bawah */}
      <View style={styles.buttonContainer}>
        {/* (STEP 2: GANTI KODE TOMBOL) */}
        <GradientButton text="Get Started" onPress={handleGetStarted} />
        {/* Kode TouchableOpacity dan LinearGradient yang lama dihapus */}
      </View>
    </View>
  );
};

// (STEP 3: STYLES DIPANGKAS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'space-between', // Mendorong konten & tombol
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.2, // Memberi ruang di atas
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.textBlack,
    fontFamily: 'Poppins-Bold', // Asumsi nama font, bisa disesuaikan
  },
  taglineText: {
    fontSize: 18,
    color: COLORS.textGray,
    fontFamily: 'Poppins-Regular', // Asumsi nama font
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: width * 0.1, // 10% padding di kiri-kanan
    paddingBottom: height * 0.08, // Jarak dari bawah
  },
  // Style 'touchableOpacity', 'gradientButton', dan 'buttonText' dihapus
  // karena sudah ada di dalam komponen GradientButton.
});

export default LoadingScreen;