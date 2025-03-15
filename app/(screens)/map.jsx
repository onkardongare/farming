import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, Alert, Dimensions } from 'react-native';
import MapView, { Polygon, Marker, UrlTile } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import * as turf from '@turf/turf';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { useDispatch } from 'react-redux';
import { createField } from "@/redux/slices/fieldSlice";
import { Picker } from '@react-native-picker/picker';  // Import Picker


export default function FieldScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [coordinates, setCoordinates] = useState([]);
  const [area, setArea] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [description, setDescription] = useState('');
  const mapRef = useRef(null);

  const onMapPress = (event) => {
    const newCoord = event.nativeEvent.coordinate;
    setCoordinates((prevCoords) => {
      const newCoords = [...prevCoords, newCoord];
      if (newCoords.length >= 4) calculateArea(newCoords);
      return newCoords;
    });
  };

  const calculateArea = (coords) => {
    if (coords.length < 4) {
      setArea(0);
      return;
    }
    const closedCoords = [...coords, coords[0]];
    const polygon = turf.polygon([closedCoords.map((c) => [c.longitude, c.latitude])]);
    const areaInSqMeters = turf.area(polygon);
    const areaInAcres = areaInSqMeters * 0.000247105;
    setArea(areaInAcres);
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
      dispatch(createField({ name: fieldName, description, coordinates, area }));
      setShowForm(false);
      Alert.alert('Success', 'Field created successfully!');
      setCoordinates([]); // Reset after creation
    } else {
      Alert.alert('Error', 'Please draw a field with at least 4 points.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Map View */}
      <MapView
        ref={mapRef}
        mapType="hybrid"
        style={styles.map}
        initialRegion={{ latitude: 19.076090, longitude: 72.877426, latitudeDelta: 0.5, longitudeDelta: 0.5 }}
        onPress={onMapPress}
      >
        <UrlTile urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maximumZ={19} />
        {coordinates.length > 3 && <Polygon coordinates={[...coordinates, coordinates[0]]} strokeColor="#FF1493" fillColor="rgba(255, 20, 147, 0.3)" strokeWidth={2} />}
        {coordinates.map((coord, index) => (
          <Marker key={index} coordinate={coord} pinColor="#FF1493" />
        ))}
      </MapView>

      {/* Buttons */}
      <View className="absolute pt-6 top-4 left-4 flex-row z-10">
         {/* Back Button */}
         <TouchableOpacity
          className="bg-blue-500 rounded-md px-4 py-2 shadow-md mr-2"
          onPress={() => navigation.goBack()} // Ensure navigation is available
        >
          <Text className="text-white">🔙</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white rounded-md px-4 py-2 shadow-md mr-2"
          onPress={undoLastStep}
          disabled={coordinates.length === 0}
        >
          <Text className="text-gray-600">↩️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 rounded-md px-4 py-2 shadow-md"
          onPress={resetDrawing}
        >
          <Text className="text-white">🔄</Text>
        </TouchableOpacity>
      </View>      

      {/* Bottom Panel */}
      <View className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-md">
        <Text className="text-lg font-semibold text-gray-800">Draw your field</Text>
        <Text className="text-gray-600 mt-1">Tap on the map to draw the field</Text>
        {coordinates.length > 3 && <Text className="text-gray-800 mt-2">Area: {area.toFixed(2)} acres</Text>}
        <TouchableOpacity className="bg-blue-500 rounded-md mt-4 py-2" onPress={() => setShowForm(true)} disabled={coordinates.length < 4}>
          <Text className="text-white text-center font-semibold">Create field</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Form */}
      <Modal visible={showForm} animationType="slide" transparent> 
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className="text-lg font-semibold text-gray-800">Enter Field Details</Text>

            {/* Farm Name Input */}
            <TextInput 
              style={styles.input} 
              placeholder="Farm Name" 
              value={farmName} 
              onChangeText={setFarmName} 
            />

            {/* Crop Name Input */}
            <TextInput 
              style={styles.input} 
              placeholder="Crop Name" 
              value={crop} 
              onChangeText={setCrop}  
            />

            {/* Irrigation Type Dropdown */}
            <Text className="text-gray-700 mt-2">Select Irrigation Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={irrigationType}
                onValueChange={(itemValue) => setIrrigationType(itemValue)}
              >
                <Picker.Item label="Drip" value="Drip" />
                <Picker.Item label="Sprinkler" value="Sprinkler" />
                <Picker.Item label="Flood" value="Flood" />
                <Picker.Item label="Manual" value="Manual" />
              </Picker>
            </View>

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity className="bg-gray-400 rounded-md py-2 px-4" onPress={() => setShowForm(false)}>
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-green-500 rounded-md py-2 px-4 ml-2" onPress={handleFieldCreation}>
                <Text className="text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

