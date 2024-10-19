import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../utils/firebaseConfig'; 
import { setDoc, doc } from 'firebase/firestore'; 
import { ImagenTop } from "../components/ImageTop";

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 

  const handleSubmit = async () => {
    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Inicio de sesión exitoso');
      } catch (error) {
        Alert.alert(error.message);
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: name, 
          profilePicture: '', 
        });

        Alert.alert('Registro exitoso');
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImagenTop />
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isLogin ? "Iniciar Sesión" : "Registro"}</Text>
        {!isLogin && ( 
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title={isLogin ? "Iniciar Sesión" : "Registrarse"} onPress={handleSubmit} color={isLogin ? "#2196f3" : "green"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: '60%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
});

export default AuthForm;
