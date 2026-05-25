import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import Header from "../../components/Header";
import TripCard from "../../components/TripCard";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Trip">;
  route: RouteProp<RootStackParamList, "Trip">;
};

const TripScreen = ({ route, navigation }: Props) => {
  const { tripData, variant } = route.params;

  const customTitle = `Journey from ${tripData.start} to ${tripData.end}`;

  return (
    <View style={styles.container}>
      <Header showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Booked journey data</Text>

        <TripCard
          variant={variant}
          index={0}
          readonly={true}
          customTitle={customTitle}
        />

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
  pageTitle: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
    color: "#000000",
    marginBottom: 20,
  },
});

export default TripScreen;
