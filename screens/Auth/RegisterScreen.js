import React from 'react';
import { View, Text } from 'react-native';
import AuthForm from '../../components/AuthForm';

const RegisterScreen = () => {
  return (
    <View>
      <Text>Registrarse</Text>
      <AuthForm isLogin={false} />
    </View>
  );
};

export default RegisterScreen;
