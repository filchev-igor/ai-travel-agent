import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    label: string;
    placeholder: string;
    selectedValue: string;
    onPress: () => void;
    displayText: string;
};

const DropdownInput = ({ label, placeholder, selectedValue, onPress, displayText }: Props) => (
    <>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity style={styles.input} onPress={onPress}>
            <Text style={selectedValue ? styles.selectedText : styles.placeholderText}>
                {displayText || placeholder}
            </Text>
        </TouchableOpacity>
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
    placeholderText: {
        fontSize: 14,
        color: '#8a9bb5',
    },
    selectedText: {
        fontSize: 14,
        color: '#1a2340',
    },
});

export default DropdownInput;