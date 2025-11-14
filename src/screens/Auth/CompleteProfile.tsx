/**
 * src/screens/Auth/CompleteProfile.tsx
 * (VERSI FINAL LENGKAP - PERBAIKAN 'immersive content')
 *
 * (PERBAIKAN: Menerima 'userId' dari 'SignUpScreen' & memanggil API)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert, // Placeholder
  ActivityIndicator, // (IMPORT BARU)
} from 'react-native';
// (PERBAIKAN: Import Tipe dari 'types.ts')
import { 
  AuthStackNavigationProp,
  AuthStackRouteProp // (IMPORT BARU)
} from '../../navigation/types';
import { COLORS } from '../../constant/colors';
import CustomTextInput from '../../components/Form/CustomTextInput';
import GradientButton from '../../components/Gradient/GradientButton';
import Icon from 'react-native-vector-icons/Ionicons';

// (IMPORT BARU: Import fungsi API kita)
import { updateUserProfile } from '../../api/userApi';


// Tipe untuk navigation prop
type CompleteProfileNavigationProp = AuthStackNavigationProp<'CompleteProfile'>;

// (TIPE BARU: Tipe untuk route prop agar bisa 'menerima' userId)
type CompleteProfileRouteProp = AuthStackRouteProp<'CompleteProfile'>;

type Props = {
  navigation: CompleteProfileNavigationProp;
  route: CompleteProfileRouteProp; // (PERBAIKAN: Tambahkan route)
};

// (Tipe FormData & FormErrors tidak berubah)
type FormData = {
  gender: 'male' | 'female' | null;
  dateOfBirth: string;
  weight: string;
  height: string;
};
type FormErrors = {
  gender?: string | null;
  dateOfBirth?: string | null;
  weight?: string | null;
  height?: string | null;
};


const CompleteProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  // (PERBAIKAN: Ambil 'userId' yang dikirim dari SignUpScreen)
  const { userId } = route.params;

  // (STEP 1: LOGIKA STATE)
  const [formData, setFormData] = useState<FormData>({
    gender: null,
    dateOfBirth: '',
    weight: '',
    height: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  // (STATE BARU: Untuk Kriteria #6)
  const [isLoading, setIsLoading] = useState(false);


  // (STEP 2: FUNGSI LOGIKA)

  // (handleFormChange & validateForm tidak berubah)
  const handleFormChange = (field: keyof FormData, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
      isValid = false;
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
      isValid = false;
    }
    if (!formData.weight) {
      newErrors.weight = 'Weight is required';
      isValid = false;
    }
    if (!formData.height) {
      newErrors.height = 'Height is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };


  // (PERBAIKAN: Mengganti fungsi 'handleNext' dengan 'async' API call)
  const handleNext = async () => {
    // 1. Validasi form
    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }

    // 2. Set loading (Kriteria #6)
    setIsLoading(true);
    setErrors({}); // Bersihkan error lama

    try {
      // 3. Panggil API (Kriteria #6)
      // (PERBAIKAN: Kirim 'userId' yang kita terima)
      const response = await updateUserProfile(userId, formData);

      // 4. API Sukses
      console.log('Profile updated successfully:', response.data);

      // 5. Navigasi ke 'SignIn' (Sesuai alur baru kita)
      navigation.navigate('SignIn');

    } catch (error: any) {
      // 6. Tangani Error API (Kriteria #6)
      console.error('Profile update failed:', error);
      Alert.alert(
        'Update Failed',
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      // 7. Hentikan loading
      setIsLoading(false);
    }
  };

  // (handleOpenDatePicker tidak berubah)
  const handleOpenDatePicker = () => {
    // TODO: Implementasikan modal Date Picker (e.g., @react-native-community/datetimepicker)
    // Untuk saat ini, kita set manual
    handleFormChange('dateOfBirth', '1990-01-01'); // Contoh
    Alert.alert('Date Picker', 'Date picker will be implemented here.');
  };


  // (STEP 3: UI)
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.container}>

        {/* --- Bagian Header (Placeholder) --- */}
        <View style={styles.headerPlaceholder}>
          <Text style={styles.headerTitle}>Let's complete your profile</Text>
          <Text style={styles.headerSubtitle}>It will help us to know more about you</Text>
        </View>

        {/* --- Bagian Form --- */}
        {/* (UI Form tidak berubah, hanya tambahkan 'disabled') */}
        {/* Pilihan Gender */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Choose Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                formData.gender === 'male' && styles.genderButtonActive,
              ]}
              onPress={() => handleFormChange('gender', 'male')}
              disabled={isLoading}>
              <Icon name="male" size={20} color={formData.gender === 'male' ? COLORS.white : COLORS.gradientStart} />
              <Text style={[styles.genderText, formData.gender === 'male' && styles.genderTextActive]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                formData.gender === 'female' && styles.genderButtonActive,
              ]}
              onPress={() => handleFormChange('gender', 'female')}
              disabled={isLoading}>
              <Icon name="female" size={20} color={formData.gender === 'female' ? COLORS.white : COLORS.gradientStart} />
              <Text style={[styles.genderText, formData.gender === 'female' && styles.genderTextActive]}>Female</Text>
            </TouchableOpacity>
          </View>
          {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
        </View>

        {/* Input Tanggal Lahir (Sebagai Tombol) */}
        <View style={styles.formGroup}>
          <TouchableOpacity onPress={handleOpenDatePicker} disabled={isLoading}>
            <CustomTextInput
              label="Date of Birth"
              iconName="calendar-outline"
              placeholder="Select your date of birth"
              value={formData.dateOfBirth}
              editable={false}
              error={errors.dateOfBirth ?? undefined}
            />
          </TouchableOpacity>
        </View>
        
        {/* Input Berat & Tinggi */}
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <CustomTextInput
              label="Your Weight"
              iconName="barbell-outline"
              placeholder="kg"
              value={formData.weight}
              onChangeText={text => handleFormChange('weight', text)}
              keyboardType="numeric"
              error={errors.weight ?? undefined}
              editable={!isLoading}
            />
          </View>
          <View style={styles.rowItem}>
            <CustomTextInput
              label="Your Height"
              iconName="resize-outline"
              placeholder="cm"
              value={formData.height}
              onChangeText={text => handleFormChange('height', text)}
              keyboardType="numeric"
              error={errors.height ?? undefined}
              editable={!isLoading}
            />
          </View>
        </View>

        {/* --- Bagian Tombol Next --- */}
        <View style={styles.buttonContainer}>
          <GradientButton 
            text="Next" 
            onPress={handleNext} 
            // (PERBAIKAN: Tampilkan loading)
            isLoading={isLoading} 
          />
        </View>

      </View>
    </ScrollView>
  );
};

// (STEP 4: STYLES)
// (Style tidak berubah)
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  // Style Header
  headerPlaceholder: {
    alignItems: 'center',
    marginBottom: 30,
    // TODO: Tambahkan ilustrasi di atas ini
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: COLORS.textBlack,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textGray,
    textAlign: 'center',
    marginTop: 5,
  },
  // Style Form Group
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.textBlack,
    marginBottom: 10,
  },
  // Style Gender
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
  },
  genderButtonActive: {
    backgroundColor: COLORS.gradientStart, // Menggunakan warna gradien
    borderColor: COLORS.gradientStart,
  },
  genderText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textBlack,
  },
  genderTextActive: {
    color: COLORS.white,
    fontFamily: 'Poppins-SemiBold',
  },
  // Style Input Berdampingan (Row)
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -5, // Sedikit offset
  },
  rowItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  // Style Error
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
    marginLeft: 5,
  },
  // Style Tombol
  buttonContainer: {
    marginTop: 30,
  },
});

export default CompleteProfileScreen;