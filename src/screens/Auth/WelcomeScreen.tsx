/**
 * src/screens/WelcomeScreen.tsx
 * (VERSI FINAL LENGKAP - PERBAIKAN 'Props' & Navigasi)
 */

import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
// (PERBAIKAN: Import Tipe dari 'types.ts')
import {
  AuthStackNavigationProp,
  AuthStackParamList, // Impor Tipe ParamList
} from '../../navigation/types';
import { COLORS } from '../../constant/colors';
import GradientButton from '../../components/Gradient/GradientButton';
// (PERBAIKAN: Impor CommonActions untuk reset navigasi)
import { CommonActions, RouteProp } from '@react-navigation/native'; // Impor RouteProp

// (PERBAIKAN: TIPE YANG HILANG SEKARANG DIKEMBALIKAN)

// 1. Tipe untuk navigation prop
type WelcomeScreenNavigationProp = AuthStackNavigationProp<'Welcome'>;

// 2. Tipe untuk route prop (agar bisa membaca params)
type WelcomeScreenRouteProp = RouteProp<AuthStackParamList, 'Welcome'>;

// 3. Gabungkan dalam 'Props'
type Props = {
  navigation: WelcomeScreenNavigationProp;
  route: WelcomeScreenRouteProp; // Menggunakan tipe yang benar
};

const WelcomeScreen: React.FC<Props> = ({ navigation, route }) => {
  // 'route.params' sekarang aman secara tipe
  const { userName = 'User' } = route.params ?? {}; // Default jika params undefined

  const handleGoToHome = () => {
    // (PERBAIKAN: Gunakan CommonActions.reset untuk mengganti stack)
    // Ini akan menghapus semua riwayat navigasi Auth
    // dan memulai stack baru di 'MainApp'.
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Reset ke item pertama
        routes: [
          {
            name: 'MainApp', // Nama stack di RootStack
            params: { screen: 'Home' }, // Layar di dalam MainApp
          },
        ],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* --- Bagian Atas (Ilustrasi & Teks) --- */}
      <View style={styles.topContent}>
        {/* --- Ilustrasi --- */}
        <Image
          // TODO: Ganti dengan ilustrasi yang sebenarnya (dari aset)
          // Pastikan path ini benar
          source={require('../../assets/images/welcome.png')}
          style={styles.illustration}
          resizeMode="contain"
          // Tambahkan fallback jika gambar tidak ada
          onError={e => console.log('Error memuat gambar', e.nativeEvent.error)}
        />

        {/* --- Teks Selamat Datang --- */}
        <Text style={styles.welcomeText}>Welcome, {userName}</Text>
        <Text style={styles.subtitleText}>
          You are all set now, let's reach your goals together with us
        </Text>
      </View>

      {/* --- Tombol "Go To Home" --- */}
      <View style={styles.buttonContainer}>
        <GradientButton text="Go To Home" onPress={handleGoToHome} />
      </View>
    </View>
  );
};

// (PERBAIKAN: Style disesuaikan agar 'space-between')
const styles = StyleSheet.create({
  container: {
    flex: 1, // Memastikan kontainer mengisi seluruh layar
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    paddingVertical: 50, // Padding atas dan bawah untuk menyesuaikan
    justifyContent: 'space-between', // Menyebar konten ke atas dan bawah
    alignItems: 'center', // Pusatkan secara horizontal
  },
  topContent: {
    flex: 1, // Memastikan topContent mengambil ruang yang tersedia
    justifyContent: 'center', // Pusatkan konten di dalamnya secara vertikal
    alignItems: 'center',
    width: '100%', // Pastikan ini mengambil lebar penuh
  },
  illustration: {
    width: '100%',
    height: 250, // Sesuaikan tinggi ilustrasi
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: COLORS.textBlack,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textGray,
    textAlign: 'center',
    // marginBottom tidak perlu di sini karena sudah diatur oleh space-between
  },
  buttonContainer: {
    width: '100%', // Tombol mengisi lebar penuh
    // marginTop tidak perlu di sini karena sudah diatur oleh space-between
  },
});

export default WelcomeScreen;