import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from 'firebase/auth';

const CuentaScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [avatars, setAvatars] = useState([]); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    }
  };

  const fetchAvatars = async () => {
    const avatarsCollection = collection(db, 'avatar'); 
    const avatarSnapshot = await getDocs(avatarsCollection);
    const avatarList = avatarSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    console.log(avatarList); 
    setAvatars(avatarList);
  };

  const saveUserInfo = async () => {
    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        name: name || userData.name, 
        email: user.email, 
        profilePicture: image 
      }, { merge: true });

      setModalVisible(false);
      fetchUserData();
    }
  };

  const handleSelectAvatar = (avatarUrl) => {
    setImage(avatarUrl); 
    setAvatarModalVisible(false); 
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(user.email, password);
      try {
        // Re-autenticar al usuario
        await reauthenticateWithCredential(user, credential);

        // Eliminar datos del usuario en Firestore
        await deleteDoc(doc(db, 'users', user.uid));

        // Eliminar usuario de Firebase Auth
        await deleteUser(user); 
        
        Alert.alert('Cuenta Eliminada', 'Tu cuenta ha sido eliminada correctamente.');
        setDeleteAccountModalVisible(false);

      } catch (error) {
        if (error.code === 'auth/wrong-password') {
          setError('Contraseña incorrecta. Inténtalo de nuevo.');
        } else {
          setError('Error al eliminar la cuenta. Inténtalo más tarde.');
        }
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchAvatars();
  }, []);

  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.profileContainer}>
          {userData.profilePicture ? (
            <Image source={{ uri: userData.profilePicture }} style={styles.avatar} />
          ) : (
            <Image source={require('../img/user.png')} style={styles.avatar} />
          )}
          <Text style={styles.name}>{userData.name || "Nombre de usuario"}</Text>

          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
            <Icon name="pencil" size={16} color="#FFF" style={styles.icon} />
            <Text style={styles.buttonText}>Editar Información</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={() => setDeleteAccountModalVisible(true)}>
            <Icon name="trash" size={16} color="#FFF" style={styles.icon} />
            <Text style={styles.buttonText}>Eliminar Cuenta</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.text}>Cargando información del usuario...</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TextInput
              placeholder="Nombre"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setAvatarModalVisible(true)} style={styles.changePhotoButton}>
              <Icon name="camera" size={16} color="#FFF" style={styles.icon} />
              <Text style={styles.changePhotoText}>Seleccionar Foto de Perfil</Text>
            </TouchableOpacity>
            {image && (
              <Image source={{ uri: image }} style={styles.modalAvatar} />
            )}
            <TouchableOpacity style={styles.saveButton} onPress={saveUserInfo}>
              <Icon name="check" size={16} color="#FFF" style={styles.icon} />
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Icon name="times" size={16} color="#FFF" style={styles.icon} />
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={deleteAccountModalVisible} onRequestClose={() => setDeleteAccountModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Eliminar Cuenta</Text>
            <Text style={styles.warningText}>Por favor, ingresa tu contraseña para confirmar:</Text>
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={styles.saveButton} onPress={handleDeleteAccount}>
              <Icon name="check" size={16} color="#FFF" style={styles.icon} />
              <Text style={styles.saveButtonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setDeleteAccountModalVisible(false)}>
              <Icon name="times" size={16} color="#FFF" style={styles.icon} />
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={avatarModalVisible}
        onRequestClose={() => setAvatarModalVisible(!avatarModalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona un Avatar</Text>
            <FlatList
              data={avatars}
              keyExtractor={item => item.id}
              numColumns={3}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectAvatar(item.url)} style={styles.avatarButton}>
                  <Image source={{ uri: item.url }} style={styles.avatarImage} />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.cancelButton} onPress={() => setAvatarModalVisible(false)}>
              <Icon name="times" size={16} color="#FFF" style={styles.icon} />
              <Text style={styles.cancelButtonText}>Cerrar</Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
        width: '80%'
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 5,
  },
  icon: {
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  changePhotoButton: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%', 
  },
  changePhotoText: {
    color: '#FFF',
    marginLeft: 5,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%', 
  },
  saveButtonText: {
    color: '#FFF',
    marginLeft: 5,
  },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: '#F44336',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%', 
  },
  cancelButtonText: {
    color: '#FFF',
    marginLeft: 5,
  },
  avatarButton: {
    margin: 5,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  warningText: {
    fontSize: 16,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default CuentaScreen;
