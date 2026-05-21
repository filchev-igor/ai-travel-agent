import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

type Props = {
    startLocation: string;
    endLocation: string;
    onStartChange: (text: string) => void;
    onEndChange: (text: string) => void;
};

const LocationInputs = ({ startLocation, endLocation, onStartChange, onEndChange }: Props) => (
    <>
        <Text style={styles.label}>Start location</Text>
        <TextInput
            style={styles.input}
            placeholder="e.g. Vilnius"
            placeholderTextColor="#8a9bb5"
            value={startLocation}
            onChangeText={onStartChange}
        />

        <Text style={styles.label}>End location</Text>
        <TextInput
            style={styles.input}
            placeholder="e.g. Budapest"
            placeholderTextColor="#8a9bb5"
            value={endLocation}
            onChangeText={onEndChange}
        />
    </>
);

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
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        padding: 13,
        fontSize: 14,
        color: '#1a2340',
        justifyContent: 'center',
    },
});

export default LocationInputs;