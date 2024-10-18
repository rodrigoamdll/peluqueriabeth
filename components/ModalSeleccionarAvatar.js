import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ModalSeleccionarAvatar = ({ isVisible, onClose }) => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const avatarsCollection = collection(db, 'avatar');
      const avatarsSnapshot = await getDocs(avatarsCollection);
      const avatarsList = avatarsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAvatars(avatarsList);
    };

    fetchAvatars();
  }, []);

  return (
    isVisible && (
      <View style={styles.modalContainer}>
        <FlatList
          data={avatars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { /* Lógica para seleccionar el avatar */ }}>
              <Image source={{ uri: item.url }} style={styles.avatarImage} />
            </TouchableOpacity>
          )}
          horizontal
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    margin: 10,
  },
});

export default ModalSeleccionarAvatar;
