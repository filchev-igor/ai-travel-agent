import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TripData } from '../../types';

export const useHomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');

    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        return date.toISOString().split('T')[0];
    });

    const [groupModalVisible, setGroupModalVisible] = useState(false);
    const [budgetModalVisible, setBudgetModalVisible] = useState(false);
    const [groupSize, setGroupSize] = useState('');
    const [budget, setBudget] = useState('');

    const formatDisplayDate = (dateStr: string): string => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const onCombinePress = () => {
        if (!startLocation || !endLocation) {
            return Alert.alert('Missing info', 'Enter start and end location');
        }
        if (!groupSize) {
            return Alert.alert('Missing info', 'Select group size');
        }
        if (!budget) {
            return Alert.alert('Missing info', 'Select budget');
        }

        const tripData: TripData = {
            start: startLocation,
            end: endLocation,
            startDate: startDate,
            endDate: endDate,
            group: groupSize,
            budget: budget,
        };

        navigation.navigate('Loading', { tripData });
    };

    return {
        startLocation,
        setStartLocation,
        endLocation,
        setEndLocation,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        groupModalVisible,
        setGroupModalVisible,
        budgetModalVisible,
        setBudgetModalVisible,
        groupSize,
        setGroupSize,
        budget,
        setBudget,
        formatDisplayDate,
        onCombinePress,
    };
};