import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          Alert.alert('Inicio de sesión exitoso');
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          Alert.alert('Registro exitoso');
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    }
  };

  return (
    <View>
      <TextInput 
        placeholder="Correo electrónico" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
      />
      <TextInput 
        placeholder="Contraseña" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <Button title={isLogin ? "Iniciar Sesión" : "Registrarse"} onPress={handleSubmit} />
    </View>
  );
};

export default AuthForm;
