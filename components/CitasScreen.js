import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  Image,
} from 'react-native';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';

const CitasScreen = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [doctor, setDoctor] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [citas, setCitas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [estilos, setEstilos] = useState([]);

  useEffect(() => {
    const obtenerNombreUsuario = async () => {
      const user = auth.currentUser; 
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid)); 
          if (userDoc.exists()) {
            setNombreUsuario(userDoc.data().name);
          }
        } catch (error) {
          console.error('Error al obtener el nombre del usuario: ', error);
        }
      }
    };

    obtenerNombreUsuario();
    obtenerCitas();
    obtenerEstilos();
  }, []);

  const obtenerEstilos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'estilos'));
      const estilosLista = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        estilosLista.push({ ...data, id: doc.id });
      });
      setEstilos(estilosLista);
    } catch (error) {
      console.error('Error al obtener estilos: ', error);
    }
  };

  const obtenerCitas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'citas'));
      const citasLista = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        citasLista.push({ ...data, id: doc.id, fecha: data.fecha.toDate() });
      });
      setCitas(citasLista);
    } catch (error) {
      console.error('Error al obtener citas: ', error);
    }
  };

  const agregarCita = async () => {
    if (doctor === '') {
      Alert.alert('Error', 'Por favor selecciona un estilo');
      return;
    }

    try {
      await addDoc(collection(db, 'citas'), {
        paciente: nombreUsuario,
        doctor,
        fecha,
      });
      Alert.alert('Cita agregada', 'La cita ha sido agregada con éxito');
      setDoctor('');
      setFecha(new Date());
      obtenerCitas();
    } catch (error) {
      console.error('Error al agregar cita: ', error);
    }
  };

  const mostrarDatePicker = () => {
    setMostrarCalendario(true);
  };

  const onFechaSeleccionada = (event, selectedDate) => {
    if (selectedDate) {
      setFecha(selectedDate);
    }
    setMostrarCalendario(false);
  };

  const seleccionarEstilo = (estilo) => {
    setDoctor(estilo.titulo);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar una nueva cita</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder=""
          value={nombreUsuario}
          editable={false}
        />
        <TouchableOpacity
          style={styles.styleButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.styleButtonText}>
            Seleccionar Estilo: {doctor || 'Ninguno'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateButton} onPress={mostrarDatePicker}>
          <Text style={styles.dateButtonText}>Seleccionar Fecha</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>Fecha seleccionada: {fecha.toDateString()}</Text>

        {mostrarCalendario && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={onFechaSeleccionada}
          />
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={agregarCita}
        >
          <Text style={styles.submitButtonText}>Agendar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={citas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cita}>
            <Text>{item.paciente} - {item.doctor} - {item.fecha.toDateString()}</Text>
          </View>
        )}
      />

      {/* Modal para seleccionar estilo */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Selecciona un Estilo</Text>
          <FlatList
            data={estilos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.estiloItem} onPress={() => seleccionarEstilo(item)}>
                <Image source={{ uri: item.imagen }} style={styles.estiloImage} />
                <Text style={styles.estiloTitulo}>{item.titulo}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF9900',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  styleButton: {
    backgroundColor: '#FF9900',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  styleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: '#FF9900',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#FF9900',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cita: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF9900',
  },
  estiloItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  estiloImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  estiloTitulo: {
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#FF9900',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
   
    marginTop: 20, }, closeButtonText: { color: '#fff', fontSize: 16, }, });

    export default CitasScreen;