// src/screens/RegisterScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    // Llamada a register, ahora correctamente maneja promesas
    register(email, password)
      .then(() => {
        console.log('Registro exitoso');
        navigation.navigate('Home');  // O la pantalla que corresponda después del registro
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

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
    marginBottom: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    color: '#3b82f6',
    marginTop: 8,
  },
});
