import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, TripVariant } from "../../types";
import Header from "../../components/Header";
import Stepper from "../../components/Stepper";
import TripCard from "../../components/TripCard";
import TripSummaryBar from "../../components/TripSummaryBar";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Results">;
  route: RouteProp<RootStackParamList, "Results">;
};

const ResultsScreen = ({ route, navigation }: Props) => {
  const { tripData, variants } = route.params;

  const handleCardPress = (variant: TripVariant) => {
    navigation.navigate("Reservation", { tripData, variant });
  };

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
      {/* Back button just goes back - NO confirmation */}
      <Header showBack onBackPress={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <TripSummaryBar
          start={tripData.start}
          end={tripData.end}
          startDate={tripData.startDate}
          endDate={tripData.endDate}
          group={tripData.group}
          budget={tripData.budget}
          showEdit={true}
        />

        <Stepper steps={steps} currentStep={1} />

        {variants.map((variant, index) => (
          <TripCard
            key={index}
            variant={variant}
            index={index}
            onPress={() => handleCardPress(variant)}
          />
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
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
    paddingBottom: 40,
  },
});

export default ResultsScreen;
