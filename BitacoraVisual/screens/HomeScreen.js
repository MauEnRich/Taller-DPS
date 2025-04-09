import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bitácora Visual</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cámara')} // Verifica que 'Cámara' sea el nombre correcto
      >
        <Text style={styles.buttonText}>📷 Registrar Momento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Galería')} // Verifica que 'Galería' sea el nombre correcto
      >
        <Text style={styles.buttonText}>🖼️ Ver Recuerdos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edf2f7',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2b6cb0',
  },
  button: {
    backgroundColor: '#2b6cb0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
