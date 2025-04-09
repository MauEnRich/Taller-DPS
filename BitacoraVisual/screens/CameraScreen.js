import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [note, setNote] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        const locStatus = await Location.requestForegroundPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        if (status !== 'granted' || locStatus.status !== 'granted') {
          Alert.alert("Error", "Se necesitan permisos para la cámara y la ubicación.");
          setHasCameraPermission(false);
        } else {
          setHasCameraPermission(true);
        }
      } catch (error) {
        console.error("Error solicitando permisos:", error);
        Alert.alert("Error", "Hubo un problema al solicitar los permisos.");
        setHasCameraPermission(false);
      }
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        const loc = await Location.getCurrentPositionAsync({});
        
        if (!loc.coords) {
          throw new Error("No se pudo obtener la ubicación.");
        }

        setLocation(loc.coords);

        const asset = await MediaLibrary.createAssetAsync(photo.uri);

        const memory = {
          uri: photo.uri,
          note,
          location: {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          },
          timestamp: new Date().toISOString(),
          type: 'photo'
        };

        // Guardamos en AsyncStorage
        const prevMemories = JSON.parse(await AsyncStorage.getItem('memories')) || [];
        const updatedMemories = [...prevMemories, memory];
        await AsyncStorage.setItem('memories', JSON.stringify(updatedMemories));

        Alert.alert('Éxito', 'Recuerdo guardado correctamente');
        navigation.navigate('Inicio');
      } catch (error) {
        console.error("Error capturando o guardando la foto:", error);
        Alert.alert("Error", error.message || "Hubo un problema al capturar la foto.");
      }
    }
  };

  if (hasCameraPermission === null) {
    return <View><Text>Solicitando permisos...</Text></View>;
  }

  if (hasCameraPermission === false) {
    return <View><Text>No se tiene acceso a la cámara o ubicación</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        ratio="16:9"
      />

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.switch}
          onPress={() => setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          )}
        >
          <Text style={styles.buttonText}>🔁</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Escribe una nota..."
          value={note}
          onChangeText={setNote}
          style={styles.input}
        />

        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <Text style={styles.buttonText}>📸 Capturar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 3,
  },
  controls: {
    flex: 2,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  switch: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#edf2f7',
    borderRadius: 10,
    padding: 10,
    marginVertical: 12,
    fontSize: 16,
    color: '#2b6cb0',
  },
  captureButton: {
    backgroundColor: '#2b6cb0',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
