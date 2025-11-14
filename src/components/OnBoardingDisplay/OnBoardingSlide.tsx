/**
 * src/components/OnBoardingDisplay/OnBoardingSlide.tsx
 * (PERBAIKAN: Menyesuaikan props 'GradientButton')
 * (FILE LENGKAP)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { COLORS } from '../../constant/colors';
import GradientButton from '../Gradient/GradientButton';

const { width, height } = Dimensions.get('window');

type Props = {
  image: any;
  title: string;
  text: string;
  onPressNext: () => void;
};

const OnBoardingSlide: React.FC<Props> = ({
  image,
  title,
  text,
  onPressNext,
}) => {
  return (
    <View style={styles.slideContainer}>
      {/* Bagian Atas: Latar Gelombang + Gambar */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>

      {/* Bagian Bawah: Teks */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>

      {/* Tombol Panah (diletakkan secara absolut) */}
      <View style={styles.nextButtonContainer}>
        {/* (PERBAIKAN: Mengganti 'containerStyle' menjadi 'style') */}
        <GradientButton
          onPress={onPressNext}
          style={styles.nextButtonTouchable} 
          gradientStyle={styles.nextButtonGradient}
          activeOpacity={0.7}>
          <Text style={styles.nextButtonText}>&gt;</Text>
        </GradientButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    width: width,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  // Latar belakang gelombang
  imageContainer: {
    width: width,
    height: height * 0.6,
    backgroundColor: COLORS.backgroundWavy,
    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  // Konten teks
  textContainer: {
    width: '100%',
    paddingHorizontal: width * 0.1,
    marginTop: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textBlack,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    color: COLORS.textGray,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 15,
  },
  // Tombol Panah
  nextButtonContainer: {
    position: 'absolute',
    bottom: height * 0.05,
    right: width * 0.1,
  },
  nextButtonTouchable: {
    width: 60,
    height: 60,
    // (PERBAIKAN: Hapus shadow di sini,
    // style ini sekarang untuk 'container' luar)
    shadowColor: 'transparent',
    elevation: 0,
    borderRadius: 30, // Pastikan container luar juga bulat
  },
  nextButtonGradient: {
    borderRadius: 30,
    paddingVertical: 0, // Override padding default
    width: '100%',
    height: '100%',
  },
  nextButtonText: {
    fontSize: 30,
    color: COLORS.textWhite,
    fontFamily: 'Poppins-Regular',
    marginTop: -4, // Penyesuaian centering
  },
});

export default OnBoardingSlide;