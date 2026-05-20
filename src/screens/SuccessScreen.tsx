import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Success'>;
};

const SuccessScreen = ({ navigation }: Props) => {
  console.log('[SuccessScreen] Trip reserved successfully');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <View style={styles.headerIcon}><Text>🧳</Text></View>
          <Text style={styles.headerTitle}>AI travel{'\n'}agent</Text>
        </View>
        <View style={styles.avatar}><Text>👤</Text></View>
      </View>

      <View style={styles.body}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>✓</Text>
        </View>
        <Text style={styles.title}>Trip Reserved!</Text>
        <Text style={styles.subtitle}>
          Your journey has been successfully reserved.{'\n'}Check your profile to view booking details.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => {
          console.log('[SuccessScreen] Navigating back to Home');
          navigation.navigate('Home');
        }}>
          <Text style={styles.buttonText}>Plan another trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#f4f6fb' },
  header:      { backgroundColor: '#1a2340', padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLogo:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerIcon:  { width: 38, height: 38, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#ffffff', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  avatar:      { width: 38, height: 38, borderRadius: 19, backgroundColor: '#667eea', alignItems: 'center', justifyContent: 'center' },
  body:        { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30, gap: 20 },
  iconWrap:    { width: 80, height: 80, borderRadius: 40, backgroundColor: '#2ecc71', alignItems: 'center', justifyContent: 'center', shadowColor: '#2ecc71', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.35, shadowRadius: 15, elevation: 8 },
  icon:        { color: '#ffffff', fontSize: 36, fontWeight: '700' },
  title:       { fontSize: 26, fontWeight: '700', color: '#1a2340' },
  subtitle:    { fontSize: 14, color: '#4a5568', textAlign: 'center', lineHeight: 22 },
  button:      { backgroundColor: '#1a2340', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32, marginTop: 10 },
  buttonText:  { color: '#ffffff', fontWeight: '600', fontSize: 14 },
});

export default SuccessScreen;
