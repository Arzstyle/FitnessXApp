import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert, // (IMPORT BARU)
  ActivityIndicator, // (IMPORT BARU)
} from 'react-native';
// (PERBAIKAN: Import Tipe dari 'types.ts')
import { AuthStackNavigationProp } from '../../navigation/types';
import { COLORS } from '../../constant/colors';
import CustomTextInput from '../../components/Form/CustomTextInput';
import GradientButton from '../../components/Gradient/GradientButton';
import Icon from 'react-native-vector-icons/Ionicons';

// (IMPORT BARU: Import fungsi API kita)
import { loginUser } from '../../api/authApi';
// (IMPORT BARU: Import AsyncStorage untuk Kriteria #8)
import AsyncStorage from '@react-native-async-storage/async-storage';


// Tipe untuk navigation prop di dalam AuthStack
type SignInScreenNavigationProp = AuthStackNavigationProp<'SignIn'>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  // (STEP 1: LOGIKA STATE)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  
  // (STATE BARU: Untuk Kriteria #6)
  const [isLoading, setIsLoading] = useState(false);

  // (STEP 2: FUNGSI LOGIKA)
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // (validateForm() tidak berubah)
  const validateForm = () => {
    const newErrors: { [key: string]: string | null } = {};
    let isValid = true;
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };


  // (PERBAIKAN: Mengganti fungsi 'handleLogin' dengan 'async' API call)
  const handleLogin = async () => {
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
      // (authApi.ts akan melempar error jika user/pass salah)
      const user = await loginUser(email, password);

      // 4. API Sukses (user ditemukan dan password cocok)
      console.log('Login successful:', user);

      // 5. Simpan data ke AsyncStorage (Kriteria #8)
      await AsyncStorage.setItem('userId', user.id);
      await AsyncStorage.setItem('userName', user.firstName); // Kita simpan namanya juga

      // 6. Navigasi ke 'WelcomeScreen' dan KIRIM nama pengguna (Kriteria #5)
      navigation.navigate('Welcome', { userName: user.firstName }); 

    } catch (error: any) {
      // 7. Tangani Error API (Kriteria #6)
      // (Ini menangkap error "User not found" atau "Invalid password")
      console.error('Login failed:', error);
      Alert.alert(
        'Login Failed',
        error.message || 'An error occurred. Please try again.'
      );
      setErrors({ api: error.message }); // Tampilkan error API
    } finally {
      // 8. Hentikan loading
      setIsLoading(false);
    }
  };

  // (PERBAIKAN: Mengarahkan ke 'SignUp' - Bugfix dari alur sebelumnya)
  const handleRegisterNavigation = () => {
    navigation.navigate('SignUp');
  };

  // (fungsi handleSet... tidak berubah)
  const handleSetEmail = (text: string) => {
    setEmail(text);
    if (errors.email) setErrors(prev => ({ ...prev, email: null }));
  };
  const handleSetPassword = (text: string) => {
    setPassword(text);
    if (errors.password) setErrors(prev => ({ ...prev, password: null }));
  };


  // (STEP 3: UI)
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.container}>
        
        {/* --- Bagian Header --- */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Hey there,</Text>
          <Text style={styles.subtitle}>Welcome Back</Text>
        </View>

        {/* --- Bagian Form --- */}
        <CustomTextInput
          label="Email"
          iconName="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={handleSetEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          // (PERBAIKAN BUG: Menggunakan '?? undefined')
          error={errors.email ?? undefined}
          editable={!isLoading}
        />
        <CustomTextInput
          label="Password"
          iconName="lock-closed-outline"
          placeholder="Password"
          value={password}
          onChangeText={handleSetPassword}
          secureTextEntry={isPasswordVisible}
          isPassword
          onTogglePassword={togglePasswordVisibility}
          // (PERBAIKAN BUG: Menggunakan '?? undefined')
          error={errors.password ?? undefined}
          editable={!isLoading}
        />
        {errors.api && ( // (PERBAIKAN: Tampilkan error API)
          <Text style={styles.errorText}>{errors.api}</Text>
        )}

        {/* --- Link Lupa Password --- */}
        <TouchableOpacity style={styles.forgotPasswordButton} disabled={isLoading}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* --- Bagian Tombol Login --- */}
        <View style={styles.buttonContainer}>
          <GradientButton onPress={handleLogin} activeOpacity={0.8} isLoading={isLoading}>
            <View style={styles.loginButtonContent}>
              <Icon name="log-in-outline" size={20} color={COLORS.white} />
              <Text style={styles.loginButtonText}>Login</Text>
            </View>
          </GradientButton>
        </View>

        {/* --- Bagian Social Auth --- */}
        <View style={styles.socialAuthContainer}>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} disabled={isLoading}>
              <Icon name="logo-google" size={20} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} disabled={isLoading}>
              <Icon name="logo-facebook" size={20} color="#4267B2" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* --- Bagian Link Register --- */}
        <TouchableOpacity onPress={handleRegisterNavigation} disabled={isLoading}>
          <Text style={styles.loginLink}>
            Don't have an account yet?{' '}
            <Text style={styles.loginLinkBold}>Register</Text>
          </Text>
        </TouchableOpacity>

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
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textBlack,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    color: COLORS.textBlack,
    textAlign: 'center',
  },
  // (STYLE BARU: Untuk error API)
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
    textAlign: 'center',
  },
  // Style Lupa Password
  forgotPasswordButton: {
    alignSelf: 'center',
    marginTop: 5,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textGray,
    textDecorationLine: 'underline',
  },
  // Style Tombol Login
  buttonContainer: {
    marginTop: 30,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    fontFamily: 'Poppins-Bold',
    marginLeft: 10, // Jarak antara ikon dan teks
  },
  // Style Social Auth
  socialAuthContainer: {
    width: '100%',
    marginTop: 25,
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginHorizontal: 10,
  },
  dividerText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textGray,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  // Style Link Register
  loginLink: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textBlack,
    textAlign: 'center',
    marginTop: 20,
  },
  loginLinkBold: {
    fontFamily: 'Poppins-Bold',
    color: COLORS.gradientStart,
  },
});

export default SignInScreen;