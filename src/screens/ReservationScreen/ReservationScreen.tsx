import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Users, DollarSign } from 'lucide-react-native';
import { RootStackParamList } from '../../types';
import Header from '../../components/Header';
import Stepper from '../../components/Stepper';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Reservation'>;
  route: RouteProp<RootStackParamList, 'Reservation'>;
};

const ReservationScreen = ({ route, navigation }: Props) => {
  const { tripData, variant } = route.params;

  const onReserve = () => {
    navigation.navigate('Success');
  };

  const formatShortDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    });
  };

  const formatPrice = (price: number) => `${price}€`;

  const steps = [
    { label: 'Browse journeys', sublabel: 'Browse journeys' },
    { label: 'Journey reserve and details', sublabel: 'Journey reserve\nand details' },
    { label: 'Book a journey', sublabel: 'Book a\njourney' },
  ];

  return (
      <View style={styles.container}>
        <Header showBack onBackPress={() => navigation.goBack()} />

        <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
          {/* Trip Summary Bar */}
          <View style={styles.tripBar}>
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
            </View>
          </View>

          {/* Stepper - Step 2 active */}
          <Stepper steps={steps} currentStep={2} />

          {/* Trip Details Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{variant.title}</Text>
            <Text style={styles.cardActivities}>
              Activities: {variant.activities}
            </Text>

            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Direct flight</Text>
                <Text style={styles.rowValue}>{formatPrice(variant.flight)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Transportation</Text>
                <Text style={styles.rowValue}>{formatPrice(variant.transportation)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Hospitality</Text>
                <Text style={styles.rowValue}>
                  {formatPrice(variant.hospitality)} in an apartment
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>{variant.activity1_name}</Text>
                <Text style={styles.rowValue}>{formatPrice(variant.activity1_cost)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>{variant.activity2_name}</Text>
                <Text style={styles.rowValue}>{formatPrice(variant.activity2_cost)}</Text>
              </View>
            </View>
          </View>

          {/* Map Section */}
          <View style={styles.mapSection}>
            <Text style={styles.mapTitle}>Journey route map</Text>
            <View style={styles.mapPlaceholder}>
              <Image
                  source={{ uri: 'https://via.placeholder.com/380x195' }}
                  style={styles.mapImage}
                  resizeMode="cover"
              />
            </View>
            <Text style={styles.mapNote}>
              Use the map to see your route, the list of activities on the map,
              your transportation details and information about your place of stay.
            </Text>
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTotal}>Total costs {formatPrice(variant.total)}</Text>
          <TouchableOpacity style={styles.reserveBtn} onPress={onReserve}>
            <Text style={styles.reserveBtnText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2ED',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20,
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
  card: {
    backgroundColor: '#F2F2ED',
    borderWidth: 1,
    borderColor: '#0C1445',
    borderRadius: 10,
    padding: 20,
    gap: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    color: '#0C1445',
  },
  cardActivities: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#0C1445',
  },
  section: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#0C1445',
  },
  rowValue: {
    fontFamily: 'Inter',
    fontWeight: '200',
    fontSize: 12,
    lineHeight: 15,
    color: '#0C1445',
  },
  mapSection: {
    gap: 10,
  },
  mapTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 15,
    color: '#000000',
  },
  mapPlaceholder: {
    width: '100%',
    height: 195,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e8e8e8',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapNote: {
    fontFamily: 'Inter',
    fontWeight: '100',
    fontSize: 12,
    lineHeight: 15,
    color: '#000000',
  },
  footer: {
    backgroundColor: '#000000',
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
  },
  footerTotal: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  reserveBtn: {
    backgroundColor: '#0C1445',
    borderWidth: 1,
    borderColor: '#F2F2ED',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  reserveBtnText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    color: '#F2F2ED',
  },
});

export default ReservationScreen;