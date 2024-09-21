import React from 'react';
import { View, Text, Button } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Registrarse</Text>
      <AuthForm isLogin={false} />
      <Button 
        title="¿Ya tienes una cuenta? Inicia sesión aquí"
        onPress={() => navigation.navigate('Login')} 
      />
    </View>
  );
};

export default RegisterScreen;

