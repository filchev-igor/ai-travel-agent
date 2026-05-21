import React from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';
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
        <View style={styles.header}>
          <View style={styles.headerLogo}>
            <View style={styles.headerIcon}>
              <Text style={styles.headerIconText}>🧳</Text>
            </View>
            <Text style={styles.headerTitle}>AI travel{'\n'}agent</Text>
          </View>
          <View style={styles.avatar}>
            <Text>👤</Text>
          </View>
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
              label="People in group"
              placeholder="How many people in a group?"
              selectedValue={groupSize}
              onPress={() => setGroupModalVisible(true)}
              displayText={groupSize ? getGroupLabel(groupSize) : ''}
          />

          <DropdownInput
              label="Budget"
              placeholder="Select an applicable budget?"
              selectedValue={budget}
              onPress={() => setBudgetModalVisible(true)}
              displayText={budget ? getBudgetLabel(budget) : ''}
          />

          <TouchableOpacity style={styles.button} onPress={onCombinePress}>
            <Text style={styles.buttonText}>Combine journey 🔍</Text>
          </TouchableOpacity>
          <View style={{ height: 30 }} />
        </ScrollView>

        {renderDropdownModal(groupModalVisible, () => setGroupModalVisible(false), GROUP_OPTIONS, setGroupSize, 'Select number of people')}
        {renderDropdownModal(budgetModalVisible, () => setBudgetModalVisible(false), BUDGET_OPTIONS, setBudget, 'Select budget range')}
      </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  header: {
    backgroundColor: '#1a2340',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerIcon: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: { fontSize: 18 },
  headerTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, padding: 20 },
  subtitle: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#e91e8c',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#e91e8c',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a2340',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#1a2340',
    textAlign: 'center',
  },
  modalCloseBtn: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
  },
  modalCloseBtnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5568',
  },
});

export default HomeScreen;