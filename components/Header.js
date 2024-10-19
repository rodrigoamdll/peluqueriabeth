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
        source={require('../img/logo 8.png')} 
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
    backgroundColor: '#8c4030', 
  },
  menuButton: {
    padding: 10,
  },
  logo: {
    width: 100,
    height: 40, 
    resizeMode: 'contain',
  },
  cartButton: {
    padding: 10,
  },
});

export default Header;
