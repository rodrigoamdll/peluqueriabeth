import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../utils/firebaseConfig'; // Asegúrate de importar tu configuración de Firebase
import { FontAwesome } from '@expo/vector-icons'; // Importar FontAwesome

const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla

const EstilosScreen = () => {
  const [estilos, setEstilos] = useState([]);
  const [selectedEstilo, setSelectedEstilo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchEstilos = async () => {
      const querySnapshot = await getDocs(collection(db, 'estilos')); // Cambia 'estilos' por el nombre de tu colección
      const estilosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEstilos(estilosData);
    };

    fetchEstilos();
  }, []);

  const openModal = (estilo) => {
    setSelectedEstilo(estilo);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEstilo(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.price}>${item.precio}</Text>
      <TouchableOpacity style={styles.button} onPress={() => openModal(item)}>
        <FontAwesome name="eye" size={16} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}> Ver detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estilos en tendencia 🔥</Text>
      <FlatList
        data={estilos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

      {selectedEstilo && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedEstilo.img }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedEstilo.titulo}</Text>
              <Text style={styles.modalDescription}>{selectedEstilo.descripcion}</Text>
              <Text style={styles.modalPrice}>${selectedEstilo.precio}</Text>

              {/* Botón de Cerrar actualizado */}
              <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
                <FontAwesome name="times" size={16} color="#fff" style={styles.iconClose} />
                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    alignItems: 'center',
    width: width / 2.2,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b4513',
    padding: 10,
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: width * 0.9,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 30,
  },
  modalImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalPrice: {
    fontSize: 20,
    color: '#e74c3c',
    marginBottom: 20,
  },
  // Estilo actualizado para el botón de cerrar dentro del modal
  modalCloseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 10,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  iconClose: {
    marginRight: 8,
  },
});

export default EstilosScreen;
