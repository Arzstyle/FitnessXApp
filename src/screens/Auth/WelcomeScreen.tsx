import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import {
  AuthStackNavigationProp,
  AuthStackParamList, 
} from '../../navigation/types';
import { COLORS } from '../../constant/colors';
import GradientButton from '../../components/Gradient/GradientButton';
import { CommonActions, RouteProp } from '@react-navigation/native'; 

type WelcomeScreenNavigationProp = AuthStackNavigationProp<'Welcome'>;
type WelcomeScreenRouteProp = RouteProp<AuthStackParamList, 'Welcome'>;
type Props = {
  navigation: WelcomeScreenNavigationProp;
  route: WelcomeScreenRouteProp; 
};

const WelcomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userName = 'User' } = route.params ?? {}; 

  const handleGoToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, 
        routes: [
          {
            name: 'MainApp', 
            params: { screen: 'Home' },
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
          source={require('../../assets/images/welcome.png')}
          style={styles.illustration}
          resizeMode="contain"
          // Tambahkan fallback jika gambar tidak ada
          onError={e => console.log('Error memuat gambar', e.nativeEvent.error)}
        />

        {/* --- Teks Selamat Datang --- */}
        <Text style={styles.welcomeText}>Welcome</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  topContent: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%', 
  },
  illustration: {
    width: '100%',
    height: 250, 
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
  },
  buttonContainer: {
    width: '100%', 
  },
});

export default WelcomeScreen;