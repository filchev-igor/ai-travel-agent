import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TripData } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: Props) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  // Date states - using ISO strings for web inputs
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split('T')[0];
  });

  // Dropdown states
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [groupSize, setGroupSize] = useState('');
  const [budget, setBudget] = useState('');

  // Options
  const groupOptions = [
    { label: '1 person', value: '1' },
    { label: '2 people', value: '2' },
    { label: '3 people', value: '3' },
    { label: '4 people', value: '4' },
    { label: '5 people', value: '5' },
    { label: '6+ people', value: '6' },
  ];

  const budgetOptions = [
    { label: 'Up to $500', value: '500' },
    { label: 'Up to $1,000', value: '1000' },
    { label: 'Up to $1,500', value: '1500' },
    { label: 'Up to $2,000', value: '2000' },
    { label: 'Up to $2,500', value: '2500' },
    { label: 'Up to $3,000', value: '3000' },
    { label: 'Up to $4,000', value: '4000' },
    { label: 'Up to $5,000', value: '5000' },
  ];

  const formatDisplayDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const onCombinePress = () => {
    if (!startLocation || !endLocation) {
      return Alert.alert('Missing info', 'Enter start and end location');
    }
    if (!groupSize) {
      return Alert.alert('Missing info', 'Select group size');
    }
    if (!budget) {
      return Alert.alert('Missing info', 'Select budget');
    }

    const tripData: TripData = {
      start: startLocation,
      end: endLocation,
      startDate: startDate,
      endDate: endDate,
      group: groupSize,
      budget: budget,
    };

    navigation.navigate('Loading', { tripData });
  };

  const renderDropdownModal = (
      visible: boolean,
      onClose: () => void,
      options: { label: string; value: string }[],
      onSelect: (value: string) => void,
      title: string
  ) => (
      <Modal
          visible={visible}
          transparent={true}
          animationType="slide"
          onRequestClose={onClose}
      >
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
            Choose details of a trip and the application will combine several
            variants for you
          </Text>

          <Text style={styles.label}>Start location</Text>
          <TextInput
              style={styles.input}
              placeholder="e.g. Vilnius"
              placeholderTextColor="#8a9bb5"
              value={startLocation}
              onChangeText={setStartLocation}
          />

          <Text style={styles.label}>End location</Text>
          <TextInput
              style={styles.input}
              placeholder="e.g. Budapest"
              placeholderTextColor="#8a9bb5"
              value={endLocation}
              onChangeText={setEndLocation}
          />

          <View style={styles.rowFields}>
            <View style={styles.halfField}>
              <Text style={styles.label}>Start date</Text>
              <TouchableOpacity
                  style={styles.dateInputWrapper}
                  activeOpacity={0.7}
                  onPress={() => {
                    const input = document.getElementById('startDateInput') as HTMLInputElement;
                    if (input) input.showPicker();
                  }}
              >
                <Text style={styles.dateText}>{formatDisplayDate(startDate)}</Text>
                <input
                    id="startDateInput"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{
                      position: 'absolute',
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      cursor: 'pointer',
                    }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.halfField}>
              <Text style={styles.label}>End date</Text>
              <TouchableOpacity
                  style={styles.dateInputWrapper}
                  activeOpacity={0.7}
                  onPress={() => {
                    const input = document.getElementById('endDateInput') as HTMLInputElement;
                    if (input) input.showPicker();
                  }}
              >
                <Text style={styles.dateText}>{formatDisplayDate(endDate)}</Text>
                <input
                    id="endDateInput"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{
                      position: 'absolute',
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      cursor: 'pointer',
                    }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.label}>People in group</Text>
          <TouchableOpacity
              style={styles.input}
              onPress={() => setGroupModalVisible(true)}
          >
            <Text style={groupSize ? styles.selectedText : styles.placeholderText}>
              {groupSize ? groupOptions.find(o => o.value === groupSize)?.label : 'How many people in a group?'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>Budget</Text>
          <TouchableOpacity
              style={styles.input}
              onPress={() => setBudgetModalVisible(true)}
          >
            <Text style={budget ? styles.selectedText : styles.placeholderText}>
              {budget ? budgetOptions.find(o => o.value === budget)?.label : 'Select an applicable budget?'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onCombinePress}>
            <Text style={styles.buttonText}>Combine journey 🔍</Text>
          </TouchableOpacity>
          <View style={{ height: 30 }} />
        </ScrollView>

        {/* Group Size Modal */}
        {renderDropdownModal(
            groupModalVisible,
            () => setGroupModalVisible(false),
            groupOptions,
            setGroupSize,
            'Select number of people'
        )}

        {/* Budget Modal */}
        {renderDropdownModal(
            budgetModalVisible,
            () => setBudgetModalVisible(false),
            budgetOptions,
            setBudget,
            'Select budget range'
        )}
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
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8a9bb5',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 13,
    fontSize: 14,
    color: '#1a2340',
    justifyContent: 'center',
  },
  dateInputWrapper: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 13,
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
  },
  dateText: {
    fontSize: 14,
    color: '#1a2340',
  },
  placeholderText: {
    fontSize: 14,
    color: '#8a9bb5',
  },
  selectedText: {
    fontSize: 14,
    color: '#1a2340',
  },
  rowFields: { flexDirection: 'row', gap: 10 },
  halfField: { flex: 1 },
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

  // Modal styles
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