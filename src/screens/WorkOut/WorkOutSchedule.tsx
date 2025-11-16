import React, { useState, useLayoutEffect } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { COLORS } from '../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { WorkOutStackNavigationProp } from '../../navigation/types';
import GradientButton from '../../components/Gradient/GradientButton';

// Tipe untuk props navigasi (Asumsi)
type Props = {
  navigation: WorkOutStackNavigationProp<'WorkOutSchedule'>;
};

// --- DATA DUMMY ---
const dates = [
  { dayName: 'Sun', dayNum: '11' },
  { dayName: 'Mon', dayNum: '12' },
  { dayName: 'Tue', dayNum: '13' },
  { dayName: 'Wed', dayNum: '14', active: true },
  { dayName: 'Thu', dayNum: '15' },
  { dayName: 'Fri', dayNum: '16' },
];

// Data dummy untuk jadwal
const schedule = [
  { id: '1', time: '07:00 AM', title: 'Ab Workout', duration: '7:30am' },
  { id: '2', time: '09:00 AM', title: 'Upperbody Workout', duration: '9am' },
  { id: '3', time: '03:00 PM', title: 'Lowerbody Workout', duration: '3pm' },
];

// Data dummy untuk jam
const timeSlots = [
  { id: '1', hour: '2', min: '29' },
  { id: '2', hour: '3', min: '30', active: true },
  { id: '3', hour: '4', min: '31' },
];

