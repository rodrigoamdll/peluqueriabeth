import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PacientesScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Gestión de Pacientes</Text>
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

export default PacientesScreen;
