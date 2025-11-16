import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { COLORS } from '../../constant/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import GradientButton from '../../components/Gradient/GradientButton'; 

const { width, height } = Dimensions.get('window');

type LoadingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Loading'
>;

type Props = {
  navigation: LoadingScreenNavigationProp;
};

const LoadingScreen: React.FC<Props> = ({ navigation }) => {
  // Fungsi untuk menangani navigasi 
  const handleGetStarted = () => {
    navigation.navigate('OnBoarding');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.contentContainer}>
        <Text style={styles.logoText}>FitnestX</Text>
        <Text style={styles.taglineText}>Everybody Can Train</Text>
      </View>

      <View style={styles.buttonContainer}>
        <GradientButton text="Get Started" onPress={handleGetStarted} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.2, 
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.textBlack,
    fontFamily: 'Poppins-Bold', 
  },
  taglineText: {
    fontSize: 18,
    color: COLORS.textGray,
    fontFamily: 'Poppins-Regular', 
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: width * 0.1, 
    paddingBottom: height * 0.08, 
  },
});

export default LoadingScreen;