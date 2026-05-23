import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    startDate: string;
    endDate: string;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    formatDisplayDate: (dateStr: string) => string;
};

const DateInputs = ({ startDate, endDate, onStartDateChange, onEndDateChange, formatDisplayDate }: Props) => {
    // Get today's date in YYYY-MM-DD format for the min attribute
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const handleDateChange = (setter: (date: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    };

    const showDatePicker = (inputId: string) => {
        const input = document.getElementById(inputId) as HTMLInputElement;
        if (input) input.showPicker();
    };

    return (
        <View style={styles.rowFields}>
            <View style={styles.halfField}>
                <Text style={styles.label}>Start date</Text>
                <TouchableOpacity
                    style={styles.dateInputWrapper}
                    activeOpacity={0.7}
                    onPress={() => showDatePicker('startDateInput')}
                >
                    <Text style={!startDate ? styles.placeholderText : styles.dateText}>
                        {startDate ? formatDisplayDate(startDate) : 'Select start date'}
                    </Text>
                    <input
                        id="startDateInput"
                        type="date"
                        value={startDate || ''}
                        onChange={handleDateChange(onStartDateChange)}
                        min={getTodayDate()}
                        style={{
                            position: 'absolute',
                            opacity: 0,
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            cursor: 'pointer',
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.halfField}>
                <Text style={styles.label}>End date</Text>
                <TouchableOpacity
                    style={styles.dateInputWrapper}
                    activeOpacity={0.7}
                    onPress={() => showDatePicker('endDateInput')}
                >
                    <Text style={!endDate ? styles.placeholderText : styles.dateText}>
                        {endDate ? formatDisplayDate(endDate) : 'Select end date'}
                    </Text>
                    <input
                        id="endDateInput"
                        type="date"
                        value={endDate || ''}
                        onChange={handleDateChange(onEndDateChange)}
                        min={startDate || getTodayDate()}
                        style={{
                            position: 'absolute',
                            opacity: 0,
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            cursor: 'pointer',
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 11,
        fontWeight: '600',
        color: '#8a9bb5',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 4,
        marginTop: 10,
    },
    rowFields: { flexDirection: 'row', gap: 10 },
    halfField: { flex: 1 },
    dateInputWrapper: {
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        padding: 13,
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer',
        minHeight: 50,
    },
    dateText: {
        fontSize: 14,
        color: '#1a2340',
    },
    placeholderText: {
        fontSize: 14,
        color: '#8a9bb5',
    },
});

export default DateInputs;