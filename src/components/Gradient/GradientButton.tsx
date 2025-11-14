/**
 * src/components/Gradient/GradientButton.tsx
 * (PERBAIKAN: Menambahkan 'gradientStyle' prop)
 *
 * Komponen reusable untuk tombol dengan background LinearGradient.
 * (Kriteria #4: Reusable Components)
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constant/colors';

// (PERBAIKAN: Menambahkan 'gradientStyle' ke Props)
type Props = {
  text?: string;
  children?: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  gradientStyle?: StyleProp<ViewStyle>; // (PROP BARU)
  activeOpacity?: number;
  isLoading?: boolean;
};

const GradientButton: React.FC<Props> = ({
  text,
  children,
  onPress,
  style,
  gradientStyle, // (PROP BARU)
  activeOpacity = 0.7,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={isLoading} 
    >
      <LinearGradient
        colors={
          isLoading 
            ? [COLORS.textGray, COLORS.textGray] 
            : [COLORS.gradientStart, COLORS.gradientEnd]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        // (PERBAIKAN: Menggabungkan style default dengan prop 'gradientStyle')
        style={[styles.gradient, gradientStyle]} 
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          children || <Text style={styles.text}>{text}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 99, 
    shadowColor: COLORS.gradientStart,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  gradient: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    fontFamily: 'Poppins-Bold',
  },
});

export default GradientButton;