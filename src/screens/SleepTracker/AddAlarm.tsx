import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Switch,
  ScrollView, 
} from 'react-native';
import { COLORS } from '../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { SleepStackNavigationProp } from '../../navigation/types';
import GradientButton from '../../components/Gradient/GradientButton';


type Props = {
  navigation: SleepStackNavigationProp<'AddAlarm'>;
};

const AddAlarmScreen: React.FC<Props> = ({ navigation }) => {
  const [vibrate, setVibrate] = useState(false);
  
  const handleAddAlarm = () => {
    console.log('Alarm baru ditambahkan');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- Header Kustom --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="chevron-back-outline" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Alarm</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-horizontal" size={24} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* --- Card Form --- */}
        <View style={styles.formCard}>
          <Text style={styles.timePickerText}>09:00 PM</Text>
        </View>

        {/* --- Opsi --- */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionIcon}>
              <Icon name="bed-outline" size={20} color={COLORS.gradientStart} />
            </View>
            <Text style={styles.optionTitle}>Bedtime</Text>
            <Text style={styles.optionValue}>09:00 PM</Text>
            <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionIcon}>
              <Icon name="hourglass-outline" size={20} color={COLORS.gradientStart} />
            </View>
            <Text style={styles.optionTitle}>Hours of sleep</Text>
            <Text style={styles.optionValue}>8 hours 30 minutes</Text>
            <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionIcon}>
              <Icon name="repeat-outline" size={20} color={COLORS.gradientStart} />
            </View>
            <Text style={styles.optionTitle}>Repeat</Text>
            <Text style={styles.optionValue}>Mon to Fri</Text>
            <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
          </TouchableOpacity>
          
          {/* Opsi Toggle */}
          <View style={styles.optionItem}>
            <View style={styles.optionIcon}>
              <Icon name="pulse-outline" size={20} color={COLORS.gradientStart} />
            </View>
            <Text style={styles.optionTitle}>Vibrate When Alarm Sound</Text>
            <Switch
              trackColor={{ false: COLORS.background, true: COLORS.gradientStart }}
              thumbColor={COLORS.white}
              ios_backgroundColor={COLORS.background}
              onValueChange={setVibrate}
              value={vibrate}
            />
          </View>
        </View>

      </ScrollView>

      {/* --- Tombol "Add" --- */}
      <View style={styles.buttonContainer}>
        <GradientButton text="Add" onPress={handleAddAlarm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, 
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: (StatusBar.currentHeight || 0) + 10,
    backgroundColor: COLORS.white, // Header putih
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Scroll
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  // Kartu Form (Time Picker)
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timePickerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: COLORS.textBlack,
  },
  // Opsi
  optionsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionTitle: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.textBlack,
  },
  optionValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
    marginRight: 10,
  },
  // Tombol
  buttonContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
  },
});

export default AddAlarmScreen;