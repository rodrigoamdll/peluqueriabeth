import React from 'react';
import { View, Text, Button } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Iniciar Sesión</Text>
      <AuthForm isLogin={true} />
      <Button 
        title="¿No tienes cuenta? Regístrate aquí"
        onPress={() => navigation.navigate('Register')} 
      />
    </View>
  );
};

export default LoginScreen;