// --- KOMPONEN ---
const WorkOutScheduleScreen: React.FC<Props> = ({ navigation }) => {
  const [viewMode, setViewMode] = useState<'schedule' | 'add'>('schedule');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useLayoutEffect(() => {
    // Sembunyikan tab bar saat masuk ke layar ini
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
    return () => {
      navigation.setOptions({
        tabBarStyle: { display: 'flex' }, 
      });
    };
  }, [navigation]);


  // --- RENDER: Halaman Tambah Jadwal (Add Schedule) ---
  const renderAddSchedule = () => (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setViewMode('schedule')} style={styles.headerButton}>
          <Icon name="close" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Schedule</Text>
        <TouchableOpacity style={styles.headerButton}>
          {/* (Placeholder) */}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Tanggal --- */}
        <Text style={styles.dateText}>Thu, 27 May 2021</Text>

        {/* --- Waktu --- */}
        <Text style={styles.timeLabel}>Time</Text>
        <View style={styles.timePickerContainer}>
          <View style={styles.timeColumn}>
            {timeSlots.map(t => <Text key={t.id} style={styles.timeSlot}>{t.hour}</Text>)}
          </View>
          <View style={styles.timeColumn}>
            {timeSlots.map(t => 
              <Text key={t.id} style={[styles.timeSlot, t.active && styles.timeSlotActive]}>
                {t.min}
              </Text>
            )}
          </View>
          <View style={styles.timeColumn}>
            <Text style={[styles.timeSlot, styles.timeSlotActive]}>PM</Text>
          </View>
        </View>

        {/* --- Details --- */}
        <Text style={styles.detailsLabel}>Details Workout</Text>
        <View style={styles.detailsContainer}>
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailText}>Choose Workout</Text>
            <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
          </TouchableOpacity>
          <View style={styles.detailDivider} />
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailText}>Difficulty</Text>
            <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
          </TouchableOpacity>
          <View style={styles.detailDivider} />
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailText}>Custom Repetitions</Text>
            <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
          </TouchableOpacity>
          <View style={styles.detailDivider} />
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailText}>Custom Weights</Text>
            <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* --- Tombol Save --- */}
      <View style={styles.saveButtonContainer}>
        <GradientButton text="Save" onPress={() => setViewMode('schedule')} />
      </View>
    </View>
  );

  // --- RENDER: Halaman Utama (Schedule) ---
  const renderSchedule = () => (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="chevron-back-outline" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workout Schedule</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-horizontal" size={20} color={COLORS.textBlack} />
        </TouchableOpacity>
      </View>

      {/* --- Kalender Horizontal --- */}
      <View style={styles.calendarContainer}>
        <Icon name="chevron-back-outline" size={20} color={COLORS.textGray} />
        <Text style={styles.monthText}>May 2021</Text>
        <Icon name="chevron-forward-outline" size={20} color={COLORS.textGray} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
        {dates.map((date) => (
          <TouchableOpacity key={date.dayNum} style={[styles.dateItem, date.active && styles.dateItemActive]}>
            <Text style={[styles.dateName, date.active && styles.dateNameActive]}>{date.dayName}</Text>
            <Text style={[styles.dateNum, date.active && styles.dateNumActive]}>{date.dayNum}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* --- Timeline Vertikal --- */}
      <ScrollView contentContainerStyle={styles.timelineScroll}>
        {/* (Ini adalah dummy, idealnya pakai data asli) */}
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>06:00 AM</Text>
          <View style={styles.timeLine} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>07:00 AM</Text>
          <View style={styles.timeLine} />
          <TouchableOpacity style={[styles.eventChip, styles.eventChipPurple]} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.eventText}>Ab Workout, 7:30am</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>08:00 AM</Text>
          <View style={styles.timeLine} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>09:00 AM</Text>
          <View style={[styles.timeLine, styles.timeLineActive]} />
          <TouchableOpacity style={[styles.eventChip, styles.eventChipBlue]} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.eventText}>Upperbody Workout, 9am</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeRow}><Text style={styles.timeText}>10:00 AM</Text><View style={styles.timeLine} /></View>
        <View style={styles.timeRow}><Text style={styles.timeText}>11:00 AM</Text><View style={styles.timeLine} /></View>
        <View style={styles.timeRow}><Text style={styles.timeText}>12:00 PM</Text><View style={styles.timeLine} /></View>
        <View style={styles.timeRow}><Text style={styles.timeText}>01:00 PM</Text><View style={styles.timeLine} /></View>
        <View style={styles.timeRow}><Text style={styles.timeText}>02:00 PM</Text><View style={styles.timeLine} /></View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>03:00 PM</Text>
          <View style={styles.timeLine} />
          <TouchableOpacity style={[styles.eventChip, styles.eventChipBlue]} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.eventText}>Lowerbody Workout, 3pm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeRow}><Text style={styles.timeText}>04:00 PM</Text><View style={styles.timeLine} /></View>
      </ScrollView>

      {/* --- Tombol + (Floating) --- */}
      <TouchableOpacity style={styles.fab} onPress={() => setViewMode('add')}>
        <Icon name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>

      {/* --- Modal (Pop-up) --- */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Workout Schedule</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Icon name="ellipsis-horizontal" size={20} color={COLORS.textGray} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalWorkoutTitle}>Lowerbody Workout</Text>
            <Text style={styles.modalWorkoutTime}>Today | 03:00PM</Text>
            <GradientButton text="Mark as Done" onPress={() => setIsModalVisible(false)} />
          </View>
        </Pressable>
      </Modal>

    </View>
  );

  return viewMode === 'add' ? renderAddSchedule() : renderSchedule();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: (StatusBar.currentHeight || 0) + 10,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
  },
  headerButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 18,
  },
  // Scroll
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // --- Tampilan Schedule ---
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  monthText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textBlack,
  },
  dateScroll: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  dateItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dateItemActive: {
    backgroundColor: COLORS.gradientStart,
  },
  dateName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  dateNameActive: {
    color: COLORS.white,
  },
  dateNum: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.textBlack,
    marginTop: 5,
  },
  dateNumActive: {
    color: COLORS.white,
  },
  timelineScroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 60,
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
    width: 60,
    marginRight: 10,
  },
  timeLine: {
    width: 1,
    flex: 1,
    backgroundColor: COLORS.background,
  },
  timeLineActive: {
    backgroundColor: COLORS.gradientStart,
  },
  eventChip: {
    position: 'absolute',
    left: 80,
    top: -5,
    padding: 10,
    borderRadius: 10,
  },
  eventChipPurple: {
    backgroundColor: 'rgba(238, 164, 206, 0.3)',
  },
  eventChipBlue: {
    backgroundColor: 'rgba(197, 139, 242, 0.3)', 
  },
  eventText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: COLORS.textBlack,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.gradientStart,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  // --- Modal ---
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textGray,
  },
  modalWorkoutTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.textBlack,
    marginBottom: 5,
  },
  modalWorkoutTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textGray,
    marginBottom: 20,
  },
  // --- Tampilan Add Schedule ---
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textGray,
    marginBottom: 15,
  },
  timeLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.textBlack,
    marginBottom: 10,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timeColumn: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  timeSlot: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.textGray,
    marginVertical: 5,
  },
  timeSlotActive: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: COLORS.gradientStart,
  },
  detailsLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.textBlack,
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textBlack,
  },
  detailDivider: {
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginHorizontal: 15,
  },
  saveButtonContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
  },
});

export default WorkOutScheduleScreen;