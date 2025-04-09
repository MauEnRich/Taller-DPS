import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    // Simulamos la carga de eventos
    const loadEvents = () => {
      setEvents([
        { id: '1', title: 'Reunión de trabajo', category: 'Reunión', date: '2025-04-10T10:00:00Z' },
        { id: '2', title: 'Estudio de React', category: 'Estudio', date: '2025-04-12T16:00:00Z' },
      ]);
    };
    loadEvents();
  }, []);
  
  const handleAddEvent = () => {
    navigation.navigate('AddEvent');  // Navegar a la pantalla de agregar evento
  };
  
  const handleLogout = () => {
    logout();
    navigation.navigate('Login');  // Redirigir a la pantalla de login después de cerrar sesión
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user.email}</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text>{item.category}</Text>
            <Text>{new Date(item.date).toLocaleString()}</Text>
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Editar Evento')}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Eliminar Evento')}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonText}>Agregar Evento</Text>
      </TouchableOpacity>

      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
