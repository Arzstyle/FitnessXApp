/**
 * src/components/Form/CustomTextInput.tsx
 * (KANVAS BARU)
 *
 * Komponen reusable untuk text input dengan ikon.
 * Dibuat berdasarkan desain form Sign Up (image_be109b.png).
 * (Kriteria #4: Reusable Components, Kriteria #2: UI Implementation)
 */

import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInputProps,
  Platform,
} from 'react-native';
import { COLORS } from '../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons'; 

// Tipe props
interface CustomTextInputProps extends TextInputProps {
  label: string;
  iconName: string; 
  isPassword?: boolean; 
  error?: string; 
  onTogglePassword?: () => void; 
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  iconName,
  isPassword = false,
  error,
  onTogglePassword,
  secureTextEntry,
  ...rest 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[styles.inputContainer, error ? styles.inputContainerError : null]}>
        {/* Ikon Kiri */}
        <Icon
          name={iconName}
          size={20}
          color={COLORS.textGray}
          style={styles.icon}
        />

        {/* Input Teks */}
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.textGray}
          secureTextEntry={secureTextEntry}
          {...rest}
        />

        {/* Ikon Kanan (Khusus Password) */}
        {isPassword && (
          <TouchableOpacity onPress={onTogglePassword} style={styles.eyeIcon}>
            <Icon
              name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={COLORS.textGray}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* Pesan Error */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: COLORS.textBlack,
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundInput, 
    borderRadius: 14,
    height: 60,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'transparent', 
  },
  inputContainerError: {
    borderColor: COLORS.danger, 
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textBlack,
    paddingVertical: Platform.OS === 'android' ? 0 : 20,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
});

export default CustomTextInput;