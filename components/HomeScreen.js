import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Asilo Esperanza de Santa Ana</Text>
      
      <Button
        title="Pacientes"
        onPress={() => navigation.navigate('Pacientes')}
      />
      <Button
        title="Doctores"
        onPress={() => navigation.navigate('Doctores')}
      />
      <Button
        title="Citas"
        onPress={() => navigation.navigate('Citas')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
