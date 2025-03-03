import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 19.9975, // Example default location
    longitude: 73.7898,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [marker, setMarker] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        setMarker({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onPress={(e) => setMarker(e.nativeEvent.coordinate)}
        provider={null} // Disables Google Maps
      >
        {/* Use OpenStreetMap as Tile Source */}
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zIndex={0}
        />
        {marker && <Marker coordinate={marker} />}
      </MapView>

      <TouchableOpacity style={styles.findMe} onPress={() => setRegion(marker)}>
        <Text style={styles.buttonText}>📍 Find me</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  findMe: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default MapScreen;
