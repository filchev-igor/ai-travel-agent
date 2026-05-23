import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput } from 'react-native';
import { EUROPEAN_COUNTRY_CODES } from './constants';

// Search only cities (not towns, villages, or regions)
const searchCities = async (query: string, countryCodes: string[]): Promise<any[]> => {
    if (!query || query.length < 2) return [];

    // Add 'city' parameter to restrict to cities only
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=10&countrycodes=${countryCodes.join(',')}&accept-language=en&featuretype=city&class=place&type=city`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'AITravelAgent/1.0',
            },
        });
        const data = await response.json();

        // Additional filter to ensure only cities
        const citiesOnly = data.filter((item: any) => {
            // Check if the result is a city
            return item.type === 'city' ||
                item.class === 'place' && item.type === 'city' ||
                (item.address?.city && !item.address?.town && !item.address?.village);
        });

        // Deduplicate by city name + country
        const seen = new Map();
        const uniqueResults = citiesOnly.filter((item: any) => {
            let cityName = item.address?.city || item.name;
            let countryName = item.address?.country || '';
            const key = `${cityName.toLowerCase()}|${countryName.toLowerCase()}`;

            if (seen.has(key)) {
                return false;
            }
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
        // Extract city name - prioritize city from address
        let cityName = item.address?.city || item.name;
        let countryName = item.address?.country || '';

        // Clean up city name (remove any parentheses or extra text)
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
        // Extract clean city name
        let cityName = item.address?.city || item.name;
        let countryName = item.address?.country || '';
        let regionName = item.address?.state || item.address?.region || '';

        // Clean up names
        cityName = cityName.split('(')[0].trim();

        // For display: show "City, Region, Country" or "City, Country"
        let secondaryText = '';
        if (regionName && regionName !== cityName) {
            secondaryText = `${regionName}, ${countryName}`;
        } else {
            secondaryText = countryName;
        }

        return (
            <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleLocationSelect(activeField!, item)}
            >
                <Text style={styles.suggestionCity}>{cityName}</Text>
                {secondaryText ? (
                    <Text style={styles.suggestionCountry}>{secondaryText}</Text>
                ) : null}
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <Text style={styles.label}>Start location</Text>
            <TouchableOpacity style={styles.input} onPress={() => openModal('start')}>
                <Text style={startLocation ? styles.inputText : styles.placeholderText}>
                    {startLocation || 'e.g. London'}
                </Text>
            </TouchableOpacity>

            <Text style={[styles.label, styles.labelSpacing]}>End location</Text>
            <TouchableOpacity style={styles.input} onPress={() => openModal('end')}>
                <Text style={endLocation ? styles.inputText : styles.placeholderText}>
                    {endLocation || 'e.g. Paris'}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={activeField !== null}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {activeField === 'start' ? 'Select start city' : 'Select end city'}
                            </Text>
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
                            autoFocus={true}
                        />

                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <Text style={styles.loadingText}>Searching...</Text>
                            </View>
                        ) : suggestions.length > 0 ? (
                            <FlatList
                                data={suggestions}
                                keyExtractor={(item, index) => `${item.place_id || index}`}
                                renderItem={renderSuggestion}
                                style={styles.suggestionsList}
                                keyboardShouldPersistTaps="always"
                            />
                        ) : searchQuery.length >= 2 ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No cities found</Text>
                            </View>
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>Type at least 2 characters to search</Text>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
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
    },
    labelSpacing: {
        marginTop: 16,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        padding: 13,
        justifyContent: 'center',
        minHeight: 50,
    },
    inputText: {
        fontSize: 14,
        color: '#1a2340',
    },
    placeholderText: {
        fontSize: 14,
        color: '#8a9bb5',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#ffffff',
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
        borderBottomColor: '#e2e8f0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a2340',
    },
    modalCloseText: {
        fontSize: 20,
        color: '#8a9bb5',
        padding: 4,
    },
    modalInput: {
        backgroundColor: '#f4f6fb',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        padding: 14,
        margin: 16,
        fontSize: 16,
        color: '#1a2340',
    },
    suggestionsList: {
        flex: 1,
    },
    suggestionItem: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    suggestionCity: {
        fontSize: 16,
        color: '#1a2340',
        fontWeight: '500',
        flex: 2,
    },
    suggestionCountry: {
        fontSize: 13,
        color: '#8a9bb5',
        flex: 1,
        textAlign: 'right',
    },
    loadingContainer: {
        padding: 40,
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 14,
        color: '#8a9bb5',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#8a9bb5',
        textAlign: 'center',
    },
});

export default LocationInputs;