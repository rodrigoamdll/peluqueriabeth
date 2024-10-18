// Header.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ onMenuPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Icon name="bars" size={24} color="#fff" />
      </TouchableOpacity>
      <Image
        source={require('../img/logo 8.png')} // Cambia la ruta a la ubicación de tu logo
        style={styles.logo}
      />
      <TouchableOpacity style={styles.cartButton}>
        <Icon name="shopping-cart" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#8c4030', // Cambia el color según lo que desees
  },
  menuButton: {
    padding: 10,
  },
  logo: {
    width: 100,
    height: 40, // Ajusta el tamaño del logo
    resizeMode: 'contain',
  },
  cartButton: {
    padding: 10,
  },
});

export default Header;
