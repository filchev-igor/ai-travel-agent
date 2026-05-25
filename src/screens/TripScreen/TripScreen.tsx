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

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Trip">;
  route: RouteProp<RootStackParamList, "Trip">;
};

const TripScreen = ({ route, navigation }: Props) => {
  const { tripData, variant } = route.params;

  const formatPrice = (price: number) => `${price}€`;

  return (
    <View style={styles.container}>
      <Header showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Booked journey data</Text>

        {/* Card */}
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

          <Text style={styles.total}>{formatPrice(variant.total)}</Text>
        </View>

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
  total: {
    fontFamily: "Inter",
    fontWeight: "300",
    fontSize: 20,
    lineHeight: 24,
    color: "#0C1445",
    marginTop: 12,
  },
  mapSection: {
    gap: 10,
  },
  mapTitle: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 15,
    color: "#000000",
  },
  mapPlaceholder: {
    width: "100%",
    height: 195,
    backgroundColor: "#e8e8e8",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  mapPlaceholderContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapPlaceholderIcon: {
    fontSize: 40,
  },
  mapPlaceholderText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    color: "#666666",
    marginTop: 8,
  },
  mapNote: {
    fontFamily: "Inter",
    fontWeight: "100",
    fontSize: 12,
    lineHeight: 15,
    color: "#000000",
  },
});

export default TripScreen;
