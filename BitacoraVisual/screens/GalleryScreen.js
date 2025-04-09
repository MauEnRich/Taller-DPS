// screens/GalleryScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; // Importamos el ícono

const GalleryScreen = ({ navigation }) => {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const fetchMemories = async () => {
      const stored = await AsyncStorage.getItem('memories');
      const data = stored ? JSON.parse(stored) : [];
      setMemories(data.reverse()); // Mostrar el más reciente primero
    };
    const unsubscribe = navigation.addListener('focus', fetchMemories); // Refresca al volver

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detalle', { memory: item })}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.note} numberOfLines={1}>
          📝 {item.note || 'Sin comentario'}
        </Text>
        <Text style={styles.coord}>
          📍 {item.location.latitude.toFixed(4)}, {item.location.longitude.toFixed(4)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {memories.length === 0 ? (
        <Text style={styles.emptyText}>No hay recuerdos aún</Text>
      ) : (
        <FlatList
          data={memories}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      )}

      {/* Botón flotante para acceder a la cámara */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Cámara')}
      >
        <AntDesign name="camera" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f7',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  note: {
    fontSize: 16,
    color: '#2b6cb0',
    fontWeight: 'bold',
  },
  coord: {
    fontSize: 13,
    color: '#4a5568',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 40,
    color: '#718096',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#3182ce',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
