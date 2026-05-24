import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TripVariant } from '../types';

type Props = {
    variant: TripVariant;
    index: number;
    onSelect: (variant: TripVariant) => void;
};

const TripCard = ({ variant, index, onSelect }: Props) => {
    // Format currency from USD to EUR
    const formatPrice = (price: number) => `${price}€`;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{variant.title || `Trip suggestions - variant ${index + 1}`}</Text>
            <Text style={styles.activities}>Activities: {variant.activities}</Text>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Direct flight</Text>
                    <Text style={styles.value}>{formatPrice(variant.flight)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Transportation</Text>
                    <Text style={styles.value}>{formatPrice(variant.transportation)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Hospitality</Text>
                    <Text style={styles.value}>{formatPrice(variant.hospitality)} in an apartment</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>{variant.activity1_name}</Text>
                    <Text style={styles.value}>{formatPrice(variant.activity1_cost)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{variant.activity2_name}</Text>
                    <Text style={styles.value}>{formatPrice(variant.activity2_cost)}</Text>
                </View>
            </View>

            <Text style={styles.total}>{formatPrice(variant.total)}</Text>

            <TouchableOpacity style={styles.button} onPress={() => onSelect(variant)}>
                <Text style={styles.buttonText}>Select this option →</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F2F2ED',
        borderWidth: 1,
        borderColor: '#0C1445',
        borderRadius: 10,
        padding: 20,
        gap: 20,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Inter',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 19,
        color: '#0C1445',
    },
    activities: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 15,
        color: '#0C1445',
    },
    section: {
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 15,
        color: '#0C1445',
    },
    value: {
        fontFamily: 'Inter',
        fontWeight: '200',
        fontSize: 12,
        lineHeight: 15,
        color: '#0C1445',
    },
    total: {
        fontFamily: 'Inter',
        fontWeight: '300',
        fontSize: 20,
        lineHeight: 24,
        color: '#0C1445',
    },
    button: {
        backgroundColor: '#0C1445',
        borderRadius: 4,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        color: '#F2F2ED',
    },
});

export default TripCard;