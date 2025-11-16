import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { COLORS } from '../../constant/colors';

// (Import komponen slide yang sudah di refactor)
import OnBoardingSlide from '../../components/OnBoardingDisplay/OnBoardingSlide';

const { width } = Dimensions.get('window');
const onBoardingData = [
  {
    id: '1',
    image: require('../../assets/images/onboarding1.png'), 
    title: 'Track Your Goal',
    text: "Don't worry if you have trouble determining your goals, we can help you determine your goals and track your goals",
  },
  {
    id: '2',
    image: require('../../assets/images/onboarding2.png'), 
    title: 'Get Burn',
    text: 'Let’s keep burning, to achive your goals, it hurts only temporarily, if you give up now you will be in pain forever',
  },
  {
    id: '3',
    image: require('../../assets/images/onboarding3.png'),
    title: 'Eat Well',
    text: 'Let’s start a healthy lifestyle with us, we can determine your diet every day, healthy eating is fun',
  },
  {
    id: '4',
    image: require('../../assets/images/onboarding4.png'), 
    title: 'Improve Sleep Quality',
    text: 'Improve the quality of your sleep with us, good quality sleep can bring a good mood in the morning',
  },
];

type OnBoardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OnBoarding'
>;

type Props = {
  navigation: OnBoardingScreenNavigationProp;
};

const OnBoardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Fungsi untuk update slide index
  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(newIndex);
  };

  // Fungsi untuk tombol 'Next'
  const handleNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < onBoardingData.length) {
      // Pindah ke slide berikutnya
      flatListRef.current?.scrollToIndex({
        index: nextSlideIndex,
        animated: true,
      });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      navigation.replace('AuthStack', { screen: 'SignUp' }); 
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <FlatList
        ref={flatListRef}
        data={onBoardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        renderItem={({ item }) => (
          <OnBoardingSlide
            image={item.image}
            title={item.title}
            text={item.text}
            onPressNext={handleNextSlide}
          />
        )}
      />
      {/* Indikator Titik (Dots) */}
      <View style={styles.indicatorContainer}>
        {onBoardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex === index && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 80, 
    flexDirection: 'row',
    alignSelf: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.borderColor, 
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: COLORS.gradientStart, 
  },
});

export default OnBoardingScreen;