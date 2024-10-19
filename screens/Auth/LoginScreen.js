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
  },
  buttonContainer: {
    marginTop: 20, 
    position: 'absolute', 
    bottom: 30, 
  },
});

export default LoginScreen;


