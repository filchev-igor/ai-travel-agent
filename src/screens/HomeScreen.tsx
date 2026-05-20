import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TripData } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: Props) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation]     = useState('');
  const [startDate, setStartDate]         = useState('');
  const [endDate, setEndDate]             = useState('');
  const [groupSize, setGroupSize]         = useState('');
  const [budget, setBudget]               = useState('');

  console.log('[HomeScreen] Rendered');

  const onCombinePress = () => {
    console.log('[HomeScreen] Combine pressed');
    if (!startLocation || !endLocation) return Alert.alert('Missing info', 'Enter start and end location');
    if (!startDate || !endDate)         return Alert.alert('Missing info', 'Enter travel dates (YYYY-MM-DD)');
    if (!groupSize || !budget)          return Alert.alert('Missing info', 'Enter group size and budget');

    const tripData: TripData = {
      start: startLocation,
      end: endLocation,
      startDate,
      endDate,
      group: groupSize,
      budget,
    };
    console.log('[HomeScreen] Navigating to Loading:', tripData);
    navigation.navigate('Loading', { tripData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <View style={styles.headerIcon}><Text style={styles.headerIconText}>🧳</Text></View>
          <Text style={styles.headerTitle}>AI travel{'\n'}agent</Text>
        </View>
        <View style={styles.avatar}><Text>👤</Text></View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Choose details of a trip and the application will combine several variants for you
        </Text>

        <Text style={styles.label}>Start location</Text>
        <TextInput style={styles.input} placeholder="e.g. Vilnius" placeholderTextColor="#8a9bb5"
          value={startLocation} onChangeText={setStartLocation} />

        <Text style={styles.label}>End location</Text>
        <TextInput style={styles.input} placeholder="e.g. Budapest" placeholderTextColor="#8a9bb5"
          value={endLocation} onChangeText={setEndLocation} />

        <View style={styles.rowFields}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Start date</Text>
            <TextInput style={styles.input} placeholder="YYYY-MM-DD" placeholderTextColor="#8a9bb5"
              value={startDate} onChangeText={setStartDate} />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>End date</Text>
            <TextInput style={styles.input} placeholder="YYYY-MM-DD" placeholderTextColor="#8a9bb5"
              value={endDate} onChangeText={setEndDate} />
          </View>
        </View>

        <Text style={styles.label}>People in group</Text>
        <TextInput style={styles.input} placeholder="e.g. 2" placeholderTextColor="#8a9bb5"
          keyboardType="numeric" value={groupSize} onChangeText={setGroupSize} />

        <Text style={styles.label}>Budget (USD)</Text>
        <TextInput style={styles.input} placeholder="e.g. 1000" placeholderTextColor="#8a9bb5"
          keyboardType="numeric" value={budget} onChangeText={setBudget} />

        <TouchableOpacity style={styles.button} onPress={onCombinePress}>
          <Text style={styles.buttonText}>Combine journey 🔍</Text>
        </TouchableOpacity>
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#f4f6fb' },
  header:         { backgroundColor: '#1a2340', padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLogo:     { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerIcon:     { width: 38, height: 38, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  headerIconText: { fontSize: 18 },
  headerTitle:    { color: '#ffffff', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  avatar:         { width: 38, height: 38, borderRadius: 19, backgroundColor: '#667eea', alignItems: 'center', justifyContent: 'center' },
  body:           { flex: 1, padding: 20 },
  subtitle:       { fontSize: 14, color: '#4a5568', marginBottom: 20, lineHeight: 20 },
  label:          { fontSize: 11, fontWeight: '600', color: '#8a9bb5', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4, marginTop: 10 },
  input:          { backgroundColor: '#ffffff', borderWidth: 1.5, borderColor: '#e2e8f0', borderRadius: 12, padding: 13, fontSize: 14, color: '#1a2340' },
  rowFields:      { flexDirection: 'row', gap: 10 },
  halfField:      { flex: 1 },
  button:         { backgroundColor: '#e91e8c', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 24, shadowColor: '#e91e8c', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6 },
  buttonText:     { color: '#ffffff', fontSize: 15, fontWeight: '700' },
});

export default HomeScreen;
