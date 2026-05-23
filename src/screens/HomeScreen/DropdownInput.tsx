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
    <TouchableOpacity style={styles.selector} onPress={onPress}>
        <Text style={selectedValue ? styles.selectedText : styles.placeholderText}>
            {displayText || placeholder}
        </Text>
        <View style={styles.arrowIcon}>
            <View style={styles.arrowUp} />
            <View style={styles.arrowDown} />
        </View>
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
    arrowIcon: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
    arrowUp: { width: 10, height: 2, backgroundColor: '#000000', marginBottom: 4 },
    arrowDown: { width: 10, height: 2, backgroundColor: '#000000', marginTop: 4 },
});

export default DropdownInput;