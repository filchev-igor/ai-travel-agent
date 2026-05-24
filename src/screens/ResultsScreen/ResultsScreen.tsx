import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Users, DollarSign, Edit2 } from 'lucide-react-native';
import { RootStackParamList, TripVariant } from '../../types';
import Header from '../../components/Header';
import Stepper from '../../components/Stepper';
import TripCard from '../../components/TripCard';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Results'>;
  route: RouteProp<RootStackParamList, 'Results'>;
};

const ResultsScreen = ({ route, navigation }: Props) => {
  const { tripData, variants } = route.params;

  const onSelectVariant = (variant: TripVariant) => {
    navigation.navigate('Reservation', { tripData, variant });
  };

  const formatShortDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    });
  };

  const steps = [
    { label: 'Browse journeys', sublabel: 'Browse journeys' },
    { label: 'Journey reserve and details', sublabel: 'Journey reserve\nand details' },
    { label: 'Book a journey', sublabel: 'Book a\njourney' },
  ];

  return (
      <View style={styles.container}>
        <Header showBack onBackPress={() => navigation.goBack()} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Trip Summary Bar */}
          <TouchableOpacity style={styles.tripBar} onPress={() => navigation.navigate('Home')}>
            <View>
              <Text style={styles.tripRoute}>
                {tripData.start} → {tripData.end}
              </Text>
              <Text style={styles.tripDates}>
                {formatShortDate(tripData.startDate)} – {formatShortDate(tripData.endDate)}
              </Text>
            </View>
            <View style={styles.tripDetails}>
              <View style={styles.tripDetailItem}>
                <Users size={12} color="#0C1445" />
                <Text style={styles.tripDetailText}>{tripData.group}</Text>
              </View>
              <View style={styles.tripDetailItem}>
                <DollarSign size={12} color="#0C1445" />
                <Text style={styles.tripDetailText}>{tripData.budget}€</Text>
              </View>
              <Edit2 size={14} color="#0C1445" />
            </View>
          </TouchableOpacity>

          {/* Stepper - Step 1 active */}
          <Stepper steps={steps} currentStep={1} />

          {/* Trip Cards */}
          {variants.map((variant, index) => (
              <TripCard key={index} variant={variant} index={index} onSelect={onSelectVariant} />
          ))}

          <View style={{ height: 30 }} />
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2ED',
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
  },
  tripBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2ED',
    borderWidth: 1,
    borderColor: '#0C1445',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  tripRoute: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 15,
    color: '#0C1445',
    marginBottom: 2,
  },
  tripDates: {
    fontFamily: 'Inter',
    fontWeight: '100',
    fontSize: 10,
    lineHeight: 12,
    color: '#0C1445',
  },
  tripDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tripDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tripDetailText: {
    fontFamily: 'Inter',
    fontWeight: '200',
    fontSize: 12,
    lineHeight: 15,
    color: '#0C1445',
  },
});

export default ResultsScreen;