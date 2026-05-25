import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../../types";
import { fetchTripVariants } from "../../services/geminiApi";
import Header from "../../components/Header";
import SummaryRow from "./SummaryRow";
import { LOADING_LABELS, getGroupDisplay, formatDate } from "./constants";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Loading">;
  route: RouteProp<RootStackParamList, "Loading">;
};

const LoadingScreen = ({ route, navigation }: Props) => {
  const { tripData } = route.params;
  const [labelIndex, setLabelIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const animateProgress = (toValue: number, duration: number) =>
    Animated.timing(progressAnim, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start();

  useEffect(() => {
    const labelInterval = setInterval(() => {
      setLabelIndex((prev) => {
        const next = prev + 1;
        if (next >= LOADING_LABELS.length) {
          clearInterval(labelInterval);
          return prev;
        }
        return next;
      });
    }, 1200);

    animateProgress(0.85, 4800);

    const callApi = async () => {
      const variants = await fetchTripVariants(tripData);
      animateProgress(1, 300);
      setTimeout(() => {
        clearInterval(labelInterval);
        navigation.replace("Results", { tripData, variants });
      }, 400);
    };

    callApi();
    return () => clearInterval(labelInterval);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

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

        {/* Progress Bar with text INSIDE */}
        <View style={styles.progressWrap}>
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={["#FFBABA", "#D000FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.progressBar}
            >
              <Animated.View
                style={[styles.progressFill, { width: progressWidth }]}
              />
            </LinearGradient>
            {/* Text centered INSIDE the progress bar */}
            <Text style={styles.progressLabel}>
              {LOADING_LABELS[labelIndex]}
            </Text>
          </View>
        </View>
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
  progressWrap: {
    width: "100%",
  },
  progressBarContainer: {
    position: "relative",
    width: "100%",
    height: 44,
  },
  progressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 100,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 100,
  },
  progressLabel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 44,
    color: "#F2F2ED",
    includeFontPadding: false,
  },
});

export default LoadingScreen;
