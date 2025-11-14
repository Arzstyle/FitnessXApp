import 'react-native-gesture-handler';
import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { StatusBar } from 'react-native';
import { COLORS } from './src/constant/colors';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <AppNavigation />
    </>
  );
};

export default App;