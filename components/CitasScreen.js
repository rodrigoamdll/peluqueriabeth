import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CitasScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Gestión de Citas</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CitasScreen;
