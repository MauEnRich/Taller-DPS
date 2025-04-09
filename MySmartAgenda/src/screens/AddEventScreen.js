import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AddEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  
  const handleAddEvent = () => {
    if (!title || !category || !date) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }
    
    // Aquí agregarías el evento a la base de datos o al estado
    Alert.alert('Éxito', 'Evento agregado con éxito');
    navigation.goBack();  // Regresa a la pantalla principal
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Evento</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Título del evento"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={category}
        onChangeText={setCategory}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Fecha y hora"
        value={date}
        onChangeText={setDate}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
        <Text style={styles.buttonText}>Agregar Evento</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
