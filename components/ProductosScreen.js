import React, { useEffect, useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig'; // Asegúrate de que esta importación sea correcta

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const productsCollection = collection(db, 'productos'); // Asegúrate de que el nombre de la colección sea correcto
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productList);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos Disponibles ✅</Text>
      <ScrollView>
        <View style={styles.row}>
          {products.map((product, index) => (
            <TouchableOpacity
              key={product.id}
              style={[styles.productCard, index % 2 !== 0 && styles.marginLeft]}
              onPress={() => handleOpenModal(product)}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: product.img }} style={styles.productImage} />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.productTitle}>{product.titulo}</Text>
                <Text style={styles.productPrice}>${product.precio}</Text>
                <TouchableOpacity style={styles.detailsButton} onPress={() => handleOpenModal(product)}>
                  <Text style={styles.detailsButtonText}>Ver Detalles</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal para detalles del producto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Text style={styles.modalTitle}>{selectedProduct.titulo}</Text>
                <Image source={{ uri: selectedProduct.img }} style={styles.modalImage} />
                <Text style={styles.modalDescription}>{selectedProduct.descripcion}</Text>
                <Text style={styles.modalPrice}>${selectedProduct.precio}</Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6ba',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centrar el texto
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permitir que las tarjetas se envuelvan en múltiples filas
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    width: '48%', // Ajusta el ancho para mostrar dos productos
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  marginLeft: {
    marginLeft: '4%', // Añade margen izquierdo al segundo producto en la fila
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Círculo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%', // Asegúrate de que el botón ocupe todo el ancho
  },
  detailsButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProductScreen;
