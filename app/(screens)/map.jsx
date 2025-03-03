import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import MapView, { Polygon, Marker, UrlTile } from 'react-native-maps';
import { NativeWindStyleSheet } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import * as turf from '@turf/turf';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';

// Configure NativeWind
NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function FieldScreen() {
  const navigation = useNavigation()
  const [coordinates, setCoordinates] = useState([]);
  const [area, setArea] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const onMapPress = (event) => {
    const newCoord = event.nativeEvent.coordinate;
    setCoordinates((prevCoords) => {
      const newCoords = [...prevCoords, newCoord];
      if (newCoords.length >= 4) calculateArea(newCoords);
      return newCoords;
    });
    console.log('Map pressed, new coordinate:', newCoord);
  };

  const calculateArea = (coords) => {
    if (coords.length < 4) {
      setArea(0);
      return;
    }
    const closedCoords = [...coords, coords[0]]; // Ensure polygon closure
    const polygon = turf.polygon([closedCoords.map((c) => [c.longitude, c.latitude])]);
    const areaInSqMeters = turf.area(polygon);
    const areaInAcres = areaInSqMeters * 0.000247105; // Convert to acres
    setArea(areaInAcres);
    console.log('Calculated area:', areaInAcres);
  };

  const resetDrawing = () => {
    setCoordinates([]);
    setArea(0);
    console.log('Drawing reset');
  };

  const undoLastStep = () => {
    setCoordinates((prevCoords) => {
      const newCoords = prevCoords.slice(0, -1);
      if (newCoords.length >= 4) calculateArea(newCoords);
      else setArea(0);
      console.log('Undo performed, new coords length:', newCoords.length);
      return newCoords;
    });
  };

  const updateMarkerPosition = (index, newCoordinate) => {
    setCoordinates((prevCoords) => {
      const newCoords = [...prevCoords];
      newCoords[index] = newCoordinate;
      calculateArea(newCoords);
      console.log('Marker moved, new coordinate at index', index, ':', newCoordinate);
      return newCoords;
    });
  };

  const handleFieldCreation = () => {
    if (coordinates.length >= 4) {
      Alert.alert('Success', 'Field created successfully!');
      console.log('Field Created:', coordinates);
    } else {
      Alert.alert('Error', 'Please draw a field with at least 4 points.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100" style={styles.safeArea}>
      <MapView
        ref={mapRef}
        mapType="hybrid"
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        onPress={onMapPress}
      >
        {console.log('MapView rendering')}
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          zIndex={0} // Ensure tiles are below markers
        />
        {coordinates.length > 3 && (
          <Polygon
            coordinates={[...coordinates, coordinates[0]]}
            strokeColor="#FF1493"
            fillColor="rgba(255, 20, 147, 0.3)"
            strokeWidth={2}
          />
        )}
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            coordinate={coord}
            pinColor="#FF1493"
            draggable
            onDragEnd={(e) => updateMarkerPosition(index, e.nativeEvent.coordinate)}
          />
        ))}
      </MapView>

      {/* Buttons */}
      <View className="absolute pt-6 top-4 left-4 flex-row z-10">
        {/* Back Button */}
        <TouchableOpacity
          className="bg-blue-500 rounded-md px-4 py-2 shadow-md mr-2"
          onPress={() => navigation.goBack()} // Ensure navigation is available
        >
          <Text className="text-white">ss</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white rounded-md px-4 py-2 shadow-md mr-2"
          onPress={undoLastStep}
          disabled={coordinates.length === 0}
        >
          <Text className="text-gray-600">Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 rounded-md px-4 py-2 shadow-md"
          onPress={resetDrawing}
        >
          <Text className="text-white">Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Panel */}
      <View className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-md">
        <Text className="text-lg font-semibold text-gray-800">Draw your field</Text>
        <Text className="text-gray-600 mt-1">Tap on the map to draw the field</Text>
        {coordinates.length > 3 && (
          <Text className="text-gray-800 mt-2">Area: {area.toFixed(2)} acres</Text>
        )}
        <TouchableOpacity
          className="bg-blue-500 rounded-md mt-4 py-2"
          onPress={handleFieldCreation}
          disabled={coordinates.length < 4}
        >
          <Text className="text-white text-center font-semibold">Create field</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});