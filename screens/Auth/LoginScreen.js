import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AuthForm isLogin={true} />
      <View style={styles.buttonContainer}>
        <Button 
          title="¿No tienes cuenta?"
          onPress={() => navigation.navigate('Register')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    justifyContent: 'center', // Centra verticalmente el contenido
    alignItems: 'center', // Centra horizontalmente el contenido
    padding: 20, // Espacio alrededor
    backgroundColor: '#f5f5f5', // Fondo claro
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20, // Añade espacio entre el formulario y el botón
    position: 'absolute', // Asegura que esté en una posición fija
    bottom: 30, // Lo coloca en la parte inferior de la pantalla
  },
});

export default LoginScreen;


