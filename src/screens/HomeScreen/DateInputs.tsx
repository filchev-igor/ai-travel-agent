import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

type Props = {
    startDate: string;
    endDate: string;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    formatDisplayDate: (dateStr: string) => string;
};

const DateInputs = ({ startDate, endDate, onStartDateChange, onEndDateChange, formatDisplayDate }: Props) => {
    const getTodayDate = () => new Date().toISOString().split('T')[0];

    const handleDateChange = (setter: (date: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    };

    const showDatePicker = (inputId: string) => {
        const input = document.getElementById(inputId) as HTMLInputElement;
        if (input) input.showPicker();
    };

    return (
        <>
            <TouchableOpacity style={styles.selector} onPress={() => showDatePicker('startDateInput')}>
                <Text style={startDate ? styles.selectedText : styles.placeholderText}>
                    {startDate ? formatDisplayDate(startDate) : 'Start date'}
                </Text>
                <ChevronDown size={16} color="#0C1445" />
                <input
                    id="startDateInput"
                    type="date"
                    value={startDate || ''}
                    onChange={handleDateChange(onStartDateChange)}
                    min={getTodayDate()}
                    style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', top: 0, left: 0, cursor: 'pointer' }}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.selector} onPress={() => showDatePicker('endDateInput')}>
                <Text style={endDate ? styles.selectedText : styles.placeholderText}>
                    {endDate ? formatDisplayDate(endDate) : 'End date'}
                </Text>
                <ChevronDown size={16} color="#0C1445" />
                <input
                    id="endDateInput"
                    type="date"
                    value={endDate || ''}
                    onChange={handleDateChange(onEndDateChange)}
                    min={startDate || getTodayDate()}
                    style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', top: 0, left: 0, cursor: 'pointer' }}
                />
            </TouchableOpacity>
        </>
    );
};

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
        fontWeight: '400' as const,
        fontSize: 12,
        lineHeight: 15,
        color: '#0C1445',
    },
    selectedText: {
        fontFamily: 'Inter',
        fontWeight: '700' as const,
        fontSize: 12,
        lineHeight: 15,
        color: '#0C1445',
    },
});

export default DateInputs;