// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext'; // Corregido de 'scr' a 'src'
import AppNavigator from './src/navigation/AppNavigator'; // Corregido de 'scr' a 'src'

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
