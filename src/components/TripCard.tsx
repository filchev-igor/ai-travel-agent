import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TripVariant } from '../types';

interface TripCardProps {
  variant: TripVariant;
  index: number;
  onSelect: (variant: TripVariant) => void;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const TripCard = ({ variant, index, onSelect }: TripCardProps) => {
  console.log('[TripCard] Rendering variant', index + 1);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{variant.title}</Text>
      <Text style={styles.activities}>Activities: {variant.activities}</Text>
      <View style={styles.divider} />
      <Row label="✈️ Direct flight"              value={`$${variant.flight}`} />
      <Row label="🚌 Transportation"              value={`$${variant.transportation}`} />
      <Row label="🏨 Hospitality"                 value={`$${variant.hospitality} / apartment`} />
      <Row label={`🎭 ${variant.activity1_name}`} value={`$${variant.activity1_cost}`} />
      <Row label={`⛵ ${variant.activity2_name}`} value={`$${variant.activity2_cost}`} />
      <View style={styles.divider} />
      <Text style={styles.total}>${variant.total}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onSelect(variant)}>
        <Text style={styles.buttonText}>Select this option →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card:       { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#1a2340', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  title:      { fontWeight: '700', fontSize: 14, color: '#1a2340', marginBottom: 4 },
  activities: { fontSize: 12, color: '#8a9bb5', marginBottom: 10 },
  divider:    { height: 1, backgroundColor: '#f4f6fb', marginVertical: 8 },
  row:        { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  rowLabel:   { fontSize: 12, color: '#4a5568' },
  rowValue:   { fontSize: 12, fontWeight: '500', color: '#1a2340' },
  total:      { fontSize: 22, fontWeight: '700', color: '#1a2340', marginTop: 6, marginBottom: 10 },
  button:     { backgroundColor: '#e91e8c', borderRadius: 10, padding: 12, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '600', fontSize: 13 },
});

export default TripCard;
