import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { fetchTripVariants } from '../services/geminiApi';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Loading'>;
  route: RouteProp<RootStackParamList, 'Loading'>;
};

const LABELS = [
  'Searching flights...',
  'Finding accommodation...',
  'Checking activities...',
  'Combining journey variants...',
];

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
);

const LoadingScreen = ({ route, navigation }: Props) => {
  const { tripData } = route.params;
  const [labelIndex, setLabelIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  console.log('[LoadingScreen] Mounted:', tripData);

  const animateProgress = (toValue: number, duration: number) =>
    Animated.timing(progressAnim, { toValue, duration, useNativeDriver: false }).start();

  useEffect(() => {
    const labelInterval = setInterval(() => {
      setLabelIndex(prev => {
        const next = prev + 1;
        if (next >= LABELS.length) { clearInterval(labelInterval); return prev; }
        return next;
      });
    }, 1200);

    animateProgress(0.85, 4800);

    const callApi = async () => {
      console.log('[LoadingScreen] Calling Gemini API...');
      const variants = await fetchTripVariants(tripData);
      console.log('[LoadingScreen] Got variants, navigating to Results');
      animateProgress(1, 300);
      setTimeout(() => {
        clearInterval(labelInterval);
        navigation.replace('Results', { tripData, variants });
      }, 400);
    };

    callApi();
    return () => clearInterval(labelInterval);
  }, []);

  const progressWidth = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <View style={styles.headerIcon}><Text style={styles.headerIconText}>🧳</Text></View>
          <Text style={styles.headerTitle}>AI travel{'\n'}agent</Text>
        </View>
        <View style={styles.avatar}><Text>👤</Text></View>
      </View>

      <View style={styles.body}>
        <Text style={styles.spinnerEmoji}>⏳</Text>
        <Text style={styles.title}>Your journey selection summary</Text>
        <View style={styles.summary}>
          <SummaryRow label="Starting point"  value={tripData.start} />
          <SummaryRow label="End location"    value={tripData.end} />
          <SummaryRow label="Start date"      value={tripData.startDate} />
          <SummaryRow label="End date"        value={tripData.endDate} />
          <SummaryRow label="People in group" value={tripData.group} />
          <SummaryRow label="Budget"          value={`$${tripData.budget}`} />
        </View>
        <View style={styles.progressWrap}>
          <Text style={styles.progressLabel}>{LABELS[labelIndex]}</Text>
          <View style={styles.progressBg}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#4caf50' },
  header:         { backgroundColor: '#1a2340', padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLogo:     { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerIcon:     { width: 38, height: 38, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  headerIconText: { fontSize: 18 },
  headerTitle:    { color: '#ffffff', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  avatar:         { width: 38, height: 38, borderRadius: 19, backgroundColor: '#667eea', alignItems: 'center', justifyContent: 'center' },
  body:           { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center', gap: 20 },
  spinnerEmoji:   { fontSize: 40 },
  title:          { color: '#ffffff', fontSize: 20, fontWeight: '700', textAlign: 'center' },
  summary:        { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 18, width: '100%', gap: 8 },
  summaryRow:     { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel:   { color: 'rgba(255,255,255,0.75)', fontSize: 13 },
  summaryValue:   { color: '#ffffff', fontSize: 13, fontWeight: '600' },
  progressWrap:   { width: '100%', gap: 8 },
  progressLabel:  { color: 'rgba(255,255,255,0.85)', fontSize: 12, textAlign: 'center' },
  progressBg:     { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 100, height: 8, overflow: 'hidden' },
  progressFill:   { height: '100%', backgroundColor: '#ffffff', borderRadius: 100 },
});

export default LoadingScreen;
