import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../utils/firebaseConfig'; 
import { doc, onSnapshot } from 'firebase/firestore'; 

import HomeScreen from '../components/HomeScreen';
import CuentaScreen from '../components/CuentaScreen';
import CitasScreen from '../components/CitasScreen';
import EstilosScreen from '../components/EstilosScreen';
import ProductosScreen from '../components/ProductosScreen';

// Crear el Drawer
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const user = auth.currentUser; 
  const [userName, setUserName] = useState('Usuario'); 
  const [profilePicture, setProfilePicture] = useState(''); 

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setUserName(userData.name || 'Usuario'); 
        setProfilePicture(userData.profilePicture); 
      }
    });

    return () => unsubscribe(); 
  }, [user]);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.navigate("LoginScreen");
      })
      .catch(error => alert(error.message));
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Image
          source={profilePicture ? { uri: profilePicture } : require('../img/user.png')} 
          style={styles.profileImage}
        />
        <Text style={styles.userName}>
          {userName} {/* Mostrar el nombre del usuario aquí */}
        </Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar sesión"
        onPress={handleLogout}
        labelStyle={styles.logoutLabel}
        icon={() => <Icon name="sign-out" size={20} color="red" />}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#FCCC7C',
        drawerActiveTintColor: '#775E4E',
        drawerInactiveTintColor: '#775E4E',
        drawerLabelStyle: {
          color: '#775E4E',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => <Icon name="home" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Cuenta"
        component={CuentaScreen}
        options={{
          drawerIcon: ({ color }) => <Icon name="user" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Citas"
        component={CitasScreen}
        options={{
          drawerIcon: ({ color }) => <Icon name="calendar" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Estilos"
        component={EstilosScreen}
        options={{
          drawerIcon: ({ color }) => <Icon name="paint-brush" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Productos"
        component={ProductosScreen}
        options={{
          drawerIcon: ({ color }) => <Icon name="tag" size={20} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  logoutLabel: {
    color: 'red',
  },
  drawerContent: {
    backgroundColor: '#fff',
  },
});
