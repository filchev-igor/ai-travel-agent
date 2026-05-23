import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { EUROPEAN_COUNTRY_CODES } from './constants';

const searchCities = async (query: string, countryCodes: string[]): Promise<any[]> => {
    if (!query || query.length < 2) return [];

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=10&countrycodes=${countryCodes.join(',')}&accept-language=en&featuretype=city&class=place&type=city`;

    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'AITravelAgent/1.0' },
        });
        const data = await response.json();

        const citiesOnly = data.filter((item: any) => {
            return item.type === 'city' ||
                item.class === 'place' && item.type === 'city' ||
                (item.address?.city && !item.address?.town && !item.address?.village);
        });

        const seen = new Map();
        const uniqueResults = citiesOnly.filter((item: any) => {
            let cityName = item.address?.city || item.name;
            let countryName = item.address?.country || '';
            const key = `${cityName.toLowerCase()}|${countryName.toLowerCase()}`;
            if (seen.has(key)) return false;
            seen.set(key, true);
            return true;
        });

        return uniqueResults.slice(0, 8);
    } catch (error) {
        console.error('Error searching cities:', error);
        return [];
    }
};

type Props = {
    startLocation: string;
    endLocation: string;
    onStartChange: (text: string) => void;
    onEndChange: (text: string) => void;
};

const LocationInputs = ({ startLocation, endLocation, onStartChange, onEndChange }: Props) => {
    const [activeField, setActiveField] = useState<'start' | 'end' | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!activeField) return;

        const timer = setTimeout(async () => {
            if (searchQuery.length >= 2) {
                setIsLoading(true);
                const results = await searchCities(searchQuery, EUROPEAN_COUNTRY_CODES);
                setSuggestions(results);
                setIsLoading(false);
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, activeField]);

    const handleLocationSelect = (field: 'start' | 'end', item: any) => {
        let cityName = item.address?.city || item.name;
        let countryName = item.address?.country || '';
        cityName = cityName.split('(')[0].trim();
        const displayValue = countryName ? `${cityName}, ${countryName}` : cityName;
        if (field === 'start') {
            onStartChange(displayValue);
        } else {
            onEndChange(displayValue);
        }
        setActiveField(null);
        setSearchQuery('');
        setSuggestions([]);
    };

    const openModal = (field: 'start' | 'end') => {
        setActiveField(field);
        setSearchQuery('');
        setSuggestions([]);
    };

    const closeModal = () => {
        setActiveField(null);
        setSearchQuery('');
        setSuggestions([]);
    };

    const renderSuggestion = ({ item }: { item: any }) => {
        let cityName = item.address?.city || item.name;
        let countryName = item.address?.country || '';
        let regionName = item.address?.state || item.address?.region || '';
        cityName = cityName.split('(')[0].trim();
        let secondaryText = regionName && regionName !== cityName ? `${regionName}, ${countryName}` : countryName;

        return (
            <TouchableOpacity style={styles.suggestionItem} onPress={() => handleLocationSelect(activeField!, item)}>
                <Text style={styles.suggestionCity}>{cityName}</Text>
                {secondaryText ? <Text style={styles.suggestionCountry}>{secondaryText}</Text> : null}
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <TouchableOpacity style={styles.selector} onPress={() => openModal('start')}>
                <Text style={startLocation ? styles.selectedText : styles.placeholderText}>
                    {startLocation || 'Start location'}
                </Text>
                <ChevronDown size={16} color="#0C1445" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.selector} onPress={() => openModal('end')}>
                <Text style={endLocation ? styles.selectedText : styles.placeholderText}>
                    {endLocation || 'End location'}
                </Text>
                <ChevronDown size={16} color="#0C1445" />
            </TouchableOpacity>

            <Modal visible={activeField !== null} animationType="slide" transparent onRequestClose={closeModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{activeField === 'start' ? 'Select start city' : 'Select end city'}</Text>
                            <TouchableOpacity onPress={closeModal}>
                                <Text style={styles.modalCloseText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Search for a city..."
                            placeholderTextColor="#8a9bb5"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                        />
                        {isLoading ? (
                            <View style={styles.loadingContainer}><Text style={styles.loadingText}>Searching...</Text></View>
                        ) : suggestions.length > 0 ? (
                            <FlatList data={suggestions} keyExtractor={(item, i) => `${item.place_id || i}`} renderItem={renderSuggestion} keyboardShouldPersistTaps="always" />
                        ) : searchQuery.length >= 2 ? (
                            <View style={styles.emptyContainer}><Text style={styles.emptyText}>No cities found</Text></View>
                        ) : (
                            <View style={styles.emptyContainer}><Text style={styles.emptyText}>Type at least 2 characters to search</Text></View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#F2F2ED',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
        minHeight: 300,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#69425F',
    },
    modalTitle: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '600',
        color: '#0C1445',
    },
    modalCloseText: {
        fontSize: 20,
        color: '#0C1445',
        padding: 4,
    },
    modalInput: {
        backgroundColor: '#F2F2ED',
        borderWidth: 1,
        borderColor: '#69425F',
        borderRadius: 4,
        padding: 12,
        margin: 16,
        fontSize: 14,
        color: '#0C1445',
        fontFamily: 'Inter',
    },
    suggestionItem: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#69425F',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    suggestionCity: {
        fontFamily: 'Inter',
        fontSize: 14,
        color: '#0C1445',
        fontWeight: '500',
        flex: 2,
    },
    suggestionCountry: {
        fontFamily: 'Inter',
        fontSize: 12,
        color: '#69425F',
        flex: 1,
        textAlign: 'right',
    },
    loadingContainer: { padding: 40, alignItems: 'center' },
    loadingText: { fontFamily: 'Inter', fontSize: 14, color: '#69425F' },
    emptyContainer: { padding: 40, alignItems: 'center' },
    emptyText: { fontFamily: 'Inter', fontSize: 14, color: '#69425F', textAlign: 'center' },
});

export default LocationInputs;