import React from 'react';
import { View, Text } from 'react-native';
import AuthForm from '../../components/AuthForm';

const LoginScreen = () => {
  return (
    <View>
      <Text>Iniciar Sesión</Text>
      <AuthForm isLogin={true} />
    </View>
  );
};

export default LoginScreen;
