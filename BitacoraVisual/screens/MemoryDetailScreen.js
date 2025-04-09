// screens/MemoryDetailScreen.js

import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MemoryDetailScreen = ({ route }) => {
  const { memory } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: memory.uri }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.label}>📝 Anotación:</Text>
        <Text style={styles.text}>{memory.note || 'Sin anotación'}</Text>

        <Text style={styles.label}>📍 Ubicación:</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: memory.location.latitude,
            longitude: memory.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: memory.location.latitude,
              longitude: memory.location.longitude,
            }}
            title="Lugar de la captura"
          />
        </MapView>

        <Text style={styles.date}>📅 {new Date(memory.timestamp).toLocaleString()}</Text>
      </View>
    </ScrollView>
  );
};

export default MemoryDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f7',
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width,
  },
  content: {
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2b6cb0',
    marginBottom: 4,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#2d3748',
  },
  map: {
    width: '100%',
    height: 250,
    marginTop: 10,
    borderRadius: 10,
  },
  date: {
    marginTop: 16,
    textAlign: 'right',
    color: '#718096',
    fontSize: 14,
  },
});
