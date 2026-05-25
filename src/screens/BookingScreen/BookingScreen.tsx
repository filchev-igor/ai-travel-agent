import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Users, DollarSign } from "lucide-react-native";
import { RootStackParamList } from "../../types";
import Header from "../../components/Header";
import Stepper from "../../components/Stepper";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Booking">;
  route: RouteProp<RootStackParamList, "Booking">;
};

const BookingScreen = ({ route, navigation }: Props) => {
  const { tripData, variant } = route.params;

  const formatShortDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  const formatPrice = (price: number) => `${price} €`;

  const steps = [
    { label: "Browse journeys", sublabel: "Browse journeys" },
    {
      label: "Journey reserve and details",
      sublabel: "Journey reserve\nand details",
    },
    { label: "Book a journey", sublabel: "Book a\njourney" },
  ];

  return (
    <View style={styles.container}>
      <Header showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.tripBar}>
          <View>
            <Text style={styles.tripRoute}>
              {tripData.start} → {tripData.end}
            </Text>
            <Text style={styles.tripDates}>
              {formatShortDate(tripData.startDate)} –{" "}
              {formatShortDate(tripData.endDate)}
            </Text>
          </View>
          <View style={styles.tripDetails}>
            <View style={styles.tripDetailItem}>
              <Users size={12} color="#0C1445" strokeWidth={2} />
              <Text style={styles.tripDetailText}>{tripData.group}</Text>
            </View>
            <View style={styles.tripDetailItem}>
              <DollarSign size={12} color="#0C1445" strokeWidth={2} />
              <Text style={styles.tripDetailText}>{tripData.budget} €</Text>
            </View>
          </View>
        </View>

        <Stepper steps={steps} currentStep={3} />

        <View style={styles.card}>
          <Text style={styles.title}>
            Journey from {tripData.start} to {tripData.end}
          </Text>
          <Text style={styles.activities}>
            Activities: {variant.activities}
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Direct flight</Text>
            <Text style={styles.value}>{formatPrice(variant.flight)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transportation</Text>
            <Text style={styles.value}>
              {formatPrice(variant.transportation)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hospitality</Text>
            <Text style={styles.value}>
              {formatPrice(variant.hospitality)} in an apartment
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{variant.activity1_name}</Text>
            <Text style={styles.value}>
              {formatPrice(variant.activity1_cost)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{variant.activity2_name}</Text>
            <Text style={styles.value}>
              {formatPrice(variant.activity2_cost)}
            </Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerTotal}>
          Total costs {formatPrice(variant.total)}
        </Text>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigation.navigate("Trip", { tripData, variant })}
        >
          <Text style={styles.bookBtnText}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2ED",
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20,
  },
  tripBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2F2ED",
    borderWidth: 1,
    borderColor: "#0C1445",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
    height: 50,
  },
  tripRoute: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 15,
    color: "#0C1445",
    marginBottom: 2,
  },
  tripDates: {
    fontFamily: "Inter",
    fontWeight: "100",
    fontSize: 10,
    lineHeight: 12,
    color: "#0C1445",
  },
  tripDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  tripDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tripDetailText: {
    fontFamily: "Inter",
    fontWeight: "200",
    fontSize: 12,
    lineHeight: 15,
    color: "#0C1445",
  },
  card: {
    backgroundColor: "#F2F2ED",
    borderWidth: 1,
    borderColor: "#0C1445",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 19,
    color: "#0C1445",
    marginBottom: 8,
  },
  activities: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#0C1445",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#0C1445",
  },
  value: {
    fontFamily: "Inter",
    fontWeight: "200",
    fontSize: 12,
    lineHeight: 15,
    color: "#0C1445",
  },
  footer: {
    backgroundColor: "#000000",
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
  },
  footerTotal: {
    fontFamily: "Inter",
    fontWeight: "300",
    fontSize: 20,
    lineHeight: 24,
    color: "#FFFFFF",
  },
  bookBtn: {
    backgroundColor: "#0C1445",
    borderWidth: 1,
    borderColor: "#F2F2ED",
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  bookBtnText: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 24,
    color: "#F2F2ED",
  },
});

export default BookingScreen;
