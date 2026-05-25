import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import Header from "../../components/Header";
import TripCard from "../../components/TripCard";
import ConfirmModal from "../../components/ConfirmModal";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Trip">;
  route: RouteProp<RootStackParamList, "Trip">;
};

const TripScreen = ({ route, navigation }: Props) => {
  const { tripData, variant } = route.params;
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const customTitle = `Journey from ${tripData.start} to ${tripData.end}`;

  const handleBackPress = () => {
    console.log(
      "[TripScreen] Back button pressed - showing confirmation modal",
    );
    setShowConfirmModal(true);
  };

  const handleConfirmLeave = () => {
    setShowConfirmModal(false);
    console.log("[TripScreen] User confirmed - navigating to Home");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      }),
    );
  };

  const handleCancelLeave = () => {
    setShowConfirmModal(false);
    console.log("[TripScreen] User cancelled - staying on Trip screen");
  };

  return (
    <View style={styles.container}>
      <Header showBack onBackPress={handleBackPress} />

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

      <ConfirmModal
        visible={showConfirmModal}
        title="Leave Trip Details"
        message="Are you sure you want to go back? Your booked trip data will be lost."
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
      />
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
