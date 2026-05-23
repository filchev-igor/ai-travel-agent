import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogoSvg from '../assets/logo.svg';  // Import the SVG file

type Props = {
    width?: number;
    height?: number;
};

const AppLogo = ({ width = 132, height = 60 }: Props) => {
    return (
        <View style={[styles.container, { width, height }]}>
            <LogoSvg width={width} height={height} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2ED',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
});

export default AppLogo;