import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { fetchTripVariants } from '../../services/geminiApi';
import Header from '../../components/Header';
import SummaryRow from './SummaryRow';
import { LOADING_LABELS, getGroupDisplay, formatDate } from './constants';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Loading'>;
  route: RouteProp<RootStackParamList, 'Loading'>;
};

const LoadingScreen = ({ route, navigation }: Props) => {
  const { tripData } = route.params;
  const [labelIndex, setLabelIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const animateProgress = (toValue: number, duration: number) =>
      Animated.timing(progressAnim, { toValue, duration, useNativeDriver: false }).start();

  useEffect(() => {
    const labelInterval = setInterval(() => {
      setLabelIndex(prev => {
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
        navigation.replace('Results', { tripData, variants });
      }, 400);
    };

    callApi();
    return () => clearInterval(labelInterval);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
      <View style={styles.container}>
        <Header />

        <View style={styles.body}>
          <Text style={styles.title}>Your journey selection summary</Text>

          <View style={styles.summary}>
            <SummaryRow label="Starting point" value={tripData.start} />
            <SummaryRow label="End location" value={tripData.end} />
            <SummaryRow label="Start date" value={formatDate(tripData.startDate)} />
            <SummaryRow label="End date" value={formatDate(tripData.endDate)} />
            <SummaryRow label="Amount of people in the group" value={getGroupDisplay(tripData.group)} />
            <SummaryRow label="Budget" value={`€${tripData.budget}`} />
          </View>

          <View style={styles.progressWrap}>
            <LinearGradient
                colors={['#FFBABA', '#D000FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressBar}
            >
              <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
            </LinearGradient>
            <Text style={styles.progressLabel}>{LOADING_LABELS[labelIndex]}</Text>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#699863',
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  summary: {
    backgroundColor: 'transparent',
    marginBottom: 40,
  },
  progressWrap: {
    width: '100%',
  },
  progressBar: {
    height: 44,
    borderRadius: 100,
    justifyContent: 'center',
    marginBottom: 12,
  },
  progressFill: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 100,
    marginLeft: 2,
  },
  progressLabel: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#F2F2ED',
    textAlign: 'center',
  },
});

export default LoadingScreen;