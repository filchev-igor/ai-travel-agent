import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

type Props = {
    label: string;
    placeholder: string;
    selectedValue: string;
    onPress: () => void;
    displayText: string;
};

const DropdownInput = ({ label, placeholder, selectedValue, onPress, displayText }: Props) => (
    <TouchableOpacity style={styles.selector} onPress={onPress}>
        <Text style={selectedValue ? styles.selectedText : styles.placeholderText}>
            {displayText || placeholder}
        </Text>
        <ChevronDown size={16} color="#0C1445" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        gap: 61,
        width: '100%',
        height: 44,
        backgroundColor: '#F2F2ED',
        borderWidth: 1,
        borderColor: '#69425F',
        borderRadius: 4,
        marginBottom: 12,
    },
    placeholderText: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 15,
        color: '#0C1445',
    },
    selectedText: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 15,
        color: '#0C1445',
    },
});

export default DropdownInput;