import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, TripVariant } from "../../types";
import { fetchTripVariants } from "../../services/geminiApi";
import Header from "../../components/Header";
import SummaryRow from "./SummaryRow";
import Loader from "./Loader";
import { LOADING_LABELS, getGroupDisplay, formatDate } from "./constants";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Loading">;
  route: RouteProp<RootStackParamList, "Loading">;
};

const LoadingScreen = ({ route, navigation }: Props) => {
  const { tripData } = route.params;
  const [labelIndex, setLabelIndex] = useState(0);
  const [variants, setVariants] = useState<TripVariant[] | null>(null);
  const [apiDuration, setApiDuration] = useState<number | null>(null);
  const labelIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(Date.now());
  const apiStartTimeRef = useRef(Date.now());

  // Start label rotation immediately with an estimated duration
  useEffect(() => {
    // Start with estimated duration (30 seconds default)
    let estimatedDuration = 30000;
    let intervalTime = estimatedDuration / LOADING_LABELS.length;

    console.log(
      `[Loader] Starting labels with estimated ${(estimatedDuration / 1000).toFixed(0)}s total, ${(intervalTime / 1000).toFixed(1)}s per label`,
    );

    labelIntervalRef.current = setInterval(() => {
      setLabelIndex((prev) => {
        const next = (prev + 1) % LOADING_LABELS.length;
        return next;
      });
    }, intervalTime);

    return () => {
      if (labelIntervalRef.current) clearInterval(labelIntervalRef.current);
    };
  }, []);

  // Call API and measure actual time
  useEffect(() => {
    apiStartTimeRef.current = Date.now();

    fetchTripVariants(tripData).then((result) => {
      const actualDuration = Date.now() - apiStartTimeRef.current;
      console.log(
        `[API] Actual response time: ${actualDuration}ms (${(actualDuration / 1000).toFixed(1)} seconds)`,
      );
      setApiDuration(actualDuration);
      setVariants(result);
    });
  }, []);

  // Adjust label interval when actual API duration is known
  useEffect(() => {
    if (apiDuration !== null && labelIntervalRef.current) {
      // Clear existing interval
      clearInterval(labelIntervalRef.current);

      // Calculate new interval based on actual duration
      const newIntervalTime = apiDuration / LOADING_LABELS.length;
      console.log(
        `[Loader] Adjusting - now ${(apiDuration / 1000).toFixed(1)}s total, ${(newIntervalTime / 1000).toFixed(1)}s per label`,
      );

      // Start new interval with adjusted timing
      labelIntervalRef.current = setInterval(() => {
        setLabelIndex((prev) => {
          const next = (prev + 1) % LOADING_LABELS.length;
          return next;
        });
      }, newIntervalTime);
    }
  }, [apiDuration]);

  // Navigate when variants are received
  useEffect(() => {
    if (variants !== null && apiDuration !== null) {
      const elapsed = Date.now() - startTimeRef.current;
      const minDuration = Math.max(apiDuration, 2000);
      const delay = Math.max(0, minDuration - elapsed);

      console.log(`[Loader] Navigating in ${delay}ms`);

      setTimeout(() => {
        if (labelIntervalRef.current) clearInterval(labelIntervalRef.current);
        navigation.replace("Results", { tripData, variants });
      }, delay);
    }
  }, [variants, apiDuration]);

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.body}>
        <Text style={styles.title}>Your journey selection summary</Text>

        <View style={styles.summary}>
          <SummaryRow label="Starting point" value={tripData.start} />
          <SummaryRow label="End location" value={tripData.end} />
          <SummaryRow
            label="Start date"
            value={formatDate(tripData.startDate)}
          />
          <SummaryRow label="End date" value={formatDate(tripData.endDate)} />
          <SummaryRow
            label="Amount of people in the group"
            value={getGroupDisplay(tripData.group)}
          />
          <SummaryRow label="Budget" value={`€${tripData.budget}`} />
        </View>

        <Loader
          label={LOADING_LABELS[labelIndex]}
          duration={apiDuration || 30000}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#699863",
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
  },
  summary: {
    backgroundColor: "transparent",
    marginBottom: 40,
  },
});

export default LoadingScreen;
