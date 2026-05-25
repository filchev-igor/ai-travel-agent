import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  label: string;
  duration?: number;
  onComplete?: () => void;
};

const Loader = ({ label, duration = 30000, onComplete }: Props) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && onComplete) {
        onComplete();
      }
    });
  }, [duration]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
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
        <Text style={styles.progressLabel}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Loader;
