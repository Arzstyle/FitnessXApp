/**
 * src/screens/Auth/SignUpScreen.tsx
 * (PERBAIKAN: Mengintegrasikan API 'registerUser')
 * (STRATEGI: 1 File "Gemuk" Sesuai Permintaan)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { AuthStackNavigationProp } from '../../navigation/types';
import { COLORS } from '../../constant/colors';
import CustomTextInput from '../../components/Form/CustomTextInput';
import GradientButton from '../../components/Gradient/GradientButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { registerUser } from '../../api/authApi';


// Tipe untuk navigation prop
type SignUpScreenNavigationProp = AuthStackNavigationProp<'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  // (STEP 1: LOGIKA STATE)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  
  // (STATE BARU: Untuk Kriteria #6)
  const [isLoading, setIsLoading] = useState(false);

  // (STEP 2: FUNGSI LOGIKA)
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateForm = () => {
    // ... (Validasi form tetap sama) ...
    const newErrors: { [key: string]: string | null } = {};
    let isValid = true;
    if (!firstName) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!lastName) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
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
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    if (!isPrivacyChecked) {
      newErrors.privacy = 'You must accept the privacy policy';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  // Mengganti fungsi 'handleRegister' dengan 'async' API call
  const handleRegister = async () => {
    // 1. Validasi form
    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }

    // 2. Set loading 
    setIsLoading(true);
    setErrors({}); 

    try {
      // 3. Panggil API (Kriteria #6)
      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });

      // 4. API Sukses
      const newUser = response.data;
      console.log('Registration successful:', newUser);

      // 5. Navigasi ke 'CompleteProfile' dan KIRIM 'userId' (Kriteria #5)
      navigation.navigate('CompleteProfile', { userId: newUser.id });

    } catch (error: any) {
      const detailedMessage = error.message || 'An unknown error occurred.';

      console.error('Registration failed (detailed):', detailedMessage);
      
      Alert.alert(
        'Registration Failed',
        detailedMessage
      );
      setErrors({ api: detailedMessage }); 
    } finally {
      // 7. Hentikan loading
      setIsLoading(false);
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate('SignIn');
  };

  const handleSetFirstName = (text: string) => {
    setFirstName(text);
    if (errors.firstName) setErrors(prev => ({ ...prev, firstName: null }));
  };
  const handleSetLastName = (text: string) => {
    setLastName(text);
    if (errors.lastName) setErrors(prev => ({ ...prev, lastName: null }));
  };
  const handleSetEmail = (text: string) => {
    setEmail(text);
    if (errors.email) setErrors(prev => ({ ...prev, email: null }));
  };
  const handleSetPassword = (text: string) => {
    setPassword(text);
    if (errors.password) setErrors(prev => ({ ...prev, password: null }));
  };
  const handleSetPrivacyChecked = (value: boolean) => {
    setIsPrivacyChecked(value);
    if (errors.privacy) setErrors(prev => ({ ...prev, privacy: null }));
  };


  // (STEP 3: UI)
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.container}>
        
        {/* --- Bagian Header --- */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Hey there,</Text>
          <Text style={styles.subtitle}>Create an Account</Text>
        </View>

        {/* --- Bagian Form --- */}
        <CustomTextInput
          label="First Name"
          iconName="person-outline"
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={handleSetFirstName}
          error={errors.firstName ?? undefined}
        />
        <CustomTextInput
          label="Last Name"
          iconName="person-outline"
          placeholder="Enter your last name"
          value={lastName}
          onChangeText={handleSetLastName}
          error={errors.lastName ?? undefined}
        />
        <CustomTextInput
          label="Email"
          iconName="mail-outline"
          placeholder="Enter your email"
          value={email}
          onChangeText={handleSetEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email ?? undefined}
        />
        <CustomTextInput
          label="Password"
          iconName="lock-closed-outline"
          placeholder="Enter your password"
          value={password}
          onChangeText={handleSetPassword}
          secureTextEntry={isPasswordVisible}
          isPassword
          onTogglePassword={togglePasswordVisibility}
          error={errors.password ?? undefined}
        />

        {/* --- Bagian Checkbox --- */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => handleSetPrivacyChecked(!isPrivacyChecked)}
          disabled={isLoading} 
        >
          <Icon
            name={isPrivacyChecked ? 'checkbox' : 'square-outline'}
            size={20}
            color={
              isPrivacyChecked ? COLORS.gradientStart : COLORS.textGray
            }
          />
          <Text style={styles.privacyText}>
            By continuing you accept our Privacy Policy and Term of Use
          </Text>
        </TouchableOpacity>
        {errors.privacy && (
          <Text style={styles.errorText}>{errors.privacy}</Text>
        )}
        {errors.api && ( 
          <Text style={styles.errorText}>{errors.api}</Text>
        )}

        {/* --- Bagian Tombol Register --- */}
        <View style={styles.buttonContainer}>
          <GradientButton 
            text="Register" 
            onPress={handleRegister} 
            isLoading={isLoading} 
          />
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
        
        {/* --- Bagian Link Login --- */}
        <TouchableOpacity onPress={handleLoginNavigation} disabled={isLoading}>
          <Text style={styles.loginLink}>
            Already have an account?{' '}
            <Text style={styles.loginLinkBold}>Login</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

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
  // Style Checkbox
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  privacyText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textGray,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  // Style Tombol Register
  buttonContainer: {
    marginTop: 20,
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
  // Style Link Login
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

export default SignUpScreen;