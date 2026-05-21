import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Reservation'>;
  route: RouteProp<RootStackParamList, 'Reservation'>;
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

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const ReservationScreen = ({ route, navigation }: Props) => {
  const { tripData, variant } = route.params;
  console.log('[ReservationScreen] Showing:', variant.title);

  const onReserve = () => {
    console.log('[ReservationScreen] Reserve pressed');
    navigation.navigate('Success');
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

      <View style={styles.tripBar}>
        <View>
          <Text style={styles.tripBarRoute}>{tripData.start} → {tripData.end}</Text>
          <Text style={styles.tripBarDates}>{tripData.startDate} – {tripData.endDate}</Text>
        </View>
        <View style={styles.tripBarRight}>
          <Text style={styles.tripBarDetail}>👥 {tripData.group}</Text>
          <Text style={styles.tripBarDetail}>💵 ${tripData.budget}</Text>
        </View>
      </View>

      <View style={styles.stepper}>
        <StepDot label="Browse journeys" done />
        <View style={[styles.stepLine, styles.stepLineDone]} />
        <StepDot label="Reserve & details" active />
        <View style={styles.stepLine} />
        <StepDot label="Book journey" />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{variant.title}</Text>
          <Text style={styles.cardActivities}>Activities: {variant.activities}</Text>
          <View style={styles.divider} />
          <DetailRow label="✈️ Direct flight"              value={`$${variant.flight}`} />
          <DetailRow label="🚌 Transportation"              value={`$${variant.transportation}`} />
          <DetailRow label="🏨 Hospitality"                 value={`$${variant.hospitality} / apartment`} />
          <DetailRow label={`🎭 ${variant.activity1_name}`} value={`$${variant.activity1_cost}`} />
          <DetailRow label={`⛵ ${variant.activity2_name}`} value={`$${variant.activity2_cost}`} />
          <View style={styles.divider} />
          <Text style={styles.total}>${variant.total}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Journey route map</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapText}>Interactive route map</Text>
            <Text style={styles.mapSub}>{tripData.start} → {tripData.end}</Text>
          </View>
          <Text style={styles.mapNote}>
            Use the map to see your route, activities, transportation details and place of stay.
          </Text>
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total costs</Text>
          <Text style={styles.footerTotal}>${variant.total}</Text>
        </View>
        <TouchableOpacity style={styles.reserveBtn} onPress={onReserve}>
          <Text style={styles.reserveBtnText}>Reserve</Text>
        </TouchableOpacity>
      </View>
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
  tripBarRight:     { flexDirection: 'row', gap: 8 },
  tripBarDetail:    { fontSize: 12, color: '#4a5568' },
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
  stepLineDone:     { backgroundColor: '#2ecc71' },
  scroll:           { flex: 1, paddingHorizontal: 16 },
  card:             { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 12, elevation: 3, shadowColor: '#1a2340', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
  cardTitle:        { fontSize: 14, fontWeight: '700', color: '#1a2340', marginBottom: 4 },
  cardActivities:   { fontSize: 12, color: '#8a9bb5', marginBottom: 10 },
  divider:          { height: 1, backgroundColor: '#f4f6fb', marginVertical: 8 },
  detailRow:        { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  detailLabel:      { fontSize: 12, color: '#4a5568' },
  detailValue:      { fontSize: 12, fontWeight: '500', color: '#1a2340' },
  total:            { fontSize: 22, fontWeight: '700', color: '#1a2340', marginTop: 6 },
  mapPlaceholder:   { backgroundColor: '#e8f5e9', borderRadius: 12, height: 130, alignItems: 'center', justifyContent: 'center', marginVertical: 10 },
  mapIcon:          { fontSize: 30 },
  mapText:          { fontSize: 13, fontWeight: '500', color: '#388e3c', marginTop: 4 },
  mapSub:           { fontSize: 11, color: '#388e3c', opacity: 0.7 },
  mapNote:          { fontSize: 11, color: '#8a9bb5', lineHeight: 16 },
  footer:           { backgroundColor: '#111827', padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  footerLabel:      { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  footerTotal:      { color: '#ffffff', fontSize: 18, fontWeight: '700' },
  reserveBtn:       { backgroundColor: '#e91e8c', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 },
  reserveBtnText:   { color: '#ffffff', fontWeight: '700', fontSize: 14 },
});

export default ReservationScreen;
