import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, TripVariant } from '../types';
import TripCard from '../components/TripCard';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Results'>;
  route: RouteProp<RootStackParamList, 'Results'>;
};

interface StepDotProps { label: string; active?: boolean; done?: boolean; }

const StepDot = ({ label, active, done }: StepDotProps) => (
  <View style={styles.stepDotWrap}>
    <View style={[styles.stepCircle, active && styles.stepCircleActive, done && styles.stepCircleDone]}>
      <Text style={[styles.stepNum, (active || done) && styles.stepNumLight]}>{done ? '✓' : ''}</Text>
    </View>
    <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>{label}</Text>
  </View>
);

const ResultsScreen = ({ route, navigation }: Props) => {
  const { tripData, variants } = route.params;
  console.log('[ResultsScreen] Rendered with', variants.length, 'variants');

  const onSelectVariant = (variant: TripVariant) => {
    console.log('[ResultsScreen] Selected:', variant.title);
    navigation.navigate('Reservation', { tripData, variant });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerLogo}>
          <View style={styles.headerIcon}><Text>🧳</Text></View>
          <Text style={styles.headerTitle}>AI travel{'\n'}agent</Text>
        </View>
        <View style={styles.avatar}><Text>👤</Text></View>
      </View>

      <TouchableOpacity style={styles.tripBar} onPress={() => navigation.navigate('Home')}>
        <View>
          <Text style={styles.tripBarRoute}>{tripData.start} → {tripData.end}</Text>
          <Text style={styles.tripBarDates}>{tripData.startDate} – {tripData.endDate}</Text>
        </View>
        <View style={styles.tripBarRight}>
          <Text style={styles.tripBarDetail}>👥 {tripData.group}</Text>
          <Text style={styles.tripBarDetail}>💵 ${tripData.budget}</Text>
          <Text style={styles.editIcon}>✏️</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.stepper}>
        <StepDot label="Browse journeys" active />
        <View style={styles.stepLine} />
        <StepDot label="Reserve & details" />
        <View style={styles.stepLine} />
        <StepDot label="Book journey" />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {variants.map((variant, index) => (
          <TripCard key={index} variant={variant} index={index} onSelect={onSelectVariant} />
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: '#f4f6fb' },
  header:           { backgroundColor: '#1a2340', padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backArrow:        { color: '#ffffff', fontSize: 22, opacity: 0.8 },
  headerLogo:       { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerIcon:       { width: 38, height: 38, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  headerTitle:      { color: '#ffffff', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  avatar:           { width: 38, height: 38, borderRadius: 19, backgroundColor: '#667eea', alignItems: 'center', justifyContent: 'center' },
  tripBar:          { backgroundColor: '#ffffff', margin: 14, borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1.5, borderColor: '#e2e8f0' },
  tripBarRoute:     { fontSize: 13, fontWeight: '600', color: '#1a2340' },
  tripBarDates:     { fontSize: 11, color: '#8a9bb5', marginTop: 2 },
  tripBarRight:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tripBarDetail:    { fontSize: 12, color: '#4a5568' },
  editIcon:         { fontSize: 14, color: '#e91e8c' },
  stepper:          { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
  stepDotWrap:      { alignItems: 'center', gap: 4 },
  stepCircle:       { width: 26, height: 26, borderRadius: 13, backgroundColor: '#e2e8f0', alignItems: 'center', justifyContent: 'center' },
  stepCircleActive: { backgroundColor: '#e91e8c' },
  stepCircleDone:   { backgroundColor: '#2ecc71' },
  stepNum:          { fontSize: 10, fontWeight: '700', color: '#8a9bb5' },
  stepNumLight:     { color: '#ffffff' },
  stepLabel:        { fontSize: 9, color: '#8a9bb5', textAlign: 'center', maxWidth: 60 },
  stepLabelActive:  { color: '#e91e8c', fontWeight: '600' },
  stepLine:         { flex: 1, height: 2, backgroundColor: '#e2e8f0', marginBottom: 16 },
  scroll:           { flex: 1, paddingHorizontal: 16 },
});

export default ResultsScreen;
