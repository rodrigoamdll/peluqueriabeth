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
        color="#841584" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', 
  },
});

export default RegisterScreen;
