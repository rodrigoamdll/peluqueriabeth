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
        await reauthenticateWithCredential(user, credential);
        await deleteDoc(doc(db, 'users', user.uid)); // Eliminar los datos de Firestore
        await deleteUser(user); // Eliminar el usuario de Firebase Authentication
        Alert.alert('Cuenta Eliminada', 'Tu cuenta ha sido eliminada correctamente.');
        setDeleteAccountModalVisible(false);
      } catch (error) {
        setError('Contraseña incorrecta. Inténtalo de nuevo.');
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
            <Image source={require('../img/boy.png')} style={styles.avatar} />
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

      {/* Modal para editar la información */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
            <TouchableOpacity onPress={() => setAvatarModalVisible(true)} style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Seleccionar Foto de Perfil</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.modalAvatar} />}
            <TouchableOpacity style={styles.saveButton} onPress={saveUserInfo}>
              <Icon name="save" size={16} color="#FFF" style={styles.icon} />
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Icon name="times" size={16} color="#FFF" style={styles.icon} />
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para confirmar eliminación de cuenta */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos de la pantalla y botones
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
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFC107',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 8,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  warningText: {
    fontSize: 16,
    color: '#d9534f',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 8,
  },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: '#f44336',
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 8,
  },
  icon: {
    marginRight: 5,
  },
  errorText: {
    color: '#d9534f',
    marginBottom: 10,
    textAlign: 'center',
  }
});

export default CuentaScreen;
