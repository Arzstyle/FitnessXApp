/**
 * src/components/Dashboard/ProfileMenuItem.tsx
 * (FILE BARU - Sesuai Rencana Refactor)
 *
 * Komponen reusable untuk satu baris menu di ProfileScreen.
 * (Kriteria #4: Reusable Components)
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constant/colors';

type Props = {
  icon: string;
  title: string;
  isToggle?: boolean; // Apakah ini item dengan <Switch> ?
  onToggle?: (value: boolean) => void;
  toggleValue?: boolean;
  onPress?: () => void;
};

const ProfileMenuItem: React.FC<Props> = ({
  icon,
  title,
  isToggle = false,
  onToggle,
  toggleValue,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={isToggle} // Nonaktifkan onPress jika ini adalah <Switch>
    >
      {/* Ikon Kiri */}
      <View style={styles.iconContainer}>
        <Icon name={icon} size={20} color={COLORS.gradientStart} />
      </View>

      {/* Teks Judul */}
      <Text style={styles.title}>{title}</Text>

      {/* Item Kanan (Switch atau Panah) */}
      <View style={styles.rightContainer}>
        {isToggle ? (
          <Switch
            trackColor={{ false: COLORS.background, true: COLORS.gradientStart }}
            thumbColor={COLORS.white}
            ios_backgroundColor={COLORS.background}
            onValueChange={onToggle}
            value={toggleValue}
          />
        ) : (
          <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  title: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textBlack,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
});

export default ProfileMenuItem;