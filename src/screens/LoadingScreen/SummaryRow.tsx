import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    label: string;
    value: string;
};

const SummaryRow = ({ label, value }: Props) => (
    <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 17,
        color: '#F2F2ED',
    },
    summaryValue: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 17,
        color: '#F2F2ED',
    },
});

export default SummaryRow;