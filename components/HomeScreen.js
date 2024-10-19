import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
const Home = () => {
  const phoneNumber = '50374115615'; 
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const handleContactPress = () => {
    Linking.openURL(whatsappUrl)
      .catch(err => console.error('Error al abrir WhatsApp', err));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Logo de la Peluquería */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../img/logo 8.png')} 
          style={styles.logo}
        />
              <View style={styles.header}>
        <Text style={styles.titleheader}>BETHEL</Text>
        <Text style={styles.subtitle}>BARBERSHOP</Text>
      </View>

      </View>

      {/* Descripción de la Peluquería */}
      <Text style={styles.description}>
        Bienvenido a nuestra peluquería, donde tu estilo es nuestra prioridad. Ofrecemos cortes, color y tratamientos de calidad para todos.
      </Text>

      {/* Imagen del Local */}
      <Text style={styles.sectionTitle}>📍 Nuestro Local</Text>
      <Image
        source={require('../img/local1.png')} 
        style={styles.localImage}
      />

      {/* Misión */}
      <Text style={styles.sectionTitle}>🎯 Misión</Text>
      <Text style={styles.missionVision}>
        Brindar servicios de peluquería de alta calidad, adaptados a las necesidades de cada cliente, en un ambiente amigable y profesional.
      </Text>

      {/* Visión */}
      <Text style={styles.sectionTitle}>👀 Visión</Text>
      <Text style={styles.missionVision}>
        Ser reconocidos como la mejor peluquería de la región, ofreciendo un servicio excepcional y fomentando la satisfacción de nuestros clientes.
      </Text>

      {/* Botón de Contactar */}
      <TouchableOpacity style={styles.button} onPress={handleContactPress}>
        <Icon name="whatsapp" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Contactar por WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8', 
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 350,
    height: 150,
    borderRadius: 20, 
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titleheader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFC107', 
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#775E4E',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
  },
  localImage: {
    width: '100%',
    height: 200, 
    borderRadius: 10,
    marginBottom: 20,
  },
  missionVision: {
    fontSize: 16,
    color: '#775E4E',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40, 
    flexDirection: 'row', 
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10, 
  },
  icon: {

  },
});

export default Home;
