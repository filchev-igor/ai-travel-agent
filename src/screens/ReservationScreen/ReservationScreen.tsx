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
import { RootStackParamList } from "../../types";
import Header from "../../components/Header";
import Stepper from "../../components/Stepper";
import TripSummaryBar from "../../components/TripSummaryBar";
import TripCard from "../../components/TripCard";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Reservation">;
  route: RouteProp<RootStackParamList, "Reservation">;
};

const ReservationScreen = ({ route, navigation }: Props) => {
  const { tripData, variant } = route.params;

  const formatPrice = (price: number) => `${price} €`;

  const steps = [
    { label: "Browse journeys", sublabel: "Browse journeys" },
    {
      label: "Journey reserve and details",
      sublabel: "Journey reserve\nand details",
    },
    { label: "Book a journey", sublabel: "Book a\njourney" },
  ];

  const handleEdit = () => {
    navigation.navigate("Home");
  };

  const customTitle = `Journey from ${tripData.start} to ${tripData.end}`;

  return (
    <View style={styles.container}>
      <Header showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <TripSummaryBar
          start={tripData.start}
          end={tripData.end}
          startDate={tripData.startDate}
          endDate={tripData.endDate}
          group={tripData.group}
          budget={tripData.budget}
          showEdit={true}
          onEdit={handleEdit}
        />

        <Stepper steps={steps} currentStep={2} />

        <TripCard
          variant={variant}
          index={0}
          readonly={true}
          customTitle={customTitle}
        />

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerTotal}>
          Total costs {formatPrice(variant.total)}
        </Text>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate("Booking", { tripData, variant })}
        >
          <Text style={styles.nextBtnText}>Reserve</Text>
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
  nextBtn: {
    backgroundColor: "#0C1445",
    borderWidth: 1,
    borderColor: "#F2F2ED",
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  nextBtnText: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 24,
    color: "#F2F2ED",
  },
});

export default ReservationScreen;
