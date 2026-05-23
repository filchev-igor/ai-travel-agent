import React from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, FlatList, TouchableOpacity, Image } from 'react-native';
import LocationInputs from './LocationInputs';
import DateInputs from './DateInputs';
import DropdownInput from './DropdownInput';
import { useHomeScreen } from './useHomeScreen';
import { GROUP_OPTIONS, BUDGET_OPTIONS, getGroupLabel, getBudgetLabel } from './constants';

const HomeScreen = () => {
  const {
    startLocation,
    setStartLocation,
    endLocation,
    setEndLocation,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    groupModalVisible,
    setGroupModalVisible,
    budgetModalVisible,
    setBudgetModalVisible,
    groupSize,
    setGroupSize,
    budget,
    setBudget,
    formatDisplayDate,
    onCombinePress,
  } = useHomeScreen();

  const renderDropdownModal = (
      visible: boolean,
      onClose: () => void,
      options: { label: string; value: string }[],
      onSelect: (value: string) => void,
      title: string
  ) => (
      <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.modalOption}
                        onPress={() => {
                          onSelect(item.value);
                          onClose();
                        }}
                    >
                      <Text style={styles.modalOptionText}>{item.label}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
              <Text style={styles.modalCloseBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );

  return (
      <View style={styles.container}>
        {/* Header - Figma design */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              {/* Custom SVG logo - using emoji as placeholder, replace with actual icon */}
              <Text style={styles.logoIconText}>✈️</Text>
            </View>
            <Text style={styles.logoText}>AI travel agent</Text>
          </View>
          <Image
              source={{ uri: 'https://via.placeholder.com/80' }}
              style={styles.avatar}
              // You can replace with actual image: require('./assets/avatar.png')
          />
        </View>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <Text style={styles.subtitle}>
            Choose details of a trip and the application will combine several variants for you
          </Text>

          <LocationInputs
              startLocation={startLocation}
              endLocation={endLocation}
              onStartChange={setStartLocation}
              onEndChange={setEndLocation}
          />

          <DateInputs
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              formatDisplayDate={formatDisplayDate}
          />

          <DropdownInput
              label="How many people in a group?"
              placeholder="Select a value"
              selectedValue={groupSize}
              onPress={() => setGroupModalVisible(true)}
              displayText={groupSize ? getGroupLabel(groupSize) : ''}
          />

          <DropdownInput
              label="Select an applicable budget?"
              placeholder="Select a value"
              selectedValue={budget}
              onPress={() => setBudgetModalVisible(true)}
              displayText={budget ? getBudgetLabel(budget) : ''}
          />

          <TouchableOpacity style={styles.button} onPress={onCombinePress}>
            <Text style={styles.buttonText}>Combine journey</Text>
            <Text style={styles.buttonIcon}>🔍</Text>
          </TouchableOpacity>
          <View style={{ height: 30 }} />
        </ScrollView>

        {renderDropdownModal(groupModalVisible, () => setGroupModalVisible(false), GROUP_OPTIONS, setGroupSize, 'Select number of people')}
        {renderDropdownModal(budgetModalVisible, () => setBudgetModalVisible(false), BUDGET_OPTIONS, setBudget, 'Select budget range')}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2ED',  // Figma background
  },
  header: {
    backgroundColor: '#0C1445',  // Figma header color
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2ED',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 132,
    height: 60,
  },
  logoIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIconText: {
    fontSize: 28,
    color: '#0C1445',
  },
  logoText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#0C1445',
    flex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: '#F2F2ED',
  },
  body: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    width: '100%',
    height: 44,
    backgroundColor: '#D000FF',  // Fallback
    backgroundGradient: 'linear-gradient(90deg, #FFBABA 0%, #D000FF 100%)',
    borderRadius: 4,
    marginTop: 24,
  },
  buttonText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: '#F2F2ED',
  },
  buttonIcon: {
    fontSize: 16,
    color: '#F2F2ED',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#F2F2ED',
    borderRadius: 4,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#0C1445',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#69425F',
  },
  modalOptionText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#0C1445',
    textAlign: 'center',
  },
  modalCloseBtn: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#0C1445',
    borderRadius: 4,
  },
  modalCloseBtnText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#F2F2ED',
  },
});

export default HomeScreen;