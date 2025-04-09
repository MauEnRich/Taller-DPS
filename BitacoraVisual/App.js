import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';  // Verifica que esta ruta sea correcta
import CameraScreen from './screens/CameraScreen';  // Verifica que esta ruta sea correcta
import GalleryScreen from './screens/GalleryScreen';  // Verifica que esta ruta sea correcta
import MemoryDetailScreen from './screens/MemoryDetailScreen';  // Verifica que esta ruta sea correcta

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        {/* Verifica que los nombres de las pantallas estén bien escritos */}
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Cámara" component={CameraScreen} />
        <Stack.Screen name="Galería" component={GalleryScreen} />
        <Stack.Screen name="Detalle" component={MemoryDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
