import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AuthForm isLogin={false} />
      <Button 
        title="¿Ya tienes una cuenta?"
        onPress={() => navigation.navigate('Login')} 
        color="#841584" // Puedes cambiar el color aquí si lo deseas
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    padding: 20, // Añade espacio alrededor
    backgroundColor: '#f5f5f5', // Fondo claro
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', // Asegura que el título esté centrado
  },
});

export default RegisterScreen;
