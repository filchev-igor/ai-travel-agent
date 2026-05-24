import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import AppLogo from './AppLogo';

type Props = {
    showBack?: boolean;
    onBackPress?: () => void;
};

const Header = ({ showBack = false, onBackPress }: Props) => {
    return (
        <View style={styles.header}>
            <View style={styles.leftSection}>
                {showBack ? (
                    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                        <ChevronLeft size={24} color="#F2F2ED" />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.backButtonPlaceholder} />
                )}
            </View>

            <AppLogo width={132} height={60} />

            <Image
                source={{ uri: 'https://via.placeholder.com/70' }}
                style={styles.avatar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0C1445',
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 100,
    },
    leftSection: {
        width: 50,
        alignItems: 'flex-start',
    },
    backButton: {
        padding: 8,
    },
    backButtonPlaceholder: {
        width: 40,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: '#F2F2ED',
    },
});

export default Header;