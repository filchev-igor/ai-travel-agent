import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AppLogo from './AppLogo';

const Header = () => {
    return (
        <View style={styles.header}>
            <AppLogo width={132} height={60} />
            <Image
                source={{ uri: 'https://via.placeholder.com/80' }}
                style={styles.avatar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0C1445',
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 100,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: '#F2F2ED',
    },
});

export default Header;